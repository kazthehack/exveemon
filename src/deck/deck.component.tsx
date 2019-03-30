/* tslint:disable no-console jsx-boolean-value jsx-no-lambda*/

import * as React from "react";
import Scrollbar from "react-perfect-scrollbar";

import * as types from "./deck.types";

import * as resourceLoader from "../utility/resource_loader";

import { withRouter } from "react-router";

import "./deck.styles.css";

import { HeaderContainer } from "../header/header.container";
import * as headerTypes from "../header/header.types";

import { Card, Divider, Grid, Icon, Image, Label, Segment } from "semantic-ui-react";

export class DeckView extends React.Component<types.IDeckProps, types.IDeckState> {
    public htmlContentScrollRef: any;

    public state: types.IDeckState = {
        config: {
            filter: headerTypes.FILTER.NO_FILTER,
            isMedalView: false,
            isRookieView: false,
            isShowDNA: false,
            isShowEvolution: false,
            isShowLS: false,
            isShowLegacy: false,
            isShowLink: false,
            sort: headerTypes.SORT.NEW
        },
        deckList: [],
        deckPageContent: [],
        isDirty: false,
        monsterData: [],
        monsterEvolutionRoutes: [],
        monsterInfo: [],
        monsterSkills: [],
        rootResourcePath: "",
        userMonsterList: []
    };

    constructor(props: any) {
        super(props);
        this.createCardGroup = this.createCardGroup.bind(this);
        this.obtaineMonsterIdFromUserMonId = this.obtaineMonsterIdFromUserMonId.bind(this);
        this.obtainDNAInfo = this.obtainDNAInfo.bind(this);
        this.obtainRookieInfo = this.obtainRookieInfo.bind(this);
        this.obtainMonsterName = this.obtainMonsterName.bind(this);
        this.resizeFn = props.resizeFn;
        this.openBrwsrFn = props.openBrwsrFn;

        this.createLinkButton = this.createLinkButton.bind(this);

        this.obtainMonsterSkillName = this.obtainMonsterSkillName.bind(this);
        this.obtainMonsterLeaderSkill = this.obtainMonsterLeaderSkill.bind(this);
        this.obtainMonsterLegacySkill = this.obtainMonsterLegacySkill.bind(this);
        this.obtainDetailsLink = this.obtainDetailsLink.bind(this);
        this.obtainEvolutionLink = this.obtainEvolutionLink.bind(this);

        this.state = Object.assign({}, this.state, {
            deckList: props.deckList,
            monsterData: props.monsterData,
            monsterEvolutionRoutes: props.monsterEvolutionRoutes,
            monsterInfo: props.monsterInfo,
            rootResourcePath: props.rootResourcePath,
            userMonsterList: props.userMonsterList
        });
    }

    public resizeFn(): any {
        // Do nothing
    }

    public openBrwsrFn(url: string): any {
        // Do nothing
    }

    public render() {
        return (
            <div id="deckList">
                <HeaderContainer {...this.props} isDeck={true} />
                <Divider />
                <Grid centered>
                    <Grid.Column width={14}>
                        <Scrollbar
                            ref={ref => {
                                this.htmlContentScrollRef = ref;
                            }}
                            className="gridScroll"
                        >
                            <div id="pageGrid"> 
                                {this.state.deckPageContent}
                            </div>
                        </Scrollbar>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }

    public componentDidMount() {
        this.createCardGroup();
        this.resizeFn();
    }

    public componentDidUpdate() {
        if (this.state.isDirty) {
            this.createCardGroup();
        }
    }

    public componentWillReceiveProps(nextProps: types.IDeckProps) {
        let isForUpdate = false;

        if (this.state.config !== nextProps.config) {
            isForUpdate = true;
        }

        this.setState({
            config: nextProps.config,
            deckList: nextProps.deckList,
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

    public obtaineMonsterIdFromUserMonId(monsterId: string) {
        return resourceLoader.ObtainMonsterIdFromUserMonsterId(
            monsterId,
            this.state.userMonsterList
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
    public obtainMonsterName(monsterId: string) {
        return resourceLoader.ObtainMonsterName(
            monsterId,
            this.state.monsterData,
            this.state.monsterInfo
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
        return resourceLoader.ObtainChortosLink(
            monsterId,
            this.state.monsterData,
            this.state.monsterInfo
        );
    }

    public obtainEvolutionLink(monsterId: string) {
        return resourceLoader.ObtainTakatomonLink(
            monsterId,
            this.state.monsterData,
            this.state.monsterInfo
        );
    }

    public createLinkButton(urlFunc: any, imgUrl: string, labelString: string, identifier: string) {
        const tempUrl = urlFunc(identifier);

        if (tempUrl !== "") {
            return (
                <Card.Content extra>
                    <Label
                        as="a"
                        image
                        onClick={() => {
                            this.openBrwsrFn(tempUrl);
                        }}
                        size="medium"
                    >
                        <img src={imgUrl} /> {labelString}
                    </Label>
                </Card.Content>
            );
        } else {
            return (
                <Card.Content extra>
                    <Label as="a" image size="medium">
                        <img src={imgUrl} /> N/A
                    </Label>
                </Card.Content>
            );
        }
    }

    private createCardGroup() {
        const cardGrid: object[] = [];

        let teamCnt = 1;

        for (const deck of this.state.deckList) {
            const tempCardGroup: object[] = [];
            for (const monCard of deck.monsterList) {
                tempCardGroup.push(
                    <Card id="cardContent">
                        <Image
                            centered
                            size="tiny"
                            src={this.obtainMonsterIcon(
                                this.obtaineMonsterIdFromUserMonId(monCard.userMonsterId)
                            )}
                        />
                        <Card.Content extra>
                            {this.obtainMonsterName(
                                this.obtaineMonsterIdFromUserMonId(monCard.userMonsterId)
                            )}
                        </Card.Content>
                        {this.state.config.isShowDNA ? (
                            <Card.Content extra>
                                <Icon name="dna" />
                                DNA {this.obtainDNAInfo(monCard.userMonsterId)}
                            </Card.Content>
                        ) : (
                            ""
                        )}
                        {this.state.config.isRookieView ? (
                            <Card.Content extra>
                                <Icon name="history" />{" "}
                                {this.obtainRookieInfo(monCard.userMonsterId)}
                            </Card.Content>
                        ) : (
                            ""
                        )}
                        {this.state.config.isShowLS ? (
                            <Card.Content extra>
                                Leader:{" "}
                                {this.obtainMonsterSkillName(
                                    this.obtainMonsterLeaderSkill(monCard.userMonsterId)
                                )}
                            </Card.Content>
                        ) : (
                            ""
                        )}
                        {this.state.config.isShowLegacy ? (
                            <Card.Content extra>
                                Legacy:{" "}
                                {this.obtainMonsterSkillName(
                                    this.obtainMonsterLegacySkill(monCard.userMonsterId)
                                )}
                            </Card.Content>
                        ) : (
                            ""
                        )}
                        {this.state.config.isMedalView ? (
                            <Card.Content extra>
                                <Label.Group>
                                    {this.createMedalGrid(monCard.userMonsterId)}
                                </Label.Group>
                            </Card.Content>
                        ) : (
                            ""
                        )}
                        {this.state.config.isShowEvolution
                            ? this.createLinkButton(
                                  this.obtainEvolutionLink,
                                  "./resources/takatomon.png",
                                  "Takatomon",
                                  this.obtaineMonsterIdFromUserMonId(monCard.userMonsterId)
                              )
                            : ""}
                        {this.state.config.isShowLink
                            ? this.createLinkButton(
                                  this.obtainDetailsLink,
                                  "./resources/av_l.jpg",
                                  "Chortos-2",
                                  this.obtaineMonsterIdFromUserMonId(monCard.userMonsterId)
                              )
                            : ""}
                    </Card>
                );
            }
            cardGrid.push(
                <Segment inverted color="grey">
                    <Label as="a" ribbon={true} color="red">
                        Party {teamCnt}
                    </Label>
                    <Card.Group itemsPerRow={3}>{tempCardGroup}</Card.Group>
                </Segment>
            );
            teamCnt += 1;
        }

        this.setState({ deckPageContent: cardGrid, isDirty: false });
    }

    private createMedalGrid(monsterId: string) {
        const medalList = resourceLoader.ObtainMonsterMedals(monsterId, this.state.userMonsterList);
        const medalGrid = [];

        if (medalList.length === 0) {
            medalGrid.push(<Label>No Medals</Label>);
        } else {
            for (const medal of medalList) {
                medalGrid.push(
                    <Label as="a" image size="mini">
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

export default withRouter(DeckView);
