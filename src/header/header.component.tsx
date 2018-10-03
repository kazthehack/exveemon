/* tslint:disable no-console jsx-boolean-value no-string-literal*/

import * as React from "react";

import * as types from "./header.types";

import { withRouter } from "react-router";

import { Button, Dropdown } from "semantic-ui-react";

import "./header.styles.css";

export class HeaderView extends React.Component<types.IHeaderProps, types.IHeaderState> {
    public state: types.IHeaderState = {
        config: {
            filter: types.FILTER.NO_FILTER,
            isMedalView: false,
            isRookieView: false,
            isShowDNA: false,
            isShowEvolution: false,
            isShowLS: false,
            isShowLegacy: false,
            isShowLink: false,
            sort: types.SORT.EVOL
        },
        headerDescription: "",
        headerIcon: "",
        headerTitle: "",
        isDeck: false,
        isDirty: false
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
        this.handleSortChange = this.handleSortChange.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleDNA = this.handleDNA.bind(this);

        if (props.isDeck) {
            this.state = Object.assign({}, this.state, { isDeck: props.isDeck });
        }
    }

    public handleRookie() {
        this.setState({
            config: Object.assign({}, this.state.config, {
                isRookieView: !this.state.config.isRookieView
            }),
            isDirty: true
        });
    }

    public handleMedal() {
        this.setState({
            config: Object.assign({}, this.state.config, {
                isMedalView: !this.state.config.isMedalView
            }),
            isDirty: true
        });
    }

    public handleLegacy() {
        this.setState({
            config: Object.assign({}, this.state.config, {
                isShowLegacy: !this.state.config.isShowLegacy
            }),
            isDirty: true
        });
    }

    public handleLeader() {
        this.setState({
            config: Object.assign({}, this.state.config, { isShowLS: !this.state.config.isShowLS }),
            isDirty: true
        });
    }

    public handleDNA() {
        this.setState({
            config: Object.assign({}, this.state.config, {
                isShowDNA: !this.state.config.isShowDNA
            }),
            isDirty: true
        });
    }

    public handleEvolution() {
        this.setState({
            config: Object.assign({}, this.state.config, {
                isShowEvolution: !this.state.config.isShowEvolution
            }),
            isDirty: true
        });
    }

    public handleDetails() {
        this.setState({
            config: Object.assign({}, this.state.config, {
                isShowLink: !this.state.config.isShowLink
            }),
            isDirty: true
        });
    }

    public componentWillReceiveProps(nextProps: any) {
        this.setState({ config: nextProps.config, isDirty: false });
    }

    public handleFilterChange(event: any, data: object) {
        if (data["value"] === types.FILTER.WITH_MEDALS) {
            this.setState({
                config: Object.assign({}, this.state.config, {
                    filter: data["value"],
                    isMedalView: true
                }),
                isDirty: true
            });
        } else if (data["value"] === types.FILTER.WITH_LEADER) {
            this.setState({
                config: Object.assign({}, this.state.config, {
                    filter: data["value"],
                    isShowLS: true
                }),
                isDirty: true
            });
        } else {
            this.setState({
                config: Object.assign({}, this.state.config, {
                    filter: data["value"]
                }),
                isDirty: true
            });
        }
    }

    public handleSortChange(event: any, data: object) {
        this.setState({
            config: Object.assign({}, this.state.config, {
                sort: data["value"]
            }),
            isDirty: true
        });
    }

    public componentDidUpdate() {
        if (this.state.isDirty) {
            this.props.UpdateConfig(this.state.config);
        }
    }

    public showFilters() {
        const filterObject = [];

        filterObject.push(
            <Button size="small" id="dropdownContainer">
                <Dropdown
                    placeholder="Filter"
                    search
                    compact
                    selection
                    options={types.FilterOptions}
                    onChange={this.handleFilterChange}
                    value={this.state.config.filter}
                />
            </Button>
        );
        filterObject.push(" ");
        filterObject.push(
            <Button size="small" id="dropdownContainer">
                <Dropdown
                    placeholder="Sort"
                    search
                    compact
                    selection
                    options={types.SortOptions}
                    onChange={this.handleSortChange}
                    value={this.state.config.sort}
                />
            </Button>
        );
        filterObject.push(" ");
        return filterObject;
    }

    public render() {
        return (
            <div id="filterbar">
                {this.state.isDeck ? "" : this.showFilters()}
                <Button
                    size="small"
                    toggle
                    active={this.state.config.isShowDNA}
                    onClick={this.handleDNA}
                >
                    DNA
                </Button>{" "}
                <Button
                    size="small"
                    toggle
                    active={this.state.config.isRookieView}
                    onClick={this.handleRookie}
                >
                    Rookie
                </Button>{" "}
                <Button
                    size="small"
                    toggle
                    active={this.state.config.isMedalView}
                    onClick={this.handleMedal}
                >
                    Medal
                </Button>{" "}
                <Button
                    size="small"
                    toggle
                    active={this.state.config.isShowLegacy}
                    onClick={this.handleLegacy}
                >
                    Legacy
                </Button>{" "}
                <Button
                    size="small"
                    toggle
                    active={this.state.config.isShowLS}
                    onClick={this.handleLeader}
                >
                    Leader
                </Button>{" "}
                <Button
                    toggle
                    size="small"
                    active={this.state.config.isShowEvolution}
                    onClick={this.handleEvolution}
                >
                    Evolution
                </Button>{" "}
                <Button
                    size="small"
                    toggle
                    active={this.state.config.isShowLink}
                    onClick={this.handleDetails}
                >
                    Details
                </Button>
            </div>
        );
    }
}

export default withRouter(HeaderView);
