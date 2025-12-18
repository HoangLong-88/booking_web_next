import { cn } from "@/libs/utils";
import { AttractionObject } from "@/types/attraction";
import { CarObject } from "@/types/car";
import { StayObject } from "@/types/stays";
import { Users, Luggage, Gauge, MapPin, Star, Bath, Wifi, BedDouble, ChevronDown } from "lucide-react";
import React from "react";
import { RoomType } from "./Dropdown";
import Link from "next/link";

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('max-w-sm rounded-3xl overflow-hidden shadow-xl transition', className)}
        {...props}
    />
))
Card.displayName = 'Card';


const CardTitle = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("font-bold text-xl", className)}
        {...props}
    />
))
CardTitle.displayName = 'CardTitle';


const CardSubTitle = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-stone-400 text-xs font-bold", className)}
        {...props}
    />
))
CardSubTitle.displayName = 'CardSubTitle';

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("p-4", className)}
        {...props}
    />
))
CardContent.displayName = 'CardContent';

interface StayCardProps {
    stay: StayObject;
}
interface AttractionCardProps {
    attraction: AttractionObject;
}
interface CarCardProps {
    car: CarObject;
}

const StayCard: React.FC<StayCardProps> = ({ stay }) => {
    const days = Number(stay.days ?? 0);
    const priceBase = Number(stay.totalPrice ?? stay.price ?? 0);

    const displayPrice =
        priceBase > 0 && days > 0
            ? `${priceBase.toLocaleString("vi-VN")} VNĐ (${days} đêm)`
            : `${Number(stay.price ?? 0).toLocaleString("vi-VN")} VNĐ / đêm`;

    return (
        <div className="border rounded-2xl shadow-md hover:shadow-lg transition p-4 flex gap-4 bg-white relative">
            {/* Dropdown chọn loại phòng */}
            <RoomType />

            {/* Ảnh */}
            <img
                src={stay.image}
                alt={stay.stayName}
                className="w-52 h-47 object-cover rounded-xl"
            />

            {/* Nội dung */}
            <div className="flex flex-col justify-between w-full">
                {/* Tiêu đề + địa điểm */}
                <div>
                    <h2 className="text-xl font-semibold">{stay.stayName}</h2>

                    <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        <MapPin size={14} />
                        <span>{stay.location}</span>

                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-yellow-50 text-yellow-700 text-xs font-semibold">
                            <Star size={14} className="text-yellow-500" />
                            {stay.rating}
                        </span>
                    </p>


                    <p className="text-xs text-gray-500 mt-1">{stay.address}</p>

                    {/* tiện ích gợi ý như Booking */}
                    <div className="flex gap-3 text-sm text-gray-600 mt-3">
                        <span className="flex items-center gap-1">
                            <BedDouble size={16} /> Giường đôi
                        </span>
                        <span className="flex items-center gap-1">
                            <Wifi size={16} /> Wifi miễn phí
                        </span>
                        <span className="flex items-center gap-1">
                            <Bath size={16} /> Phòng tắm riêng
                        </span>
                    </div>
                </div>

                {/* Giá + Button */}
                <div className="flex mt-4">
                    <div className="ml-auto flex flex-col items-end w-fit">
                        <p className="text-lg font-bold text-blue-700">
                            {displayPrice}
                        </p>

                        {(stay.days ?? 0) > 0 && (
                            <p className="text-xs text-gray-500">
                                Đã bao gồm thuế & phí
                            </p>
                        )}

                        <button className="mt-2 w-full bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-orange-400 transition font-medium">
                            <Link href='/stays/payment'>
                                Đặt ngay
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const CarCard: React.FC<CarCardProps> = ({ car }) => {
    const displayPrice =
        car.totalPrice !== undefined && (car.days ?? 0) > 0
            ? `${car.totalPrice.toLocaleString("vi-VN")} VNĐ (${car.days} ngày)`
            : `${car.price.toLocaleString("vi-VN")} VNĐ / ngày`;

    return (
        <div className="border rounded-2xl shadow-sm hover:shadow-md transition p-4 flex gap-4 bg-white">
            {/* Hình ảnh */}
            <img
                src={car.image}
                alt={car.carName}
                className="w-52 h-32 object-cover rounded-xl"
            />

            {/* Nội dung */}
            <div className="flex flex-col justify-between w-full">
                {/* Thông tin xe */}
                <div>
                    <h2 className="text-lg font-bold">{car.carName}</h2>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin size={14} /> {car.checkInDestination}
                    </p>

                    {/* Các thông số xe */}
                    <div className="flex gap-3 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                            <Users size={16} /> {car.seatQuantity.toString()} chỗ
                        </span>
                        <span className="flex items-center gap-1">
                            <Luggage size={16} /> {car.luggageQuantity.toString()} hành lý
                        </span>
                        <span className="flex items-center gap-1">
                            <Gauge size={16} /> {car.mileageLimit}
                        </span>
                    </div>
                </div>

                {/* Giá + Rating */}
                <div className="flex justify-between items-end mt-3">
                    <div className="flex items-center gap-1 text-blue-600 font-medium">
                        <Star size={18} className="text-yellow-500" />
                        {car.rate.toString()}
                    </div>

                    <div className="text-right">
                        <p className="text-lg font-bold text-blue-700">{displayPrice}</p>
                        {car.days && car.days > 0 && (
                            <p className="text-xs text-gray-500">Đã bao gồm thuế & phí</p>
                        )}
                    </div>
                </div>

                <button className="mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                    Đặt ngay
                </button>
            </div>
        </div>
    );
};

const AttractionCard: React.FC<AttractionCardProps> = ({ attraction }) => {
    return (
        <div className="border-2 border-blue-400 rounded-xl shadow-md hover:shadow-lg transition p-3 flex gap-3">
            <img
                src={attraction.image}
                alt={attraction.attractionName}
                className="w-48 h-42 object-cover rounded-lg"
            />

            <div className="flex flex-col justify-between w-full">
                <div>
                    <h2 className="text-lg font-semibold">{attraction.attractionName}</h2>
                </div>
                <div>
                    {attraction.duration}
                </div>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-yellow-500 font-bold flex">
                        {attraction.rate}
                        <img src="/icon/tags/blueStar.png"
                            alt="blueskystar"
                            className="w-5 h-5 rounded-sm" />
                    </span>
                    <span className="text-blue-500 font-semibold">
                        {attraction.price} VNĐ
                    </span>
                </div>
                <button className="mt-2 bg-blue-600 text-white py-1.5 rounded-lg hover:bg-orange-300 transition ">
                    Tham gia ngay!
                </button>
            </div>
        </div>
    );
};

export { Card, CardContent, CardTitle, CardSubTitle, StayCard, AttractionCard, CarCard }
