import React, { useEffect } from 'react';
import { getAllProducts } from '../../../requests/ProductRequests';
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
            const body = await response.json();
            if (response.status === 200) {
                console.log(body);
                setProducts(body);
            }
            else {
                props.clearAndAddErrorMessages(body.message);
            }
        };
        initializeProducts();
    } , []);

    const columns: Column<object>[] = [
        { title: 'Name', field: 'name' },
        { title: 'Surname', field: 'surname', initialEditValue: 'initial edit value' },
        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
        title: 'Birth Place',
        field: 'birthCity',
        lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        },
    ];

    console.log(products);
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
            onBulkUpdate: changes => 
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        /* setData([...data, newData]); */

                        resolve();
                    }, 1000);
                }),
            onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                    
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