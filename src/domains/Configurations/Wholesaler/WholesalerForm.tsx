import React, { useEffect } from 'react';
import { clearAllGlobalMessage, clearAndAddErrorMessage, clearAndAddSuccessMessage } from '../../../redux/reducer/globalMessagesReducer';
import { connect } from 'react-redux';
import { TextField, makeStyles, CircularProgress, Button, Grid } from '@material-ui/core';
import { IWholesalerInfo } from '../../../interfaces/IWholesaler';
import { useParams, useHistory } from 'react-router';
import { PathWholesaler } from '../../../paths';
import { getWholesaler, updateWholesalerInfo, addWholesaler } from '../../../requests/WholesalerRequests';

interface IWholesalerFormProps {
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

const newWholesalerInfo = {
    name: '',
    address: {
      street: '',
      city: '',
      zipCode: ''
    }
  }

function WholesalerForm(props: IWholesalerFormProps) {
  const history = useHistory();
  let { id } = useParams();
  props.clearAllGlobalMessages();

  const classes = useStyles();

  const [isLoading, setIsLoading] = React.useState(false);
  const [wholesalerId, setWholesalerId] = React.useState<number | undefined>(undefined);
  const [wholesalerInfo, setWholesalerInfo] = React.useState<IWholesalerInfo>(newWholesalerInfo);
  const [failedToLoadWholesaler, setFailedToLoadWholesaler] = React.useState<boolean>(false);

  useEffect( () => {
      const initializeWholesaler = async () => {
        if (id === 'new') {
          return;
        }
        setIsLoading(true);
        try {
          const Wholesaler = await getWholesaler(parseInt(id));
          setWholesalerId(Wholesaler.id);
          setWholesalerInfo(Wholesaler.wholesalerInfo);
        }
        catch (e) {
          props.clearAndAddErrorMessage(e.message);
          setFailedToLoadWholesaler(true);
        }
        setIsLoading(false);
      };
      initializeWholesaler();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  } , []);

  const handleWholesalerInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWholesalerInfo({ ...wholesalerInfo, [event.target.name]: event.target.value });
  };

  const handleWholesalerInfoAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWholesalerInfo({ ...wholesalerInfo, address: {...wholesalerInfo.address, [event.target.name]: event.target.value }} );
  };

  const handleSave = async () => {
    setIsLoading(true);

    try {
      wholesalerId ? await updateWholesalerInfo(wholesalerId!, wholesalerInfo) : await addWholesaler(wholesalerInfo)

      props.clearAndAddSuccessMessage("Wholesaler saved successfully");
      history.push(`${PathWholesaler}`);
    } catch (e) {
      props.clearAndAddErrorMessage(e.message);
    }
    setIsLoading(false);
  }

  const form = <form className={classes.root}>
    <div>
      <div>
        <TextField label="Name" required value={wholesalerInfo.name} name="name" onChange={handleWholesalerInfoChange} />
      </div>
      <div>
        <TextField label="Street" value={wholesalerInfo.address.street} name="street" onChange={handleWholesalerInfoAddressChange} />
        <TextField label="City Location" value={wholesalerInfo.address.city} name="city" onChange={handleWholesalerInfoAddressChange} />
        <TextField label="Zipcode"value={wholesalerInfo.address.zipCode} name="zipCode" onChange={handleWholesalerInfoAddressChange} />
      </div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Button variant="contained" color='primary' onClick={() => history.push(PathWholesaler)}>Back</Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color='primary' onClick={handleSave}>Save</Button>
        </Grid>
      </Grid>
    </div>
  </form>;

  return isLoading ? <CircularProgress /> 
                    : failedToLoadWholesaler ? null 
                    : form;
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        clearAllGlobalMessages: () => dispatch(clearAllGlobalMessage),
        clearAndAddSuccessMessage: (message: string) => dispatch(clearAndAddSuccessMessage(message)),
        clearAndAddErrorMessage: (message: string) => dispatch(clearAndAddErrorMessage(message))
    };
};

export default connect(null, mapDispatchToProps)(WholesalerForm);