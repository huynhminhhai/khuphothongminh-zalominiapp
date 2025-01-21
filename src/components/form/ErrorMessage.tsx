import { Icon } from "@iconify/react"
import React from "react"

const ErrorMessage: React.FC<{message: string}> = ({message}) => {
    return (
        <div className="flex items-center gap-1 text-[12px] leading-[1] text-red-600 absolute left-0 bottom-[2px]"><Icon icon='bxs:error' /> {message}</div>
    )
}

export default ErrorMessage