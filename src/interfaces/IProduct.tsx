export interface IProduct {
    id: string;
    productInfo: IProductInfo;
    productPreparationInfo: IProductPreparationInfo;
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
}

export interface IProductPreparationInfo {
    requiresPadding: boolean;
    requiresBubbleWrap: boolean;
    requiresBox: boolean;
}