export interface IAboutProps {
    changeLogs: IChangeLog[];
    ObtainChangeLog: (rootResourcePath: string) => void;
}

export interface IAboutState {
    changeLogs: IChangeLog[];
    changeLogContent: object[];
    rootResourcePath: string;
}

export interface IChangeLog {
    header: string;
    content: string;
    version: string;
}
