import { Button, Dialog, Grid, makeStyles, TextField } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { IProduct } from '../../interfaces/IProduct';
import { clearAllGlobalMessage, clearAndAddErrorMessage, clearAndAddSuccessMessage } from '../../redux/reducer/globalMessagesReducer';
import { NumberFormatCustom } from '../components/NumberFormat';

interface IShelfProductAddDialogProps {
    clearAllGlobalMessages: () => void;
    clearAndAddErrorMessage: (message: string) => void;

    product?: IProduct;
    onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

function ShelfProductAddDialog(props: IShelfProductAddDialogProps) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [row, setRow] = React.useState(0);
    const [position, setPosition] = React.useState(0);

    const classes = useStyles();

    const handleAdd = () => {

    }
    
    return <Dialog onClose={props.onClose} open={props.product !== undefined}>
        <form className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField label="Row"
                        required
                        value={row}
                        InputProps={{
                            inputComponent: NumberFormatCustom
                        }}
                        type='number'
                        onChange={(e) => setRow(parseInt(e.target.value))} />
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Position"
                        required
                        value={position}
                        InputProps={{
                            inputComponent: NumberFormatCustom
                        }}
                        type='number'
                        onChange={(e) => setPosition(parseInt(e.target.value))} />
                </Grid>
                <Button variant="contained" color='primary' onClick={() => null}>Save</Button>
            </Grid>
        </form>
    </Dialog>;
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        clearAllGlobalMessages: () => dispatch(clearAllGlobalMessage),
        clearAndAddSuccessMessage: (message: string) => dispatch(clearAndAddSuccessMessage(message)),
        clearAndAddErrorMessage: (message: string) => dispatch(clearAndAddErrorMessage(message))
    };
};

export default connect(null, mapDispatchToProps)(ShelfProductAddDialog);