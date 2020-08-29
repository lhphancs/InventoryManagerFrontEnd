import React from 'react';

import { TextField, FormControl, InputAdornment, IconButton, Icon } from '@material-ui/core';

interface IWholesalerSearchByProductFormProps {
    searchWholesalerByUpc: (upc: string) => void;
}

export default function WholesalerSearchByProductForm(props: IWholesalerSearchByProductFormProps) {
    const [upcToSearch, setUpcToSearch] = React.useState('');

    const handleSetUpcToSearchSearch = (e: any) => {
        setUpcToSearch(e.target.value);
    }
    
    return <FormControl fullWidth>
        <TextField
            label="Search wholesaler by product UPC"
            type='search'
            onChange={handleSetUpcToSearchSearch}
            value={upcToSearch}
            InputProps={{
                endAdornment: (
                <InputAdornment position='start'>
                    <IconButton onClick={() => props.searchWholesalerByUpc(upcToSearch)}>
                        <Icon>search</Icon>
                    </IconButton>
                </InputAdornment>
                )
            }}
        />
    </FormControl>;
}