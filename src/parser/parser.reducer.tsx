import * as constants from "./parser.constants";
import * as types from "./parser.types";

export function ParserReducer(
    state: types.IParserStoreState,
    action: constants.ParserActionType
): types.IParserStoreState {
    if (state == null) {
        state = {
            evolutionRoutes: [],
            monsterData: [],
            monsterInfo: [],
            monsterSkills: []
        };

        return state;
    }

    switch (action.type) {
        case constants.ACTION_STATE.READ_MONSTER_DATA_SUCCESS:
            return Object.assign({}, state, {
                monsterData: action.payload.monsterData
            });
        case constants.ACTION_STATE.READ_MONSTER_INFO_SUCCESS:
            return Object.assign({}, state, {
                monsterInfo: action.payload.monsterInfo
            });
        case constants.ACTION_STATE.READ_MONSTER_ROUTE_SUCCESS:
            return Object.assign({}, state, {
                evolutionRoutes: action.payload.evolutionRoutes
            });
        case constants.ACTION_STATE.READ_MONSTER_SKILL_SUCCESS:
            return Object.assign({}, state, {
                monsterSkills: action.payload.monsterSkills
            });
        default:
            return state;
    }
}
