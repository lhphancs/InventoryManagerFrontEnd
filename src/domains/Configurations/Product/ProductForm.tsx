import React from 'react';
import { clearAllGlobalMessages, clearAndAddErrorMessages } from '../../../redux/reducer/globalMessagesReducer';
import { connect } from 'react-redux';
import { TextField, makeStyles, InputAdornment, FormGroup, FormControlLabel, Checkbox, FormControl } from '@material-ui/core';

interface IProductFormProps {
    clearAllGlobalMessages: () => void;
    clearAndAddErrorMessages: (message: string) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

function ProductForm(props: IProductFormProps) {
    const classes = useStyles();

    const [productInfo, setProductInfo] = React.useState({
      upc: '',
      brand: '',
      name: '',
      description: '',
      expirationLocation: '',
      ounceWeight: 0
    });

    const [productPreparationInfo, setProductPreparationInfo] = React.useState({
      requiresPadding: false,
      requiresBubblewrap: false,
      requiresBox: false
    });

    props.clearAllGlobalMessages();

    const handleProductInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setProductInfo({ ...productInfo, [event.target.name]: event.target.checked });
    };
    const handleProductPreparationInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setProductPreparationInfo({ ...productPreparationInfo, [event.target.name]: event.target.checked });
    };

    return <form className={classes.root}>
      <div>
        <div>
          <TextField label="UPC" required onChange={handleProductInfoChange} name="upc" />
          <TextField label="Brand" required onChange={handleProductInfoChange} name="brand" />
          <TextField label="Name" required onChange={handleProductInfoChange} name="name" />
        </div>
        <div>
          <TextField label="Description" onChange={handleProductInfoChange} name="description" />
          <TextField label="Expiration Location" onChange={handleProductInfoChange} name="expirationLocation" />
          <TextField label="Weight" type="number" onChange={handleProductInfoChange} name="ounceWeight" 
            InputProps={{
            endAdornment: <InputAdornment position="end">Oz</InputAdornment>,
          }}/>
        </div>
      </div>
        
      <FormControl>
          <FormControlLabel
            control={<Checkbox checked={productPreparationInfo.requiresPadding} onChange={handleProductPreparationInfoChange} name="requiresPadding" />}
            label="Padding"
          />
          <FormControlLabel
            control={<Checkbox checked={productPreparationInfo.requiresBubblewrap} onChange={handleProductPreparationInfoChange} name="requiresBubblewrap" />}
            label="Bubblewrap"
          />
          <FormControlLabel
            control={<Checkbox checked={productPreparationInfo.requiresBox} onChange={handleProductPreparationInfoChange} name="requiresBox" />}
            label="Box"
          />
        </FormControl>
    </form>;
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        clearAllGlobalMessages: () => dispatch(clearAllGlobalMessages),
        clearAndAddErrorMessages: (message: string) => dispatch(clearAndAddErrorMessages(message))
    };
};

export default connect(null, mapDispatchToProps)(ProductForm);