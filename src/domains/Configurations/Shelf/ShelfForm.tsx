import React, { useEffect } from 'react';
import { clearAllGlobalMessage, clearAndAddErrorMessage, clearAndAddSuccessMessage } from '../../../redux/reducer/globalMessagesReducer';
import { connect } from 'react-redux';
import { TextField, makeStyles, CircularProgress, Button, Grid } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';
import { IShelf, IShelfInfo } from '../../../interfaces/IShelf';
import { getShelf } from '../../../requests/ShelfRequests';
import { PathShelf } from '../../../paths';

interface IShelfFormProps {
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

const newShelfInfo: IShelfInfo = {
  name: '',
  description: ''
}

function ShelfForm(props: IShelfFormProps) {
  const history = useHistory();
  let { id } = useParams();
  props.clearAllGlobalMessages();

  const classes = useStyles();

  const [isLoading, setIsLoading] = React.useState(false);
  const [shelfId, setShelfId] = React.useState<number | undefined>(undefined);
  const [shelfInfo, setShelfInfo] = React.useState<IShelfInfo>(newShelfInfo);
  const [failedToLoadShelf, setFailedToLoadShelf] = React.useState<boolean>(false);

  useEffect( () => {
      const initializeShelf = async () => {
        if (id === 'new') {
          return;
        }
        setIsLoading(true);
        try {
          const shelf = await getShelf(parseInt(id));
          setShelfId(shelf.id);
          setShelfInfo(shelf.shelfInfo);
        }
        catch (e) {
          props.clearAndAddErrorMessage(e.message);
          setFailedToLoadShelf(true);
        }
        setIsLoading(false);
      };
      initializeShelf();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  } , []);

  const handleShelfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShelfInfo({ ...shelfInfo, [event.target.name]: event.target.value });
  };

  const handleSave = async () => {
    setIsLoading(true);

    try {
      shelfId ? await updateShelf(shelfId!, ShelfInfo) : await addShelf(ShelfInfo)

      props.clearAndAddSuccessMessage("Shelf saved successfully");
      history.push(`${PathShelf}`);
    } catch (e) {
      props.clearAndAddErrorMessage(e.message);
    }
    setIsLoading(false);
  }

  const form = <form className={classes.root}>
    <div>
      <div>
        <TextField label="Name" required value={shelfInfo.name} name="name" onChange={handleShelfChange} />
        <TextField label="Description" required value={shelfInfo.description} name="description" onChange={handleShelfChange} />
      </div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Button variant="contained" color='primary' onClick={() => history.push(PathShelf)}>Back</Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color='primary' onClick={handleSave}>Save</Button>
        </Grid>
      </Grid>
    </div>
  </form>;

  return isLoading ? <CircularProgress /> 
                    : failedToLoadShelf ? null 
                    : form;
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        clearAllGlobalMessages: () => dispatch(clearAllGlobalMessage),
        clearAndAddSuccessMessage: (message: string) => dispatch(clearAndAddSuccessMessage(message)),
        clearAndAddErrorMessage: (message: string) => dispatch(clearAndAddErrorMessage(message))
    };
};

export default connect(null, mapDispatchToProps)(ShelfForm);