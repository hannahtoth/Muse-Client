import React, { Component } from 'react';
import { Redirect, Link, Route } from 'react-router-dom'
import { ExhibitView } from '../Exhibits/ExhibitView';
import {Wrapper} from './LoginStyle'

type LoginProps = {
    username: string,
    password: string,
    toggleToRegister(): void,
    toggleToExhibitView(): void,
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


{/* <div>
<Switch>

    <Route exact path="/"><Home
        token={this.props.token}
        updateToken={this.props.updateToken} /></Route>

    <Route exact path="/user/register" component={() => <Register
        token={this.props.token}
        updateToken={this.props.updateToken} />}></Route>

    <Route exact path="/user/login" component={() => <Login
        token={this.props.token}
        updateToken={this.props.updateToken}
        isAdmin={this.state.user.isAdmin} />}></Route>

    <Route exact path="/user/profile" component={() => <Profile
        token={this.props.token}
        updateToken={this.props.updateToken}
        updateBook={this.updateBook}
        bookId={this.state.book.id}


    />}></Route>

    <Route exact path="/user/profile/create" component={() => <CreateProfile
        token={this.props.token}
        updateToken={this.props.updateToken} />}></Route>

    <Route exact path="/user/profile/edit" component={() => <EditProfile
        token={this.props.token}
        updateToken={this.props.updateToken}
        userIdProps={this.state.user.id} />}></Route>

    <Route exact path="/book/create" component={() => <CreateBook
        token={this.props.token}
        updateToken={this.props.updateToken} />}></Route>

    <Route exact path='/book/update' component={() =>
        <UpdateBook
            token={this.props.token}
            updateToken={this.props.updateToken}
            book={this.state.book}
        />}></Route>

    <Route exact path="/book/bookshelf" component={() => <Bookshelf
        token={this.props.token}
        updateToken={this.props.updateToken}
        updateBook={this.updateBook}
        bookId={this.state.book.id}

    />}></Route>

    <Route exact path="/book/delete" component={() => <DeleteBook
        token={this.props.token}
        updateToken={this.props.updateToken}
        book={this.state.book}
        bookId={this.state.book.id}
    />}></Route>

    <Route exact path="/admin" component={() => <AdminView
        token={this.props.token}
        updateToken={this.props.updateToken}
        isAdmin={this.state.user.isAdmin}
    // username={this.state.user.username}
    />}></Route>

    <Redirect to="/" />

</Switch>
</div > */}