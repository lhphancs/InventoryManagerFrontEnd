import React, { useEffect } from 'react';
import { clearAllGlobalMessage, clearAndAddErrorMessage, clearAndAddSuccessMessage } from '../../../redux/reducer/globalMessagesReducer';
import MaterialTable, { Column } from 'material-table';
import { useParams } from "react-router-dom";
import { IWholesaler } from '../../../interfaces/IWholesaler';
import { getWholesaler, wholesalerDeleteProducts } from '../../../requests/WholesalerRequests';
import { IProduct } from '../../../interfaces/IProduct';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import WholesalerProductsAddForm from './WholesalerProductsAddForm';

interface IWholesalerProductsProps {
    clearAllGlobalMessages: () => void;
    clearAndAddSuccessMessage: (message: string) => void;
    clearAndAddErrorMessage: (message: string) => void;
}

function WholesalerProducts(props: IWholesalerProductsProps) {
    props.clearAllGlobalMessages();

    let { id } = useParams();

    const [wholesaler, setWholesaler] = React.useState<IWholesaler>();
    const [isLoading, setIsLoading] = React.useState(true);
    const [displayAddForm, setDisplayAddForm] = React.useState(false);

    const initializeWholesalerProducts = async () => {
            setIsLoading(true);
            try {
                const wholesaler = await getWholesaler(id);
                setWholesaler(wholesaler);
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


    const handleAddResponse = async () => {
        await initializeWholesalerProducts(); 
        setDisplayAddForm(false);
    }
    
    const currentProductsTable = <Grid container spacing={3}>
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
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add Products',
                        isFreeAction: true,
                        onClick: (_: any, data: any) => setDisplayAddForm(true)
                    }
                ]}
            />
        </Grid>
    </Grid>;

    return displayAddForm 
        ? <WholesalerProductsAddForm wholesaler={wholesaler!} handleAddResponse={handleAddResponse} setDisplayAddForm={setDisplayAddForm} /> 
        : currentProductsTable;
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        clearAllGlobalMessages: () => dispatch(clearAllGlobalMessage),
        clearAndAddSuccessMessage: (message: string) => dispatch(clearAndAddSuccessMessage(message)),
        clearAndAddErrorMessage: (message: string) => dispatch(clearAndAddErrorMessage(message))
    };
};

export default connect(null, mapDispatchToProps)(WholesalerProducts);