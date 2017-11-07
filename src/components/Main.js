import React, {Component} from 'react';
import Home from './Home'
import { Switch, Route } from 'react-router-dom'

//Routes get added here
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
