import { CircularProgress, Grid } from '@material-ui/core';
import MaterialTable, { Column } from 'material-table';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { IProduct } from '../../interfaces/IProduct';
import { IShelf } from '../../interfaces/IShelf';
import { clearAllGlobalMessage, clearAndAddErrorMessage, clearAndAddSuccessMessage } from '../../redux/reducer/globalMessagesReducer';
import { getShelf } from '../../requests/ShelfRequests';
import ShelfProductAddForm from './ShelfProductAddForm';

interface IShelfProductProps {
    clearAllGlobalMessages: () => void;
    clearAndAddErrorMessage: (message: string) => void;
}

function ShelfProduct(props: IShelfProductProps) {
    let { id } = useParams();
    props.clearAllGlobalMessages();
    
    const [shelf, setShelf] = React.useState<IShelf>();
    const [isLoading, setIsLoading] = React.useState(true);
    const [displayAddShelfProductForm, setDisplayAddShelfProductForm] = React.useState<boolean>(false);

    const initializeShelf = async () => {
        setIsLoading(true);
        try {
            const shelf = await getShelf(id);
            setShelf(shelf);
        }
        catch (e) {
            props.clearAndAddErrorMessage(e.message);
        }
        setIsLoading(false);
    };

    useEffect( () => {
        initializeShelf();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , []);

    const columns: Column<object>[] = [
        { title: 'Name', field: 'productInfo.name' },
        { title: 'Upc', field: 'productInfo.upc' }
    ];

    const renderShelf = () => {
        return <div>
            Display Shelf, and it's products here
        </div>;
    }

    const renderPage = () => {
        if (displayAddShelfProductForm) {
            return <ShelfProductAddForm setDisplayAddShelfProductForm={setDisplayAddShelfProductForm} />;
        }

        const table = <Grid container spacing={3}>
            <Grid item xs={3}>
                {renderShelf()}
            </Grid>
            <Grid item xs={9}>
                <MaterialTable
                    title='Products'
                    data={shelf!.shelfProducts}
                    columns={columns}
                    isLoading={isLoading}
                    actions={[
                        {
                            icon: 'add',
                            tooltip: 'Add Product',
                            isFreeAction: true,
                            onClick: (_: any, data: any) => setDisplayAddShelfProductForm(true)
                        }
                    ]}
                />
            </Grid>
        </Grid>;
        return table;
    }
    
    return isLoading ? <CircularProgress /> : renderPage();
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        clearAllGlobalMessages: () => dispatch(clearAllGlobalMessage),
        clearAndAddSuccessMessage: (message: string) => dispatch(clearAndAddSuccessMessage(message)),
        clearAndAddErrorMessage: (message: string) => dispatch(clearAndAddErrorMessage(message))
    };
};

export default connect(null, mapDispatchToProps)(ShelfProduct);