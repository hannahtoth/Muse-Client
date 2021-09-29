import React, { Component } from "react";
import { Wrapper } from "./LoginStyle";

type RegisterProps = {
  // email: string,
  // username: string,
  // password: string,
  // cPassword: string,
  toggleToLogin(): void;
  updateToken(newToken: string): void;
  // setUsername(newUsername: string): void,
  // setPassword(newPassword: string): void,
  // setEmail(newEmail: string): void,
  // setCPassword(newCPassword: string): void,
};
type RegisterState = {
  email: string;
  username: string;
  password: string;
  cPassword: string;
};

export class Register extends Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      cPassword: "",
    };
  }

  handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    fetch("http://localhost:3000/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.updateToken(data.sessionToken);
      });
    console.info(this.handleSubmit);
  };

  render() {
    return (
      <div>
         <Wrapper> 
          <h2>create</h2>
          <form onSubmit={this.handleSubmit}>
            <label>email: </label>
            <input
              required
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
            ></input>
            <br></br>
            <label>username: </label>
            <input
              required
              onChange={(e) => {
                this.setState({ username: e.target.value });
              }}
            ></input>
            <br></br>
            <label>password: </label>
            <input
              required
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
            ></input>
            <br></br>
            <label>confirm password: </label>
            <input
              required
              onChange={(e) => {
                this.setState({ cPassword: e.target.value });
              }}
            ></input>
            <br></br>
            <button type="submit">create</button>
          </form>
          <a onClick={this.props.toggleToLogin}>login?</a>
         </Wrapper> 
      </div>
    );
  }
}
