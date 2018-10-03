import * as constants from "./header.constants";
import * as types from "./header.types";

export function UpdateFilterConfig(config: types.IConfiguration): constants.HeaderActiontype {
    return {
        payload: {
            configuration: config
        },
        type: constants.ACTION_STATE.SET_CONFIG_SUCCESS
    };
}
