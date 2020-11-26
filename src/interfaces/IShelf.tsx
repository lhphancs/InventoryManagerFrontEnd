import { IProduct } from "./IProduct";

export interface IShelf {
    id: number;
    shelfInfo: IShelfInfo;
    shelfProducts: IShelfProduct[]
}

export interface IShelfInfo {
    name: string;
    description: string;
}

export interface IShelfProduct {
    id: number;
    productId: string;
    row: number;
    column: number;
    product?: IProduct;
}