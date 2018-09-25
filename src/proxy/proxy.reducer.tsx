/* tslint:disable no-console */

import * as constants from "./proxy.constants";
import * as types from "./proxy.types";

export function ProxyReducer(
    state: types.IProxyUserState,
    action: constants.ProxyActionType
): types.IProxyUserState {
    if (state == null) {
        state = {
            deckList: [],
            playerInfo: {
                leadMonsterId: "",
                nickname: "",
                userId: ""
            },
            userMonsterList: []
        };
        return state;
    }

    switch (action.type) {
        case constants.ACTION_STATE.RECEIVE_DECK_LIST_SUCCESS:
            return Object.assign({}, state, {
                deckList: action.payload.deckList
            });
        case constants.ACTION_STATE.RECEIVE_PLAYER_INFO_SUCCESS:
            return Object.assign({}, state, {
                playerInfo: action.payload.playerInfo
            });
        case constants.ACTION_STATE.RECEIVE_MONSTER_LIST_SUCCESS:
            return Object.assign({}, state, {
                userMonsterList: action.payload.userMonsterList
            });
        default:
            return state;
    }
}
