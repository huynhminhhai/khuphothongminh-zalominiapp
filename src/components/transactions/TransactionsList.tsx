import React from "react"
import { Box } from "zmp-ui"
import { transactionsType } from "constants/utinities"
import images from "assets/images"
import TransactionsItem from "./TransactionsItem"

type TransactionsListProps = {
    data: transactionsType[]
}

const TransactionsList: React.FC<TransactionsListProps> = ({data}) => {

    return (
        <Box>
            {
                data && data.length > 0 ? 
                <Box>
                    <div className="grid grid-cols-1">
                        {
                            data.map((item, index) => (
                                <TransactionsItem key={index} data={item} />
                            ))
                        }
                    </div>
                </Box>
                :
                <Box mt={10}>
                    <Box flex justifyContent="center">
                        <img src={images.empty} alt="Không có dữ liệu" />
                    </Box>
                    <Box mt={4}>
                        <h3 className="text-[18px] leading-[1] font-medium text-center">Hiện chưa có nhiệm vụ nào !</h3>
                        <p className="text-[14px] leading-[20px] text-[#555] mt-2 text-center">
                            Khi có nhiệm vụ, bạn có thể thao tác ngay tại đây. Vui lòng quay lại sau!
                        </p>
                    </Box>
                </Box>
            }
        </Box>
    )
}

export default TransactionsList