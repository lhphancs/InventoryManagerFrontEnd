export const getAllProducts = async () : Promise<Response> => {
    const url = `${process.env.REACT_APP_INVENTORY_MANAGER_API_URL}/product`;

    const response = await fetch(url, {
        method: 'GET'
    });
    return response;
}