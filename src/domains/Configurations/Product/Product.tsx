import React, { useEffect } from 'react';
import { getAllProducts } from '../../../requests/ProductRequests';
import { clearAllGlobalMessage, clearAndAddErrorMessage } from '../../../redux/reducer/globalMessagesReducer';
import { connect } from 'react-redux';
import { IProduct } from '../../../interfaces/IProduct';
import MaterialTable, { Column } from 'material-table';
import { PathProduct } from '../../../paths';
import { useHistory } from "react-router-dom";

interface IProductProps {
    clearAllGlobalMessages: () => void;
    clearAndAddErrorMessage: (message: string) => void;
}

function Product(props: IProductProps) {
    props.clearAllGlobalMessages();

    const history = useHistory();

    const [products, setProducts] = React.useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    useEffect( () => {
        const initializeProducts = async () => {
            setIsLoading(true);
            try {
                const products = await getAllProducts();
                setProducts(products);
            }
            catch (e) {
                props.clearAndAddErrorMessage(e.message);
            }
            setIsLoading(false);
        };
        initializeProducts();

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        actions={[
        {
          icon: 'add',
          tooltip: 'Add User',
          isFreeAction: true,
          onClick: (_) => history.push(`${PathProduct}/new`)
        }
      ]}
    />;
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        clearAllGlobalMessages: () => dispatch(clearAllGlobalMessage),
        clearAndAddErrorMessage: (message: string) => dispatch(clearAndAddErrorMessage(message))
    };
};

export default connect(null, mapDispatchToProps)(Product);