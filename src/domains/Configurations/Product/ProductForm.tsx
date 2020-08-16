import React from 'react';
import { clearAllGlobalMessages, clearAndAddErrorMessages } from '../../../redux/reducer/globalMessagesReducer';
import { connect } from 'react-redux';

interface IProductFormProps {
    clearAllGlobalMessages: () => void;
    clearAndAddErrorMessages: (message: string) => void;
}

function ProductForm(props: IProductFormProps) {
    props.clearAllGlobalMessages();

    
    return <div>
aaa
    </div>;
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        clearAllGlobalMessages: () => dispatch(clearAllGlobalMessages),
        clearAndAddErrorMessages: (message: string) => dispatch(clearAndAddErrorMessages(message))
    };
};

export default connect(null, mapDispatchToProps)(ProductForm);