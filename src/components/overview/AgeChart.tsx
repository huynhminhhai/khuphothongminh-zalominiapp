import React, { useMemo, useState } from 'react'
import { Box, Select } from 'zmp-ui'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { optionsBarChart } from './type';
import { monthOptions } from 'constants/mock';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, ChartDataLabels);

const initParam = {
    month: 0,
    year: 0
};

interface Resident {
    ngaySinh: string;
    gioiTinh: number; // 2 = Nam, 3 = Nữ
    [key: string]: any;
}

interface Props {
    data: Resident[];
}

const AgeChart: React.FC<Props> = ({ data }) => {
    const [param, setParam] = useState(initParam);
    const { Option } = Select;

    // Lọc và xử lý dữ liệu
    const ageGroups = useMemo(() => {
        const currentDate = new Date();

        // Khởi tạo bộ đếm
        const counters = {
            '0-18': { nam: 0, nu: 0 },
            '19-35': { nam: 0, nu: 0 },
            '36-60': { nam: 0, nu: 0 },
            '60+': { nam: 0, nu: 0 },
        };

        data.forEach((person) => {
            const birthDate = new Date(person.ngaySinh);
            const birthMonth = birthDate.getMonth() + 1;
            const birthYear = birthDate.getFullYear();

            // Nếu filter theo tháng hoặc năm
            if (
                (param.month !== 0 && birthMonth !== param.month) ||
                (param.year !== 0 && birthYear !== param.year)
            ) {
                return;
            }

            const age = currentDate.getFullYear() - birthDate.getFullYear();
            const gender = person.gioiTinh; // 2 = Nam, 3 = Nữ

            let group = '';
            if (age <= 18) group = '0-18';
            else if (age <= 35) group = '19-35';
            else if (age <= 60) group = '36-60';
            else group = '60+';

            if (gender === 2) counters[group].nam++;
            if (gender === 3) counters[group].nu++;
        });

        return counters;
    }, [data, param]);

    const chartData = {
        labels: ['0-18', '19-35', '36-60', '60+'],
        datasets: [
            {
                label: 'Nam',
                data: Object.values(ageGroups).map((g) => g.nam),
                backgroundColor: '#02457a',
            },
            {
                label: 'Nữ',
                data: Object.values(ageGroups).map((g) => g.nu),
                backgroundColor: '#fc809f',
            },
        ],
    };

    const customOptions = {
        ...optionsBarChart,
        scales: {
            ...optionsBarChart.scales,
            x: {
                ...optionsBarChart.scales.x,
                ticks: {
                    ...optionsBarChart.scales.x?.ticks,
                    display: true,
                },
            },
        },
    };

    return (
        <Box>
            <div className="text-[18px] font-semibold mb-3 text-center">Độ tuổi</div>
            <Bar height={200} data={chartData} options={customOptions} />
        </Box>
    );
};

export default AgeChart;
