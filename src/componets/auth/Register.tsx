import React, { Component } from 'react';

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
                <h2>create</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>email</label>
                    <input required onChange={(e) => {this.props.setEmail(e.target.value)}}></input>
                    <label>username</label>
                    <input required onChange={(e) => {this.props.setUsername(e.target.value)}}></input>
                    <label>password</label>
                    <input required onChange={(e) => {this.props.setPassword(e.target.value)}}></input>
                    <label>confirm password</label>
                    <button type="submit">sign up</button>
                </form>
                <a onClick={this.props.toggleToLogin}>login?</a>
                </div>
        )
    }
}