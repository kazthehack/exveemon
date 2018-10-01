/* tslint:disable no-console jsx-boolean-value*/

import * as React from "react";

import * as types from "./header.types";

import { withRouter } from "react-router";

import { Button, Dropdown, Grid, Header, Icon, Image, Label, Segment } from "semantic-ui-react";

export class HeaderView extends React.Component<types.IHeaderProps, types.IHeaderState> {
    public state: types.IHeaderState = {
        filter: types.FILTER.NO_FILTER,
        headerDescription: "",
        headerIcon: "",
        headerTitle: "",
        isDeck: false,
        isMedalView: false,
        isRookieView: false,
        isShowEvolution: false,
        isShowLS: false,
        isShowLegacy: false,
        isShowLink: false,
        sort: types.SORT.NEW
    };

    constructor(props: any) {
        super(props);

        this.handleRookie = this.handleRookie.bind(this);
        this.handleMedal = this.handleMedal.bind(this);
        this.handleLegacy = this.handleLegacy.bind(this);
        this.handleLeader = this.handleLeader.bind(this);
        this.handleEvolution = this.handleEvolution.bind(this);
        this.handleDetails = this.handleDetails.bind(this);
        this.showFilters = this.showFilters.bind(this);
    }

    public handleRookie() {
        this.setState({ isRookieView: true });
    }

    public handleMedal() {
        this.setState({ isMedalView: true });
    }

    public handleLegacy() {
        this.setState({ isShowLegacy: true });
    }

    public handleLeader() {
        this.setState({ isShowLS: true });
    }

    public handleEvolution() {
        this.setState({ isShowEvolution: true });
    }

    public handleDetails() {
        this.setState({ isShowLink: true });
    }

    public showFilters() {
        const filterObject = [];

        filterObject.push(
            <Dropdown placeholder="Filter" search compact selection options={types.FilterOptions} />
        );
        filterObject.push(" ");
        filterObject.push(
            <Dropdown placeholder="Sort" search compact selection options={types.SortOptions} />
        );
        filterObject.push(" ");
        return filterObject;
    }

    public render() {
        return (
            <div>
                <Grid centered>
                    <Grid.Column>
                        {this.state.isDeck ? "" : this.showFilters()}
                        <Button toggle active={this.state.isRookieView} onClick={this.handleRookie}>
                            Rookie
                        </Button>{" "}
                        <Button toggle active={this.state.isMedalView} onClick={this.handleMedal}>
                            Medal
                        </Button>{" "}
                        <Button toggle active={this.state.isShowLegacy} onClick={this.handleLegacy}>
                            Legacy
                        </Button>{" "}
                        <Button toggle active={this.state.isShowLS} onClick={this.handleLeader}>
                            Leader
                        </Button>{" "}
                        <Button
                            toggle
                            active={this.state.isShowEvolution}
                            onClick={this.handleEvolution}
                        >
                            Evolution
                        </Button>{" "}
                        <Button toggle active={this.state.isShowLink} onClick={this.handleDetails}>
                            Details
                        </Button>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default withRouter(HeaderView);
