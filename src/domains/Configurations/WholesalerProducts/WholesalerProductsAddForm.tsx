import React, { useEffect } from 'react';
import { clearAllGlobalMessage, clearAndAddErrorMessage, clearAndAddSuccessMessage } from '../../../redux/reducer/globalMessagesReducer';
import MaterialTable, { Column } from 'material-table';
import { wholesalerAddProducts } from '../../../requests/WholesalerRequests';
import { IProduct } from '../../../interfaces/IProduct';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { getAllProducts } from '../../../requests/ProductRequests';
import Button from '@material-ui/core/Button/Button';
import { IWholesaler } from '../../../interfaces/IWholesaler';

interface IWholesalerProductsAddFormProps {
    clearAllGlobalMessages: () => void;
    clearAndAddSuccessMessage: (message: string) => void;
    clearAndAddErrorMessage: (message: string) => void;

    wholesaler: IWholesaler;
    setDisplayAddForm: (value: boolean) => void;
    handleAddResponse: () => void;
}

function WholesalerProductsAddForm(props: IWholesalerProductsAddFormProps) {
    props.clearAllGlobalMessages();

    const [productsNotInWholesaler, setProductsNotInWholesaler] = React.useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const initializeAvailableProducts = async () => {
            setIsLoading(true);
            try {
                const wholesalerProductIds = props.wholesaler.products.map(x => x.id);
                const allProducts = await getAllProducts();
                const filteredProducts = allProducts.filter(x => !wholesalerProductIds.includes(x.id));
                setProductsNotInWholesaler(filteredProducts);
            }
            catch (e) {
                props.clearAndAddErrorMessage(e.message);
            }
            setIsLoading(false);
        };
        

    useEffect( () => {
        initializeAvailableProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , []);

    const columns: Column<object>[] = [
        { title: 'Name', field: 'productInfo.name' },
        { title: 'Upc', field: 'productInfo.upc' }
    ];

    const handleAdd = async (productIds: string[]) => {
        setIsLoading(true);

        try {
            await wholesalerAddProducts(props.wholesaler.id, productIds);
            
            props.clearAndAddSuccessMessage("Products added successfully");
            props.handleAddResponse();
        } catch (e) {
            props.clearAndAddErrorMessage(e.message);
        }
        setIsLoading(false);
    }
    
    return <div>
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <MaterialTable
                    title='Add Products'
                    data={productsNotInWholesaler}
                    columns={columns}
                    isLoading={isLoading}
                    options={{
                        selection: true
                    }}
                    actions={[
                        {
                            tooltip: 'Add All Selected Products',
                            icon: 'post_add',
                            onClick: (_: any, data: any) => handleAdd(data.map( (x: IProduct) => x.productInfo.upc))
                        }
                    ]}
                />
            </Grid>
        </Grid>
        <Button variant="contained" color='primary' onClick={() => props.setDisplayAddForm(false)}>Cancel</Button>
    </div>;
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        clearAllGlobalMessages: () => dispatch(clearAllGlobalMessage),
        clearAndAddSuccessMessage: (message: string) => dispatch(clearAndAddSuccessMessage(message)),
        clearAndAddErrorMessage: (message: string) => dispatch(clearAndAddErrorMessage(message))
    };
};

export default connect(null, mapDispatchToProps)(WholesalerProductsAddForm);