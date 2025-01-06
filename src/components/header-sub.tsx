import React from "react";
import { Header } from "zmp-ui";

type HeaderSubProps = {
    title: string;
}

export const HeaderSub: React.FC<HeaderSubProps> = ({title}) => {
    return (
        <Header 
            className="sub"
            title={title}
        />
    )
}