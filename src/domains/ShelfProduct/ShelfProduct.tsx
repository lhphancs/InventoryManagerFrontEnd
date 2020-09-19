import React from 'react';
import { AppBar, Tab, Tabs } from '@material-ui/core';

function ShelfProduct() {
    const [value, setValue] = React.useState(0);

    const handleChange = (_: React.ChangeEvent<{}>, newValue: any) => {
        setValue(newValue);
    };


    return <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Item One">AAAAAAAAAAAA</Tab>
        </Tabs>
    </AppBar>;
}

export default ShelfProduct;