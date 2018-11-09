/* tslint:disable: no-console  no-string-literal*/
/* tslint:disable: jsx-boolean-value*/
import * as React from "react";

import "react-perfect-scrollbar/dist/css/styles.css";

import { withRouter } from "react-router";

import * as resourceLoader from "../utility/resource_loader";
import * as statisticsUtility from "../utility/statistics";

const anyproxy = window.require("anyproxy");
const os = window.require("os");

import * as types from "./home.types";

import * as parserConstants from "../parser/parser.constants";

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
        hasCertificate: anyproxy.utils.certMgr.ifRootCAFileExists(),
        houseCount: 0,
        isLoading: false,
        isSaved: false,
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
        this.handleCaptureHTTPUserInfo = this.handleCaptureHTTPUserInfo.bind(this);
        this.handleCaptureHTTPSUserInfo = this.handleCaptureHTTPSUserInfo.bind(this);
        this.handleCreateHTTPSCertificate = this.handleCreateHTTPSCertificate.bind(this);

        this.obtainMonsterIcon = this.obtainMonsterIcon.bind(this);
        this.handleReadENUserInfo = this.handleReadENUserInfo.bind(this);
        this.handleReadJPUserInfo = this.handleReadJPUserInfo.bind(this);
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

            console.log(tempIpAddress);

            // Check and IPv4 is found
            if (!tempIpAddress) {
                continue;
            }

            // Ignore if address is undefined
            if (!tempIpAddress.address) {
                continue;
            }

            // Ignore local IP Addresses
            if (tempIpAddress.address === "127.0.0.1") {
                continue;
            }

            ipAddresses.push(
                <p>
                    {tempIpAddress.address}
                    :2113
                </p>
            );
        }

        if (ipAddresses.length === 0) {
            ipAddresses.push(<p>Cannot load IP Address, please check manually.</p>);
        }

        this.setState({
            networkAddresses: ipAddresses
        });
    }

    public handleCaptureHTTPUserInfo() {
        this.setState({ isLoading: true });
        this.loadResources(parserConstants.EN_RESOURCE_PATH);
        this.props.OnCaptureHTTPSUserInfo(parserConstants.EN_RESOURCE_PATH);
    }

    public handleCaptureHTTPSUserInfo() {
        this.setState({ isLoading: true });
        this.loadResources(parserConstants.JP_RESOURCE_PATH);
        this.props.OnCaptureHTTPSUserInfo(parserConstants.JP_RESOURCE_PATH);
    }

    public handleCreateHTTPSCertificate() {
        this.setState({ hasCertificate: true });
        this.props.OnCreateHTTPSCertificate();
    }

    public componentDidMount() {
        this.resizeFn();
        this.obtainNetworkAddresses();
    }

    public loadResources(localResourcePath: string) {
        this.props.OnGetMonsterData(this.state.rootResourcePath, localResourcePath);
        this.props.OnGetMonsterRoutes(this.state.rootResourcePath, localResourcePath);
        this.props.OnGetMonsterDetails(this.state.rootResourcePath, localResourcePath);
        this.props.OnGetMonsterSkills(this.state.rootResourcePath, localResourcePath);
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

    public handleReadENUserInfo() {
        this.loadResources(parserConstants.EN_RESOURCE_PATH);
        this.props.OnReadUserInfo();
    }

    public handleReadJPUserInfo() {
        this.loadResources(parserConstants.JP_RESOURCE_PATH);
        this.props.OnReadUserInfo();
    }

    public handleWriteUserInfo() {
        this.props.OnWriteUserInfo(
            this.state.userMonsterList,
            this.state.playerInfo,
            this.state.deckList
        );

        this.setState({ isSaved: true });
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
                        </Loader>
                    </Dimmer>

                    {this.state.playerInfo.userId === "" ? (
                        <Grid centered>
                            <Grid.Column textAlign="center" width={8}>
                                <Segment>
                                    <Header as="h3" image>
                                        <Header.Content>
                                            <Image
                                                src="./resources/logo_linkz_en.png"
                                                fluid
                                                size="small"
                                            />
                                        </Header.Content>
                                    </Header>
                                    <Divider />
                                    <Form>
                                        <Button
                                            fluid
                                            size="medium"
                                            onClick={this.handleCaptureHTTPUserInfo}
                                        >
                                            Capture DigimonLinks(EN)
                                        </Button>

                                        <Button
                                            size="medium"
                                            fluid
                                            onClick={this.handleReadENUserInfo}
                                        >
                                            Load User Data
                                        </Button>
                                    </Form>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column textAlign="center" width={8}>
                                <Segment>
                                    <Header as="h3" image>
                                        <Header.Content>
                                            {" "}
                                            <Image
                                                src="./resources/logo_linkz_jp.png"
                                                fluid
                                                size="small"
                                            />
                                        </Header.Content>
                                    </Header>
                                    <Divider />
                                    <Form>
                                        <Button
                                            fluid
                                            size="medium"
                                            color={this.state.hasCertificate ? "green" : undefined}
                                            onClick={this.handleCreateHTTPSCertificate}
                                        >
                                            Generate Certificate
                                        </Button>
                                        <Button
                                            fluid
                                            size="medium"
                                            onClick={this.handleCaptureHTTPSUserInfo}
                                        >
                                            Capture DigimonLinkz(JP)
                                        </Button>
                                        <Button
                                            size="medium"
                                            fluid
                                            onClick={this.handleReadJPUserInfo}
                                        >
                                            Load User Data
                                        </Button>
                                    </Form>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                    ) : (
                        <Grid centered>
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
                                        <Button
                                            fluid
                                            onClick={this.handleWriteUserInfo}
                                            color={this.state.isSaved ? "green" : undefined}
                                        >
                                            {this.state.isSaved
                                                ? "User Data Saved"
                                                : "Save User Data"}
                                        </Button>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid>
                    )}
                </Dimmer.Dimmable>
            </div>
        );
    }
}

export default withRouter(Home);
