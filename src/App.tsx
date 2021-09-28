import React, { Component } from 'react';
import './App.css';
import { Portal } from './componets/auth/Portal';
import { Header } from './common/Header'
import { Link, Switch, Route, Redirect } from 'react-router-dom';


type AppProps = {};
type AppState = {
  sessionToken: string | null,
};

class App extends Component <AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      sessionToken: '',
    }
  }

  componentDidMount() {
    if(localStorage.getItem('token')) {
      this.setState({
        sessionToken: localStorage.getItem('token'),
      })
    };
  }

  updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    this.setState({
      sessionToken: newToken,
    });
  }

  clearToken = () => {
    localStorage.clear();
    this.setState({
      sessionToken: '',
    });
  }
  render(){
    return (
      <div className="App">
        <Header logout={this.clearToken} updateToken={this.updateToken} token={this.state.sessionToken} /> 
        <Route exact path="/">
            <Portal updateToken={this.updateToken} sessionToken={this.state.sessionToken} />
          </Route>
     

      </div>
     
    );
  }
}

export default App;