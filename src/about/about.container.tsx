import { connect } from "react-redux";
import { Dispatch } from "redux";

import * as constants from "./about.constants";

import * as actions from "./about.actions";

import { IRootState } from "../root/main.types";

import { AboutView } from "./about.component";

export function mapStateToProps({ about }: IRootState) {
    return Object.assign(
        {},
        {
            changeLogs: about.changeLogs
        }
    );
}

export function mapDispatchToProps(dispatch: Dispatch<constants.AboutActiontype>) {
    return {
        ObtainChangeLog: (rootResoucePath: string) =>
            dispatch(actions.ObtainChangeLog(rootResoucePath))
    };
}

export const AboutContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutView);
