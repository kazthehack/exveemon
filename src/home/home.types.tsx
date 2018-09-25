import * as types from "../common/data.types";

export interface IHomeProps {
    deckList: types.IDeck[];
    playerInfo: types.IPlayerInfo;
    userMonsterList: types.IMonster[];
    monsterEvolutionRoutes: types.IEvolutionRoute[];
    monsterInfo: types.IMonsterInfo[];
    monsterData: types.IMonsterData[];
    OnCaptureUserInfo: () => void;
    OnGetMonsterData: (rootResourcePath: string) => void;
    OnGetMonsterDetails: (rootResourcePath: string) => void;
    OnGetMonsterRoutes: (rootResourcePath: string) => void;
    OnReadUserInfo: () => void;
    OnWriteUserInfo: (userMonsterList: any, playerInfo: any, deckList: any) => void;
}

export interface IHomeState {
    isLoading: boolean;
    deckList: types.IDeck[];
    houseCount: number;
    labCount: number;
    monsterEvolutionRoutes: types.IEvolutionRoute[];
    monsterInfo: types.IMonsterInfo[];
    monsterData: types.IMonsterData[];
    rootResourcePath: string;
    playerInfo: types.IPlayerInfo;
    userMonsterList: types.IMonster[];
}
