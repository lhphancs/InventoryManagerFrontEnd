import React from 'react';
import { makeStyles, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ThreeDRotation from '@material-ui/icons/ThreeDRotation';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  }
}));

function renderConfigurationLinks() {
  return <List>
    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
      <ListItem button key={text}>
        <ListItemIcon><ThreeDRotation/></ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    ))}
  </List>;
}

function renderSellers() {
  return <List>
    {['All mail', 'Trash', 'Spam'].map((text, index) => (
      <ListItem button key={text}>
        
        <ListItemText primary={text} />
      </ListItem>
    ))}
  </List>;
}

export default function SideNavigation() {
  const classes = useStyles();

  return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Divider />
        {renderConfigurationLinks()}
        
        <Divider />
        {renderSellers()}
      </Drawer>
  );
}
