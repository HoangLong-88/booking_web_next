import { cn } from "@/libs/utils";
import Link from "next/link";
import React from "react";

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({className,...props}, ref) => (
    <div
        ref={ref}
        className={cn('max-w-sm rounded-3xl overflow-hidden shadow-xl transition',className)}
        {...props}
    />
))
Card.displayName = 'Card';


const CardTitle = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({className,...props}, ref)=> (
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
>(({className,...props}, ref)=>(
    <div
        ref={ref}
        className={cn("text-stone-400 text-xs font-bold", className)}
        {...props}
    />
))
CardSubTitle.displayName = 'CardSubTitle';

// customize StayCard
interface StayObject {
    stayName: string;
    location: string;
    address: string;
    rating: string;
    price: string;
    image: string;
}
interface StayCardProps{
    stay: StayObject;
}

const StayCard: React.FC<StayCardProps> = ({stay}) => {
    return (
        <div className="border rounded-xl shadow-md hover:shadow-lg transition p-3 flex gap-3">
            <img
                src={stay.image}
                alt={stay.stayName}
                className="w-40 h-32 object-cover rounded-lg"
            />

            <div className="flex flex-col justify-between w-full">
                <div>
                    <h2 className="text-lg font-semibold">{stay.stayName}</h2>
                    <p className="text-sm text-gray-600">{stay.location}</p>
                    <p className="text-xs text-gray-500">{stay.address}</p>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="text-yellow-500 font-bold">{stay.rating}⭐</span>
                    <span className="text-blue-600 font-semibold">{stay.price} VND</span>
                </div>
            </div>
        </div>
    );
};

export {Card,CardTitle,CardSubTitle,StayCard}
