import React, { Component } from "react";
import { Wrapper } from "./LPstyle";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from "react-router-dom";
import { ExhibitIndex } from "../Exhibits/ExhibitIndex";

type LandingPageProps = {
  toggleToLogin(): void;
  toggleToRegister(): void;
};
type LandingPageState = {};

export class LandingPage extends Component<LandingPageProps, LandingPageState> {
  constructor(props: LandingPageProps) {
    super(props);
  }

  render()

   {
    return (
      <div>
        <Wrapper>
        <button onClick={this.props.toggleToLogin}>login</button>
        <a onClick={this.props.toggleToRegister}>new here?</a>

        <ExhibitIndex />
        
        </Wrapper>
       

      </div>
    );
  }
}


 