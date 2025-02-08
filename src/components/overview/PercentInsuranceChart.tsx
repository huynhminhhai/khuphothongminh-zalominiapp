import React, { useState } from 'react'
import { Box, Select } from 'zmp-ui'
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { optionsPercent } from './type';
import { monthOptions } from 'constants/mock';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, ChartDataLabels);

const initParam = {
    month: 0,
    year: 0
}

const PercentInsuranceChart: React.FC = () => {

    const [param, setParam] = useState(initParam)

    const { Option } = Select

    const insuranceData = {
        labels: ['Có bảo hiểm', 'Không có bảo hiểm', 'Hỗ trợ bảo hiểm'],
        datasets: [
            {
                data: [70, 20, 10],
                backgroundColor: ['#89d3d4', '#b9ebe0', '#D1D5DB'],
            },
        ],
    };

    return (
        <Box>
            <div className="text-[18px] font-medium mb-1 text-center">Tình trạng bảo hiểm y tế</div>
            <div className="grid grid-cols-2 gap-4 my-2">
                <div>
                    <Select
                        className="h-[32px]"
                        placeholder="Chọn tháng"
                        closeOnSelect
                        onChange={(value) => {
                            setParam((prevParam) => ({
                                ...prevParam,
                                month: value as number
                            }));
                        }}
                    >
                        <Option title={'Tất cả'} value={0} />
                        {
                            monthOptions.map((item) => (
                                <Option key={item.value} title={item.label} value={item.value} />
                            ))
                        }
                    </Select>
                </div>
                <div>
                    <Select
                        className="h-[32px]"
                        placeholder="Chọn năm"
                        closeOnSelect
                        onChange={(value) => {
                            setParam((prevParam) => ({
                                ...prevParam,
                                year: value as number
                            }));
                        }}
                    >
                        <Option title={'Tất cả'} value={0} />
                        <Option title={'2024'} value={2024} />
                        <Option title={'2025'} value={2025} />

                    </Select>
                </div>
            </div>
            <Doughnut data={insuranceData} options={optionsPercent} />
        </Box>
    )
}

export default PercentInsuranceChart