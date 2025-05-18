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
import { useStoreApp } from 'store/store'
import { generateUniqueBlueColors } from 'utils/chart'

ChartJS.register(CategoryScale, LinearScale, Tooltip, ChartDataLabels)

const initParam = {
  month: 0,
  year: 0
}

const JobChart: React.FC<{ data: any[] }> = ({ data }) => {
  const [param, setParam] = useState(initParam)
  const { Option } = Select
  const { ngheNghieps } = useStoreApp()

  // Lọc dữ liệu theo tháng, năm nếu cần (bạn có thể tùy chỉnh logic)
  const filteredResidents = useMemo(() => {
    return data.filter(r => {
      if (param.month && r.month !== param.month) return false
      if (param.year && r.year !== param.year) return false
      return true
    })
  }, [data, param])

  // Thống kê số lượng dân cư theo nghề nghiệp
  const countsByJob = useMemo(() => {
    // Khởi tạo object đếm
    const counts: Record<number, number> = {}

    filteredResidents.forEach(r => {
      const job = r.ngheNghiep || 1  // default nếu ko có nghề thì gán 1 = "Khác"
      counts[job] = (counts[job] || 0) + 1
    })
    return counts
  }, [filteredResidents])

  // Tạo data cho biểu đồ dựa vào ngheNghieps và counts
  const total = useMemo(() => {
    return Object.values(countsByJob).reduce((a, b) => a + b, 0)
  }, [countsByJob])

  const pieJobData = useMemo(() => {
    const labels = ngheNghieps.map(item => {
      const count = countsByJob[item.value] || 0
      return `${item.label}: ${count}`
    })
    const data = ngheNghieps.map(item =>
      total > 0 ? ((countsByJob[item.value] || 0) / total * 100).toFixed(2) : 0
    )
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: generateUniqueBlueColors(ngheNghieps.length),
        }
      ]
    }
  }, [ngheNghieps, countsByJob, total])

  return (
    <Box>
      <div className="text-[18px] font-semibold mb-3 text-center">Nghề nghiệp</div>
      <Doughnut data={pieJobData} options={optionsPercent} />
    </Box>
  )
}

export default JobChart
