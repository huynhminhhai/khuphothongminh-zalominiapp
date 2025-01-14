import { PrimaryButton } from "components/button";
import { HeaderSub } from "components/header-sub"
import { SURVEYDATA, SurveyType } from "constants/utinities";
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { isExpired } from "utils/date";
import { Box, Button, Checkbox, Modal, Page, Radio, useSnackbar } from "zmp-ui"

type QuestionType = {
    id: string;
    type: 'text' | 'multiple-choice' | 'one-choice';
    question: string;
    options?: string[];
};

type SurveyResponseType = {
    surveyId: number | undefined;
    userId: number,
    responses: { questionId: string, answer: string | string[] }[];
};

const SurveyDetailPage: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [detailData, setDetailData] = useState<SurveyType>()
    const [responses, setResponses] = useState<any>([]);
    const [missingAnswersVisible, setMissingAnswersVisible] = useState(false);

    const { openSnackbar } = useSnackbar();
    const [searchParams] = useSearchParams();

    const surveyId = searchParams.get("id");

    useEffect(() => {
        // Hàm gọi API để lấy thông tin thành viên
        const fetchSurveyData = async () => {
            setLoading(true);
            try {
                // Giả sử API trả về thông tin thành viên
                // const response = await fetch(`/api/surveys/${surveyId}`);
                // const data = await response.json();

                const data = SURVEYDATA.find(survey => survey.id === Number(surveyId))

                if (data) {
                    setDetailData(data);

                    // Initialize responses state based on the detailData
                    const initialResponses = data.questions.map((q) => ({
                        questionId: q.id,
                        answer: q.answer || (q.type === "multiple-choice" ? [] : ""),
                    }));
                    setResponses(initialResponses);
                }

            } catch (error) {
                console.error("Failed to fetch survey data:", error);
                openSnackbar({
                    text: "Không thể tải thông tin thành viên. Vui lòng thử lại sau.",
                    type: "error",
                    duration: 5000,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchSurveyData();
    }, [surveyId]);

    const handleAnswerChange = (questionId: string, value: string | string[]) => {
        setResponses((prevResponses) => {
            const updatedResponses = prevResponses.map((res) =>
                res.questionId === questionId ? { ...res, answer: value } : res
            );
            return updatedResponses;
        });
    };

    const handleSubmit = async () => {

        const unansweredQuestions = detailData?.questions.filter((q) => {
            const response = responses.find((res) => res.questionId === q.id);
            return !response || !response.answer || (Array.isArray(response.answer) && response.answer.length === 0);
        });

        if (unansweredQuestions && unansweredQuestions.length > 0) {
            setMissingAnswersVisible(true);
            return
        }

        setLoading(true);

        const idUser = 123;

        const payload: SurveyResponseType = {
            surveyId: detailData?.id,
            responses: responses,
            userId: idUser,
        };

        // Gửi dữ liệu trả lời lên BE
        // const response = await fetch('/api/surveys/submit', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(payload),
        // });

        // const result = await response.json();

        openSnackbar({
            text: "Cập nhật khảo sát thành công",
            type: "success",
            duration: 5000,
        });

        console.log('submit data:', payload)

        setLoading(false);
    };


    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Modal
                visible={missingAnswersVisible}
                title="Thông báo"
                onClose={() => setMissingAnswersVisible(false)}
                description="Bạn cần trả lời tất cả các câu hỏi trước khi gửi"
                verticalActions
            >
                <Box mt={4}>
                    <Button
                        variant="secondary"
                        onClick={() => setMissingAnswersVisible(false)}
                        fullWidth
                    >
                        Đóng
                    </Button>
                </Box>
            </Modal>
            <Box>
                <HeaderSub title="Khảo sát" />
                <Box>
                    <Box p={4} className="text-center text-gray-500 font-medium border-t border-b">
                        <h3 className="text-[18px] text-black leading-[24px] font-semibold mb-2">{detailData?.title}</h3>
                        <p className="text-[14px] leading-1 mb-1">Thời hạn: <span className="text-black font-semibold">{detailData?.expiryDate}</span></p>
                        <p className="text-[14px] leading-1">Thời hạn: {detailData?.description}</p>
                    </Box>
                    <Box>
                        <Box>
                            {detailData?.questions && detailData.questions.map((q: QuestionType, index: number) => (
                                <div key={q.id} className="p-4 border-b">
                                    <div>
                                        <label className="block text-sm font-semibold mb-3 text-black]">
                                            Câu hỏi {index + 1}: {q.question}
                                        </label>

                                        {/* Câu hỏi dạng text */}
                                        {q.type === "text" && (
                                            <input
                                                type="text"
                                                value={responses.find((res) => res.questionId === q.id)?.answer || ""}
                                                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                                className="p-2 w-full border border-gray-300 rounded-lg"
                                            />
                                        )}

                                        {/* Câu hỏi dạng multiple-choice (checkbox) */}
                                        {q.type === "multiple-choice" && (
                                            <div className="flex flex-col">
                                                {q.options?.map((opt, idx) => (
                                                    <div key={idx} className="mb-2 flex items-center gap-2">
                                                        <Checkbox
                                                            value={opt}
                                                            checked={responses.find(
                                                                (res) => res.questionId === q.id
                                                            )?.answer.includes(opt)}
                                                            onChange={(e) => {
                                                                const selectedOptions = responses.find(
                                                                    (res) => res.questionId === q.id
                                                                )?.answer || [];
                                                                const newOptions = e.target.checked
                                                                    ? [...selectedOptions, opt]
                                                                    : selectedOptions.filter((option) => option !== opt);
                                                                handleAnswerChange(q.id, newOptions);
                                                            }}
                                                        />
                                                        <span>{opt}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Câu hỏi dạng one-choice (radio) */}
                                        {q.type === "one-choice" && (
                                            <div className="flex flex-col">
                                                {q.options?.map((opt, idx) => (
                                                    <div key={idx} className="mb-2 flex items-center">
                                                        <Radio
                                                            value={opt}
                                                            checked={responses.find(
                                                                (res) => res.questionId === q.id
                                                            )?.answer === opt}
                                                            onChange={() => handleAnswerChange(q.id, opt)}
                                                        />
                                                        <span>{opt}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </Box>
                        <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-1">
                            <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                                <PrimaryButton disabled={detailData && isExpired(detailData?.expiryDate) ? true : false} fullWidth label={loading ? "Đang xử lý..." : "Cập nhật"} handleClick={() => handleSubmit()} />
                            </Box>
                        </div>
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default SurveyDetailPage