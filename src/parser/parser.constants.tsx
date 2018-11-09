import * as types from "../common/data.types";

export const RESOURCE_PATH = "./build/resources/data/";

export const JP_RESOURCE_PATH = "jp/";

export const EN_RESOURCE_PATH = "en/";

export const MONSTER_DATA_PATH = "990102.json";

export const MONSTER_ROUTE_PATH = "990110.json"; 

export const MONSTER_INFO_PATH = "990103.json";

export const MONSTER_SKILL_PATH = "990108.json";

export const USER_INFO_PATH = "userInformation.json";

export enum ACTION_STATE {
    READ_MONSTER_DATA_SUCCESS = "READ_MONSTER_DATA_PATH_SUCCESS",
    READ_MONSTER_INFO_SUCCESS = "READ_MOSTER_INFO_PATH_SUCCESS",
    READ_MONSTER_ROUTE_SUCCESS = "READ_MONSTER_ROUTE_PATH_SUCCESS",
    READ_MONSTER_SKILL_SUCCESS = "READ_MONSTER_SKILL_SUCCESS",
    READ_USER_INFO_SUCCESS = "READ_USER_INFO_PATH_SUCCESS"
}

export interface IReadMonsterDataSuccess {
    type: ACTION_STATE.READ_MONSTER_DATA_SUCCESS;
    payload: {
        monsterData: types.IMonsterData[];
    };
}

export interface IReadEvolutionRouteSuccess {
    type: ACTION_STATE.READ_MONSTER_ROUTE_SUCCESS;
    payload: {
        evolutionRoutes: types.IEvolutionRoute[];
    };
}

export interface IReadMonsterInfoSuccess {
    type: ACTION_STATE.READ_MONSTER_INFO_SUCCESS;
    payload: {
        monsterInfo: types.IMonsterInfo[];
    };
}

export interface IReadMonsterSkillSuccess {
    type: ACTION_STATE.READ_MONSTER_SKILL_SUCCESS;
    payload: {
        monsterSkills: types.IMonsterSkill[];
    };
}

export type ParserActionType =
    | IReadMonsterDataSuccess
    | IReadEvolutionRouteSuccess
    | IReadMonsterInfoSuccess
    | IReadMonsterSkillSuccess;
