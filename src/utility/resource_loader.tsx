/* tslint:disable no-console */

import * as types from "../common/data.types";

export function ObtainMonsterName(
    monsterId: string,
    monsterData: types.IMonsterData[],
    monsterInfo: types.IMonsterInfo[]
) {
    const monsterGroup = monsterData.find(m => m.monsterId === monsterId);

    if (!monsterGroup) {
        return "N/A";
    }

    const monsterDetails = monsterInfo.find(m => m.monsterGroupId === monsterGroup.monsterGroupId);

    if (!monsterDetails) {
        return "N/A";
    }

    let monsterName = monsterDetails.monsterName;

    let awakening = parseInt(monsterGroup.rare, 10);
    if (awakening === 6) {
        // Assume V2
        monsterName += " (V2)";
    } else if (awakening > 1) {
        awakening -= 1;
        monsterName += " (+" + awakening.toString() + ")";
    }

    return monsterName;
}

export function ObtainMonsterIcon(
    monsterId: string,
    monsterData: types.IMonsterData[],
    monsterInfo: types.IMonsterInfo[]
) {
    const monster = monsterData.find(m => m.monsterId === monsterId);

    if (!monster) {
        return "";
    }

    const monsterBase = monsterData.find(m => m.monsterId === monster.iconId);

    if (!monsterBase) {
        return "";
    }

    let awakening = parseInt(monster.rare, 10);
    // translate the json rareid to Growlmon.net style numbering
    awakening = awakening - 1;
    // Rename Awakening +2 the same as Awakening + 1
    if (awakening === 2) {
        awakening = 1;
    }

    let monsterGroupId = monsterBase.monsterGroupId;

    if (parseInt(monsterGroupId, 10) >= 9015) {
        // Check for volcanicdramo id
        const tempGroup = monsterInfo.find(m => m.monsterGroupId === monsterGroupId);

        if (!tempGroup) {
            return "";
        }

        monsterGroupId = tempGroup.modelId;
    }

    const imageUrl = "./resources/icons/" + monsterGroupId + "-" + awakening.toString() + ".png";

    return imageUrl;
}

export function ObtainMedalIcon(medalValue: string) {
    return "./resources/medals/" + medalValue + ".png";
}

export function ObtainDNAInformation(userMonsterId: string, userMonsterList: types.IMonster[]) {
    const monster = userMonsterList.find(m => m.userMonsterId === userMonsterId);

    if (!monster) {
        return "N/A";
    }

    return monster.defaultSkillGroupSubId;
}

export function ObtainSkillName(monsterSkillId: string, monsterSkills: types.IMonsterSkill[]) {
    const monsterSkill = monsterSkills.find(ms => ms.skillId === monsterSkillId);

    if (monsterSkillId === "0" || monsterSkillId === "" || !monsterSkill) {
        return "N/A";
    }

    return monsterSkill.name;
}

export function ObtainLeaderSkill(userMonsterId: string, userMonsterList: types.IMonster[]) {
    const monster = userMonsterList.find(m => m.userMonsterId === userMonsterId);

    if (!monster) {
        return "N/A";
    }

    return monster.leaderSkillId;
}

export function ObtainLegacySkill(userMonsterId: string, userMonsterList: types.IMonster[]) {
    const monster = userMonsterList.find(m => m.userMonsterId === userMonsterId);

    if (!monster) {
        return "N/A";
    }

    return monster.commonSkillId;
}

export function ObtainChortosLink(
    monsterId: string,
    monsterData: types.IMonsterData[],
    monsterInfo: types.IMonsterInfo[]
) {
    const BASE_URL = "https://chortos.selfip.net/digimonlinks/monsters/";

    const monster = monsterData.find(m => m.monsterId === monsterId);

    if (!monster) {
        return "";
    }

    const group = monsterInfo.find(m => m.monsterGroupId === monster.monsterGroupId);

    if (!group || group.monsterCollectionId === "0" || group.monsterCollectionId.length !== 5) {
        return BASE_URL + monster.monsterGroupId;
    } else {
        return BASE_URL + parseInt(group.monsterCollectionId.substring(1), 10).toString();
    }
}

export function ObtainTakatomonLink(
    monsterId: string,
    monsterData: types.IMonsterData[],
    monsterInfo: types.IMonsterInfo[]
) {
    const BASE_URL = "https://takatomon.net/?sd=";

    const monster = monsterData.find(m => m.monsterId === monsterId);

    if (!monster) {
        return "";
    }

    const group = monsterInfo.find(m => m.monsterGroupId === monster.monsterGroupId);

    // Exclude mutants
    if (!group || group.monsterCollectionId === "0" || group.monsterCollectionId.length !== 5) {
        return "";
    }

    return BASE_URL + parseInt(group.monsterCollectionId.substring(1), 10).toString();
}

export function ObtainEvolutionInformation(
    monsterId: string,
    monsterInfo: types.IMonsterInfo[],
    monsterData: types.IMonsterData[]
) {
    const group = monsterData.find(m => m.monsterId === monsterId);

    if (!group) {
        return "0";
    }

    const monster = monsterInfo.find(m => m.monsterGroupId === group.monsterGroupId);

    if (!monster) {
        return "0";
    }

    return monster.growStep;
}

export function ObtainRookieInformation(
    userMonsterId: string,
    userMonsterList: types.IMonster[],
    evolutionRoutes: types.IEvolutionRoute[],
    monsterInfo: types.IMonsterInfo[],
    monsterData: types.IMonsterData[]
) {
    const monster = userMonsterList.find(m => m.userMonsterId === userMonsterId);

    if (!monster) {
        return "N/A";
    }

    const evolutionRoute = evolutionRoutes.find(
        e => e.monsterEvolutionRouteId === monster.monsterEvolutionRouteId
    );

    if (!evolutionRoute) {
        return "N/A";
    }

    const monsterGroup = monsterData.find(m => m.monsterId === evolutionRoute.growthMonsterId);

    if (!monsterGroup) {
        return "N/A";
    }

    const monsterDetails = monsterInfo.find(m => m.monsterGroupId === monsterGroup.monsterGroupId);

    if (!monsterDetails) {
        return "N/A";
    }

    return monsterDetails.monsterName;
}

export function ObtainMonsterIdFromUserMonsterId(
    userMonsterId: string,
    userMonsterList: types.IMonster[]
) {
    const selectedMon = userMonsterList.find(m => m.userMonsterId === userMonsterId);

    if (selectedMon) {
        return selectedMon.monsterId;
    } else {
        return "";
    }
}

export function ObtainMonsterMedals(userMonsterId: string, userMonsterList: types.IMonster[]) {
    const medalList = [];

    const monster = userMonsterList.find(m => m.userMonsterId === userMonsterId);

    if (!monster) {
        return [];
    }

    if (monster.hpAbilityFlg !== "0") {
        medalList.push({ key: "HP  ", value: monster.hpAbility });
    }

    if (monster.attackAbilityFlg !== "0") {
        medalList.push({ key: "ATK ", value: monster.attackAbility });
    }

    if (monster.spAttackAbilityFlg !== "0") {
        medalList.push({ key: "SATK", value: monster.spAttackAbility });
    }

    if (monster.defenseAbilityFlg !== "0") {
        medalList.push({ key: "DEF ", value: monster.defenseAbility });
    }

    if (monster.spDefenseAbilityFlg !== "0") {
        medalList.push({ key: "SDEF", value: monster.spDefenseAbility });
    }

    if (monster.speedAbilityFlg !== "0") {
        medalList.push({ key: "SPD ", value: monster.speedAbility });
    }

    return medalList;
}
