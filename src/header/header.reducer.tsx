/* tslint:disable: no-console*/

import * as constants from "./header.constants";
import * as types from "./header.types";

export function HeaderReducer(
    state: types.IHeaderState,
    action: constants.ISetConfigSuccess
): types.IHeaderState {
    if (state == null) {
        state = {
            config: {
                filter: types.FILTER.NO_FILTER,
                isMedalView: false,
                isRookieView: false,
                isShowDNA: false,
                isShowEvolution: false,
                isShowLS: false,
                isShowLegacy: false,
                isShowLink: false,
                sort: types.SORT.EVOL
            },
            headerDescription: "",
            headerIcon: "",
            headerTitle: "",
            isDeck: false,
            isDirty: false
        };
        return state;
    }
    console.log("header reducer received new items");
    console.log(action);

    switch (action.type) {
        case constants.ACTION_STATE.SET_CONFIG_SUCCESS:
            return Object.assign({}, state, {
                config: action.payload.configuration
            });
        default:
            return state;
    }
}
