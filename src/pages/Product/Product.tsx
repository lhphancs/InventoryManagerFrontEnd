import React, { useEffect } from 'react';
import { getAllProducts } from '../../requests/ProductRequests';
import { clearAllGlobalMessages, clearAndAddErrorMessages } from '../../redux/reducer/globalMessagesReducer';
import { connect } from 'react-redux';

interface IProductProps {
    clearAllGlobalMessages: () => void;
    clearAndAddErrorMessages: (message: string) => void;
}


function Product(props: IProductProps) {
    const [upc, setUpc] = React.useState('');

    useEffect( () => {
        const setProducts = async () => {
            const response = await getAllProducts();
            
            const body2 = await response.json();
            console.log(body2);
            if (response.status === 200) {
                const body = response.json();
                props.clearAllGlobalMessages();
            }
            else {
                props.clearAndAddErrorMessages("aaa");
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