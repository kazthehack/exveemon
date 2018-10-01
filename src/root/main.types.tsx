import { IAboutState } from "../about/about.types";
import { IParserStoreState } from "../parser/parser.types";
import { IProxyUserState } from "../proxy/proxy.types";

export interface IRootState {
    parser: IParserStoreState;
    user: IProxyUserState;
    about: IAboutState;
}
