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
import '../css/styles.css';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {grey200} from 'material-ui/styles/colors';
import * as firebase from "firebase";

var info;
firebase.initializeApp({
  apiKey: "AIzaSyAcjSYn8aBoMUukqkYCUZMjzNHpXlp2I8c",
  authDomain: "takepicture-b07cc.firebaseapp.com",
  databaseURL: "https://takepicture-b07cc.firebaseio.com",
  projectId: "takepicture-b07cc",
  storageBucket: "takepicture-b07cc.appspot.com",
  messagingSenderId: "393936412972"
});

const title = (
  <h3>Standings</h3>
);

const muiTheme = getMuiTheme({
  fontFamily: 'courier',
  //palette: {canvasColor: grey200,},
});

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: ''
    }
    firebase.auth().signInAnonymously().then((user) => {
      console.log(user.isAnonymous);
    });
    var database = firebase.database();

    //Trying for get requests 
    // database.ref().once('/p1/').then(function (snap) {
    //  console.log('snap.val()', snap.val());
    //  });;
    // firebase.database().ref('p1').once('value').then(function(snapshot) {
    //   console.log("From firebase");
    //   console.log(snapshot);
    //});
  }

//this is currently being rejected --> look into fixing
  getResponse = () => {
    axios.get('https://takepicture-b07cc.firebaseio.com/').then((response) => {
      console.log(response['p1']);
      this.setState({data: response['p1']
      });
    }).catch((error) => {
      console.log("Error Caught:");
      console.log(error);
    });
  }

  componentDidMount() {
    this.getResponse();
  }

  //Cards will eventually need to be mapped depedning on amount of notes
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>

        <Grid>
          <Row className="show-grid">
            <Col sm={4} md={4}>
              <Card className="card">
                <CardHeader className='card-header' title="Note 1"/>
                <CardText>
                  {this.state.data}
                </CardText>
              </Card>
            </Col>

            <Col sm={4} md={4}>
              <Card className="card">
                <CardHeader className='card-header' title="Note 2"/>
                <CardText>
                  {this.state.data}
                </CardText>
              </Card>
            </Col>
            <Col sm={4} md={4}>
              <Card className="card">
                <CardHeader className='card-header' title="Note 3"/>
                <CardText>
                  {this.state.data}
                </CardText>
              </Card>
            </Col>
          </Row>
        </Grid>

      </MuiThemeProvider>
    );
  }
}

export default Home;
