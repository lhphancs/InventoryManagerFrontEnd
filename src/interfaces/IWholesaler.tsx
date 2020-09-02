import { IProduct } from "./IProduct";

export interface IWholesaler {
    id: number;
    wholesalerInfo: IWholesalerInfo;
    products: IProduct[];
}

export interface IWholesalerInfo {
    name: string;
    address: IAddress;
}

export interface IAddress {
    street: string;
    city: string;
    zipCode: string;
}