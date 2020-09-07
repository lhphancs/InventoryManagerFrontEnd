import React, { useEffect } from 'react';
import { clearAllGlobalMessage, clearAndAddErrorMessage, clearAndAddSuccessMessage } from '../../../redux/reducer/globalMessagesReducer';
import MaterialTable, { Column } from 'material-table';
import { useParams } from "react-router-dom";
import { IWholesaler } from '../../../interfaces/IWholesaler';
import { getWholesaler, wholesalerAddProducts, wholesalerDeleteProducts } from '../../../requests/WholesalerRequests';
import { IProduct } from '../../../interfaces/IProduct';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { getAllProducts } from '../../../requests/ProductRequests';

interface IWholesalerProductsProps {
    clearAllGlobalMessages: () => void;
    clearAndAddSuccessMessage: (message: string) => void;
    clearAndAddErrorMessage: (message: string) => void;
}

function WholesalerProducts(props: IWholesalerProductsProps) {
    props.clearAllGlobalMessages();

    let { id } = useParams();

    const [wholesaler, setWholesaler] = React.useState<IWholesaler>();
    const [productsNotInWholesaler, setProductsNotInWholesaler] = React.useState<IProduct[]>([]);

    const [isLoading, setIsLoading] = React.useState(true);

    const initializeWholesalerProducts = async () => {
            setIsLoading(true);
            try {
                const wholesaler = await getWholesaler(id);
                setWholesaler(wholesaler);

                const wholesalerProductIds = wholesaler.products.map(x => x.id);
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
        initializeWholesalerProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , []);

    const columns: Column<object>[] = [
        { title: 'Name', field: 'productInfo.name' },
        { title: 'Upc', field: 'productInfo.upc' }
    ];

    const handleAdd = async (productIds: string[]) => {
        setIsLoading(true);

        try {
            await wholesalerAddProducts(id, productIds);
            await initializeWholesalerProducts();
            props.clearAndAddSuccessMessage("Products added successfully");
        } catch (e) {
            props.clearAndAddErrorMessage(e.message);
        }
        setIsLoading(false);
    }

    const handleRemove = async (productIds: string[]) => {
        setIsLoading(true);

        try {
            await wholesalerDeleteProducts(id, productIds);
            await initializeWholesalerProducts();
            props.clearAndAddSuccessMessage("Products removed successfully");
        } catch (e) {
            props.clearAndAddErrorMessage(e.message);
        }
        setIsLoading(false);
    }

    const tables = () => {
        return <Grid container spacing={3}>
            <Grid item xs={6}>
                <MaterialTable
                    title='Current Products'
                    data={wholesaler ? wholesaler.products : []}
                    columns={columns}
                    isLoading={isLoading}
                    options={{
                        selection: true
                    }}
                    actions={[
                        {
                            tooltip: 'Remove All Selected Products',
                            icon: 'delete',
                            onClick: (_: any, data: any) => handleRemove(data.map( (x: IProduct) => x.productInfo.upc))
                        }
                    ]}
                />
            </Grid>
            <Grid item xs={6}>
                <MaterialTable
                    title='Products Available'
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
        </Grid>;
    }
    return tables();
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        clearAllGlobalMessages: () => dispatch(clearAllGlobalMessage),
        clearAndAddSuccessMessage: (message: string) => dispatch(clearAndAddSuccessMessage(message)),
        clearAndAddErrorMessage: (message: string) => dispatch(clearAndAddErrorMessage(message))
    };
};

export default connect(null, mapDispatchToProps)(WholesalerProducts);