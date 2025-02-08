import { monthOptions } from "constants/mock";
import React, { useState } from "react"
import { Line } from 'react-chartjs-2';
import { Select } from "zmp-ui";
import { monthsChart } from "./type";

const initParam = {
  month: 0,
  year: 0
}

const TotalResidentChart: React.FC = () => {

  const { Option } = Select

  const [param, setParam] = useState(initParam)


  const totalPopulationData = {
    labels: monthsChart,
    datasets: [
      {
        label: 'Tổng số dân',
        data: [500, 520, 540, 530, 550, 560, 570, 580, 590, 600, 610, 620],
        backgroundColor: '#3B82F6',
        borderRadius: 4,
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
        // display: false,
        // grid: {
        //   display: false,
        // },
        // ticks: {
        //   display: false
        // },
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
      }
    },
  };

  return (
    <div>
      <div className="text-[18px] font-medium mb-1 text-center">Thống kê dân cư</div>
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
      <Line data={totalPopulationData} options={options} />
    </div>
  )
}

export default TotalResidentChart