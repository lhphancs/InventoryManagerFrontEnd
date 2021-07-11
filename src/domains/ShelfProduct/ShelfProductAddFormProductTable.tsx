import React from 'react';
import MaterialTable from 'material-table';

interface ShelfProductAddFormProductTableProps {
}
export default function ShelfProductAddFormProductTable(props: ShelfProductAddFormProductTableProps) {
    return (
        <MaterialTable
          title="Select product"
          columns={[
            { title: 'Brand', field: 'brand' },
            { title: 'Name', field: 'name' },
            { title: 'Upc', field: 'upc' }
          ]}
          data={[
            { name: 'Mehmet', upc: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Zerya Betül', upc: 'Baran', birthYear: 2017, birthCity: 34 },
          ]}        
          options={{
            selection: true,
            selectionProps: (rowData: any) => ({
              disabled: rowData.name === 'Mehmet',
              color: 'primary'
            })
          }}
        />
      )
}