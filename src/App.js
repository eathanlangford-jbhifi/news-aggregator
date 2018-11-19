// TODO: fix /reddit route not rendering properly
// TODO: fetch stories from FCC Medium publication
// TODO: create initial page where users can choose which sources to load

import './App.css';
import React, { Component } from 'react';
import {Navbar} from 'react-materialize';

import {
  Route,
  Switch,
  BrowserRouter
} from 'react-router-dom'
import Sources from './components/Sources';
import Main from './components/Main';
import Navigation from './components/Navigation';

class App extends Component {
  render(){

    return (
      <div className="App">
      <BrowserRouter>
        <div>
          <Navigation/>
            <Switch>
            <Route exact path="/" render={()=>{
                return <Sources/>
            }}/>
            <Route path="/stories" component={Main}/>
            {/* <Route path="/hackernews" render={()=>{
                return <NewsList stories={yCom}/>
            }}/>
            <Route path="/reddit" render={()=>{
                return <NewsList stories={redditProgHum}/>
            }}/> */}
            </Switch>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;