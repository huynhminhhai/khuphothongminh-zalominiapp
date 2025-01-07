import React from "react"

const Label: React.FC<{ text: string, name?: string, required: boolean }> = ({ text, name, required }) => {
    return (
        <label htmlFor={name} className="block text-sm font-medium mb-[2px]">
            {text} {required && <span className="text-red-600">(*)</span>}
        </label>
    )
}

export default Label