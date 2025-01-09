import { NEWSDATA } from "constants/utinities"
import React from "react"
import { Box } from "zmp-ui"
import NewsItem from "./NewsItem"

type NewsOthersProps = {
    idNews: number
}

const NewsOthers: React.FC<NewsOthersProps> = ({idNews}) => {

    const othersNews = NEWSDATA.filter(item => item.id !== idNews);

    return (
        <Box>
            <div className="grid grid-cols-1">
                {
                    othersNews.map((item, index) => (
                        <NewsItem key={index} data={item}/>
                    ))
                }
            </div>
        </Box>
    )
}

export default NewsOthers