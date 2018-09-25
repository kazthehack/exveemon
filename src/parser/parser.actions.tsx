/* tslint:disable no-console no-string-literal*/

const fs = window.require("fs");

import * as constants from "./parser.constants";

import * as types from "../common/data.types";

import { Dispatch } from "redux";

import * as proxyActions from "../proxy/proxy.actions";
import * as proxyConstants from "../proxy/proxy.constants";

export function ReadMonsterData(rootResourcePath: string): constants.IReadMonsterDataSuccess {
    const resultMonsterData = [];
    let tempJsonContent;

    try {
        const tempFileContent = fs.readFileSync(rootResourcePath + constants.MONSTER_DATA_PATH);
        tempJsonContent = JSON.parse(tempFileContent);
    } catch (e) {
        console.log(e);
    }

    for (const monsterData of tempJsonContent["resData"]["990102"]["monsterM"]) {
        const tempMonsterData = {
            iconId: monsterData["iconId"],
            monsterGroupId: monsterData["monsterGroupId"],
            monsterId: monsterData["monsterId"],
            rare: monsterData["rare"]
        };

        resultMonsterData.push(tempMonsterData);
    }

    return {
        payload: {
            monsterData: resultMonsterData
        },
        type: constants.ACTION_STATE.READ_MONSTER_DATA_SUCCESS
    };
}

export function ReadMonsterRoute(rootResourcePath: string): constants.IReadEvolutionRouteSuccess {
    const resultEvolutionRouteData = [];
    let tempJsonContent;

    try {
        const tempFileContent = fs.readFileSync(rootResourcePath + constants.MONSTER_ROUTE_PATH);
        tempJsonContent = JSON.parse(tempFileContent);
    } catch {
        // return
    }

    for (const evolutionRouteData of tempJsonContent["resData"]["990110"][
        "monsterEvolutionRouteM"
    ]) {
        const tempEvolutionRouteData = {
            childhood1MonsterId: evolutionRouteData["childhood1MonsterId"],
            childhood2MonsterId: evolutionRouteData["childhood2MonsterId"],
            growthMonsterId: evolutionRouteData["growthMonsterId"],
            monsterEvolutionRouteId: evolutionRouteData["monsterEvolutionRouteId"]
        };

        resultEvolutionRouteData.push(tempEvolutionRouteData);
    }

    return {
        payload: {
            evolutionRoutes: resultEvolutionRouteData
        },
        type: constants.ACTION_STATE.READ_MONSTER_ROUTE_SUCCESS
    };
}

export function ReadMonsterInfo(rootResourcePath: string): constants.IReadMonsterInfoSuccess {
    const resultMonsterInfo = [];
    let tempJsonContent;

    try {
        const tempFileContent = fs.readFileSync(rootResourcePath + constants.MONSTER_INFO_PATH);
        tempJsonContent = JSON.parse(tempFileContent);
    } catch {
        // return
    }

    for (const monsterData of tempJsonContent["resData"]["990103"]["monsterM"]) {
        const tempMonsterInfo = {
            growStep: monsterData["growStep"],
            modelId: monsterData["modelId"],
            monsterGroupId: monsterData["monsterGroupId"],
            monsterName: monsterData["monsterName"]
        };

        resultMonsterInfo.push(tempMonsterInfo);
    }

    return {
        payload: {
            monsterInfo: resultMonsterInfo
        },
        type: constants.ACTION_STATE.READ_MONSTER_INFO_SUCCESS
    };
}

export function WriteUserInfo(
    userMonsterList: object,
    userInfo: types.IPlayerInfo,
    deckList: object
) {
    const response = {
        resData: {
            "010401": {
                deckList
            },
            "020001": {
                leaderMonster: {
                    monsterId: userInfo.leadMonsterId
                },
                playerInfo: {
                    nickname: userInfo.nickname
                }
            },
            "020101": {
                userMonsterList
            },
            userId: userInfo.userId
        }
    };

    fs.writeFileSync(constants.USER_INFO_PATH, JSON.stringify(response), "utf-8");
}

export function ReadFile(dispatch: Dispatch<proxyConstants.ProxyActionType>) {
    let fileContent = "";
    let jsonFileContent;

    try {
        fileContent = fs.readFileSync(constants.USER_INFO_PATH);
        jsonFileContent = JSON.parse(fileContent);
    } catch (e) {
        // do nothing
        console.log(e);
    }

    console.log(fileContent);
    console.log(jsonFileContent);

    dispatch(proxyActions.onGetDeckList(jsonFileContent));
    dispatch(proxyActions.onGetMonsterList(jsonFileContent));
    dispatch(proxyActions.onGetPlayerInfo(jsonFileContent));
}
