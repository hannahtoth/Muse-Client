import React, { Component } from 'react';

 import { Wrapper } from './HeaderStyle';

type HeaderProps = {
    logout() : void,
}

export class Header extends Component <HeaderProps, {}> {
    constructor(props: HeaderProps) {
        super(props);
    }

    render() {
        return(
         <div>
             <Wrapper>
                
                <a onClick={this.props.logout}>Logout</a>
                </Wrapper>
                </div>
                
        )
    }
}