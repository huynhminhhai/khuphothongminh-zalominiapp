import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { generateColors } from 'utils/chart';
import { Box } from 'zmp-ui';
import { formatDate } from 'utils/date';

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale, ChartDataLabels);

type Answer = {
  answer: string;
  count: number;
};

type SurveyResult = {
  question: string;
  type: 'one-choice' | 'multiple-choice' | 'text';
  answers: Answer[];
};

type ChartData = {
  question: string;
  chart: JSX.Element;
};

interface SurveyDetail {
  khaoSatId: number;
  apId: number;
  tieuDe: string;
  noiDung: string;
  tuNgay: string;
  denNgay: string;
  tinhTrangId: number;
  tenTinhTrang: string;
  cauHoiKhaoSats: {
    cauHoiKhaoSatId: number;
    khaoSatId: number;
    noiDung: string;
    loaiCauHoiKhaoSatId: number;
    tenLoaiCauHoiKhaoSat: string;
    chiTietCauHoiKhaoSats: {
      chiTietCauHoiKhaoSatId: number;
      cauHoiKhaoSatId: number;
      noiDungChiTiet: string;
      coYKienKhac: boolean;
    }[];
  }[];
  soLuongCauHoiKhaoSat: number;
  ketQuaKhaoSats: {
    cauHoiKhaoSatId: number;
    noiDungCauHoi: string;
    noiDungCauTraLoi: string;
    luotChon: number;
    tongLuotThamGia: number;
  }[];
  soLuongThamGiaKhaoSat: number;
}

const SurveyCharts: React.FC<{ surveyDetail: SurveyDetail }> = ({ surveyDetail }) => {
  const [chartsData, setChartsData] = useState<ChartData[]>([]);

  console.log(surveyDetail)

  useEffect(() => {
    const surveyResults: SurveyResult[] = surveyDetail.cauHoiKhaoSats.map((question) => {
      const typeMap: { [key: string]: 'text' | 'multiple-choice' | 'one-choice' } = {
        "Câu hỏi nhập nội dung trả lời": 'text',
        "Câu hỏi chọn nhiều đáp án": 'multiple-choice',
        "Câu hỏi chọn một đáp án": 'one-choice',
      };

      const answers = question.chiTietCauHoiKhaoSats.map((option) => {
        const result = surveyDetail.ketQuaKhaoSats.find(
          (res) => res.cauHoiKhaoSatId === question.cauHoiKhaoSatId && res.noiDungCauTraLoi === option.noiDungChiTiet
        );
        return {
          answer: option.noiDungChiTiet,
          count: result ? result.luotChon : 0,
        };
      });

      return {
        question: question.noiDung,
        type: typeMap[question.tenLoaiCauHoiKhaoSat] || 'text',
        answers,
      };
    }).filter((survey) => survey.type !== 'text');

    const data: ChartData[] = surveyResults.map((survey) => {
      const { type, question, answers } = survey;
      let chartData: ChartData;

      switch (type) {
        case 'one-choice':
          chartData = {
            question,
            chart: (
              <Doughnut
                data={{
                  labels: answers.map((a) => `${a.answer}: ${a.count}`),
                  datasets: [
                    {
                      data: answers.map((a) => a.count),
                      backgroundColor: generateColors(answers.length),
                      borderRadius: 8,
                      borderWidth: 4,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    datalabels: {
                      color: '#fff',
                      font: { weight: 'bold', size: 12 },
                      formatter: (value, context) => {
                        const total = (context.dataset.data as number[]).reduce((sum, val) => sum + val, 0);
                        const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                        return value === 0 ? '' : `${percentage}%`; // Bỏ 0.0%, trả về rỗng nếu value = 0
                      },
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          const total = (context.dataset.data as number[]).reduce((sum, val) => sum + val, 0);
                          const value = context.raw as number;
                          const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                          return value === 0 ? '' : `${percentage}%`; // Bỏ 0.0% trong tooltip
                        },
                      },
                    },
                  },
                  elements: { arc: { borderWidth: 2 } },
                }}
              />
            ),
          };
          break;

        case 'multiple-choice':
          chartData = {
            question,
            chart: (
              <Bar
                data={{
                  labels: answers.map((a) => a.answer),
                  datasets: [
                    {
                      label: 'Số lượng người chọn',
                      data: answers.map((a) => a.count),
                      backgroundColor: generateColors(answers.length),
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: { display: false },
                    datalabels: {
                      color: '#000',
                      font: { size: 14 },
                      anchor: 'end',
                      align: 'top',
                      formatter: (value) => value,
                    },
                  },
                  scales: {
                    x: {
                      ticks: { color: '#000', font: { size: 10 }, display: false },
                      grid: { display: false },
                    },
                    y: {
                      beginAtZero: true,
                      ticks: {
                        color: '#000',
                        font: { size: 12 },
                        stepSize: 1, // Bước nhảy là 1
                        callback: (value) => Number(value).toFixed(0), // Chỉ hiển thị số nguyên
                      },
                      border: { display: false },
                      grid: { display: false },
                    },
                  },
                }}
              />
            ),
          };
          break;

        case 'text':
          chartData = {
            question,
            chart: (
              <div className="text-center p-4">
                <p>Không có dữ liệu thống kê cho câu hỏi này.</p>
              </div>
            ),
          };
          break;

        default:
          throw new Error(`Unsupported question type: ${type}`);
      }

      return chartData;
    });

    setChartsData(data);
  }, [surveyDetail]);

  return (
    <Box>
      <Box p={4}>
        <div className="bg-white box-shadow-4 rounded-xl px-3 py-4 text-center text-gray-color">
          <h3 className="text-[18px] text-black leading-[24px] font-semibold mb-1">{surveyDetail.tieuDe}</h3>
          <div className='font-medium mt-2'>{formatDate(surveyDetail.tuNgay)} - {formatDate(surveyDetail.denNgay)}</div>
            <div className='mt-2'>
              <p className='font-medium'>Số lượng câu hỏi: <span className='text-black font-semibold'>{surveyDetail.soLuongCauHoiKhaoSat}</span></p>
              <p className='font-medium'>Người tham gia khảo sát: <span className='text-black font-semibold'>{surveyDetail.soLuongThamGiaKhaoSat}</span></p>
            </div>
        </div>
      </Box>
      {chartsData.map((chart, index) => (
        <Box p={4} key={index}>
          <div className="bg-white box-shadow-4 rounded-xl px-3 py-4">
            <h3 className="text-[16px] leading-[22px] font-medium mb-1">{chart.question}</h3>
            {chart.chart}
          </div>
        </Box>
      ))}
    </Box>
  );
};

export default SurveyCharts;