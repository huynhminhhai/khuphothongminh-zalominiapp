import { useCreateResultSurvey, useGetSurveyDetail } from "apiRequest/survey";
import images from "assets/images";
import { PrimaryButton } from "components/button";
import { EmptyData } from "components/data";
import { HeaderSub } from "components/header-sub";
import { ConfirmModal } from "components/modal";
import { NewsDetailSkeleton } from "components/skeleton";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { formatDate, isExpired } from "utils/date";
import { useCustomSnackbar } from "utils/useCustomSnackbar";
import { Box, Button, Checkbox, Modal, Page, Radio, useNavigate } from "zmp-ui";

interface QuestionType {
    questionId: number;
    type: 'text' | 'multiple-choice' | 'one-choice';
    question: string;
    options?: { id: number; text: string }[]; // Thêm id cho options
}

interface SurveyResponseType {
    surveyId: number | undefined;
    userId: number;
    answers: { questionId: number; answer: string | string[] }[];
}

interface SurveyDetailAPI {
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
            chiTietCauHoiKhaoSatId: number | null;
            cauHoiKhaoSatId: number;
            noiDungChiTiet: string;
            coYKienKhac: boolean;
            thuTu: number;
        }[];
    }[];
    soLuongCauHoiKhaoSat: number;
    ketQuaKhaoSats: any[];
    soLuongThamGiaKhaoSat: number;
}

interface SurveySubmitAPI {
    ketQuaKhaoSatId?: number;
    khaoSatId: number;
    nguoiTao?: number;
    chiTietKetQuaKhaoSats: {
        chiTietKetQuaKhaoSatId?: number;
        ketQuaKhaoSatId?: number;
        cauHoiKhaoSatId: number;
        chiTietCauHoiKhaoSatId: number | null;
        giaTri: string;
        nguoiTao?: number;
    }[];
}

const SurveyDetailPage: React.FC = () => {

    const navigator = useNavigate();

    const [detailData, setDetailData] = useState<SurveyDetailAPI | undefined>(undefined);
    const [responses, setResponses] = useState<SurveyResponseType['answers']>([]);
    const [missingAnswersVisible, setMissingAnswersVisible] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);

    const { showSuccess } = useCustomSnackbar();
    const [searchParams] = useSearchParams();
    const surveyId = searchParams.get("id");

    const { mutateAsync: createResultSurvey, isPending } = useCreateResultSurvey();
    const { data: surveyDetail, isLoading } = useGetSurveyDetail(Number(surveyId));

    useEffect(() => {
        if (surveyDetail) {
            setDetailData(surveyDetail);

            // Khởi tạo responses ban đầu dựa trên câu hỏi từ API
            const initialResponses = surveyDetail.cauHoiKhaoSats.map((q) => ({
                questionId: q.cauHoiKhaoSatId,
                answer: q.loaiCauHoiKhaoSatId === 2 ? [] : "",
            }));
            setResponses(initialResponses);
        }
    }, [surveyDetail]);

    const handleAnswerChange = (questionId: number, value: string | string[]) => {
        setResponses((prevResponses) =>
            prevResponses.map((res) =>
                res.questionId === questionId ? { ...res, answer: value } : res
            )
        );
    };

    const handleSubmit = () => {
        setConfirmVisible(true);
    };

    const mapToSurveySubmitFormat = (): SurveySubmitAPI => {
        const chiTietKetQuaKhaoSats = responses
            .map((res) => {
                const question = detailData?.cauHoiKhaoSats.find((q) => q.cauHoiKhaoSatId === res.questionId);
                if (!question) return [];

                if (question.loaiCauHoiKhaoSatId === 1) { // Text
                    return [{
                        cauHoiKhaoSatId: res.questionId,
                        chiTietCauHoiKhaoSatId: null,
                        giaTri: res.answer as string,
                    }];
                } else if (question.loaiCauHoiKhaoSatId === 2) { // Multiple-choice
                    const selectedOptions = res.answer as string[];
                    return selectedOptions.map((opt) => {
                        const optionDetail = question.chiTietCauHoiKhaoSats.find((o) => o.noiDungChiTiet === opt);
                        return {
                            cauHoiKhaoSatId: res.questionId,
                            chiTietCauHoiKhaoSatId: optionDetail?.chiTietCauHoiKhaoSatId || 0,
                            giaTri: opt,
                        };
                    });
                } else if (question.loaiCauHoiKhaoSatId === 3) { // One-choice
                    const optionDetail = question.chiTietCauHoiKhaoSats.find((o) => o.noiDungChiTiet === res.answer);
                    return [{
                        cauHoiKhaoSatId: res.questionId,
                        chiTietCauHoiKhaoSatId: optionDetail?.chiTietCauHoiKhaoSatId || 0,
                        giaTri: res.answer as string,
                    }];
                }
                return [];
            })
            .reduce((acc, curr) => acc.concat(curr), []);

        return {
            khaoSatId: Number(surveyId),
            chiTietKetQuaKhaoSats,
        };
    };

    const handleConfirm = async () => {
        setConfirmVisible(false);

        const unansweredQuestions = detailData?.cauHoiKhaoSats.filter((q) => {
            const response = responses.find((res) => res.questionId === q.cauHoiKhaoSatId);
            return !response || !response.answer || (Array.isArray(response.answer) && response.answer.length === 0);
        });

        if (unansweredQuestions && unansweredQuestions.length > 0) {
            setMissingAnswersVisible(true);
            return;
        }

        try {
            const payload = mapToSurveySubmitFormat();

            await createResultSurvey(payload);

            showSuccess('Gửi khảo sát thành công');

            navigator('/survey');
        } catch (error) {
            console.error("Failed to submit survey data:", error);
        }
    };

    const handleCancel = () => {
        setConfirmVisible(false);
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
                    <Button variant="secondary" onClick={() => setMissingAnswersVisible(false)} fullWidth>
                        Đóng
                    </Button>
                </Box>
            </Modal>
            <Box>
                <HeaderSub title="Thực hiện khảo sát" />
                {
                    isLoading ? <NewsDetailSkeleton count={1} /> :
                        detailData ?
                            <Box>
                                <Box p={4} className="text-center font-medium border-t border-b">
                                    <h3 className="title-page mb-2">{detailData?.tieuDe}</h3>
                                    <p className="text-[16px] leading-1 mb-1">
                                        Thời hạn: <span className="font-semibold">{formatDate(detailData?.denNgay as string)}</span>
                                    </p>
                                    <p className="text-[14px] leading-1">{detailData?.noiDung}</p>
                                    {
                                        detailData?.khaoSatId &&
                                        <p className="text-black text-[14px] mt-2 leading-1 flex items-center justify-center gap-2" onClick={() => navigator(`/survey-charts?id=${detailData.khaoSatId}`)}>Xem kết quả khảo sát: <img width={30} src={images.pieChart} alt={detailData?.tieuDe} /></p>
                                    }
                                </Box>
                                <Box>
                                    {detailData?.cauHoiKhaoSats.map((q, index) => (
                                        <div key={q.cauHoiKhaoSatId} className="p-4 border-b">
                                            <label className="block text-sm font-semibold mb-3 text-black">
                                                Câu hỏi {index + 1}: {q.noiDung}
                                            </label>

                                            {/* Câu hỏi dạng text */}
                                            {q.loaiCauHoiKhaoSatId === 1 && (
                                                <input
                                                    type="text"
                                                    value={responses.find((res) => res.questionId === q.cauHoiKhaoSatId)?.answer || ""}
                                                    onChange={(e) => handleAnswerChange(q.cauHoiKhaoSatId, e.target.value)}
                                                    className="p-2 w-full border-b rounded-none border-gray-300 h-[48px]"
                                                />
                                            )}

                                            {/* Câu hỏi dạng multiple-choice (checkbox) */}
                                            {q.loaiCauHoiKhaoSatId === 2 && (
                                                <div className="flex flex-col">
                                                    {q.chiTietCauHoiKhaoSats.map((opt) => (
                                                        <div key={opt.chiTietCauHoiKhaoSatId} className="mb-2 flex items-center gap-2">
                                                            <Checkbox
                                                                value={opt.noiDungChiTiet}
                                                                checked={responses
                                                                    .find((res) => res.questionId === q.cauHoiKhaoSatId)
                                                                    ?.answer.includes(opt.noiDungChiTiet)}
                                                                onChange={(e) => {
                                                                    const selectedOptions = responses.find(
                                                                        (res) => res.questionId === q.cauHoiKhaoSatId
                                                                    )?.answer || [];
                                                                    const newOptions = e.target.checked
                                                                        ? [...(selectedOptions as string[]), opt.noiDungChiTiet]
                                                                        : (selectedOptions as string[]).filter((o) => o !== opt.noiDungChiTiet);
                                                                    handleAnswerChange(q.cauHoiKhaoSatId, newOptions);
                                                                }}
                                                            />
                                                            <span className="font-medium text-gray-color">{opt.noiDungChiTiet}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Câu hỏi dạng one-choice (radio) */}
                                            {q.loaiCauHoiKhaoSatId === 3 && (
                                                <div className="flex flex-col">
                                                    {q.chiTietCauHoiKhaoSats.map((opt) => (
                                                        <div key={opt.chiTietCauHoiKhaoSatId} className="mb-2 flex items-center">
                                                            <Radio
                                                                value={opt.noiDungChiTiet}
                                                                checked={
                                                                    responses.find((res) => res.questionId === q.cauHoiKhaoSatId)?.answer ===
                                                                    opt.noiDungChiTiet
                                                                }
                                                                onChange={() => handleAnswerChange(q.cauHoiKhaoSatId, opt.noiDungChiTiet)}
                                                            />
                                                            <span className="font-medium text-gray-color">{opt.noiDungChiTiet}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-1">
                                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                                            <PrimaryButton
                                                disabled={detailData && isExpired(formatDate(detailData.denNgay as string))}
                                                fullWidth
                                                label={isPending ? "Đang xử lý..." : "Gửi"}
                                                handleClick={handleSubmit}
                                            />
                                        </Box>
                                    </div>
                                </Box>
                            </Box> :
                            <EmptyData title="Không tìm thấy khảo sát" />
                }
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn gửi kết quả này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Page>
    );
};

export default SurveyDetailPage;