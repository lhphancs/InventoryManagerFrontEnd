import { IProductInfo } from "../interfaces/IProduct";

export const getAllProducts = async () : Promise<Response> => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/product`;

    const response = await fetch(url, {
        method: 'GET'
    });
    return response;
}

export const getProduct = async (id: number) : Promise<Response> => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/product/${id}`;

    const response = await fetch(url, {
        method: 'GET'
    });
    return response;
}

export const addProduct = async (productInfo: IProductInfo) : Promise<Response> => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/product/`;

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(
            {
                productInfo: productInfo
            }
        )
    });
    return response;
}

export const updateProductInfo = async (id: number, productInfo: IProductInfo) : Promise<Response> => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/product/${id}`;

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(productInfo)
    });
    return response;
}