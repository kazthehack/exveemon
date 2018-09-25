/* tslint:disable no-console jsx-boolean-value*/

import * as React from "react";
import Scrollbar from "react-perfect-scrollbar";

import * as types from "./grid.types";

import * as resourceLoader from "../utility/resource_loader";

import { withRouter } from "react-router";

import "./grid.styles.css";

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
    Label,
    Loader,
    Modal,
    Segment,
    TextArea
} from "semantic-ui-react";

export class GridView extends React.Component<types.IGridProps, types.IGridState> {
    public htmlContentScrollRef: any;

    public state: types.IGridState = {
        deckList: [],
        gridPageContent: [],
        location: "",
        monsterData: [],
        monsterEvolutionRoutes: [],
        monsterInfo: [],
        pageHeader: [],
        userMonsterList: []
    };

    constructor(props: any) {
        super(props);
        this.createCardGroup = this.createCardGroup.bind(this);
        this.createHomeGroup = this.createHomeGroup.bind(this);
        this.createLabGroupRookie = this.createLabGroupRookie.bind(this);
        this.createLabGroupMedal = this.createLabGroupMedal.bind(this);
        this.createHeader = this.createHeader.bind(this);

        this.obtainMonsterIcon = this.obtainMonsterIcon.bind(this);
        this.resizeFn = props.resizeFn;

        this.state = Object.assign({}, this.state, {
            deckList: props.deckList,
            location: props.gridLoc,
            monsterData: props.monsterData,
            monsterEvolutionRoutes: props.monsterEvolutionRoutes,
            monsterInfo: props.monsterInfo,
            userMonsterList: props.userMonsterList
        });
    }

    public resizeFn(): any {
        // Do nothing
    }

    public createHeader(gridLocation: string) {
        let test: object[];

        test = [];

        if (gridLocation === "1") {
            test.push(
                <Header as="h3" inverted>
                    <Icon name="home" inverted />
                    <Header.Content>
                        House
                        <Header.Subheader inverted>
                            Check DNA/Rookie information in-house digimons
                        </Header.Subheader>
                        <Label as="a" basic>
                            No Filter
                        </Label>
                        <Label as="a" basic>
                            EVOL 
                        </Label>
                        <Label as="a" basic>
                            Highest 
                        </Label>
                    </Header.Content>
                </Header>
            );
        } else if (gridLocation === "2") {
            test.push(
                <Header as="h3" inverted>
                    <Icon name="lab" inverted />
                    <Header.Content>
                        Rookie Viewer
                        <Header.Subheader inverted>
                            Check Rookie information in-training digimons for faster resist training
                        </Header.Subheader>
                        <Label as="a" basic>
                            No Filter
                        </Label>
                        <Label as="a" basic>
                            NEW 
                        </Label>
                        <Label as="a" basic>
                            Highest 
                        </Label>
                    </Header.Content>
                </Header>
            );
        } else {
            test.push(
                <Header as="h3" inverted>
                    <Icon name="lab" inverted />
                    <Header.Content>
                        Baby Medal
                        <Header.Subheader inverted>
                            Check medals of your in-training digimons
                        </Header.Subheader>
                        <Label as="a" basic>
                            With Medals
                        </Label>
                        <Label as="a" basic>
                            NEW
                        </Label>
                        <Label as="a" basic>
                            Highest
                        </Label>
                    </Header.Content>
                </Header>
            );
        }

        this.setState({ pageHeader: test });
    }

    public render() {
        return (
            <div id="deckList">
                {this.state.pageHeader}
                <Divider inverted />
                <Grid centered>
                    <Grid.Column width={16} id="pageGrid"> 
                        <Scrollbar
                            ref={ref => {
                                this.htmlContentScrollRef = ref;
                            }}
                            className="htmlScroll"
                        >
                            {this.state.gridPageContent}
                        </Scrollbar>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }

    public componentDidMount() {
        // Do nothing
        this.resizeFn();
        console.log("Component Did Mount");
        this.createCardGroup(this.state.location);
        this.createHeader(this.state.location);
    }

    public componentWillReceiveProps(nextProps: any) {
        console.log("recived props");
        console.log(nextProps);
        if (!nextProps.gridLoc) {
            // Reset if gridLoc is undefined
            this.setState({ location: "" });
        } else if (this.state.location !== nextProps.gridLoc) {
            this.createCardGroup(nextProps.gridLoc);
            this.createHeader(nextProps.gridLoc);
            this.setState({ location: nextProps.location });
        }

        this.setState({
            deckList: nextProps.deckList,
            monsterData: nextProps.monsterData,
            monsterEvolutionRoutes: nextProps.monsterEvolutionRoutes,
            monsterInfo: nextProps.monsterInfo,
            userMonsterList: nextProps.userMonsterList
        });
    }

    public obtainMonsterIcon(monsterId: string) {
        return resourceLoader.ObtainMonsterIcon(monsterId, this.state.monsterData);
    }

    private createHomeGroup() {
        const houseGrid: object[] = [];

        // 7 - mega 6 - ultimate 5 - champion 4 - roookie 3 - intraining II 2 -
        // intraining I

        for (let i = 7; i >= 4; i--) {
            let tempEvolGroup = [];

            tempEvolGroup = this.state.userMonsterList.filter(
                m =>
                    resourceLoader.ObtainEvolutionInformation(
                        m.monsterId,
                        this.state.monsterInfo,
                        this.state.monsterData
                    ) === i.toString()
            );

            tempEvolGroup.sort((a: any, b: any) => {
                if (parseInt(a.monsterId, 10) > parseInt(b.monsterId, 10)) {
                    return -1;
                } else if (parseInt(a.monsterId, 10) === parseInt(b.monsterId, 10)) {
                    if (parseInt(a.createTimeSec, 10) < parseInt(b.createTimeSec, 10)) {
                        return 1;
                    } else {
                        return -1;
                    }
                } else {
                    return 1;
                }
            });

            for (const mon of tempEvolGroup) {
                houseGrid.push(
                    <Card>
                        <Image centered size="tiny" src={this.obtainMonsterIcon(mon.monsterId)} />
                        <Card.Content extra>
                            <Icon name="dna" />
                            DNA{" "}
                            {resourceLoader.ObtainDNAInformation(
                                mon.userMonsterId,
                                this.state.userMonsterList
                            )}
                        </Card.Content>
                        <Card.Content extra>
                            <Icon name="history" />{" "}
                            {resourceLoader.ObtainRookieInformation(
                                mon.userMonsterId,
                                this.state.userMonsterList,
                                this.state.monsterEvolutionRoutes,
                                this.state.monsterInfo,
                                this.state.monsterData
                            )}
                        </Card.Content>
                    </Card>
                );
            }
        }
        return houseGrid;
    }

    private createLabGroupRookie() {
        const labGrid: object[] = [];

        let tempMonList: any = [];

        for (let i = 3; i >= 2; i--) {
            let tempEvolGroup = [];

            tempEvolGroup = this.state.userMonsterList.filter(
                m =>
                    resourceLoader.ObtainEvolutionInformation(
                        m.monsterId,
                        this.state.monsterInfo,
                        this.state.monsterData
                    ) === i.toString()
            );

            for (const mon of tempEvolGroup) {
                tempMonList.push(mon);
            }
        }

        // sort the list by create time sec

        tempMonList = tempMonList.sort((a: any, b: any) => {
            if (parseInt(a.createTimeSec, 10) < parseInt(b.createTimeSec, 10)) {
                return 1;
            } else if (parseInt(a.createTimeSec, 10) === parseInt(b.createTimeSec, 10)) {
                if (parseInt(a.userMonsterId, 10) < parseInt(b.userMonsterId, 10)) {
                    return 1;
                } else {
                    return -1;
                }
            } else {
                return -1;
            }
        });

        for (const mon of tempMonList) {
            labGrid.push(
                <Card>
                    <Image centered size="tiny" src={this.obtainMonsterIcon(mon.monsterId)} />
                    <Card.Content extra>
                        <Icon name="history" />{" "}
                        {resourceLoader.ObtainRookieInformation(
                            mon.userMonsterId,
                            this.state.userMonsterList,
                            this.state.monsterEvolutionRoutes,
                            this.state.monsterInfo,
                            this.state.monsterData
                        )}
                    </Card.Content>
                </Card>
            );
        }

        return labGrid;
    }

    private createLabGroupMedal() {
        const labGrid: object[] = [];

        let tempMonList: any = [];

        for (let i = 3; i >= 2; i--) {
            let tempEvolGroup = [];

            tempEvolGroup = this.state.userMonsterList.filter(
                m =>
                    resourceLoader.ObtainEvolutionInformation(
                        m.monsterId,
                        this.state.monsterInfo,
                        this.state.monsterData
                    ) === i.toString()
            );

            tempEvolGroup = tempEvolGroup.filter(
                m =>
                    m.attackAbilityFlg !== "0" ||
                    m.spAttackAbilityFlg !== "0" ||
                    m.defenseAbilityFlg !== "0" ||
                    m.spDefenseAbilityFlg !== "0" ||
                    m.hpAbilityFlg !== "0" ||
                    m.speedAbilityFlg !== "0"
            );

            for (const mon of tempEvolGroup) {
                tempMonList.push(mon);
            }
        }

        // sort the list by create time sec

        tempMonList = tempMonList.sort((a: any, b: any) => {
            if (parseInt(a.createTimeSec, 10) < parseInt(b.createTimeSec, 10)) {
                return 1;
            } else if (parseInt(a.createTimeSec, 10) === parseInt(b.createTimeSec, 10)) {
                if (parseInt(a.userMonsterId, 10) < parseInt(b.userMonsterId, 10)) {
                    return 1;
                } else {
                    return -1;
                }
            } else {
                return -1;
            }
        });

        for (const mon of tempMonList) {
            labGrid.push(
                <Card>
                    <Image centered size="tiny" src={this.obtainMonsterIcon(mon.monsterId)} />
                    <Card.Content extra>
                        <Label.Group>{this.createMedalGrid(mon.userMonsterId)}</Label.Group>
                    </Card.Content>
                </Card>
            );
        }
        return labGrid;
    }

    private createCardGroup(gridLoc: string) {
        const cardGrid: object[] = [];

        console.log("create card group");
        console.log(gridLoc);

        let tempCardGroup: object[] = [];

        if (gridLoc === "1") {
            tempCardGroup = this.createHomeGroup();
        } else if (gridLoc === "2") {
            tempCardGroup = this.createLabGroupRookie();
        } else {
            tempCardGroup = this.createLabGroupMedal();
        }

        cardGrid.push(
            <Segment inverted color="grey" id="pageGrid">
                <Card.Group itemsPerRow={7}>{tempCardGroup}</Card.Group>
            </Segment>
        );

        this.setState({ gridPageContent: cardGrid, location: gridLoc });
    }

    private createMedalGrid(monsterId: string) {
        const medalList = resourceLoader.ObtainMonsterMedals(monsterId, this.state.userMonsterList);
        const medalGrid = [];

        if (medalList.length === 0) {
            medalGrid.push(<Label>No Medals</Label>);
        } else {
            for (const medal of medalList) {
                medalGrid.push(
                    <Label as="a" image size="mini" textAlign="center">
                        {medal.key}
                        <Label.Detail>
                            <img src={resourceLoader.ObtainMedalIcon(medal.value)} />
                        </Label.Detail>
                    </Label>
                );
            }
        }
        return medalGrid;
    }
}

export default withRouter(GridView);
