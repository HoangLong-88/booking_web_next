    export type ServiceType = "stay" | "car" | "attraction";

    export interface BookingItem {
    serviceType: ServiceType;
    serviceID: string
    quantity: number; // rất quan trọng
    meta?: Record<string, any>;
    }
