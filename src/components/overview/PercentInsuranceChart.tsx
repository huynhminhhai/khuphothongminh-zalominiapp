import React, { useState, useMemo } from 'react'
import { Box, Select } from 'zmp-ui'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { optionsPercent } from './type'
import { monthOptions } from 'constants/mock'

ChartJS.register(CategoryScale, LinearScale, Tooltip, ChartDataLabels)

const initParam = {
  month: 0,
  year: 0,
}

const PercentInsuranceChart: React.FC<{ data: any[] }> = ({ data }) => {
  const [param, setParam] = useState(initParam)

  // Lọc theo tháng, năm (giả sử data có tháng và năm)
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (param.month && item.month !== param.month) return false
      if (param.year && item.year !== param.year) return false
      return true
    })
  }, [data, param])

  // Đếm số người có bảo hiểm và không có bảo hiểm
  const counts = useMemo(() => {
    let insured = 0
    let uninsured = 0
  
    filteredData.forEach((item) => {
      if (item.baoHiemYTe) {
        insured++
      } else {
        uninsured++
      }
    })
  
    return { insured, uninsured, total: filteredData.length }
  }, [filteredData])

  const insurancePercentage = useMemo(() => {
    return {
      insured:
        counts.total > 0
          ? ((counts.insured / counts.total) * 100).toFixed(2)
          : '0.00',
      uninsured:
        counts.total > 0
          ? ((counts.uninsured / counts.total) * 100).toFixed(2)
          : '0.00',
    }
  }, [counts])

  const insuranceData = useMemo(() => ({
    labels: [
      `Có bảo hiểm ${counts.insured}`,
      `Không có bảo hiểm ${counts.uninsured}`,
    ],
    datasets: [
      {
        data: [insurancePercentage.insured, insurancePercentage.uninsured],
        backgroundColor: ['#02457a', '#a3ccf5'],
      },
    ],
  }), [counts, insurancePercentage])

  return (
    <Box>
      <div className="text-[18px] font-semibold mb-3 text-center">Tình trạng bảo hiểm y tế</div>
      <Doughnut data={insuranceData} options={optionsPercent} />
    </Box>
  )
}

export default PercentInsuranceChart
