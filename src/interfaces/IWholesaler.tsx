export interface IWholesaler {
    id: number;
    wholesalerInfo: IWholesalerInfo;
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