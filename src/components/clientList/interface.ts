import { IClients } from "@dynamic/services/interface";

export interface RouteType {
    goto: string;
}
export interface ClientListProps {
    listClients: Array<IClients>;
}