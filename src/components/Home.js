import React, {Component} from 'react';
import {PageHeader, Panel, Row, Grid, Col, Jumbotron} from 'react-bootstrap';
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

var info;

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
  }

  getResponse = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1').then((response) => {
      //console.log(response);
      this.setState({data: response['data']['body']
      });
    }).catch((error) => {
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
                <CardHeader className='card-header' title="Note 2" />
                <CardText>
                  {this.state.data}
                </CardText>
              </Card>
            </Col>
            <Col sm={4} md={4}>
              <Card className="card">
                <CardHeader className='card-header' title="Note 3" />
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
