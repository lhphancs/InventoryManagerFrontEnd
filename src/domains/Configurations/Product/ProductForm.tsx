import React from 'react';
import { clearAllGlobalMessage, clearAndAddErrorMessage, clearAndAddSuccessMessage } from '../../../redux/reducer/globalMessagesReducer';
import { connect } from 'react-redux';
import { TextField, makeStyles, InputAdornment, FormControlLabel, Checkbox, FormControl, Button, CircularProgress } from '@material-ui/core';
import { IProductPreparationInfo, IProductInfo } from '../../../interfaces/IProduct';
import { addProduct } from '../../../requests/ProductRequests';

interface IProductFormProps {
    clearAllGlobalMessages: () => void;
    clearAndAddSuccessMessage: (message: string) => void;
    clearAndAddErrorMessage: (message: string) => void;
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

    const [isLoading, setIsLoading] = React.useState(false);
    const [productInfo, setProductInfo] = React.useState<IProductInfo>({
      upc: '',
      brand: '',
      name: '',
      description: '',
      expirationLocation: '',
      ounceWeight: 0
    });

    const [productPreparationInfo, setProductPreparationInfo] = React.useState<IProductPreparationInfo>({
      requiresPadding: false,
      requiresBubbleWrap: false,
      requiresBox: false
    });

    props.clearAllGlobalMessages();

    const handleProductInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setProductInfo({ ...productInfo, [event.target.name]: event.target.checked });
    };
    const handleProductPreparationInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setProductPreparationInfo({ ...productPreparationInfo, [event.target.name]: event.target.checked });
    };

    const handleSave = async () => {
      setIsLoading(true);


      const response = await addProduct(productInfo, productPreparationInfo);
      const body = await response.json();
      if (response.status === 200) {
          props.clearAndAddSuccessMessage("Product added successfully");
      }
      else {
          props.clearAndAddErrorMessage(body.message);
      }
      setIsLoading(false);
    }

    const form = <form className={classes.root}>
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
            control={<Checkbox checked={productPreparationInfo.requiresBubbleWrap} onChange={handleProductPreparationInfoChange} name="requiresBubblewrap" />}
            label="Bubblewrap"
          />
          <FormControlLabel
            control={<Checkbox checked={productPreparationInfo.requiresBox} onChange={handleProductPreparationInfoChange} name="requiresBox" />}
            label="Box"
          />
          <Button variant="contained" color='primary' onClick={handleSave}>Click me</Button>
        </FormControl>
    </form>;
    return isLoading ? <CircularProgress /> : form;
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        clearAllGlobalMessages: () => dispatch(clearAllGlobalMessage),
        clearAndAddSuccessMessage: (message: string) => dispatch(clearAndAddSuccessMessage(message)),
        clearAndAddErrorMessage: (message: string) => dispatch(clearAndAddErrorMessage(message))
    };
};

export default connect(null, mapDispatchToProps)(ProductForm);