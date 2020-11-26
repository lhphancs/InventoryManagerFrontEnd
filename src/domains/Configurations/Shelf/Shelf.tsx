import React, { useEffect } from 'react';
import { clearAllGlobalMessage, clearAndAddErrorMessage } from '../../../redux/reducer/globalMessagesReducer';
import { connect } from 'react-redux';
import MaterialTable, { Column } from 'material-table';
import { useHistory } from "react-router-dom";
import { getAllShelfs, deleteShelf } from '../../../requests/ShelfRequests';
import { IShelf } from '../../../interfaces/IShelf';
import { PathShelf, PathShelfProducts } from '../../../paths';

interface IShelfProps {
    clearAllGlobalMessages: () => void;
    clearAndAddErrorMessage: (message: string) => void;
}

function Shelf(props: IShelfProps) {
    props.clearAllGlobalMessages();

    const history = useHistory();

    const [shelfs, setShelfs] = React.useState<IShelf[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const initializeShelfs = async () => {
        setIsLoading(true);
        try {
            const shelfs = await getAllShelfs();
            setShelfs(shelfs);
        }
        catch (e) {
            props.clearAndAddErrorMessage(e.message);
        }
        setIsLoading(false);
    };

    useEffect( () => {
        initializeShelfs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , []);

    const columns: Column<object>[] = [
        { title: 'Name', field: 'shelfInfo.name', render: (rowData: any) => <a href={`${PathShelf}/${rowData.id}`}>{rowData.shelfInfo.name}</a>},
        { title: 'Description', field: 'shelfInfo.description' },
        { title: 'Products', field: '', render: (rowData: any) => <a href={`${PathShelfProducts}/${rowData.id}`}>Modify</a>}
    ];

    return <div>
        <MaterialTable
            data={shelfs}
            columns={columns}
            isLoading={isLoading}
            editable={{
                onRowDelete: (oldData: any) =>
                    new Promise( async (resolve, reject) => {
                    try {
                        await deleteShelf(oldData.id);
                        await initializeShelfs();
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
                tooltip: 'Add Shelf',
                isFreeAction: true,
                onClick: (_) => history.push(`${PathShelf}/new`)
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

export default connect(null, mapDispatchToProps)(Shelf);