import { IAboutState } from "../about/about.types";
import { IHeaderState } from "../header/header.types";

import { IParserStoreState } from "../parser/parser.types";
import { IProxyUserState } from "../proxy/proxy.types";

export interface IRootState {
    header: IHeaderState;
    parser: IParserStoreState;
    user: IProxyUserState;
    about: IAboutState;
}
