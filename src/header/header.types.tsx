export enum FILTER {
    WITH_MEDALS,
    WITH_LEADER,
    NO_FILTER
}

export enum SORT {
    NEW,
    LVL,
    EVOL,
    AWKN
}

export const FilterOptions = [
    {
        key: FILTER.NO_FILTER,
        text: "No Filter",
        value: FILTER.NO_FILTER
    },
    {
        key: FILTER.WITH_MEDALS,
        text: "With Medals",
        value: FILTER.WITH_MEDALS
    },
    {
        key: FILTER.WITH_LEADER,
        text: "With Leader",
        value: FILTER.WITH_LEADER
    }
];

export const SortOptions = [
    {
        key: SORT.LVL,
        text: "LVL",
        value: SORT.LVL
    },
    {
        key: SORT.NEW,
        text: "NEW",
        value: SORT.NEW
    },
    {
        key: SORT.EVOL,
        text: "EVOL",
        value: SORT.EVOL
    }
];

export interface IHeaderProps {
    filter: FILTER;
    sort: SORT;
    isMedalView: boolean;
    isRookieView: boolean;
    isShowLegacy: boolean;
    isShowLS: boolean;
    isShowEvolution: boolean;
    isShowLink: boolean;
    isDeck: boolean; 
    headerTitle: string;
    headerIcon: string;
    headerDescription: string;
}

export interface IHeaderState {
    filter: FILTER;
    sort: SORT;
    isDeck: boolean; 
    isMedalView: boolean;
    isRookieView: boolean;
    isShowLegacy: boolean;
    isShowLS: boolean;
    isShowEvolution: boolean;
    isShowLink: boolean;
    headerTitle: string;
    headerIcon: string;
    headerDescription: string;
    SetFilters: () => void;
}
