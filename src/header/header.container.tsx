import { connect } from "react-redux";
import { Dispatch } from "redux";

import * as constants from "./header.constants";

import * as actions from "./header.actions";

import { IRootState } from "../root/main.types";

import { HeaderView } from "./header.component";
import { IConfiguration } from "./header.types";

export function mapStateToProps({ header }: IRootState) {
    return Object.assign(
        {},
        {
            config: header.config
        }
    );
}

export function mapDispatchToProps(dispatch: Dispatch<constants.HeaderActiontype>) {
    return {
        UpdateConfig: (config: IConfiguration) => dispatch(actions.UpdateFilterConfig(config))
    };
}

export const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderView);
