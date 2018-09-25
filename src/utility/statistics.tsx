import * as types from "../common/data.types";

export function ObtainMonsterCount(
    location: string,
    userMonsterList: types.IMonster[]
) {
    const tempMonsterGroup = userMonsterList.filter(
        u => u.statusFlgs === location
    );

    if (tempMonsterGroup) {
        const tempArrayStore = [];

        for (const tempMonster of tempMonsterGroup) {
            tempArrayStore.push(tempMonster);
        }
        return tempMonsterGroup.length;
    } else {
        return 0;
    }
}
