import { cn } from "@/libs/utils";
import { AttractionObject } from "@/types/attraction";
import { StayObject } from "@/types/stays";
import Link from "next/link";
import React from "react";

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

// customize StayCard
interface StayCardProps {
    stay: StayObject;
}
interface AttractionCardProp {
    attraction: AttractionObject;
}

const StayCard: React.FC<StayCardProps> = ({ stay }) => {
    const displayPrice = stay.totalPrice !== undefined && (stay.days ?? 0) > 0
        ? `${stay.totalPrice.toLocaleString()} VNĐ (${stay.days} đêm)`
        : `${stay.price.toLocaleString()} VNĐ / đêm`;
    console.log(stay.days)
    console.log(displayPrice);
    return (
        <div className="border-2 border-blue-400 rounded-xl shadow-md hover:shadow-lg transition p-3 flex gap-3">
            <img
                src={stay.image}
                alt={stay.stayName}
                className="w-48 h-42 object-cover rounded-lg"
            />

            <div className="flex flex-col justify-between w-full">
                <div>
                    <h2 className="text-lg font-semibold">{stay.stayName}</h2>
                    <p className="text-sm text-gray-600">{stay.location}</p>
                    <p className="text-xs text-gray-500">{stay.address}</p>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="text-yellow-500 font-bold flex">
                        {stay.rating}
                        <img src="/icon/tags/blueStar.png"
                            alt="blueskystar"
                            className="w-5 h-5 rounded-sm" />
                    </span>
                    <span className="text-blue-500 font-semibold">
                        {displayPrice}
                    </span>
                </div>
                <button className="mt-2 bg-blue-600 text-white py-1.5 rounded-lg hover:bg-orange-300 transition ">
                    Đặt ngay
                </button>
            </div>
        </div>
    );
};

const AttractionCard: React.FC<AttractionCardProp> = ({ attraction }) => {
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

export { Card, CardTitle, CardSubTitle, StayCard, AttractionCard }
