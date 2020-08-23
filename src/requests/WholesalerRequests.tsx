import { IWholesalerInfo, IWholesaler } from "../interfaces/IWholesaler";

export const getAllWholesalers = async () : Promise<IWholesaler[]> => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/wholesaler`;

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

export const getWholesaler = async (id: number) : Promise<IWholesaler> => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/wholesaler/${id}`;

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

export const addWholesaler = async (wholesalerInfo: IWholesalerInfo) : Promise<IWholesaler> => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/wholesaler/`;

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(wholesalerInfo)
    });
    const body = await response.json();
    if (response.status === 200) {
        return body;
    }
    else {
        throw body;
    }
}

export const updateWholesalerInfo = async (id: number, wholesalerInfo: IWholesalerInfo) : Promise<IWholesaler> => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/wholesaler/${id}`;

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(wholesalerInfo)
    });
    const body = await response.json();
    if (response.status === 200) {
        return body;
    }
    else {
        throw body;
    }
}

export const deleteWholesaler = async (id: number) => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/wholesaler/${id}`;

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