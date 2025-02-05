import { monthOptions } from "constants/mock";
import React, { useState } from "react"
import { Pie } from 'react-chartjs-2';
import { generateColors } from "utils/chart";
import { Select } from "zmp-ui";

const initParam = {
    month: 0,
    year: 0
}

const ChartCategories: React.FC = () => {

    const [param, setParam] = useState(initParam)

    const { Option } = Select

    const data = {
        labels: ['Phí rác thải', 'Nước', 'Bảo hiểm y tế', 'Điện', 'Internet'],
        datasets: [
            {
                data: [5000000, 3000000, 2000000, 4000000, 2500000],
                backgroundColor: generateColors(5),
            },
        ],
    };

    const options = {
        plugins: {
            datalabels: {
                // formatter: (value: number) => value.toLocaleString('vi-VN') + 'đ',
                // color: '#000',
                // font: 'bold'
                display: false,
            } as any
        },
        elements: {
            arc: {
                borderWidth: 4, // Tùy chỉnh viền của các phần
            },
        },
    };

    return (
        <div>
            <div className="text-[18px] font-medium mb-1 text-center">Cơ cấu thu/chi</div>
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
            <Pie data={data} options={options} />
        </div>
    )
}

export default ChartCategories