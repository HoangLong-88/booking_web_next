import React from "react"
import { cn } from "@/libs/utils"

const Label = React.forwardRef <
    HTMLLabelElement,
    React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, children, ...props}, ref) => {
    return (
        <label
        ref={ref}
        className={cn(
        `mb-1
        block 
        text-sm 
        absolute 
        left-3 
        -top-3
        bg-white
        dark:bg-slate-900
        rounded-xl
        px-1
        font-medium 
        transition-all
        peer-placeholder-shown:top-2.5
        peer-placeholder-shown:text-gray-400
        peer-focus:-top-3 
        peer-focus:text-gray-900
        dark:peer-focus:text-gray-400`)}
        {...props}
        >
        {children}
        </label>
    )
})
Label.displayName = 'Label'
export { Label }