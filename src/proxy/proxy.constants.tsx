import * as types from "../common/data.types";

export enum ACTION_STATE {
    RECEIVE_DECK_LIST_SUCCESS = "RECEIVE_DECK_LIST_SUCCESS",
    RECEIVE_PLAYER_INFO_SUCCESS = "RECEIVE_PLAYER_INFO_SUCCESS",
    RECEIVE_MONSTER_LIST_SUCCESS = "RECEIVE_MONSTER_LIST_SUCCESS",
    RECEIVE_PASSTHROUGH = "RECEIVE_PASSTHROUGH",
    RECEIVE_USER_INFO_FAIL = "RECEIVE_USER_INFO_FAIL"
}

export interface IDeckResponseResult {
    type: ACTION_STATE.RECEIVE_DECK_LIST_SUCCESS;
    payload: {
        deckList: types.IDeck[];
    };
}

export interface IPlayerInfoResponseResult {
    type: ACTION_STATE.RECEIVE_PLAYER_INFO_SUCCESS;
    payload: {
        playerInfo: types.IPlayerInfo;
    };
}

export interface IMonsterListResponseResult {
    type: ACTION_STATE.RECEIVE_MONSTER_LIST_SUCCESS;
    payload: {
        userMonsterList: types.IMonster[];
    };
}

export interface IGenericResponse {
    type: ACTION_STATE.RECEIVE_PASSTHROUGH
    payload: {
        message: string
    }
}

export type ProxyActionType =
    | IDeckResponseResult
    | IPlayerInfoResponseResult
    | IMonsterListResponseResult
    | IGenericResponse;
