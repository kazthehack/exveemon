/* tslint:disable: no-console*/
/* tslint:disable: jsx-boolean-value*/

import * as React from "react";
import Scrollbar from "react-perfect-scrollbar";

import "react-perfect-scrollbar/dist/css/styles.css";

import { withRouter } from "react-router";

import { Divider, Header, Icon, Label, Segment } from "semantic-ui-react";

import "./about.styles.css";

import * as types from "./about.types";

import * as constants from "./about.constants";

export class AboutView extends React.Component<types.IAboutProps, types.IAboutState> {
    public htmlContentScrollRef: any;

    public state: types.IAboutState = {
        changeLogContent: [],
        changeLogs: [],
        rootResourcePath: ""
    };

    constructor(props: any) {
        super(props);

        // this.handleOpenBrowser = this.handleOpenBrowser.bind(this);
        // this.resizeFn = props.resizeFn;
        this.openBrwsrFn = props.openBrwsrFn;
        this.resizeFn = props.resizeFn;
        this.handleOpenRed = this.handleOpenRed.bind(this);
        this.handleOpenDiscord = this.handleOpenDiscord.bind(this);
        this.handleOpenTakat = this.handleOpenTakat.bind(this);
        this.handleOpenChort = this.handleOpenChort.bind(this);
        this.createChangeLogs = this.createChangeLogs.bind(this);

        this.state = Object.assign({}, this.state, {
            rootResourcePath: props.rootResourcePath
        });

        this.props.ObtainChangeLog(props.rootResourcePath);
    }

    public resizeFn(): any {
        // Do nothing
    }

    public openBrwsrFn(url: string): any {
        // Do nothing
    }

    public componentDidMount() {
        this.resizeFn();
    }

    public componentWillReceiveProps(nextProps: any) {
        this.setState({
            changeLogs: nextProps.changeLogs,
            rootResourcePath: nextProps.rootResourcePath !== "" ? nextProps.rootResourcePath : ""
        });
    }

    public componentDidUpdate() {
        if (this.state.changeLogs.length === 0) {
            this.props.ObtainChangeLog(this.state.rootResourcePath);
        } else if (this.state.changeLogContent.length === 0) {
            this.createChangeLogs();
        }
    }

    public handleOpenTakat() {
        this.openBrwsrFn(constants.TAKAT_PATH);
    }

    public handleOpenRed() {
        this.openBrwsrFn(constants.REDDIT_PATH);
    }

    public handleOpenChort() {
        this.openBrwsrFn(constants.CHORTOS_PATH);
    }

    public handleOpenDiscord() {
        this.openBrwsrFn(constants.DISCORD_PATH);
    }

    public createChangeLogs() {
        const tempChangeLogs = [];

        for (const changeLogItem of this.state.changeLogs) {
            tempChangeLogs.push(
                <Segment>
                    <Label as="a" ribbon={true}>
                        {changeLogItem.version}
                    </Label>
                    <span> {changeLogItem.header}</span>
                    <Divider />
                    {this.createPharagraph(changeLogItem.content)}
                </Segment>
            );
        }

        this.setState({
            changeLogContent: tempChangeLogs
        });
    }

    public createPharagraph(description: string) {
        const tempObjects = [];

        for (const tempObj of description.split("\n")) {
            tempObjects.push(<p>{tempObj}</p>);
        }
        return tempObjects;
    }

    public render() {
        return (
            <div id="homePage">
                <Header as="h3" inverted>
                    <Icon name="group" />
                    <Header.Content>Affiliations</Header.Content>
                </Header>
                <Label as="a" image onClick={this.handleOpenTakat} size="large">
                    <img src="./resources/takatomon.png" /> Takatomon
                </Label>
                <Label as="a" image onClick={this.handleOpenChort} size="large">
                    <img src="./resources/av_l.jpg" /> Chortos-2
                </Label>
                <Label as="a" image onClick={this.handleOpenRed} size="large" color="orange">
                    <Icon name="reddit" /> Reddit
                </Label>
                <Label as="a" image onClick={this.handleOpenDiscord} size="large" color="violet">
                    <Icon name="discord" /> Discord
                </Label>
                <Divider />
                <Header as="h3" inverted>
                    <Icon name="list" />
                    <Header.Content>Change Log</Header.Content>
                </Header>
                <div id="changelog">
                    <Scrollbar
                        ref={ref => {
                            this.htmlContentScrollRef = ref;
                        }}
                        className="aboutScroll"
                    >
                        {this.state.changeLogContent}
                    </Scrollbar>
                </div>
            </div>
        );
    }
}

export default withRouter(AboutView);
