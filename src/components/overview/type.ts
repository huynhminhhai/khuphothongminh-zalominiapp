import { Plugin } from "chart.js";

export const optionsBarChart = {
    responsive: true,
    plugins: {
        tooltip: {
            enabled: true,
        },
        datalabels: {
            color: '#fff',
            font: {
                weight: 'bold',
                size: 12,
            },
            display: false,
        } as const,
    },
    scales: {
        y: {
            grid: {
                display: false,
            },
            border: {
                display: false,
            },
        },
        x: {
            grid: {
                display: false,
            },
            border: {
                display: false,
            },
            ticks: {
                display: false,
            }
        }
    },
};

export const optionsPercent = {
    responsive: true,
    plugins: {
        tooltip: {
            enabled: true,
        },
        datalabels: {
            formatter: (value: number) => value + '%',
            color: '#fff',
            font: {
                weight: 'bold',
                size: 12,
            },

        } as const
    },
    scales: {
        y: {
            grid: {
                display: false,
            },
            border: {
                display: false,
            },
            ticks: {
                display: false,
            },
        },
        x: {
            grid: {
                display: false,
            },
            border: {
                display: false,
            },
            ticks: {
                display: false,
            },
        }
    },
};

export const monthsChart = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
];