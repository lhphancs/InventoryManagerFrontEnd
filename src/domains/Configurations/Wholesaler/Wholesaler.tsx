import React, { useEffect } from 'react';
import { clearAllGlobalMessage, clearAndAddErrorMessage } from '../../../redux/reducer/globalMessagesReducer';
import { connect } from 'react-redux';
import MaterialTable, { Column } from 'material-table';
import { useHistory } from "react-router-dom";
import { IWholesaler } from '../../../interfaces/IWholesaler';
import { PathWholesaler } from '../../../paths';
import { getAllWholesalers, deleteWholesaler } from '../../../requests/WholesalerRequests';
import WholesalerSearchByProductForm from './WholesalerSearchByProductForm';

interface IWholesalerProps {
    clearAllGlobalMessages: () => void;
    clearAndAddErrorMessage: (message: string) => void;
}

function Wholesaler(props: IWholesalerProps) {
    props.clearAllGlobalMessages();

    const history = useHistory();

    const [wholesalers, setWholesalers] = React.useState<IWholesaler[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect( () => {
        const initializeWholesalers = async () => {
            setIsLoading(true);
            try {
                const Wholesalers = await getAllWholesalers();
                setWholesalers(Wholesalers);
            }
            catch (e) {
                props.clearAndAddErrorMessage(e.message);
            }
            setIsLoading(false);
        };
        initializeWholesalers();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , []);

    const columns: Column<object>[] = [
    { title: 'Name', field: 'wholesalerInfo.name', render: (rowData: any) => <a href={`${PathWholesaler}/${rowData.id}`}>{rowData.wholesalerInfo.name}</a>},
        { title: 'City', field: 'wholesalerInfo.address.city' },
        { title: 'street', field: 'wholesalerInfo.address.street' },
        { title: 'zipCode', field: 'wholesalerInfo.address.zipCode' },
    ];

    const searchWholesalerByUpc = (upc: string) => {
        // Do an api GetWholeSalerByUpc api call here
        console.log("AAA");
    }
    
    return <div>
        <WholesalerSearchByProductForm searchWholesalerByUpc={searchWholesalerByUpc} />

        <MaterialTable
            data={wholesalers}
            columns={columns}
            isLoading={isLoading}
            editable={{
                onRowDelete: (oldData: any) =>
                    new Promise( async (resolve, reject) => {
                    try {
                        deleteWholesaler(oldData.id);
                        const newWholesalers = [...wholesalers];
                        newWholesalers.splice(wholesalers.indexOf(oldData), 1);
                        setWholesalers(newWholesalers);
                        resolve();
                    }
                    catch (e) {
                        props.clearAndAddErrorMessage(e.message);
                        reject();
                    }
                })
            }}
            actions={[
                {
                icon: 'add',
                tooltip: 'Add User',
                isFreeAction: true,
                onClick: (_) => history.push(`${PathWholesaler}/new`)
                }
            ]}
            />
        </div>;
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        clearAllGlobalMessages: () => dispatch(clearAllGlobalMessage),
        clearAndAddErrorMessage: (message: string) => dispatch(clearAndAddErrorMessage(message))
    };
};

export default connect(null, mapDispatchToProps)(Wholesaler);