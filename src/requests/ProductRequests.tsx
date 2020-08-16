import { IProduct } from "../interfaces/IProduct";

export const getAllProducts = async () : Promise<Response> => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/product`;

    const response = await fetch(url, {
        method: 'GET'
    });
    return response;
}

export const addProduct = async (product: IProduct) : Promise<Response> => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/product/`;

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(product.productInfo)
    });
    return response;
}

export const updateProductInfo = async (updatedProduct: IProduct) : Promise<Response> => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/product/${updatedProduct.id}`;

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(updatedProduct.productInfo)
    });
    return response;
}