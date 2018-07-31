import React, { Component } from 'react';
import './App.css';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import ChatList from './ChatList.js';
import ChatBox from './ChatBox.js';
import database, { firebase } from './firebase.js';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const getToken = async (user_token) => {
  const req = await axios.get(`https://graph.facebook.com/v2.6/me/accounts?access_token=${user_token}&fields=name,access_token`)
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      login: false,
      token: '',
      name: '',
    }
  }

  handleFacebookLogin = async (response) => {
    const req = await axios.get(`https://graph.facebook.com/v2.6/me/accounts?access_token=${response.accessToken}&fields=name,access_token`)
    console.log(response);
    req.data.data.forEach(item => {
      if (item.id == '1305281149575004') {
        this.setState({ 
          ptoken: item.access_token ,
          login: true,
          token: response.accessToken,
          profileImage: response.picture.data.url,
          name: response.name,
          email: response.email
        });
      }
    });

    console.log(this.state);
  }

  render() {
    const dataRef = firebase.database()
      .ref('messages/1807308385981490')
      .orderByKey()
      .limitToLast(50)

    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" >
              BigBears Swag Shop Staff Chat : {this.state.name}
            </Typography>
          </Toolbar>
        </AppBar>
        {!this.state.login ?
        <p className="App-intro">
            <FacebookLogin
              appId="2200332589982408"
              autoLoad={true}
              fields="name,email,picture"
              scope="manage_pages,pages_messaging"
              callback={this.handleFacebookLogin} /> 
        </p>:
        <div class="row">
          <div class="column left" style={{ backgroundColor: '#DEDEDE' }}><ChatList /></div>
          <div class="column right" style={{ backgroundColor: '#DEDEDE' }}>
            <ChatBox 
              ptoken={this.state.ptoken} 
              profileImage={this.state.profileImage}
            />
          </div>
        </div>
        }
      </div>
    );
  }
}

export default App;
