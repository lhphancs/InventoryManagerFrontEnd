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
    row: number;
    column: number;
    productId: string;
}