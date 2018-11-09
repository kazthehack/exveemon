/* tslint:disable: no-console*/

import { connect } from "react-redux";
import { Dispatch } from "redux";

import * as proxyActions from "../proxy/proxy.actions";
import * as proxyConstants from "../proxy/proxy.constants";

import * as parserActions from "../parser/parser.actions";
import * as parserConstants from "../parser/parser.constants";

import { IRootState } from "../root/main.types";

import { Home } from "../home/home.component";

export function mapStateToProps({ user, parser }: IRootState) {
    return Object.assign(
        {},
        {
            deckList: user.deckList,
            message: user.message,
            monsterData: parser.monsterData,
            monsterEvolutionRoutes: parser.evolutionRoutes,
            monsterInfo: parser.monsterInfo,
            monsterSkills: parser.monsterSkills,
            playerInfo: user.playerInfo,
            userMonsterList: user.userMonsterList
        }
    );
}

export function mapDispatchToProps(
    dispatch: Dispatch<proxyConstants.ProxyActionType | parserConstants.ParserActionType>
) {
    return {
        OnCaptureHTTPSUserInfo: (local: string) =>
            proxyActions.StartProxyHTTPSServer(dispatch, local),
        OnCreateHTTPSCertificate: () => proxyActions.CreateHTTPSCertificate(),
        OnGetMonsterData: (rootResourcePath: string, localResourcePath: string) =>
            dispatch(parserActions.ReadMonsterData(rootResourcePath, localResourcePath)),
        OnGetMonsterDetails: (rootResourcePath: string, localResourcePath: string) =>
            dispatch(parserActions.ReadMonsterInfo(rootResourcePath, localResourcePath)),
        OnGetMonsterRoutes: (rootResourcePath: string, localResourcePath: string) =>
            dispatch(parserActions.ReadMonsterRoute(rootResourcePath, localResourcePath)),
        OnGetMonsterSkills: (rootResourcePath: string, localResourcePath: string) =>
            dispatch(parserActions.ReadMonsterSkill(rootResourcePath, localResourcePath)),
        OnReadUserInfo: () => parserActions.ReadFile(dispatch),
        OnWriteUserInfo: (userMonsterList: any, playerInfo: any, deckList: any) =>
            parserActions.WriteUserInfo(userMonsterList, playerInfo, deckList)
    };
}

export const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
