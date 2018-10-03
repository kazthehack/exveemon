/* tslint:disable: no-console*/

import * as constants from "./about.constants";
import * as types from "./about.types";

export function AboutReducer(
    state: types.IAboutState,
    action: constants.AboutActiontype
): types.IAboutState {
    if (state == null) {
        state = {
            changeLogContent: [],
            changeLogs: [],
            rootResourcePath: ""
        };
        return state;
    }

    switch (action.type) {
        case constants.ACTION_STATE.READ_CHANGE_LOG_SUCCESS:
            return Object.assign({}, state, {
                changeLogs: action.payload.changelogs
            });
        default:
            return state;
    }
}
