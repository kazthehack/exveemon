import * as types from "../common/data.types";

export const MONSTER_DATA_PATH = "./build/resources/data/monsterData.json";

export const MONSTER_ROUTE_PATH = "./build/resources/data/monsterEvolutionRouter.json";

export const MONSTER_INFO_PATH = "./build/resources/data/monsterDataDetails.json";

export const MONSTER_SKILL_PATH = "./build/resources/data/monsterSkill.json";

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
