import { IShelf, IShelfLocation } from "../interfaces/IShelf";

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

export const addShelf = async (shelf: IShelf) : Promise<IShelf> => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/shelf/`;

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(shelf)
    });
    const body = await response.json();
    if (response.status === 200) {
        return body;
    }
    else {
        throw body;
    }
}

export const updateShelf = async (id: number, shelf: IShelf) : Promise<IShelf> => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/shelf/${id}`;

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(shelf)
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

export const shelfAddShelfLocation = async (id: number, shelfLocation: IShelfLocation) => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/shelf/${id}/add-shelf-location`;
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(shelfLocation)
    });
    if (response.status !== 200) {
        const body = await response.json();
        throw body;
    }
}

export const shelfDeleteShelfLocation = async (id: number, productIds: string[]) => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/wholesaler/${id}/remove-products`;

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