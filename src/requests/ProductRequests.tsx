export const getAllProducts = async () : Promise<Response> => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}`;

    const response = await fetch(url, {
        method: 'GET'
    });
    return response;
}