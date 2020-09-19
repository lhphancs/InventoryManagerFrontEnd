import { Grid } from '@material-ui/core';
import MaterialTable, { Column } from 'material-table';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IProduct } from '../../interfaces/IProduct';
import { clearAllGlobalMessage, clearAndAddErrorMessage, clearAndAddSuccessMessage } from '../../redux/reducer/globalMessagesReducer';
import { getAllProducts } from '../../requests/ProductRequests';
import ShelfProductAddDialog from './ShelfProductAddDialog';

interface IShelfProductProps {
    clearAllGlobalMessages: () => void;
    clearAndAddErrorMessage: (message: string) => void;
}

function ShelfProduct(props: IShelfProductProps) {
    const [products, setProducts] = React.useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [productForModal, setProductForModal] = React.useState<IProduct | undefined>(undefined);

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

    useEffect( () => {
        initializeProducts();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , []);

    const columns: Column<object>[] = [
        { title: 'Name', field: 'productInfo.name' },
        { title: 'Upc', field: 'productInfo.upc' }
    ];

    const handleAdd = (product: IProduct) => {
        setProductForModal(product);
    }
    
    return <Grid container spacing={3}>
      <Grid item xs={3}>
        <div>
            Display Shelf, and it's products here
        </div>
      </Grid>
      <Grid item xs={9}>
        <MaterialTable
            title='Products'
            data={products}
            columns={columns}
            isLoading={isLoading}
            actions={[
                {
                    tooltip: 'Add Product',
                    icon: 'post_add',
                    onClick: (_: any, data: any) => handleAdd(data)
                }
            ]}
        />
      </Grid>
      <ShelfProductAddDialog product={productForModal} onClose={() => setProductForModal(undefined)} />
    </Grid>;
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        clearAllGlobalMessages: () => dispatch(clearAllGlobalMessage),
        clearAndAddSuccessMessage: (message: string) => dispatch(clearAndAddSuccessMessage(message)),
        clearAndAddErrorMessage: (message: string) => dispatch(clearAndAddErrorMessage(message))
    };
};

export default connect(null, mapDispatchToProps)(ShelfProduct);