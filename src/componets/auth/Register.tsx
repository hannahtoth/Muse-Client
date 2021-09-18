import React, { Component } from 'react';
import {Wrapper} from './LoginStyle'

type RegisterProps = {
    email: string,
    username: string,
    password: string,
    cPassword: string,
    toggleToLogin(): void,
    updateToken(newToken: string): void,
    setUsername(newUsername: string): void,
    setPassword(newPassword: string): void,
    setEmail(newEmail: string): void,
    setCPassword(newCPassword: string): void,
}
type RegisterState = {}

export class Register extends Component <RegisterProps, RegisterState> {
    constructor(props: RegisterProps) {
        super(props);
        this.state = {
        }
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch("http://localhost:3000/user/register", {
            method: 'POST',
            body: JSON.stringify({ user: {  email: this.props.email, username: this.props.username, password: this.props.password } }),
           
        }).then(res => res.json())
        .then(data => { this.props.updateToken(data.sessionToken) })
        console.log(this.handleSubmit)
    }

    render() {
        return(
           <div>
               <Wrapper>
            <h2>create</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>email: </label>
                    <input required onChange={(e) => {this.props.setEmail(e.target.value)}}></input>
                    <br></br>
                    <label>username: </label>
                    <input required onChange={(e) => {this.props.setUsername(e.target.value)}}></input>
                    <br></br>
                    <label>password: </label>
                    <input required onChange={(e) => {this.props.setPassword(e.target.value)}}></input>
                    <br></br>
                    <label>confirm password: </label>
                    <input required onChange={(e) => {this.props.setPassword(e.target.value)}}></input>
                    <br></br>
                </form>
                <button type="submit">create</button>
                <a onClick={this.props.toggleToLogin}>login?</a>
                </Wrapper>
                </div>
        )
    }
}