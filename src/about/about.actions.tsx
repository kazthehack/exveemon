/* tslint:disable no-console no-string-literal*/

const fs = window.require("fs");

import * as constants from "./about.constants";
import * as types from "./about.types";

export function ObtainChangeLog(rootResourcePath: string): constants.IReadChangeLogSuccess {
    const resultChangeLog: types.IChangeLog[] = [];
    let tempJsonContent;

    try {
        const tempFileContent = fs.readFileSync(rootResourcePath + constants.CHANGE_LOG_PATH);
        tempJsonContent = JSON.parse(tempFileContent);
    } catch {
        console.log("Error reading files!");
    }

    for (const changeLog of tempJsonContent["changeLog"]) {
        const tempChangeLog = {
            content: changeLog["content"],
            header: changeLog["header"],
            version: changeLog["version"]
        };

        resultChangeLog.push(tempChangeLog);
    }

    return {
        payload: {
            changelogs: resultChangeLog
        },
        type: constants.ACTION_STATE.READ_CHANGE_LOG_SUCCESS
    };
}
