import * as types from "../common/data.types";
import * as headerTypes from "../header/header.types";

export interface IGridProps {
    config: headerTypes.IConfiguration;
    location: string;
    userMonsterList: types.IMonster[];
    monsterEvolutionRoutes: types.IEvolutionRoute[];
    monsterInfo: types.IMonsterInfo[];
    monsterData: types.IMonsterData[];
    monsterSkills: types.IMonsterSkill[];
}

export interface IGridState {
    config: headerTypes.IConfiguration;
    location: string;
    isDirty: boolean;
    filteredMonsterList: types.IMonster[];
    monsterEvolutionRoutes: types.IEvolutionRoute[];
    monsterInfo: types.IMonsterInfo[];
    monsterData: types.IMonsterData[];
    monsterSkills: types.IMonsterSkill[];
    userMonsterList: types.IMonster[];
    gridPageContent: object[];
}
