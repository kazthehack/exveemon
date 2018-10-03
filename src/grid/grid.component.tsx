/* tslint:disable no-console jsx-boolean-value jsx-no-lambda*/

import * as React from "react";
import Scrollbar from "react-perfect-scrollbar";

import * as types from "./grid.types";

import * as resourceLoader from "../utility/resource_loader";

import { withRouter } from "react-router";

import { HeaderContainer } from "../header/header.container";
import * as headerTypes from "../header/header.types";

import * as data from "../common/data.types";

import "./grid.styles.css";

import { Card, Divider, Grid, Header, Icon, Image, Label, Segment } from "semantic-ui-react";

export class GridView extends React.Component<types.IGridProps, types.IGridState> {
    public htmlContentScrollRef: any;

    public state: types.IGridState = {
        config: {
            filter: headerTypes.FILTER.NO_FILTER,
            isMedalView: false,
            isRookieView: false,
            isShowDNA: false,
            isShowEvolution: false,
            isShowLS: false,
            isShowLegacy: false,
            isShowLink: false,
            sort: headerTypes.SORT.EVOL
        },
        filteredMonsterList: [],
        gridPageContent: [],
        isDirty: false,
        location: "",
        monsterData: [],
        monsterEvolutionRoutes: [],
        monsterInfo: [],
        monsterSkills: [],
        userMonsterList: []
    };

    constructor(props: any) {
        super(props);
        this.createCardGroup = this.createCardGroup.bind(this);
        // this.createHomeGroup = this.createHomeGroup.bind(this);
        // this.createLabGroupRookie = this.createLabGroupRookie.bind(this);
        // this.createLabGroupMedal = this.createLabGroupMedal.bind(this);
        // this.createHeader = this.createHeader.bind(this);

        this.obtainMonsterIcon = this.obtainMonsterIcon.bind(this);
        this.obtainMonsterName = this.obtainMonsterName.bind(this);
        this.obtainDNAInfo = this.obtainDNAInfo.bind(this);
        this.obtainRookieInfo = this.obtainRookieInfo.bind(this);

        this.obtainMonsterSkillName = this.obtainMonsterSkillName.bind(this);
        this.obtainMonsterLeaderSkill = this.obtainMonsterLeaderSkill.bind(this);
        this.obtainMonsterLegacySkill = this.obtainMonsterLegacySkill.bind(this);
        this.obtainDetailsLink = this.obtainDetailsLink.bind(this);
        this.obtainEvolutionLink = this.obtainEvolutionLink.bind(this);

        this.ATOI = this.ATOI.bind(this);
        this.obtainEvolutionId = this.obtainEvolutionId.bind(this);

        this.resizeFn = props.resizeFn;
        this.openBrwsrFn = props.openBrwsrFn;

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

    public openBrwsrFn(url: string) {
        // Do nothing
    }

    public render() {
        return (
            <div id="deckList">
                <HeaderContainer {...this.props} />
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

    public componentDidUpdate()
    {
        if(this.state.isDirty)
        {
            this.createCardGroup(this.state.location);
        }
    }

    public componentDidMount() {
        // Do nothing
        this.resizeFn();
        console.log("Component Did Mount");
        this.createCardGroup(this.state.location);
        // this.createHeader(this.state.location);
    }

    public componentWillReceiveProps(nextProps: any) {
        console.log("recived props");
        console.log(nextProps);
        if (!nextProps.gridLoc) {
            // Reset if gridLoc is undefined
            this.setState({ location: "" });
        } else if (this.state.location !== nextProps.gridLoc) {
            this.createCardGroup(nextProps.gridLoc);
            //  this.createHeader(nextProps.gridLoc);
            this.setState({ location: nextProps.location });
        }
	
        let isForUpdate = false;

        if (this.state.config !== nextProps.config) {
            isForUpdate = true;
        }
        this.setState({
            config: nextProps.config,
            isDirty: isForUpdate,
            monsterData: nextProps.monsterData,
            monsterEvolutionRoutes: nextProps.monsterEvolutionRoutes,
            monsterInfo: nextProps.monsterInfo,
            monsterSkills: nextProps.monsterSkills,
            userMonsterList: nextProps.userMonsterList
        });
    }

    public obtainMonsterIcon(monsterId: string) {
        return resourceLoader.ObtainMonsterIcon(
            monsterId,
            this.state.monsterData,
            this.state.monsterInfo
        );
    }

    public obtainMonsterName(monsterId: string) {
        return resourceLoader.ObtainMonsterName(
            monsterId,
            this.state.monsterData,
            this.state.monsterInfo
        );
    }

    public obtainDNAInfo(userMonsterId: string) {
        return resourceLoader.ObtainDNAInformation(userMonsterId, this.state.userMonsterList);
    }

    public obtainRookieInfo(userMonsterId: string) {
        return resourceLoader.ObtainRookieInformation(
            userMonsterId,
            this.state.userMonsterList,
            this.state.monsterEvolutionRoutes,
            this.state.monsterInfo,
            this.state.monsterData
        );
    }

    public obtainMonsterSkillName(monsterSkillId: string) {
        return resourceLoader.ObtainSkillName(monsterSkillId, this.state.monsterSkills);
    }

    public obtainMonsterLeaderSkill(userMonsterId: string) {
        return resourceLoader.ObtainLeaderSkill(userMonsterId, this.state.userMonsterList);
    }

    public obtainMonsterLegacySkill(userMonsterId: string) {
        return resourceLoader.ObtainLegacySkill(userMonsterId, this.state.userMonsterList);
    }

    public obtainDetailsLink(monsterId: string) {
        return resourceLoader.ObtainChortosLink(monsterId, this.state.monsterData);
    }

    public obtainEvolutionLink(monsterId: string) {
        return resourceLoader.ObtainTakatomonLink(monsterId, this.state.monsterData);
    }

    private applyHouseFilter(monsterList: data.IMonster[]): data.IMonster[] {
        const tempMonsterList: data.IMonster[] = [];

        for (let i = 9; i >= 4; i--) {
            let tempGroup = [];

            tempGroup = monsterList.filter(
                m =>
                    resourceLoader.ObtainEvolutionInformation(
                        m.monsterId,
                        this.state.monsterInfo,
                        this.state.monsterData
                    ) === i.toString()
            );

            for (const monster of tempGroup) {
                tempMonsterList.push(monster);
            }
        }

        return tempMonsterList;
    }

    private applyLabFilter(monsterList: data.IMonster[]): data.IMonster[] {
        const tempMonsterList: data.IMonster[] = [];

        for (let i = 3; i >= 2; i--) {
            let tempGroup = [];

            tempGroup = monsterList.filter(
                m =>
                    resourceLoader.ObtainEvolutionInformation(
                        m.monsterId,
                        this.state.monsterInfo,
                        this.state.monsterData
                    ) === i.toString()
            );

            for (const monster of tempGroup) {
                tempMonsterList.push(monster);
            }
        }

        return tempMonsterList;
    }

    private applyMedalFilter(monsterList: data.IMonster[]): data.IMonster[] {
        let tempMonsterList: data.IMonster[] = [];

        tempMonsterList = monsterList.filter(
            m =>
                m.attackAbilityFlg !== "0" ||
                m.spAttackAbilityFlg !== "0" ||
                m.defenseAbilityFlg !== "0" ||
                m.spDefenseAbilityFlg !== "0" ||
                m.hpAbilityFlg !== "0" ||
                m.speedAbilityFlg !== "0"
        );

        return tempMonsterList;
    }

    private applyLeaderFilter(monsterList: data.IMonster[]): data.IMonster[] {
        let tempMonsterList: data.IMonster[] = [];

        tempMonsterList = monsterList.filter(m => m.leaderSkillId !== "0");

        return tempMonsterList;
    }

    private ATOI(value: string) {
        return parseInt(value, 10);
    }

    private obtainEvolutionId(monsterId: string) {
        return resourceLoader.ObtainEvolutionInformation(
            monsterId,
            this.state.monsterInfo,
            this.state.monsterData
        );
    }

    private applyEvolSort(monsterList: data.IMonster[]): data.IMonster[] {
        let tempMonsterList: data.IMonster[] = [];

        tempMonsterList = monsterList;
        tempMonsterList.sort((a: data.IMonster, b: data.IMonster) => {
            if (
                this.ATOI(this.obtainEvolutionId(a.monsterId)) >
                this.ATOI(this.obtainEvolutionId(b.monsterId))
            ) {
                return -1;
            } else if (
                this.ATOI(this.obtainEvolutionId(a.monsterId)) ===
                this.ATOI(this.obtainEvolutionId(b.monsterId))
            ) {
                if (this.ATOI(a.monsterId) > this.ATOI(b.monsterId)) {
                    return -1;
                } else if (this.ATOI(a.monsterId) === this.ATOI(b.monsterId)) {
                    if (this.ATOI(a.createTimeSec) < this.ATOI(b.createTimeSec)) {
                        return 1;
                    } else if (this.ATOI(a.createTimeSec) === this.ATOI(b.createTimeSec)) {
                        if (this.ATOI(a.userMonsterId) < this.ATOI(b.userMonsterId)) {
                            return 1;
                        } else {
                            return -1;
                        }
                    } else {
                        return -1;
                    }
                } else {
                    return 1;
                }
            } else {
                return 1;
            }
        });

        return tempMonsterList;
    }

    private applyNewSort(monsterList: data.IMonster[]): data.IMonster[] {
        let tempMonsterList: data.IMonster[] = [];

        tempMonsterList = monsterList;

        tempMonsterList.sort((a: any, b: any) => {
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

        return tempMonsterList;
    }

    private createCardGroup(gridLoc: string) {
        const cardGrid: object[] = [];

        console.log("create card group");
        console.log(gridLoc);

        const tempCardGroup: object[] = [];

        let tempMonsterList: data.IMonster[] = [];

        // Apply initial filters
        if (gridLoc === "1") {
            tempMonsterList = this.applyHouseFilter(this.state.userMonsterList);
        } else {
            tempMonsterList = this.applyLabFilter(this.state.userMonsterList);
        }

        // Apply config filter

        if (this.state.config.filter === headerTypes.FILTER.WITH_LEADER) {
            tempMonsterList = this.applyLeaderFilter(tempMonsterList);
        } else if (this.state.config.filter === headerTypes.FILTER.WITH_MEDALS) {
            tempMonsterList = this.applyMedalFilter(tempMonsterList);
        }

        // Apply Sort

        if (this.state.config.sort === headerTypes.SORT.NEW) {
            tempMonsterList = this.applyNewSort(tempMonsterList);
        } else if (this.state.config.sort === headerTypes.SORT.EVOL) {
            tempMonsterList = this.applyEvolSort(tempMonsterList);
        }

        // Create the cards

        for (const monster of tempMonsterList) {
            tempCardGroup.push(
                <Card id="cardContent">
                    <Image centered size="tiny" src={this.obtainMonsterIcon(monster.monsterId)} />
                    <Card.Content extra>{this.obtainMonsterName(monster.monsterId)}</Card.Content>
                    {this.state.config.isShowDNA ? (
                        <Card.Content extra>
                            <Icon name="dna" />
                            DNA {this.obtainDNAInfo(monster.userMonsterId)}
                        </Card.Content>
                    ) : (
                        ""
                    )}
                    {this.state.config.isRookieView ? (
                        <Card.Content extra>
                            <Icon name="history" /> {this.obtainRookieInfo(monster.userMonsterId)}
                        </Card.Content>
                    ) : (
                        ""
                    )}
                    {this.state.config.isShowLS ? (
                        <Card.Content extra>
                            Leader:{" "}
                            {this.obtainMonsterSkillName(
                                this.obtainMonsterLeaderSkill(monster.userMonsterId)
                            )}
                        </Card.Content>
                    ) : (
                        ""
                    )}
                    {this.state.config.isShowLegacy ? (
                        <Card.Content extra>
                            Legacy:{" "}
                            {this.obtainMonsterSkillName(
                                this.obtainMonsterLegacySkill(monster.userMonsterId)
                            )}
                        </Card.Content>
                    ) : (
                        ""
                    )}
                    {this.state.config.isMedalView ? (
                        <Card.Content extra>
                            <Label.Group>{this.createMedalGrid(monster.userMonsterId)}</Label.Group>
                        </Card.Content>
                    ) : (
                        ""
                    )}
                    {this.state.config.isShowEvolution ? (
                        <Card.Content extra>
                            <Label
                                as="a"
                                image
                                onClick={() => {
                                    this.openBrwsrFn(this.obtainEvolutionLink(monster.monsterId));
                                }}
                                size="mini"
                            >
                                <img src="./resources/takatomon.png" /> Takatomon
                            </Label>
                        </Card.Content>
                    ) : (
                        ""
                    )}
                    {this.state.config.isShowLink ? (
                        <Card.Content extra>
                            <Label
                                as="a"
                                image
                                onClick={() => {
                                    this.openBrwsrFn(this.obtainDetailsLink(monster.monsterId));
                                }}
                                size="mini"
                            >
                                <img src="./resources/av_l.jpg" /> Chortos-2
                            </Label>
                        </Card.Content>
                    ) : (
                        ""
                    )}
                </Card>
            );
        }

        cardGrid.push(
            <Segment inverted color="grey" id="pageGrid">
                <Card.Group itemsPerRow={7}>{tempCardGroup}</Card.Group>
            </Segment>
        );

        this.setState({ gridPageContent: cardGrid, location: gridLoc, isDirty: false });
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
