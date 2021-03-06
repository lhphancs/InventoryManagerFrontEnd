import { IShelf, IShelfProduct, IShelfInfo } from "../interfaces/IShelf";

export const getShelf = async (id: number) : Promise<IShelf> => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/shelf/${id}`;

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

export const getAllShelfs = async () : Promise<IShelf[]> => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/shelf`;

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

export const addShelf = async (shelfInfo: IShelfInfo) : Promise<IShelf> => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/shelf`;

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(shelfInfo)
    });
    const body = await response.json();
    if (response.status === 200) {
        return body;
    }
    else {
        throw body;
    }
}

export const updateShelf = async (id: number, shelfInfo: IShelfInfo) : Promise<IShelf> => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/shelf/${id}`;

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(shelfInfo)
    });
    const body = await response.json();
    if (response.status === 200) {
        return body;
    }
    else {
        throw body;
    }
}

export const deleteShelf = async (id: number) => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/shelf/${id}`;

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

export const shelfAddShelfProduct = async (id: number, shelfProduct: IShelfProduct) => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/shelf/${id}/add-shelf-product`;
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(shelfProduct)
    });
    if (response.status !== 200) {
        const body = await response.json();
        throw body;
    }
}

export const shelfDeleteShelfProduct = async (id: number, productIds: string[]) => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/wholesaler/${id}/remove-productsaaaaaa`;

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify(productIds)
    });
    if (response.status !== 200) {
        const body = await response.json();
        throw body;
    }
}