    export type ServiceType = "stay" | "car" | "attraction";

    export interface BookingItem {
    bookingID: string,
    serviceType: ServiceType;
    serviceID: string,
    quantity: number; // rất quan trọng
    metaJson?: Record<string, any>;
    }
