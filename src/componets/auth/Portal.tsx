import React, { Component } from 'react';
import { LandingPage } from './LandingPage';
import { Login } from './Login';
import { Register } from './Register';

type PortalProps = {
    updateToken(newToken: string): void,
}
type PortalState = {
    showLandingPage: boolean,
    showLogin: boolean,
    showRegister: boolean,
    email: string,
    username: string,
    password: string,
    cPassword: string,
   
}

export class Portal extends Component<PortalProps, PortalState> {
    constructor(props: PortalProps) {
        super(props);
        this.state = {
            showLandingPage: true,
            showLogin: false,
            showRegister: false,
            email: '',
            username: '',
            password: '',
            cPassword: '',
            
        }
    };

    toggleToLogin = () => {
        this.setState({
            showLandingPage: false,
            showLogin: true,
            showRegister: false,
        })
    };

    toggleToRegister = () => {
        this.setState({
            showLandingPage: false,
            showLogin: false,
            showRegister: true,
        })
    };

    render() {
        return (
            <div>
                {(this.state.showLandingPage)
                    ? <LandingPage toggleToLogin={this.toggleToLogin} toggleToRegister={this.toggleToRegister} />
                    : (this.state.showLogin)
                        ? <Login 
                            username={this.state.username} 
                            password={this.state.password}
                            toggleToRegister={this.toggleToRegister} 
                            updateToken={this.props.updateToken}
                            setUsername={this.setUsername}
                            setPassword={this.setPassword}
                        />
                        : <Register 
                            email={this.state.email}
                            username={this.state.username} 
                            password={this.state.password}
                            cPassword={this.state.cPassword}
                            toggleToLogin={this.toggleToLogin} 
                            updateToken={this.props.updateToken}
                            setUsername={this.setUsername}
                            setPassword={this.setPassword}
                            setEmail={this.setEmail}
                            setCPassword={this.setCPassword}
                           
                        />
                }
            </div>
        )
    }

    setEmail = (newEmail: string) => {
        this.setState({ email: newEmail })
    }   
    setUsername = (newUsername: string) => {
        this.setState({ username: newUsername })
    }
    setPassword = (newPassword: string) => {
        this.setState({ password: newPassword })
    }
    setCPassword = (newCPassword: string) => {
        this.setState({ cPassword: newCPassword })
    }
   

};