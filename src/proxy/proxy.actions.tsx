/* tslint:disable no-console no-string-literal no-shadowed-variable*/
const http = window.require("http");
const net = window.require("net");
const httpProxy = window.require("http-proxy");
const url = window.require("url");

import * as zlib from "zlib";

import { Dispatch } from "redux";

import * as types from "../common/data.types";
import * as constants from "./proxy.constants";

const regexHostPort = /^([^:]+)(:([0-9]+))?$/;

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
    const tempJsonContent = JSON.parse(response);

    if (tempJsonContent["resData"]["020001"]) {
        return onGetPlayerInfo(tempJsonContent);
    }

    if (tempJsonContent["resData"]["010401"]) {
        return onGetDeckList(tempJsonContent);
    }

    if (tempJsonContent["resData"]["020101"]) {
        return onGetMonsterList(tempJsonContent);
    } else {
        return {
            type: constants.ACTION_STATE.RECEIVE_USER_INFO_FAIL
        };
    }
}

function getHostPortFromString(hostString: string, defaultPort: string) {
    let host = hostString;
    let port = defaultPort;

    const result = regexHostPort.exec(hostString);
    if (result != null) {
        host = result[1];
        if (result[2] != null) {
            port = result[3];
        }
    }

    return [host, port];
}

export let server: any;

export function StopProxyServer() {
    server.close();
}

export function StartProxyServer(dispatch: Dispatch<constants.ProxyActionType>) {
    http.globalAgent = new http.Agent({
        family: 4
    });

    server = http
        .createServer((req: any, res: any) => {
            // Check if url exists.
            if (!req.url) {
                res.end();
                return;
            }

            const urlObj = url.parse(req.url);
            const target = urlObj.protocol + "//" + urlObj.host;

            const proxy = httpProxy.createProxyServer({});

            proxy.on("error", (err: any, req: any, res: any) => {
                console.log("proxy error", err);
                res.end();
            });

            proxy.on("proxyRes", (proxyRes: any, req: any, res: any) => {
                if (req.url === "http://api.digimonlinkzww.channel.or.jp/app/ActiveController") {
                    let body = new Buffer("");
                    proxyRes.on("data", (data: any) => {
                        const dataBuffer = Buffer.from(data);
                        body = Buffer.concat([body, dataBuffer]);
                    });
                    proxyRes.on("end", () => {
                        zlib.gunzip(body, (err, dezipped) => {
                            dispatch(onGetMessage(dezipped.toString()));
                        });
                        res.end();
                    });
                } else if (req.url === "http://127.0.0.1:2306/userinfo") {
                    let body = new Buffer("");
                    proxyRes.on("data", (data: any) => {
                        const dataBuffer = Buffer.from(data);
                        body = Buffer.concat([body, dataBuffer]);
                    });
                    proxyRes.on("end", () => {
                        const resJson = JSON.parse(body.toString("utf8"));
                        dispatch(onGetPlayerInfo(resJson));
                        dispatch(onGetDeckList(resJson));
                        dispatch(onGetMonsterList(resJson));
                        res.end();
                    });
                }
            });

            proxy.web(req, res, { target });
        })
        .listen(2113); // this is the port your clients will connect to

    server.addListener("connect", (req: any, socket: any, bodyhead: any) => {
        const hostPort = getHostPortFromString(req.url, "443");
        const hostDomain = hostPort[0];
        const port = parseInt(hostPort[1], 10);
        console.log("Proxying HTTPS request for:", hostDomain, port, hostPort);
        console.log(req);

        const proxySocket = new net.Socket();

        if (hostDomain === "api.digimonlinkzww.channel.or.jp") {
            proxySocket.connect(
                port,
                hostDomain,
                () => {
                    proxySocket.write(bodyhead);
                    socket.write("HTTP/" + req.httpVersion + " 200 Connection established\r\n\r\n");
                }
            );

            let body = new Buffer("");

            proxySocket.on("data", (chunk: any) => {
                const dataBuffer = Buffer.from(chunk);
                body = Buffer.concat([body, dataBuffer]);
                socket.write(chunk);
            });

            proxySocket.on("end", () => {
                zlib.gunzip(body, (err, dezipped) => {
                    if (err) {
                        console.log(err);
                        console.log(body);
                    }

                    console.log(dezipped.toString());
                });
                socket.end();
            });

            proxySocket.on("error", () => {
                socket.write("HTTP/" + req.httpVersion + " 500 Connection error\r\n\r\n");
                socket.end();
            });

            socket.on("data", (chunk: any) => {
                proxySocket.write(chunk);
            });

            socket.on("end", () => {
                proxySocket.end();
            });

            socket.on("error", () => {
                proxySocket.end();
            });
        } else {
            // Passthrough requests
            proxySocket.connect(
                port,
                hostDomain,
                () => {
                    proxySocket.write(bodyhead);
                    socket.write("HTTP/" + req.httpVersion + " 200 Connection established\r\n\r\n");
                }
            );

            proxySocket.on("data", (chunk: any) => {
                socket.write(chunk);
            });

            proxySocket.on("end", () => {
                socket.end();
            });

            proxySocket.on("error", () => {
                socket.write("HTTP/" + req.httpVersion + " 500 Connection error\r\n\r\n");
                socket.end();
            });

            socket.on("data", (chunk: any) => {
                proxySocket.write(chunk);
            });

            socket.on("end", () => {
                proxySocket.end();
            });

            socket.on("error", () => {
                proxySocket.end();
            });
        }
    });
}
