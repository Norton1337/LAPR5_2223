export interface ITripPersistence{
    id: string;
    tripID: string;
    date: string;
    pathIDlist: Array<string>;
    truckID: string;
    deliveryIDlist: Array<string>;
}