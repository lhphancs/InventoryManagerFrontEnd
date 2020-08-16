export interface IProduct {
    id: string;
    productInfo: IProductInfo;
    productPreparationInfo: IProductPreparationInfo;
    quantity: number;
    shelfLocationId: string
}

interface IProductInfo {
    upc: string;
    brand: string;
    name: string;
    description: string;
    expirationLocation: string;
    ounceWeight: number;
}

interface IProductPreparationInfo {
    requiresPadding: boolean;
    requiresBubbleWrap: boolean;
    requiresBox: boolean;
}