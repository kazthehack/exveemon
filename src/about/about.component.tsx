/* tslint:disable: no-console*/
/* tslint:disable: jsx-boolean-value*/

import * as React from "react";
import Scrollbar from "react-perfect-scrollbar";

import "react-perfect-scrollbar/dist/css/styles.css";

import { withRouter } from "react-router";

import { Divider, Label, Segment } from "semantic-ui-react";

import "./about.styles.css";

export class AboutView extends React.Component {
    public htmlContentScrollRef: any;

    constructor(props: any) {
        super(props);

        // this.obtainMonsterCount = this.obtainMonsterCount.bind(this);
        // this.obtainMonsterIcon = this.obtainMonsterIcon.bind(this);

        // this.handleOpenBrowser = this.handleOpenBrowser.bind(this);
        // this.resizeFn = props.resizeFn;
        // this.openBrwsrFn = props.openBrwsrFn;
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

    public render() {
        return (
            <div id="homePage">
                <div id="changelog">
                    <Scrollbar
                        ref={ref => {
                            this.htmlContentScrollRef = ref;
                        }}
                        className="htmlScroll"
                    >
                        <Segment>
                            <Label as="a" ribbon={true}>
                                0.0.1
                            </Label>
                            <span> Beta release</span>
                            <Divider />
                            <p>- Initial Proxy Server implementation</p>
                            <p>- DeckList Parsing</p>
                            <p>- DNA Checker</p>
                        </Segment>
                    </Scrollbar>
                </div>
            </div>
        );
    }
}

export default withRouter(AboutView);
