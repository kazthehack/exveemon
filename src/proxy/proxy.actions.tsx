/* tslint:disable no-console no-string-literal no-shadowed-variable*/

const AnyProxy = window.require("anyproxy");

import { Dispatch } from "redux";

import * as types from "../common/data.types";
import * as constants from "./proxy.constants";

export function onGetPlayerInfo(content: any): constants.IPlayerInfoResponseResult {
    const tempUserJson = content["resData"]["020001"];
    const tempUserInfo = {
        leadMonsterId: tempUserJson["leaderMonster"]["monsterId"],
        nickname: tempUserJson["playerInfo"]["nickname"],
        userId: content["userId"]
    };

    return {
        payload: {
            playerInfo: tempUserInfo
        },
        type: constants.ACTION_STATE.RECEIVE_PLAYER_INFO_SUCCESS
    };
}

export function onGetDeckList(content: any): constants.IDeckResponseResult {
    const tempDeckList = [];
    for (const deck of content["resData"]["010401"]["deckList"]) {
        const tempDeck = [];

        for (const deckMonster of deck["monsterList"]) {
            const tempDeckMonster: types.IDeckMonster = {
                position: deckMonster["position"],
                userMonsterId: deckMonster["userMonsterId"]
            };
            tempDeck.push(tempDeckMonster);
        }

        const tempDeckObject = {
            monsterList: tempDeck
        };

        tempDeckList.push(tempDeckObject);
    }

    return {
        payload: {
            deckList: tempDeckList
        },
        type: constants.ACTION_STATE.RECEIVE_DECK_LIST_SUCCESS
    };
}

export function onGetMonsterList(content: any): constants.IMonsterListResponseResult {
    const tempUserMonsterList = [];

    for (const userMonster of content["resData"]["020101"]["userMonsterList"]) {
        const tempUserMonster = {
            attackAbility: userMonster["attackAbility"],
            attackAbilityFlg: userMonster["attackAbilityFlg"],
            commonSkillId: userMonster["commonSkillId"],
            createTimeSec: userMonster["createTimeSec"],
            defaultSkillGroupSubId: userMonster["defaultSkillGroupSubId"],
            defenseAbility: userMonster["defenseAbility"],
            defenseAbilityFlg: userMonster["defenseAbilityFlg"],
            hpAbility: userMonster["hpAbility"],
            hpAbilityFlg: userMonster["hpAbilityFlg"],
            leaderSkillId: userMonster["leaderSkillId"],
            monsterEvolutionRouteId: userMonster["monsterEvolutionRouteId"],
            monsterId: userMonster["monsterId"],
            spAttackAbility: userMonster["spAttackAbility"],
            spAttackAbilityFlg: userMonster["spAttackAbilityFlg"],
            spDefenseAbility: userMonster["spDefenseAbility"],
            spDefenseAbilityFlg: userMonster["spDefenseAbilityFlg"],
            speedAbility: userMonster["speedAbility"],
            speedAbilityFlg: userMonster["speedAbilityFlg"],
            statusFlgs: userMonster["statusFlgs"],
            userMonsterId: userMonster["userMonsterId"]
        };
        tempUserMonsterList.push(tempUserMonster);
    }

    return {
        payload: {
            userMonsterList: tempUserMonsterList
        },
        type: constants.ACTION_STATE.RECEIVE_MONSTER_LIST_SUCCESS
    };
}

export function onGetMessage(response: string): constants.ProxyActionType {
    try {
        const tempJsonContent = JSON.parse(response);

        if (tempJsonContent["resData"]["020001"]) {
            return onGetPlayerInfo(tempJsonContent);
        }

        if (tempJsonContent["resData"]["010401"]) {
            return onGetDeckList(tempJsonContent);
        }

        if (tempJsonContent["resData"]["020101"]) {
            return onGetMonsterList(tempJsonContent);
        }
    } catch {
        // Ignore in error in parsing
    }

    return {
        payload: {
            message: response
        },
        type: constants.ACTION_STATE.RECEIVE_PASSTHROUGH
    };
}

let proxyServer: any;

export function StartProxyHTTPSServer(
    dispatch: Dispatch<constants.ProxyActionType>,
    local: string
) {
    // HTTPS Support

    const callbackFns = {
        summary: "Exveemon Custom Rule",
        *beforeSendResponse(requestDetail: any, responseDetail: any): any {
            if (
                requestDetail.url.indexOf("https://api.digimonlinkz.channel.or.jp") === 0 ||
                requestDetail.url.indexOf("http://api.digimonlinkzww.channel.or.jp") === 0
            ) {
                try {
                    const tempJsonContent = JSON.parse(responseDetail.response.body);

                    if (
                        tempJsonContent["resData"]["020001"] ||
                        tempJsonContent["resData"]["010401"] ||
                        tempJsonContent["resData"]["020101"]
                    ) {
                        dispatch(onGetMessage(responseDetail.response.body));
                        //  return onGetPlayerInfo(tempJsonContent);
                    } else {
                        console.log("Passthrough Response:");
                        console.log(tempJsonContent);
                        dispatch(onGetMessage(requestDetail.url));
                    }
                } catch {
                    console.log("JSON Parsing error");
                }
            }else
            {
                dispatch(onGetMessage(requestDetail.url));
            }
        },
        *onError(requestDetail: any, error: any): any {
            console.log(error);
        },
        *onConnectError(requestDetail: any, error: any): any {
            console.log(error);
        }
        // *beforeSendRequest(requestDetail) { /* ... */ },
        // *beforeDealHttpsRequest(requestDetail) { /* ... */ },
    };

    let options;
    if (local === "en/") {
        options = {
            port: 2113,
            rule: callbackFns,
            silent: false,
            throttle: 10000,
            webInterface: {
                enable: true,
                webPort: 2114
            },
            wsIntercept: false
        };
    } else {
        /* JP HTTPS version*/
        options = {
            dangerouslyIgnoreUnauthorized: true,
            forceProxyHttps: true,
            port: 2113,
            rule: callbackFns,
            silent: false,
            throttle: 10000,
            webInterface: {
                enable: true,
                webPort: 2114
            },
            wsIntercept: false
        };
    }

    proxyServer = new AnyProxy.ProxyServer(options);

    proxyServer.on("ready", () => {
        /* */
    });

    proxyServer.on("error", (e: any) => {
        console.log(e);
    });

    proxyServer.start();
}

export function StopHTTPSServer() {
    // proxyServer.close();
}

export function CreateHTTPSCertificate() {
    // Create certificate
    if (!AnyProxy.utils.certMgr.ifRootCAFileExists()) {
        AnyProxy.utils.certMgr.generateRootCA((error: any, keyPath: any) => {
            console.log(keyPath);

            // let users to trust this CA before using proxy
            if (error) {
                console.log("error when generating rootCA");
                console.log(error);
            }
        });
    }
}
