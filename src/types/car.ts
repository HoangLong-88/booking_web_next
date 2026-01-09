export interface CarObject {
    carName: string;
    seatQuantity: Number;
    luggageQuantity: Number;
    mileageLimit: string;
    checkInDestination: string;
    rate: Number;
    price: Number;
    image: string;
    days?: number;
    totalPrice?: number;
}

export type CarSuggestion = {
    carName: string,
    checkInDestination: string,
    country: string,
}