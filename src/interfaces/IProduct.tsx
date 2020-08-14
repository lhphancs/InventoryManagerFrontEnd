export interface IProduct{
    Id: string;
    Upc: string;
    ProductInfo: IProductInfo;
    ProductPreparationInfo: IProductPreparationInfo;
    Quantity: number;
    ShelfLocationId: string
}

interface IProductInfo {
    Brand: string;
    Name: string;
    Description: string;
    ExpirationLocation: string;
    OunceWeight: number;
}

interface IProductPreparationInfo {
    RequiresPadding: boolean;
    RequiresBubbleWrap: boolean;
    RequiresBox: boolean;
}