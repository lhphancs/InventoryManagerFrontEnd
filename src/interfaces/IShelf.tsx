export interface IShelf {
    id: number;
    shelfInfo: IShelfInfo;
    shelfLocations: IShelfLocation[]
}

export interface IShelfInfo {
    name: string;
    description: string;
}

export interface IShelfLocation {
    id: string;
    row: number;
    position: number;
}