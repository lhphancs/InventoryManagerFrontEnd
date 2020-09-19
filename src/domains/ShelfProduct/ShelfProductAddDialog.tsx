import { Dialog } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { IProduct } from '../../interfaces/IProduct';
import { clearAllGlobalMessage, clearAndAddErrorMessage, clearAndAddSuccessMessage } from '../../redux/reducer/globalMessagesReducer';

interface IShelfProductAddDialogProps {
    clearAllGlobalMessages: () => void;
    clearAndAddErrorMessage: (message: string) => void;

    product?: IProduct;
    onClose: () => void;
}

function ShelfProductAddDialog(props: IShelfProductAddDialogProps) {
    const [isLoading, setIsLoading] = React.useState(true);

    const handleAdd = () => {

    }
    
    return <Dialog onClose={props.onClose} open={props.product !== undefined}>
        <div>
            aaaaaaaa
        </div>
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