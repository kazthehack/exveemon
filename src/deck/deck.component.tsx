/* tslint:disable no-console jsx-boolean-value*/

import * as React from "react";
import Scrollbar from "react-perfect-scrollbar";

import * as types from "./deck.types";

import * as resourceLoader from "../utility/resource_loader";

import { withRouter } from "react-router";

import "./deck.styles.css";

import { Card, Divider, Grid, Header, Icon, Image, Label, Segment } from "semantic-ui-react";

export class DeckView extends React.Component<types.IDeckProps, types.IDeckState> {
    public htmlContentScrollRef: any;

    public state: types.IDeckState = {
        deckList: [],
        deckPageContent: [],
        monsterData: [],
        monsterEvolutionRoutes: [],
        monsterInfo: [],
        rootResourcePath: "",
        userMonsterList: []
    };

    constructor(props: any) {
        super(props);
        this.createCardGroup = this.createCardGroup.bind(this);
        this.obtaineMonsterIdFromUserMonId = this.obtaineMonsterIdFromUserMonId.bind(this);
        this.resizeFn = props.resizeFn;

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

    public render() {
        return (
            <div id="deckList">
                <Header as="h3" inverted>
                    <Icon name="group" inverted />
                    <Header.Content>
                        Party Viewer
                        <Header.Subheader inverted>
                            Check details of your team members
                        </Header.Subheader>
                    </Header.Content>
                </Header>
                <Divider />
                <Grid centered>
                    <Grid.Column width={12} id="pageGrid">
                        <Scrollbar
                            ref={ref => {
                                this.htmlContentScrollRef = ref;
                            }}
                            className="gridScroll"
                        >
                            {this.state.deckPageContent}
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

    public componentWillReceiveProps(nextProps: types.IDeckProps) {
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

    public obtaineMonsterIdFromUserMonId(monsterId: string) {
        return resourceLoader.ObtainMonsterIdFromUserMonsterId(
            monsterId,
            this.state.userMonsterList
        );
    }

    private createCardGroup() {
        const cardGrid: object[] = [];

        let teamCnt = 1;

        for (const deck of this.state.deckList) {
            const tempCardGroup: object[] = [];
            for (const monCard of deck.monsterList) {
                tempCardGroup.push(
                    <Card>
                        <Image
                            centered
                            size="tiny"
                            src={this.obtainMonsterIcon(
                                this.obtaineMonsterIdFromUserMonId(monCard.userMonsterId)
                            )}
                        />
                        <Card.Content extra>
                            <Icon name="dna" />
                            DNA{" "}
                            {resourceLoader.ObtainDNAInformation(
                                resourceLoader.ObtainMonsterIdFromUserMonsterId(
                                    monCard.userMonsterId,
                                    this.state.userMonsterList
                                ),
                                this.state.userMonsterList
                            )}
                        </Card.Content>
                        <Card.Content extra>
                            <Icon name="history" />{" "}
                            {resourceLoader.ObtainRookieInformation(
                                resourceLoader.ObtainMonsterIdFromUserMonsterId(
                                    monCard.userMonsterId,
                                    this.state.userMonsterList
                                ),
                                this.state.userMonsterList,
                                this.state.monsterEvolutionRoutes,
                                this.state.monsterInfo,
                                this.state.monsterData
                            )}
                        </Card.Content>
                        <Card.Content extra>
                            {" "}
                            <Label.Group>{this.createMedalGrid(monCard.userMonsterId)}</Label.Group>
                        </Card.Content>
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

        this.setState({ deckPageContent: cardGrid });
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
