import { IProductInfo, IProduct } from "../interfaces/IProduct";

export const getAllProducts = async () : Promise<IProduct[]> => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/product`;

    const response = await fetch(url, {
        method: 'GET'
    });
    const body = await response.json();
    if (response.status === 200) {
        return body;
    }
    else {
        throw body;
    }
}

export const getProduct = async (id: number) : Promise<IProduct> => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/product/${id}`;

    const response = await fetch(url, {
        method: 'GET'
    });
    const body = await response.json();
    if (response.status === 200) {
        return body;
    }
    else {
        throw body;
    }
}

export const addProduct = async (productInfo: IProductInfo, quantity: number) : Promise<IProduct> => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/product/`;

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(productInfo)
    });
    const body = await response.json();
    if (response.status === 200) {
        return body;
    }
    else {
        throw body;
    }
}

export const updateProductInfo = async (id: number, productInfo: IProductInfo) : Promise<IProduct> => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/product/${id}`;

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(productInfo)
    });
    const body = await response.json();
    if (response.status === 200) {
        return body;
    }
    else {
        throw body;
    }
}

export const deleteProduct = async (id: number) => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/product/${id}`;

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    });
    if (response.status !== 200) {
        const body = await response.json();
        throw body;
    }
}