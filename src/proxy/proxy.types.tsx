import * as types from "../common/data.types";

export interface IProxyUserState {
    deckList: types.IDeck[];
    playerInfo: types.IPlayerInfo;
    userMonsterList: types.IMonster[];
}
