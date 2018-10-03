import * as types from "../common/data.types";
import * as headerTypes from "../header/header.types";

export interface IDeckProps {
    config: headerTypes.IConfiguration;
    deckList: types.IDeck[];
    userMonsterList: types.IMonster[];
    monsterEvolutionRoutes: types.IEvolutionRoute[];
    monsterInfo: types.IMonsterInfo[];
    monsterData: types.IMonsterData[];
    monsterSkills: types.IMonsterSkill[];
}

export interface IDeckState {
    config: headerTypes.IConfiguration;
    deckList: types.IDeck[];
    isDirty: boolean;
    monsterEvolutionRoutes: types.IEvolutionRoute[];
    monsterInfo: types.IMonsterInfo[];
    monsterData: types.IMonsterData[];
    monsterSkills: types.IMonsterSkill[];
    rootResourcePath: string;
    userMonsterList: types.IMonster[];
    deckPageContent: object[];
}
