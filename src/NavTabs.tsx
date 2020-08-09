import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Tabs, Tab } from '@material-ui/core';
import { Link, BrowserRouter } from "react-router-dom";
import { PathProducts, PathShelves } from './paths';

export default function NavTabs() {
    const [navIndex, setNavIndex] = React.useState(0);

    const handleChange = (_: any, value: number) => {
        setNavIndex(value);
    };

    return <BrowserRouter>
        <AppBar position="static">
            <Tabs value={navIndex} onChange={handleChange} centered>
                <Tab label='Products' component={Link} to={PathProducts} />
                <Tab label='Shelves' component={Link} to={PathShelves}/>
            </Tabs>
        </AppBar>
    </BrowserRouter>
    ;
}