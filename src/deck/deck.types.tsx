import * as types from "../common/data.types";

export interface IDeckProps {
    deckList: types.IDeck[];
    userMonsterList: types.IMonster[];
    monsterEvolutionRoutes: types.IEvolutionRoute[];
    monsterInfo: types.IMonsterInfo[];
    monsterData: types.IMonsterData[];
}

export interface IDeckState {
    deckList: types.IDeck[];
    monsterEvolutionRoutes: types.IEvolutionRoute[];
    monsterInfo: types.IMonsterInfo[];
    monsterData: types.IMonsterData[];
    rootResourcePath: string;
    userMonsterList: types.IMonster[];
    deckPageContent: object[];
}
