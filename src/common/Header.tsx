import React, { Component } from "react";

import { Wrapper } from "./HeaderStyle";

type HeaderProps = {
  logout(): void;
  updateToken(newToken: string): void;
  token: string | null;
};

export class Header extends Component<HeaderProps, {}> {
  constructor(props: HeaderProps) {
    super(props);
  }

  render() {
    return (
      <div>
          <Wrapper>
        <button>
          <a onClick={this.props.logout}>Logout</a>
        </button>
        </Wrapper>
      </div>
    );
  }
}
