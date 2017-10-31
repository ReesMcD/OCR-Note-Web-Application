import React, {Component} from 'react';
import Home from './Home'
import { Switch, Route } from 'react-router-dom'


class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
        </Switch>
      </main>
    );
  }
}

export default Main;
