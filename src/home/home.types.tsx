import * as types from "../common/data.types";

export interface IHomeProps {
    deckList: types.IDeck[];
    playerInfo: types.IPlayerInfo;
    userMonsterList: types.IMonster[];
    monsterEvolutionRoutes: types.IEvolutionRoute[];
    monsterInfo: types.IMonsterInfo[];
    monsterData: types.IMonsterData[];
    monsterSkills: types.IMonsterSkill[];
    OnCaptureHTTPSUserInfo: (local: string) => void;
    OnCreateHTTPSCertificate: () => void;
    OnGetMonsterData: (rootResourcePath: string, localResourcePath: string) => void;
    OnGetMonsterDetails: (rootResourcePath: string, localResourcePath: string) => void;
    OnGetMonsterRoutes: (rootResourcePath: string, localResourcePath: string) => void;
    OnGetMonsterSkills: (rootResourcePath: string, localResourcePath: string) => void;
    OnReadUserInfo: () => void;
    OnWriteUserInfo: (userMonsterList: any, playerInfo: any, deckList: any) => void;
}

export interface IHomeState {
    isLoading: boolean;
    isSaved: boolean;
    deckList: types.IDeck[];
    hasCertificate: boolean;
    houseCount: number;
    labCount: number;
    message: string;
    monsterEvolutionRoutes: types.IEvolutionRoute[];
    monsterInfo: types.IMonsterInfo[];
    monsterData: types.IMonsterData[];
    monsterSkills: types.IMonsterSkill[];
    networkAddresses: object[];
    rootResourcePath: string;
    selectedLocale: string;
    playerInfo: types.IPlayerInfo;
    userMonsterList: types.IMonster[];
}
