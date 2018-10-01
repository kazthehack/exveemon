import * as types from "./about.types";

export const CHANGE_LOG_PATH = "./build/resources/changelog.json";

export const TAKAT_PATH = "https://takatomon.net/";

export const CHORTOS_PATH = "https://chortos.selfip.net/digimonlinks/";

export const REDDIT_PATH = "https://www.reddit.com/r/DigimonLinkz/";

export const DISCORD_PATH = "https://www.discordapp.com/channels/369562940963291138/369567059039879169/";


export enum ACTION_STATE {
    READ_CHANGE_LOG_SUCCESS = "READ_CHANGE_LOG_SUCCESS"
}

export interface IReadChangeLogSuccess {
    type: ACTION_STATE.READ_CHANGE_LOG_SUCCESS;
    payload: {
        changelogs: types.IChangeLog[];
    };
}

export type AboutActiontype = IReadChangeLogSuccess;
