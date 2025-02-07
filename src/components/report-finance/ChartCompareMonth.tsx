import React, { useState } from "react"
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Select } from "zmp-ui";
import { monthOptions } from "constants/mock";

Chart.register(...registerables);

const initParam = {
    month: 0,
    year: 0
}

const ChartCompareMonth: React.FC = () => {

    const { Option } = Select

    const [param, setParam] = useState(initParam)

    const data = {
        labels: [
            'Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6',
            'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'
        ],
        datasets: [
            {
                label: 'Thu',
                data: [
                    10000000, 12000000, 15000000, 13000000, 17000000, 14000000,
                    16000000, 18000000, 19000000, 20000000, 22000000, 21000000
                ],
                backgroundColor: '#16a34ac3',
            },
            {
                label: 'Chi',
                data: [
                    5000000, 7000000, 6000000, 8000000, 7500000, 8200000,
                    9000000, 8800000, 9500000, 10000000, 11000000, 10500000
                ],
                backgroundColor: '#dc26269f',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y' as const,
        plugins: {
            legend: { position: "top" as const },
            datalabels: {
                // formatter: (value: number) => value.toLocaleString('vi-VN') + 'đ',
                // color: '#000',
                display: false,
            } as any,
            display: false,
        },
        scales: {
            y: {
                grid: {
                    display: false,
                },
                border: {
                    display: false
                }
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    display: false
                },
                border: {
                    display: false
                }
            }
        },
    };

    return (
        <div className="h-[600px]">
            <div className="text-[18px] font-medium mb-1 text-center">So sánh thu/chi theo tháng</div>
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
            <Bar data={data} options={options} />
        </div>
    )
}

export default ChartCompareMonth