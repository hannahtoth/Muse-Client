import React, { Component } from 'react';
import './App.css';
import { Portal } from './componets/auth';
import { Header } from './common/Header'
import { GalleryIndex } from './Gallery/GalleryIndex';
import {ExhibitIndex} from './Exhibits/ExhibitIndex'

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
    console.log(this.state.sessionToken)
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
        <Header logout={this.clearToken} /> 
        <Portal updateToken={this.updateToken} />
        <GalleryIndex sessionToken={this.state.sessionToken} />
        <ExhibitIndex />

      </div>
     
    );
  }
}

export default App;