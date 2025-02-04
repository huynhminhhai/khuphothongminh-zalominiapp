import { Icon } from "@iconify/react"
import { Divider } from "components/divider"
import { HeaderSub } from "components/header-sub"
import { TaskList } from "components/task"
import { TransactionsList } from "components/transactions"
import { transactionsOptions } from "constants/mock"
import { TRANSACTIONSDATA, transactionsType } from "constants/utinities"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Button, Page, Select } from "zmp-ui"

const TransactionsPage: React.FC = () => {

    const { Option } = Select

    const [filteredTransactions, setFilteredTransactions] = useState<transactionsType[]>(TRANSACTIONSDATA);
    const navigate = useNavigate()

    const handleFilterChange = (value: number) => {
        let filtered = TRANSACTIONSDATA;

        if (value !== 5) {
            filtered = TRANSACTIONSDATA.filter(transactions => transactions.transaction_type === value);
        }

        setFilteredTransactions(filtered);
    };

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Khoản thu/chi" />
                <Box>
                    <Box>
                        <Box px={4} pb={4}>
                            <div className="flex flex-col gap-3">
                                <Box flex>
                                    <div className="text-[#731611] flex items-center gap-1 border-r-[1px] pr-2 mr-2">
                                        <Icon fontSize={20} icon='mdi:filter-outline' />
                                        <span className="text-[16px] font-semibold">Lọc</span>
                                    </div>
                                    <Box className="filter">
                                        <Select
                                            placeholder="Placeholder"
                                            defaultValue={5}
                                            onChange={(value) => handleFilterChange(value as number)}
                                            closeOnSelect={true}
                                        >
                                            <Option value={5} title="Tất cả" />
                                            {
                                                transactionsOptions.map((item) => (
                                                    <Option key={item.value} title={item.label} value={item.value} />
                                                ))
                                            }
                                        </Select>
                                    </Box>
                                </Box>
                            </div>
                        </Box>
                        <Divider />
                        <Box px={4} pb={4}>
                            <Box>
                                <TransactionsList data={filteredTransactions} />
                                {
                                    filteredTransactions.length > 0 &&
                                    <div className="flex items-center justify-center gap-3 pt-6 pb-2">
                                        <Button onClick={() => console.log('call api')} size="medium">Xem thêm</Button>
                                    </div>
                                }
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default TransactionsPage