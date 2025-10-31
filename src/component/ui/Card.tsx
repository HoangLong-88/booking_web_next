import { cn } from "@/libs/utils";
import Link from "next/link";
import React from "react";
export {Card,CardTitle,CardSubTitle}

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