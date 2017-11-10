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
import FlatButton from 'material-ui/FlatButton';
import * as firebase from "firebase";
import {Scrollbars} from 'react-custom-scrollbars';
import {Editor, EditorState, ContentState} from 'draft-js';
import RenderIf from 'render-if-react';
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
      count: 0,
      editorState: EditorState.createWithContent(ContentState.createFromText("hello")),
      flag: false,
      text: null
    }
    this.onChange = (editorState) => this.setState({editorState})

    firebase.auth().signInAnonymously().then((user) => {
      console.log(user.isAnonymous);
    });
    // var database = firebase.database();
    // this.renderCards();
    //  const ElseComponent = () =>{ <div> {this.state.editorState} </div>}
  }

  getResponse = () => {
    firebase.database().ref('notes').once('value').then((snapshot) => {
      console.log("From firebase");
      console.log(snapshot.val());
      this.setState({data: snapshot.val()});
    });
  }

  componentDidMount() {
    this.getResponse();
    this.renderCards();

  }

  renderCards() {
    return this.state.data.map(info => {
      return (<Row className="show-grid">
        <Card className="card" onClick={() => {
            this.setState({
              editorState: EditorState.createWithContent(ContentState.createFromText(info))
            });
            this.setState({text: info});
          }}>
          <CardHeader className='card-header' title="Your note title" subtitle="Some of the notes text..."/>
          <CardText expandable={true}>
            {info}
          </CardText>
        </Card>
      </Row>)
    })
  }

  render() {
    const ElseComponent = () => <div>{this.state.text}</div>
    return (<MuiThemeProvider muiTheme={muiTheme}>
      <Grid>
        <Col id="left" sm={2} md={2} lg={2}>
          {this.renderCards()}
        </Col>
        <Card id="panel" className="card">
          <CardHeader className='card-header' title="Note"/>
          <CardActions id="card_buttons">
            <FlatButton label="Edit" onClick="onClick" ={()=>{
                if (this.state.flag ===true) {
                  this.setState({flag: false});
                } else {
                  this.setState({flag: true});
                  }
                }
              }/>
            <FlatButton label="Delete"/>
          </CardActions>
          <CardText>
            <Scrollbars id="scrollbars" autoHeight="autoHeight" autoHeightMin={100} autoHeightMax={450} style={{
                width: 500
              }}>
              <RenderIf condition {this.state.flag === true} elseComponent={ElseComponent}>
                <div id="content">
                  <div className="editor">
                    <Editor editorState={this.state.editorState} onChange={this.onChange}/>
                  </div>
                </div>
              </RenderIf>
            </Scrollbars>
          </CardText>

        </Card>
      </Grid>

    </MuiThemeProvider>);
  }
}

export default Home;
