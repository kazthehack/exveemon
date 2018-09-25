import * as types from "../common/data.types";

export interface IGridProps {
    location: string;
    deckList: types.IDeck[];
    userMonsterList: types.IMonster[];
    monsterEvolutionRoutes: types.IEvolutionRoute[];
    monsterInfo: types.IMonsterInfo[];
    monsterData: types.IMonsterData[];
}

export interface IGridState {
    location: string;
    deckList: types.IDeck[];
    monsterEvolutionRoutes: types.IEvolutionRoute[];
    monsterInfo: types.IMonsterInfo[];
    monsterData: types.IMonsterData[];
    pageHeader: object[];
    userMonsterList: types.IMonster[];
    gridPageContent: object[];
}
