import React, { Component } from 'react';




type LandingPageProps = {
    toggleToLogin(): void,
    toggleToRegister(): void,
}
type LandingPageState = {}

export class LandingPage extends Component<LandingPageProps, LandingPageState> {
    constructor(props: LandingPageProps) {
        super(props);
    }
    
    render() {
        return (
           <div>
               
                <button onClick={this.props.toggleToLogin}>login</button>
                <a onClick={this.props.toggleToRegister}>new here?</a>
           
            </div>

        );
    };
};