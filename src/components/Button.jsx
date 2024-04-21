import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-neutral-800",
    textColor = "text-white",
    hoverBgColor = "hover:bg-neutral-900",
    className = "",
    ...props
}) {
    return (
        <button className={`px-4 py-3 rounded-3xl shadow-lg duration-300 ${hoverBgColor}  ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}
