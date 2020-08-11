import React, { useEffect } from 'react';
import { getAllProducts } from '../../requests/ProductRequests';
import { clearAllGlobalMessages, clearAndAddErrorMessages } from '../../redux/reducer/globalMessagesReducer';
import { connect } from 'react-redux';

interface IProductProps {
    clearAllGlobalMessages: () => void;
    clearAndAddErrorMessages: (message: string) => void;
}


function Product(props: IProductProps) {
    props.clearAllGlobalMessages();

    const [upc, setUpc] = React.useState('');

    useEffect( () => {
        const setProducts = async () => {
            const response = await getAllProducts();
            const body = await response.json();
            
            if (response.status === 200) {
                console.log(body);
            }
            else {
                props.clearAndAddErrorMessages(body.message);
            }
        };
        setProducts();
    } , []);

    return <div>
        aaaaaaa
    </div>;
}


const mapDispatchToProps = (dispatch: any) => {
    return {
        clearAllGlobalMessages: () => dispatch(clearAllGlobalMessages),
        clearAndAddErrorMessages: (message: string) => dispatch(clearAndAddErrorMessages(message))
    };
};

export default connect(null, mapDispatchToProps)(Product);