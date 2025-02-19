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

const JobChart: React.FC = () => {

    const [param, setParam] = useState(initParam)

    const { Option } = Select

    const JobData = {
        total: 547,
        others: 47,
        workers: 200,
        farmers: 120,
        officers: 90,
        freelancers: 90
    };

    const pieJobData = {
        labels: [
            `Công nhân ${JobData.workers}`,
            `Nông dân ${JobData.farmers}`,
            `Viên chức ${JobData.officers}`,
            `Lao động tự do ${JobData.freelancers}`,
            `Khác ${JobData.others}`
        ],
        datasets: [
            {
                data: [((JobData.workers / JobData.total) * 100).toFixed(2),
                ((JobData.farmers / JobData.total) * 100).toFixed(2),
                ((JobData.officers / JobData.total) * 100).toFixed(2),
                ((JobData.freelancers / JobData.total) * 100).toFixed(2),
                ((JobData.others / JobData.total) * 100).toFixed(2),],
                backgroundColor: ['#f1b821', '#545e90', '#ee4880', '#b275d4', '#41b5ee'],
            },
        ],
    };

    return (
        <Box>
            <div className="text-[18px] font-medium mb-1 text-center">Thống kê nghề nghiệp</div>
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
            <Doughnut data={pieJobData} options={optionsPercent} />
        </Box>
    )
}

export default JobChart