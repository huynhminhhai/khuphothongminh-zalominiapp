import { useGetSurveyDetail } from "apiRequest/survey"
import { SurveyChart } from "components/chart"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { ChartSkeleton } from "components/skeleton"
import React from "react"
import { useSearchParams } from "react-router-dom"
import { Box, Page, useNavigate } from "zmp-ui"

const SurveyChartsPage: React.FC = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    const surveyId = searchParams.get("id");

   const { data: surveyDetail, isLoading } = useGetSurveyDetail(Number(surveyId));

    return (
        <Page className="relative flex-1 flex flex-col" style={{ backgroundColor: '#f5f6f7' }}>
            <Box>
                <HeaderSub title="Tổng quan kết quả khảo sát" />
                {
                    isLoading ?
                    <ChartSkeleton count={3} /> :
                    surveyDetail?.ketQuaKhaoSats.length > 0 ?
                    <SurveyChart surveyDetail={surveyDetail} />
                    :
                    <Box p={4} mt={10}>
                        <EmptyData title="Khảo sát chưa có câu trả lời" handleClick={() => navigate('/survey-management')} textBtn="Quay lại" />
                    </Box>
                }
            </Box>
        </Page>
    )
}

export default SurveyChartsPage