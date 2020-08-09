export const getAllProducts = async () : Promise<Response> => {
    const url = `${process.env.INVENTORY_MANAGER_API_URL}`;
    console.log('aaa', url);
    const response = await fetch(url, {
        method: 'GET'
    });
    return response;
}