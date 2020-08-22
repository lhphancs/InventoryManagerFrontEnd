import React, { useEffect } from 'react';
import { clearAllGlobalMessage, clearAndAddErrorMessage, clearAndAddSuccessMessage } from '../../../redux/reducer/globalMessagesReducer';
import { connect } from 'react-redux';
import { TextField, makeStyles, InputAdornment, FormControlLabel, Checkbox, FormControl, Button, CircularProgress } from '@material-ui/core';
import { IProductInfo } from '../../../interfaces/IProduct';
import { addProduct, getProduct, updateProductInfo } from '../../../requests/ProductRequests';
import { useParams, useHistory } from 'react-router';
import { PathProduct } from '../../../paths';


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
  const history = useHistory();
  let { id } = useParams();
  props.clearAllGlobalMessages();

  const classes = useStyles();

  const [isLoading, setIsLoading] = React.useState(false);
  const [productId, setProductId] = React.useState<number | undefined>(undefined);
  const [productInfo, setProductInfo] = React.useState<IProductInfo>({
    upc: '',
    brand: '',
    name: '',
    description: '',
    expirationLocation: '',
    ounceWeight: 0,
    requiresBox: false,
    requiresBubbleWrap: false,
    requiresPadding: false
  });

  useEffect( () => {
      const initializeProduct = async () => {
        if (id === 'new') {
          return;
        }
        setIsLoading(true);
        const response = await getProduct(parseInt(id));
        const body = await response.json();
        if (response.status === 200) {
          setProductId(body.id);
          setProductInfo(body.productInfo);
        }
        else {
            props.clearAndAddErrorMessage(body.message);
        }
        setIsLoading(false);
      };
      initializeProduct();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  } , []);

  const handleProductInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductInfo({ ...productInfo, [event.target.name]: event.target.value });
  };

  const handleProductInfoCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductInfo({ ...productInfo, [event.target.name]: event.target.checked });
  };

  const handleSave = async () => {
    setIsLoading(true);

    const response = productId
                      ? await updateProductInfo(productId!, productInfo)
                      : await addProduct(productInfo, 0)

    const body = await response.json();
    if (response.status === 200) {
      history.push(`${PathProduct}/${body.id}`);
      props.clearAndAddSuccessMessage("Product saved successfully");
    }
    else {
        props.clearAndAddErrorMessage(body.message);
    }
    setIsLoading(false);
  }

  const form = <form className={classes.root}>
    <div>
      <div>
        <TextField label="UPC" required value={productInfo.upc} name="upc" onChange={handleProductInfoChange} />
        <TextField label="Brand" required value={productInfo.brand} name="brand" onChange={handleProductInfoChange} />
        <TextField label="Name" required value={productInfo.name} name="name" onChange={handleProductInfoChange} />
      </div>
      <div>
        <TextField label="Description" name="description" value={productInfo.description} onChange={handleProductInfoChange} />
        <TextField label="Expiration Location" value={productInfo.expirationLocation} name="expirationLocation" onChange={handleProductInfoChange} />
        <TextField label="Weight" type="number" value={productInfo.ounceWeight} name="ounceWeight" onChange={handleProductInfoChange} 
          InputProps={{
          endAdornment: <InputAdornment position="end">Oz</InputAdornment>,
        }}/>
      </div>
    </div>
      
    <FormControl>
        <FormControlLabel
          control={<Checkbox checked={productInfo.requiresPadding} onChange={handleProductInfoCheckChange} name="requiresPadding" />}
          label="Padding"
        />
        <FormControlLabel
          control={<Checkbox checked={productInfo.requiresBubbleWrap} onChange={handleProductInfoCheckChange} name="requiresBubbleWrap" />}
          label="Bubblewrap"
        />
        <FormControlLabel
          control={<Checkbox checked={productInfo.requiresBox} onChange={handleProductInfoCheckChange} name="requiresBox" />}
          label="Box"
        />
        <Button variant="contained" color='primary' onClick={handleSave}>Save</Button>
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