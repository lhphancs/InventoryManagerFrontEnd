import React, { useEffect } from 'react';
import { getAllProducts } from '../../requests/ProductRequests';
import { clearGlobalError, setGlobalError } from '../../redux/reducer/globalErrorReducer';
import { connect } from 'react-redux';

function Product(props: any) {
    console.log("ZZZZ", props);
    const [upc, setUpc] = React.useState('');

    useEffect( () => {
        const setProducts = async () => {
            const response = await getAllProducts();
            
            if (response.status === 200) {
                const body = response.json();
                props.clearGlobalError();
            }
            else {
                props.setGlobalError("AAA");
            }
        };
        setProducts();
        console.log('ccc', process.env.INVENTORY_MANAGER_API_URL)
        
    } , []);

    return <div>
        aaaaaaa
    </div>;
}


const mapDispatchToProps = (dispatch: any) => {
    return {
        clearGlobalError: () => dispatch(clearGlobalError),
        setGlobalError: (message: string) => dispatch(setGlobalError(message))
    };
};

export default connect(null, mapDispatchToProps)(Product);