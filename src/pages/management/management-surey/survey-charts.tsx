import { SurveyChart } from "components/chart"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { SURVEYRESULT } from "constants/utinities"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { processSurveyResults } from "utils/chart"
import { Box, Page, useNavigate, useSnackbar } from "zmp-ui"

const SurveyChartsPage: React.FC = () => {

    const [responsesData, setResponsesData] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const { openSnackbar } = useSnackbar();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    const surveyId = searchParams.get("id");

    const fetchSurveyResult = async () => {
        setLoading(true);
        try {
            // Giả lập gọi API để lấy thông tin khảo sát
            const data = SURVEYRESULT.filter(survey =>  survey.surveyId === Number(surveyId))

            if (!data) {
                throw new Error("Survey data not found");
            }

            setResponsesData(data);

        } catch (error) {
            console.error("Failed to fetch survey data:", error);
            openSnackbar({
                text: "Không thể tải thông tin khảo sát. Vui lòng thử lại sau.",
                type: "error",
                duration: 5000,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSurveyResult()
    }, [surveyId])

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Tổng quan khảo sát" />
                {
                    responsesData.length > 0 ?
                    <SurveyChart surveyResults={processSurveyResults(responsesData)} />
                    :
                    <Box mt={10}>
                        <EmptyData title="Khảo sát chưa có câu trả lời" handleClick={() => navigate('/survey-management')} textBtn="Quay lại" />
                    </Box>
                }
            </Box>
        </Page>
    )
}

export default SurveyChartsPage