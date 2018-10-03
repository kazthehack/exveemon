import * as types from "../common/data.types";

export interface IParserStoreState {
    monsterData: types.IMonsterData[];
    monsterInfo: types.IMonsterInfo[];
    monsterSkills: types.IMonsterSkill[];
    evolutionRoutes: types.IEvolutionRoute[];
}
