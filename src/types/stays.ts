export interface StayObject {
    stayName: string;
    location: string;
    address: string;
    rating: string;
    price: number;
    image: string;
    days?: number; // Số ngày lưu trú
    totalPrice?: number; // Tổng giá (PascalCase để khớp với BE)
}