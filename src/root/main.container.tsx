/* tslint:disable: no-console*/
/* tslint:disable: interface-name jsx-boolean-value jsx-no-lambda*/

import * as React from "react";
import { withRouter } from "react-router";
import { Icon, Menu, Segment } from "semantic-ui-react";

import "./main.css";

import { ConnectedRouter } from "connected-react-router";

import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import { Divider, Grid } from "semantic-ui-react";

import { Provider } from "react-redux";

import { AboutContainer } from "../about/about.container";
import { DeckContainer } from "../deck/deck.container";
import { GridContainer } from "../grid/grid.container";
import { HomeContainer } from "../home/home.container";

import { history, RootStore } from "./main.reducer";

/*=============================
  Electron Imports
=============================*/
declare global {
    interface Window {
        require: any;
    }
}
const { remote } = window.require("electron");
const { BrowserWindow, process } = remote;

class Main extends React.Component<{
    history: any;
}> {
    private rootResourcePath: string;

    private window: any;

    constructor(props: any) {
        super(props);

        this.closeWindow = this.closeWindow.bind(this);
        this.minimiseWindow = this.minimiseWindow.bind(this);
        this.resizeWindow = this.resizeWindow.bind(this);
        this.openBrowserWindow = this.openBrowserWindow.bind(this);

        this.window = BrowserWindow.getFocusedWindow();
        this.rootResourcePath = "";

        if (process.resourcesPath.indexOf("node_modules") === -1) {
            console.log("Production build");
            console.log(process.resourcesPath);
            this.rootResourcePath = process.resourcesPath + "\\app\\";
        } else {
            console.log("Dev Build");
            // this.rootResourcePath = "dist\\win\\Exveemon-win32-ia32\\resources\\app\\";
        }

        this.window.on("resize", (e: any) => {
            this.resizeWindow();
        });
    }

    public componentDidMount() {
        // Initialize size of window
        this.resizeWindow();
    }

    public componentDidUpdate() {
        this.resizeWindow();
    }

    public resizeWindow() {
        this.resizeElement("htmlScroll", 80);
        this.resizeElement("gridScroll", 55);
        this.resizeElement("aboutScroll", 150);
    }

    public resizeElement(component: string, offset: number) {
        try {
            const scrollbar = document.getElementsByClassName(component);

            if (scrollbar != null) {
                let sb: HTMLElement;
                sb = scrollbar[0] as HTMLElement;
                sb.style.height = String(this.window.getSize()[1] * 0.85 - offset) + "px";
            }
        } catch {
            // Do nothing
        }
    }

    public openBrowserWindow(url: string) {
        try {
            remote.shell.openExternal(url);
        } catch {
            // do nothing
        }
    }

    public render() {
        return (
            <div className="main">
                <Provider store={RootStore}>
                    <ConnectedRouter history={history}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={2}>
                                    <div className="sidebar">
                                        <Grid>
                                            <Grid.Column>
                                                <Grid.Row id="logoContainer">
                                                    <img src="./resources/logo.png" id="logo" />
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Divider />
                                                </Grid.Row>

                                                <Grid.Row>
                                                    <Menu
                                                        icon="labeled"
                                                        inverted
                                                        vertical
                                                        fluid
                                                        size="mini"
                                                    >
                                                        <Link to={`/`}>
                                                            <Menu.Item as="a">
                                                                <Icon
                                                                    name="user circle"
                                                                    size="small"
                                                                />
                                                                Profile
                                                            </Menu.Item>
                                                        </Link>
                                                        <Link to={`/deck`}>
                                                            <Menu.Item as="a">
                                                                <Icon name="group" size="small" />
                                                                Party
                                                            </Menu.Item>
                                                        </Link>
                                                        <Link to={`/house`}>
                                                            <Menu.Item as="a">
                                                                <Icon name="home" size="small" />
                                                                House
                                                            </Menu.Item>
                                                        </Link>
                                                        <Link to={`/lab_rookie`}>
                                                            <Menu.Item as="a">
                                                                <Icon name="lab" size="small" />
                                                                Lab
                                                            </Menu.Item>
                                                        </Link>
                                                        <Link to={`/about`}>
                                                            <Menu.Item as="a">
                                                                <Icon
                                                                    name="newspaper outline"
                                                                    size="small"
                                                                />
                                                                Change Log
                                                            </Menu.Item>
                                                        </Link>
                                                    </Menu>
                                                </Grid.Row>
                                            </Grid.Column>
                                        </Grid>
                                    </div>
                                </Grid.Column>
                                <Grid.Column width={14}>
                                    <Grid>
                                        <Grid.Column id="pagecontent">
                                            <Grid.Row>
                                                <div className="headerbar">
                                                    <Segment inverted fixed fluid>
                                                        <Menu inverted borderless size="tiny">
                                                            <Menu.Menu position="right">
                                                                <Menu.Item
                                                                    fitted="vertically"
                                                                    onClick={this.minimiseWindow}
                                                                >
                                                                    <Icon name="window minimize outline" />
                                                                </Menu.Item>
                                                                <Menu.Item
                                                                    name="close"
                                                                    fitted="vertically"
                                                                    onClick={this.closeWindow}
                                                                >
                                                                    <Icon name="window close outline" />
                                                                </Menu.Item>
                                                            </Menu.Menu>
                                                        </Menu>
                                                    </Segment>
                                                </div>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <div className="maincontent">
                                                    <Switch>
                                                        <Route
                                                            exact
                                                            path="/"
                                                            render={props => (
                                                                <HomeContainer
                                                                    {...props}
                                                                    rootResourcePath={
                                                                        this.rootResourcePath
                                                                    }
                                                                />
                                                            )}
                                                        />
                                                        <Route
                                                            exact
                                                            path="/deck"
                                                            render={props => (
                                                                <DeckContainer
                                                                    {...props}
                                                                    resizeFn={this.resizeWindow}
                                                                    openBrwsrFn={
                                                                        this.openBrowserWindow
                                                                    }
                                                                    rootResourcePath={
                                                                        this.rootResourcePath
                                                                    }
                                                                />
                                                            )}
                                                        />
                                                        <Route
                                                            exact
                                                            path="/about"
                                                            render={props => (
                                                                <AboutContainer
                                                                    {...props}
                                                                    resizeFn={this.resizeWindow}
                                                                    openBrwsrFn={
                                                                        this.openBrowserWindow
                                                                    }
                                                                    rootResourcePath={
                                                                        this.rootResourcePath
                                                                    }
                                                                />
                                                            )}
                                                        />
                                                        <Route
                                                            exact
                                                            path="/house"
                                                            render={props => (
                                                                <GridContainer
                                                                    {...props}
                                                                    gridLoc={"1"}
                                                                    resizeFn={this.resizeWindow}
                                                                    openBrwsrFn={
                                                                        this.openBrowserWindow
                                                                    }
                                                                    rootResourcePath={
                                                                        this.rootResourcePath
                                                                    }
                                                                />
                                                            )}
                                                        />
                                                        <Route
                                                            exact
                                                            path="/lab_rookie"
                                                            render={props => (
                                                                <GridContainer
                                                                    {...props}
                                                                    gridLoc={"2"}
                                                                    resizeFn={this.resizeWindow}
                                                                    openBrwsrFn={
                                                                        this.openBrowserWindow
                                                                    }
                                                                    rootResourcePath={
                                                                        this.rootResourcePath
                                                                    }
                                                                />
                                                            )}
                                                        />
                                                    
                                                    </Switch>
                                                </div>
                                            </Grid.Row>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </ConnectedRouter>
                </Provider>
            </div>
        );
    }

    private closeWindow = (): void => {
        // const window = BrowserWindow.getFocusedWindow();
        this.window.close();
    };

    private minimiseWindow = (): void => {
        // const window = BrowserWindow.getFocusedWindow();
        this.window.minimize();
    };
}

export default withRouter(Main);
