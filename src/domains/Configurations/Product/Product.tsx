import React, { useEffect } from 'react';
import { getAllProducts } from '../../../requests/ProductRequests';
import { clearAllGlobalMessages, clearAndAddErrorMessages } from '../../../redux/reducer/globalMessagesReducer';
import { connect } from 'react-redux';
import { IProduct } from '../../../interfaces/IProduct';
import MaterialTable, { Column } from 'material-table';
import { PathProduct } from '../../../paths';

interface IProductProps {
    clearAllGlobalMessages: () => void;
    clearAndAddErrorMessages: (message: string) => void;
}

function Product(props: IProductProps) {
    props.clearAllGlobalMessages();

    const [products, setProducts] = React.useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    useEffect( () => {
        const initializeProducts = async () => {
            setIsLoading(true);
            const response = await getAllProducts();
            const body = await response.json();
            if (response.status === 200) {
                setProducts(body);
            }
            else {
                props.clearAndAddErrorMessages(body.message);
            }
            setIsLoading(false);
        };
        initializeProducts();
    } , []);

    const columns: Column<object>[] = [
    { title: 'UPC', field: 'productInfo.upc', render: (rowData: any) => <a href={`${PathProduct}/${rowData.id}`}>{rowData.productInfo.upc}</a>},
        { title: 'Brand', field: 'productInfo.brand' },
        { title: 'Name', field: 'productInfo.name' },
        { title: 'Description', field: 'productInfo.description' },
        { title: 'Expiration Location', field: 'productInfo.expirationLocation' },
        { title: 'Weight (oz)', field: 'productInfo.ounceWeight', type: 'numeric' },
    ];

    return <MaterialTable
        data={products}
        columns={columns}
        isLoading={isLoading}
    />;
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        clearAllGlobalMessages: () => dispatch(clearAllGlobalMessages),
        clearAndAddErrorMessages: (message: string) => dispatch(clearAndAddErrorMessages(message))
    };
};

export default connect(null, mapDispatchToProps)(Product);