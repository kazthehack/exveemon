import * as types from "./header.types"

export enum ACTION_STATE {
    SET_CONFIG_SUCCESS = "SET_CONFIG_SUCCESS"
}

export interface ISetConfigSuccess {
    type: ACTION_STATE.SET_CONFIG_SUCCESS;
    payload: {
        configuration: types.IConfiguration
    };
}

export type HeaderActiontype = ISetConfigSuccess;