import React from 'react';

import { TextField, Grid, Button, makeStyles } from '@material-ui/core';
import { IShelfProduct } from '../../interfaces/IShelf';
import { NumberFormatCustom } from '../components/NumberFormat';
import ShelfProductAddFormProductTable from './ShelfProductAddFormProductTable';

interface ShelfProductAddFormProps {
    setDisplayAddShelfProductForm: (value: boolean) => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }));
  
export default function ShelfProductAddForm(props: ShelfProductAddFormProps) {
    const blankForm = () => {
        return {
            id: -1,
            productId: "",
            row: 0,
            column: 0,
        };
    }
    const classes = useStyles();

    const [shelfProduct, setShelfProduct] = React.useState<IShelfProduct>(blankForm());

    const handleShelfProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShelfProduct({ ...shelfProduct, [event.target.name]: event.target.value });
    };


    const renderForm = () => {
        const form = <form className={classes.root}>
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <ShelfProductAddFormProductTable />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField label="Row"
                            value={shelfProduct!.row}
                            name="row"
                            onChange={handleShelfProductChange}
                            InputProps={{
                                inputComponent: NumberFormatCustom
                            }}
                            type='number'/>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField label="Column"
                            value={shelfProduct!.column}
                            name="column"
                            onChange={handleShelfProductChange}
                            InputProps={{
                                inputComponent: NumberFormatCustom
                            }}
                            type='number'/>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Button variant="contained" color='primary' onClick={() => props.setDisplayAddShelfProductForm(false)}>Back</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" color='primary' onClick={() => null}>Save</Button>
                    </Grid>
                </Grid>
            </div>
        </form>;
        return form;
    }
    
    return renderForm();
}