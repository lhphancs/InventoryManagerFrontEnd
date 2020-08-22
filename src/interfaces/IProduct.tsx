export interface IProduct {
    id: number;
    productInfo: IProductInfo;
    quantity: number;
    shelfLocationId: string
}

export interface IProductInfo {
    upc: string;
    brand: string;
    name: string;
    description: string;
    expirationLocation: string;
    ounceWeight: number;
    
    requiresPadding: boolean;
    requiresBubbleWrap: boolean;
    requiresBox: boolean;
}