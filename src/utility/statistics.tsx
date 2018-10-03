/* tslint:disable no-console*/

import * as types from "../common/data.types";

import * as resourceLoader from "./resource_loader";

export function ObtainHouseCount(
    userMonsterList: types.IMonster[],
    monsterInfo: types.IMonsterInfo[],
    monsterData: types.IMonsterData[]
) {
    const tempMonsterList: types.IMonster[] = [];

    for (let i = 9; i >= 4; i--) {
        let tempGroup = [];

        tempGroup = userMonsterList.filter(
            m =>
                resourceLoader.ObtainEvolutionInformation(m.monsterId, monsterInfo, monsterData) ===
                i.toString()
        );

        for (const monster of tempGroup) {
            tempMonsterList.push(monster);
        }
    }

    return tempMonsterList.length;
}

export function ObtainLabCount(
    userMonsterList: types.IMonster[],
    monsterInfo: types.IMonsterInfo[],
    monsterData: types.IMonsterData[]
) {
    const tempMonsterList: types.IMonster[] = [];

    for (let i = 3; i >= 2; i--) {
        let tempGroup = [];

        tempGroup = userMonsterList.filter(
            m =>
                resourceLoader.ObtainEvolutionInformation(m.monsterId, monsterInfo, monsterData) ===
                i.toString()
        );

        for (const monster of tempGroup) {
            tempMonsterList.push(monster);
        }
    }
    return tempMonsterList.length;
}
