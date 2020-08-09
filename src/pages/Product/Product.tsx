import React, { useEffect } from 'react';
import { getAllProducts } from '../../requests/ProductRequests';

export function Product() {
    const [upc, setUpc] = React.useState('');

    useEffect( () => {
        const setProducts = async () => {
            const response = await getAllProducts();
            
            if (response.status === 200) {
                const body = response.json();
                console.log(body);
            }
            else {
                
            }
        };
        setProducts();
        console.log('ccc', process.env.INVENTORY_MANAGER_API_URL)
        
    } , []);

    return <div>
        aaaaaaa
    </div>;
}