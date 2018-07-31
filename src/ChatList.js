import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import database, { firebase } from './firebase.js';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    height: '600',
    backgroundColor: theme.palette.background.paper,
  },
});

function ChatList(props) {
  const { classes } = props;
  

  return (
    <div className={classes.root} style={{width:'100%'}}>
        <Paper style={{maxHeight: 664, height: 664, overflow: 'auto'}}>
            <List>
                <ListItem>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                    <ListItemText primary="Max TestUser" secondary="Customer: 1807308385981490" />
                </ListItem>
            </List>
        </Paper>
    </div>
  );
}

ChatList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatList);