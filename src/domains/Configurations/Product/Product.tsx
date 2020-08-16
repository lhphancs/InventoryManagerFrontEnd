import React, { useEffect } from 'react';
import { getAllProducts, updateProductInfo } from '../../../requests/ProductRequests';
import { clearAllGlobalMessages, clearAndAddErrorMessages } from '../../../redux/reducer/globalMessagesReducer';
import { connect } from 'react-redux';
import { IProduct } from '../../../interfaces/IProduct';
import MaterialTable, { Column } from 'material-table';

interface IProductProps {
    clearAllGlobalMessages: () => void;
    clearAndAddErrorMessages: (message: string) => void;
}

function Product(props: IProductProps) {
    props.clearAllGlobalMessages();

    const [products, setProducts] = React.useState<IProduct[]>([]);
    useEffect( () => {
        const initializeProducts = async () => {
            const response = await getAllProducts();
            console.log("aaa", response);
            const body = await response.json();
            if (response.status === 200) {
                setProducts(body);
            }
            else {
                props.clearAndAddErrorMessages(body.message);
            }
        };
        initializeProducts();
    } , []);

    const columns: Column<object>[] = [
        { title: 'UPC', field: 'productInfo.upc' },
        { title: 'Brand', field: 'productInfo.brand' },
        { title: 'Name', field: 'productInfo.name' },
        { title: 'Description', field: 'productInfo.description' },
        { title: 'Expiration Location', field: 'productInfo.expirationLocation' },
        { title: 'Weight (oz)', field: 'productInfo.ounceWeight' },
    ];

    return <MaterialTable
        data={products}
        columns={columns}
        editable={{
            onRowAdd: (newData: any) =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        console.log("AAA", newData);
                        setProducts([...products, newData]);

                        resolve();
                    }, 1000);
                }),
            onRowUpdate: (newData: any, oldData: any) =>
                new Promise((resolve, reject) => {
                    setTimeout(async () => {
                        console.log(newData);
                        const response = await updateProductInfo(newData);
                        const body = await response.json();
                        if (response.status === 200) {
                            const newProducts = [...products];
                            newProducts[products.indexOf(oldData)] = body;
                            setProducts(newProducts);
                            resolve();
                        }
                        else {
                            props.clearAndAddErrorMessages(body.message);
                            reject();
                        }

                        resolve();
                    }, 1000);
                }),
            onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                    
                })
        }}
    />;
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        clearAllGlobalMessages: () => dispatch(clearAllGlobalMessages),
        clearAndAddErrorMessages: (message: string) => dispatch(clearAndAddErrorMessages(message))
    };
};

export default connect(null, mapDispatchToProps)(Product);