import { monthOptions } from "constants/mock";
import React, { useState } from "react"
import { Line } from 'react-chartjs-2';
import { Select } from "zmp-ui";

const initParam = {
  month: 0,
  year: 0
}

const ChartRemainingBalance: React.FC = () => {

  const { Option } = Select

  const [param, setParam] = useState(initParam)


  const data = {
    labels: [
      'Th1', 'Th2', 'Th3', 'Th4',
      'Th5', 'Th6', 'Th7', 'Th8',
      'Th9', 'Th10', 'Th11', 'Th12'
    ],
    datasets: [
      {
        label: 'Số dư quỹ',
        data: [5000000, 7000000, 6500000, 9000000, 8500000, 9500000, 10000000, 11000000, 10500000, 11500000, 12000000, 13000000],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        display: false,
      } as any
    },
    scales: {
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false, // Tắt grid trục X
        },
      }
    },
  };

  return (
    <div>
      <div className="text-[18px] font-medium mb-1 text-center">Số dư quỹ</div>
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
      <Line data={data} options={options} />
    </div>
  )
}

export default ChartRemainingBalance