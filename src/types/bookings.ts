import type { ServiceType } from "./service";

export interface BookingItem<TMeta = unknown>  {
    bookingID: string,
    serviceType: ServiceType;
    serviceID: string,
    quantity: number; 
    metaJson?: TMeta;
}
