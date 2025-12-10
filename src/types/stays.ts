export interface StayObject {
    stayName: string;
    location: string;
    address: string;
    rating: string;
    price: string;
    image: string;
    days?: number; // Số ngày lưu trú
    totalPrice?: number; // Tổng giá (PascalCase để khớp với BE)
}