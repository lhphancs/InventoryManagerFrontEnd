import React from 'react';
import { makeStyles, Drawer, Divider, ListItem, ListItemIcon, ListItemText, Collapse, Icon } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
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
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

interface IItemLinkInfo {
  text: string;
  href: string;
  icon?: React.ReactNode;
}

function renderCollapsibleList(open: boolean, text: string, onClick: () => void, icon?: React.ReactNode) {
  return <ListItem button onClick={onClick}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} />
        {open ? <ExpandLess /> : <ExpandMore />}
  </ListItem>;
}

function renderListItemLink(text: string, href: string, component?: any, className?: string) {
  return <ListItem button component="a" href={href} key={`${text}-${href}`}  className={className}>
    <ListItemIcon>{component}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>;
}

function renderItemLinkInfos(itemLinkInfos: IItemLinkInfo[], className?: string) {
  return itemLinkInfos.map((info) => renderListItemLink(info.text, info.href, info.icon, className));
}

const configurationItemLinkInfos = [
    {text: "Products", href:"/products" },
    {text: "Wholesalers", href:"/wholesalers"},
    {text: "Shelves", href:"/shelves"},
];

const reportItemLinkInfos = [
    {text: "Audit", href:"/report/audit", icon: <Icon>history</Icon>},
];
export default function SideNavigation() {
  const classes = useStyles();

  const [configurationOpen, setConfigurationOpen] = React.useState(true);
  const [reportOpen, setReportOpen] = React.useState(true);

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar}>

        </div>
        <Divider />
        
        {renderCollapsibleList(configurationOpen, "Configurations", () => setConfigurationOpen(!configurationOpen), <Icon>settings</Icon> )}
        <Collapse in={configurationOpen} timeout="auto" unmountOnExit>
          {renderItemLinkInfos(configurationItemLinkInfos, classes.nested)}
        </Collapse>

        <Divider />

        {renderCollapsibleList(reportOpen, "Reports", () => setReportOpen(!reportOpen), <Icon>assessment</Icon>)}
        <Collapse in={reportOpen} timeout="auto" unmountOnExit>
          {renderItemLinkInfos(reportItemLinkInfos, classes.nested)}
        </Collapse>
        <Divider />
      </Drawer>
    </div>
  );
}
