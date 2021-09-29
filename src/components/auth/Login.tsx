import React, { Component } from 'react';
import { ExhibitIndex } from '../Exhibits/ExhibitIndex';
// import { Redirect, Link, Route } from 'react-router-dom'
 import {Wrapper} from './LoginStyle'

type LoginProps = {
    username: string,
    password: string,
    toggleToRegister(): void,
    updateToken(newToken: string): void,
    setUsername(newUsername: string): void,
    setPassword(newPassword: string): void,
}
type LoginState = {
    successfulLogin: boolean,
}

export class Login extends Component <LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            successfulLogin: false,
        }
    }
    
    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch("http://localhost:3000/user/login", {
            method: 'POST',
            body: JSON.stringify({ user: 
                { username: this.props.username,
                  password: this.props.password } 
                }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
        .then(data => {this.props.updateToken(data.sessionToken)})
    };
    render() 
    
    {
        return(
         <div>
              <Wrapper> 
                <h2>login</h2>
                <form onSubmit={ this.handleSubmit }>
                    <label>username: </label>
                    <input required onChange={(e) => {this.props.setUsername(e.target.value)}}></input>
                    <br/>
                    <label>password: </label>
                    <input required type="password" onChange={(e) => {this.props.setPassword(e.target.value)}}></input>
                    <br />
                    <button type="submit">login</button>

                </form>
                <a onClick={this.props.toggleToRegister}>new here?</a>
           
                </Wrapper> 
                </div>
        )
    }
}


