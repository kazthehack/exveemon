/* tslint:disable: no-console*/

import { connect } from "react-redux";
import { Dispatch } from "redux";

import * as proxyConstants from "../proxy/proxy.constants";

import * as parserConstants from "../parser/parser.constants";

import { IRootState } from "../root/main.types";

import { GridView } from "./grid.component";


export function mapStateToProps({ user, parser }: IRootState) {
    return Object.assign(
        {},
        {
            deckList: user.deckList,
            monsterData: parser.monsterData,
            monsterEvolutionRoutes: parser.evolutionRoutes,
            monsterInfo: parser.monsterInfo,
            userMonsterList: user.userMonsterList
        }
    );
}

export function mapDispatchToProps(
    dispatch: Dispatch<proxyConstants.ProxyActionType | parserConstants.ParserActionType>
) {
    return {};
}

export const GridContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GridView);
