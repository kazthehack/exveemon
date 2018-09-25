export interface IEvolutionRoute {
    monsterEvolutionRouteId: string;
    childhood1MonsterId: string;
    childhood2MonsterId: string;
    growthMonsterId: string;
}

export interface IMonsterInfo {
    modelId: string;
    monsterGroupId: string;
    monsterName: string;
    growStep: string;
}

export interface IMonsterData {
    monsterId: string;
    monsterGroupId: string;
    rare: string;
    iconId: string;
}

export interface IPlayerInfo {
    nickname: string;
    userId: string;
    leadMonsterId: string;
}

export interface IDeck {
    monsterList: IDeckMonster[];
}

export interface IDeckMonster {
    userMonsterId: string;
    position: string;
}

export interface IMonster {
    userMonsterId: string;
    monsterId: string;
    defaultSkillGroupSubId: string;
    monsterEvolutionRouteId: string;
    hpAbilityFlg: string;
    hpAbility: string;
    attackAbilityFlg: string;
    attackAbility: string;
    defenseAbilityFlg: string;
    defenseAbility: string;
    spAttackAbilityFlg: string;
    spAttackAbility: string;
    spDefenseAbilityFlg: string;
    spDefenseAbility: string;
    speedAbilityFlg: string;
    speedAbility: string;
    statusFlgs: string /* Location 1 - House, 2 - Farm*/;
    createTimeSec: string;
}
