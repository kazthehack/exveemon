import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";

import { IRootState } from "./main.types";

import * as parserConstants from "../parser/parser.constants";
import { ParserReducer } from "../parser/parser.reducer";

import * as proxyConstants from "../proxy/proxy.constants";
import { ProxyReducer } from "../proxy/proxy.reducer";

import * as aboutContants from "../about/about.constants";
import { AboutReducer } from "../about/about.reducer";

export type RootTypes =
    | parserConstants.ParserActionType
    | proxyConstants.ProxyActionType
    | aboutContants.AboutActiontype;

const RootReducer = combineReducers({
    about: AboutReducer,
    parser: ParserReducer,
    user: ProxyReducer
});

export const history = createBrowserHistory();

export const RootStore = createStore<IRootState, RootTypes, any, any>(
    connectRouter(history)(RootReducer),
    {},
    compose(
        applyMiddleware(
            routerMiddleware(history) // for dispatching history actions
            // ... other middlewares ...
        )
    )
);
