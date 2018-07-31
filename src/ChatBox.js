import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import database, { firebase } from './firebase.js';
import fiery from 'fiery';
import Paper from '@material-ui/core/Paper';

import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Send from '@material-ui/icons/Send';
import axios from 'axios';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    maxHeight: '300',
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  margin: {
    align: 'left',
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    width: '98%'
  },
});

function ChatBox(props) {
  const { classes } = props;
  const dataRef = firebase.database()
          .ref('messages/1807308385981490')
          .orderByKey()
          .limitToLast(50)

  const sendMessage = () => {
            var text = document.getElementById('message').value;
            var message = {};

            if (text == 'scala') {
                message = { 
                    recipient: {
                        id: '1807308385981490'
                    },
                    message: {
                        attachment: {
                            type: "template",
                            payload: {
                                template_type: "generic",
                                elements: [
                                    {
                                        title: "Scala Sticker",
                                        image_url: "https://mahasak.github.io/tshirt-demo/images/sticker/Scala.jpg",
                                        subtitle: "Cool Scala Sticker",
                                        default_action: {
                                            type: "web_url",
                                            url: "https://mahasak.github.io/tshirt-demo/",
                                            webview_height_ratio: "tall",
                                        },
                                        buttons: [ 
                                            {
                                                type: "web_url",
                                                url: "https://mahasak.github.io/tshirt-demo/",
                                                title: "View Website"
                                            },
                                            {
                                                type: "postback",
                                                "payload":"DEVELOPER_DEFINED_PAYLOAD",
                                                title: "Start Chat"
                                            }                                            
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                  }
                
            } else {
                message = {
                    recipient: {
                        id: '1807308385981490'
                    },
                    message: {
                        text: text,
                        metadata: "DEVELOPER_DEFINED_METADATA"
                    }
                }
            }
        
            console.log(text);
            axios.post(`https://graph.facebook.com/v2.6/me/messages?access_token=${props.ptoken}`, message);
            document.getElementById('message').value = '';
          }

  return (
    <div className={classes.root}>
        <Paper style={{maxHeight: 600, height:600, overflow: 'auto'}}>
            <List style={{overflow: 'auto', maxHeight: '600'}}>
                <fiery.Data dataRef={dataRef}>
                    {(chatState) => fiery.unwrap(chatState, {
                    loading: () =>
                        <div>Loading messages…</div>,
                    completed: (chat) =>
                        Object.keys(chat).map(key =>
                            <ListItem key={key} style={{textAlign: (chat[key].direction ==='send')?'right':'left'}}>
                            {(chat[key].direction ==='send')?null:
                            <Avatar>
                                <ImageIcon />
                            </Avatar>}
                            <ListItemText primary={chat[key].text} secondary={(chat[key].direction ==='send')?'You':'Customer'} />
                            {(chat[key].direction ==='send')?
                            <Avatar src={props.profileImage} />:null}
                        </ListItem>
                        ),
                    error: (error) =>
                        <div>error</div>
                    })}
                </fiery.Data>
            </List>
        </Paper>
        <FormControl className={classNames(classes.margin, classes.textField)} style={{marginLeft: 0}}>
            <InputLabel htmlFor="message">Send Message</InputLabel>
            <Input
                id="message"
                type='text'
                fullWidth
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="Toggle password visibility"
                    onClick={sendMessage}
                    >
                        <Send />
                    </IconButton>
                </InputAdornment>
                }
            />
        </FormControl>
    </div>
  );
}

ChatBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatBox);