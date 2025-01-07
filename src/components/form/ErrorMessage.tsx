import React from "react"

const ErrorMessage: React.FC<{message: string}> = ({message}) => {
    return (
        <span className="text-[12px] leading-[1] text-red-600 absolute left-0 bottom-[2px]">{message}</span>
    )
}

export default ErrorMessage