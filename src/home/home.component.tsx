/* tslint:disable: no-console  no-string-literal*/
/* tslint:disable: jsx-boolean-value*/
import * as React from "react";

import "react-perfect-scrollbar/dist/css/styles.css";

import { withRouter } from "react-router";

import * as resourceLoader from "../utility/resource_loader";
import * as statisticsUtility from "../utility/statistics";

const os = window.require("os");

import * as types from "./home.types";

import {
    Button,
    Card,
    Dimmer,
    Divider,
    Form,
    Grid,
    Header,
    Icon,
    Image,
    Loader,
    Segment
} from "semantic-ui-react";

import "./home.styles.css";

export class Home extends React.Component<types.IHomeProps, types.IHomeState> {
    public htmlContentScrollRef: any;

    public state: types.IHomeState = {
        deckList: [],
        houseCount: 0,
        isLoading: false,
        labCount: 0,
        message: "",
        monsterData: [],
        monsterEvolutionRoutes: [],
        monsterInfo: [],
        monsterSkills: [],
        networkAddresses: [],
        playerInfo: {
            leadMonsterId: "",
            nickname: "",
            userId: ""
        },
        rootResourcePath: "",
        userMonsterList: []
    };

    constructor(props: any) {
        super(props);
        this.handleCaptureUserInfo = this.handleCaptureUserInfo.bind(this);

        this.obtainMonsterIcon = this.obtainMonsterIcon.bind(this);
        this.handleReadUserInfo = this.handleReadUserInfo.bind(this);
        this.handleWriteUserInfo = this.handleWriteUserInfo.bind(this);
        this.obtainNetworkAddresses = this.obtainNetworkAddresses.bind(this);
        // this.handleOpenBrowser.bind(this); this.resizeFn = props.resizeFn;
        // this.openBrwsrFn = props.openBrwsrFn;

        this.state = Object.assign({}, this.state, {
            rootResourcePath: props.rootResourcePath
        });
    }

    public resizeFn(): any {
        // Do nothing
    }

    public openBrwsrFn(url: string): any {
        // Do nothing
    }

    public handleOpenBrowser() {
        // this.openBrwsrFn(this.state.url + this.state.sampleurl);
    }

    public obtainNetworkAddresses() {
        const networks = os.networkInterfaces();
        const ipAddresses = [];

        console.log("Net Acquired");

        for (const ifs of Object.keys(networks)) {
            const tempIpAddress = networks[ifs].find((m: any) => m.family === "IPv4");
            
            // Ignore local IP Addresses
            if (tempIpAddress.address === "127.0.0.1")
            {
                continue;
            }

            ipAddresses.push(
                <p>
                    {tempIpAddress.address}
                    :2113
                </p>
            );
        }

        this.setState({
            networkAddresses: ipAddresses
        });
    }

    public handleCaptureUserInfo() {
        this.setState({ isLoading: true });
        this.props.OnCaptureUserInfo();
    }

    public componentDidMount() {
        this.resizeFn();
        this.obtainNetworkAddresses();
    }

    public componentWillReceiveProps(nextProps: any) {
        this.setState({
            deckList: nextProps.deckList,
            houseCount:
                nextProps.userMonsterList.length > 0
                    ? statisticsUtility.ObtainHouseCount(
                          nextProps.userMonsterList,
                          nextProps.monsterInfo,
                          nextProps.monsterData
                      )
                    : this.state.houseCount,
            labCount:
                nextProps.userMonsterList.length > 0
                    ? statisticsUtility.ObtainLabCount(
                          nextProps.userMonsterList,
                          nextProps.monsterInfo,
                          nextProps.monsterData
                      )
                    : this.state.labCount,
            message: nextProps.message,
            monsterData: nextProps.monsterData,
            monsterEvolutionRoutes: nextProps.monsterEvolutionRoutes,
            monsterInfo: nextProps.monsterInfo,
            monsterSkills: nextProps.monsterSkills,
            playerInfo: nextProps.playerInfo,
            rootResourcePath: nextProps.rootResourcePath !== "" ? nextProps.rootResourcePath : "",
            userMonsterList: nextProps.userMonsterList
        });
    }

    public componentDidUpdate() {
        if (this.state.monsterData.length === 0) {
            this.props.OnGetMonsterData(this.state.rootResourcePath);
        }

        if (this.state.monsterEvolutionRoutes.length === 0) {
            this.props.OnGetMonsterRoutes(this.state.rootResourcePath);
        }

        if (this.state.monsterInfo.length === 0) {
            this.props.OnGetMonsterDetails(this.state.rootResourcePath);
        }

        if (this.state.monsterSkills.length === 0) {
            this.props.OnGetMonsterSkills(this.state.rootResourcePath);
        }

        if (
            this.state.isLoading &&
            this.state.playerInfo.userId !== "" &&
            this.state.userMonsterList.length > 0 &&
            this.state.deckList.length > 0
        ) {
            this.setState({ isLoading: false });
        }
    }

    public obtainMonsterIcon(monsterId: string) {
        return resourceLoader.ObtainMonsterIcon(
            monsterId,
            this.state.monsterData,
            this.state.monsterInfo
        );
    }

    public handleReadUserInfo() {
        this.props.OnReadUserInfo();
    }

    public handleWriteUserInfo() {
        this.props.OnWriteUserInfo(
            this.state.userMonsterList,
            this.state.playerInfo,
            this.state.deckList
        );
    }

    public render() {
        return (
            <div id="homePage">
                <Dimmer.Dimmable dimmed={this.state.isLoading}>
                    <Dimmer inverted active={this.state.isLoading}>
                        <Loader>
                            <p>Proxy server is now running on:</p>
                            {this.state.networkAddresses}
                            {this.state.message !== "" ? (
                                <p>Received Packets from: {this.state.message}</p>
                            ) : (
                                ""
                            )}
                            {/* {this.getInterfaces()}
                            :2116) */}
                        </Loader>
                    </Dimmer>
                    <Grid centered>
                        {this.state.playerInfo.userId === "" ? (
                            <Grid.Column textAlign="center" width={6}>
                                <Segment>
                                    <Header as="h3" image>
                                        <Image src="./resources/logo.png" />
                                        <Header.Content>
                                            Get Your Account Information
                                        </Header.Content>
                                    </Header>
                                    <Divider />
                                    <Form>
                                        <Button
                                            size="medium"
                                            fluid
                                            onClick={this.handleReadUserInfo}
                                        >
                                            Load User Data
                                        </Button>

                                        <Button
                                            fluid
                                            size="medium"
                                            onClick={this.handleCaptureUserInfo}
                                        >
                                            Capture User Data
                                        </Button>
                                    </Form>
                                </Segment>
                            </Grid.Column>
                        ) : (
                            <Grid.Column width={6}>
                                <Card>
                                    <Card.Content>
                                        <Image
                                            floated="left"
                                            src={this.obtainMonsterIcon(
                                                this.state.playerInfo.leadMonsterId
                                            )}
                                            size="tiny"
                                        />
                                        <Card.Header>{this.state.playerInfo.nickname}</Card.Header>
                                        <Card.Meta>{this.state.playerInfo.userId}</Card.Meta>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Grid fluid>
                                            <Grid.Column width={8} centered textAlign="center">
                                                <a>
                                                    <Icon name="home" size="big" />
                                                    <br /> {this.state.houseCount} Monsters
                                                </a>
                                            </Grid.Column>
                                            <Grid.Column width={8} centered textAlign="center">
                                                <a>
                                                    <Icon name="lab" size="big" />
                                                    <br /> {this.state.labCount} Monsters
                                                </a>
                                            </Grid.Column>
                                        </Grid>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Button fluid onClick={this.handleWriteUserInfo}>
                                            Save User Information
                                        </Button>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        )}
                    </Grid>
                </Dimmer.Dimmable>
            </div>
        );
    }
}

export default withRouter(Home);
