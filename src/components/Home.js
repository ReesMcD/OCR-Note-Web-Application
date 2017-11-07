import React, {Component} from 'react';
import {
  PageHeader,
  Panel,
  Row,
  Grid,
  Col,
  Jumbotron
} from 'react-bootstrap';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle'
import '../css/styles.css';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {grey200} from 'material-ui/styles/colors';
import * as firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyAcjSYn8aBoMUukqkYCUZMjzNHpXlp2I8c",
  authDomain: "takepicture-b07cc.firebaseapp.com",
  databaseURL: "https://takepicture-b07cc.firebaseio.com",
  projectId: "takepicture-b07cc",
  storageBucket: "takepicture-b07cc.appspot.com",
  messagingSenderId: "393936412972"
});

const muiTheme = getMuiTheme({
  fontFamily: 'courier',
  //palette: {canvasColor: grey200,},
});

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      count: 0
    }

    firebase.auth().signInAnonymously().then((user) => {
      console.log(user.isAnonymous);
    });
    var database = firebase.database();
    this.renderCards();
  }

  getResponse = () => {
    firebase.database().ref('notes').once('value').then((snapshot) => {
      console.log("From firebase");
      console.log(snapshot.val());
      this.setState({data: snapshot.val()});
    });
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };

  componentDidMount() {
    this.getResponse();
    this.renderCards();
  }

  renderCards() {
    //console.log(this.state.data);
    return this.state.data.map(info => {
      return (<Row className="show-grid">
        <Card className="card">
          <CardHeader className='card-header' title="Note"/>
          <CardText>
            {info}
          </CardText>
        </Card>
      </Row>)
    })
  }

  render() {
    return (<MuiThemeProvider muiTheme={muiTheme}>
      <Grid>
              <Col sm={2} md={2} lg={2}>
                {this.renderCards()}
              </Col>
                <Card id="panel" className="card">
                  <CardHeader className='card-header' title="Note"/>
                  <CardText>
                    Hello
                  </CardText>
                </Card>
      </Grid>

    </MuiThemeProvider>);
  }
}

export default Home;
