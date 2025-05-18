import React, { useMemo, useState } from 'react';
import { Box, Button, DatePicker, Modal, useNavigate } from 'zmp-ui';
import { PrimaryButton } from 'components/button';
import { Icon } from '@iconify/react';
import SecondaryButton from 'components/button/SecondaryButton';
import SurveyPreviewModal from './SurveyPreviewModal';
import { ConfirmModal } from 'components/modal';
import { SurveyType, SurveyTypeAPI } from './type';
import { useCreateSurvey, useGetSurveyStatus } from 'apiRequest/survey';
import { useStoreApp } from 'store/store';
import { formatDate, parseDate } from 'components/form/DatePicker';

const defaultValues: SurveyType = {
    title: '',
    description: '',
    startDate: '',
    expiryDate: '',
    questions: [],
};

const CreateSurveyForm: React.FC = () => {

    const { account } = useStoreApp()

    const [formData, setFormData] = useState<SurveyType>(defaultValues);
    const [popupVisible, setPopupVisible] = useState<boolean>(false);
    const [previewVisible, setPreviewVisible] = useState<boolean>(false);
    const [descModal, setDescModal] = useState<string>('');
    const [isConfirmVisible, setConfirmVisible] = useState<boolean>(false);

    const navigate = useNavigate()

    const { mutateAsync: createSurvey, isPending } = useCreateSurvey();
    const { data: surveyStatus } = useGetSurveyStatus();

    const surveyStatusOption = useMemo(() => {
        return surveyStatus?.loaiCauHoiKhaoSats?.map((item) => ({
            value: item.loaiCauHoiKhaoSatId,
            label: item.tenLoaiCauHoiKhaoSat
        })) || [];
    }, [surveyStatus]);


    const addQuestion = (type: 'text' | 'multiple-choice' | 'one-choice') => {
        for (const q of formData.questions) {
            if (!q.question.trim()) {
                setDescModal('Câu hỏi chưa có tiêu đề');
                setPopupVisible(true);
                return;
            }
            if ((q.type === 'multiple-choice' || q.type === 'one-choice') && q.options?.some(opt => !opt.trim())) {
                setDescModal('Các lựa chọn không được để trống');
                setPopupVisible(true);
                return;
            }
        }

        setFormData((prev) => ({
            ...prev,
            questions: [
                ...prev.questions,
                { questionId: Date.now(), type, question: '', options: type === 'text' ? [] : [''] },
            ],
        }));
    };

    const handleQuestionChange = (id: number, field: 'question' | 'options', value: string) => {
        setFormData((prev) => ({
            ...prev,
            questions: prev.questions.map((q) =>
                q.questionId === id ? { ...q, [field]: value } : q
            ),
        }));
    };

    const handleOptionChange = (id: number, index: number, value: string) => {
        setFormData((prev) => ({
            ...prev,
            questions: prev.questions.map((q) =>
                q.questionId === id
                    ? { ...q, options: q.options?.map((opt, i) => (i === index ? value : opt)) }
                    : q
            ),
        }));
    };

    const removeQuestion = (id: number) => {
        setFormData((prev) => ({
            ...prev,
            questions: prev.questions.filter((q) => q.questionId !== id),
        }));
    };

    const handleRemoveOption = (questionId: number, index: number) => {
        setFormData((prev) => ({
            ...prev,
            questions: prev.questions.map((q) =>
                q.questionId === questionId
                    ? { ...q, options: q.options?.filter((_, i) => i !== index) }
                    : q
            ),
        }));
    };

    const validateForm = () => {
        if (!formData.title.trim() || !formData.description.trim() || !formData.expiryDate || !formData.startDate) {
            setDescModal('Tiêu đề, mô tả và ngày hết hạn không thể trống');
            setPopupVisible(true);
            return false;
        }

        if (formData.questions.length === 0) {
            setDescModal('Khảo sát phải có ít nhất một câu hỏi');
            setPopupVisible(true);
            return false;
        }

        for (const q of formData.questions) {
            if (!q.question.trim()) {
                setDescModal('Câu hỏi chưa có tiêu đề');
                setPopupVisible(true);
                return false;
            }
            if ((q.type === 'multiple-choice' || q.type === 'one-choice') && q.options?.some(opt => !opt.trim())) {
                setDescModal('Các lựa chọn không được để trống');
                setPopupVisible(true);
                return false;
            }
        }
        return true;
    };

    const handlePreview = () => {
        if (!formData.title.trim() || !formData.description.trim() || formData.questions.length === 0) {
            setDescModal('Chưa đầy đủ thông tin để xem trước khảo sát');
            setPopupVisible(true);
            return;
        }
        setPreviewVisible(true);
    };

    const handleSubmit = () => {
        if (validateForm()) {
            setConfirmVisible(true);
        }
    };

    const mapToApiFormat = (data: SurveyType): SurveyTypeAPI => {
        const typeMap: { [key: string]: number } = {};
        surveyStatusOption.forEach((item) => {
            if (item.label === 'Câu hỏi nhập nội dung trả lời') {
                typeMap['text'] = item.value;
            } else if (item.label === 'Câu hỏi chọn nhiều đáp án') {
                typeMap['multiple-choice'] = item.value;
            } else if (item.label === 'Câu hỏi chọn một đáp án') {
                typeMap['one-choice'] = item.value;
            }
        });

        return {

            apId: account?.thongTinDanCu?.apId,
            tieuDe: data.title,
            noiDung: data.description,
            tuNgay: data.startDate,
            denNgay: data.expiryDate,

            cauHoiKhaoSats: data.questions.map((q) => ({
                noiDung: q.question,
                loaiCauHoiKhaoSatId: typeMap[q.type],
                chiTietCauHoiKhaoSats: q.options?.map((opt) => ({
                    noiDungChiTiet: opt,
                    coYKienKhac: false,
                })) || [],
            })),
        };
    };

    const handleConfirm = async () => {
        setConfirmVisible(false);
        try {
            const payload = mapToApiFormat(formData);

            await createSurvey(payload)

            navigate('/survey-management');
        } catch (error) {
            console.log(error)
        }
    };

    const handleCancel = () => {
        setConfirmVisible(false);
    };

    return (
        <Box>
            <SurveyPreviewModal
                visible={previewVisible}
                onClose={() => setPreviewVisible(false)}
                formData={formData}
            />
            <Modal
                visible={popupVisible}
                title="Lỗi khi tạo khảo sát"
                onClose={() => setPopupVisible(false)}
                verticalActions
                description={descModal}
            >
                <Box mt={6} p={6}>
                    <Button
                        variant="secondary"
                        size='medium'
                        onClick={() => setPopupVisible(false)}
                        fullWidth
                    >
                        Xác nhận
                    </Button>
                </Box>
            </Modal>
            <Box p={4}>
                <div className="bg-white rounded-xl">
                    <Box>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-[2px]">
                                Tiêu đề khảo sát <span className="text-red-600">(*)</span>
                            </label>
                            <input
                                type="text"
                                placeholder='Nhập tiêu đề khảo sát'
                                value={formData.title}
                                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                                className="p-2 w-full border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-[2px]">
                                Ngày bắt đầu <span className="text-red-600">(*)</span>
                            </label>
                            <DatePicker
                                placeholder="Chọn ngày bắt đầu"
                                value={parseDate(formData.startDate)}
                                mask
                                maskClosable
                                onChange={(date) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        startDate: formatDate(date as Date | null),
                                    }))
                                }
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-[2px]">
                                Ngày hết hạn <span className="text-red-600">(*)</span>
                            </label>
                            <DatePicker
                                placeholder="Chọn ngày hết hạn"
                                value={parseDate(formData.expiryDate)}
                                mask
                                maskClosable
                                onChange={(date) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        expiryDate: formatDate(date as Date | null),
                                    }))
                                }
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-[2px]">
                                Mô tả khảo sát <span className="text-red-600">(*)</span>
                            </label>
                            <textarea
                                value={formData.description}
                                placeholder='Nhập mô tả'
                                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                                className="p-2 h-[150px] w-full border border-gray-300 rounded-lg outline-0"
                            />
                        </div>

                        <div>
                            {formData.questions.map((q, index) => (
                                <div key={q.questionId} className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-[2px]">
                                            Câu hỏi {index + 1} <span className="text-red-600">(*)</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={q.question}
                                            onChange={(e) => handleQuestionChange(q.questionId, 'question', e.target.value)}
                                            className="p-2 w-full border border-gray-300 rounded-lg"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-[2px]">
                                            Loại câu hỏi <span className="text-red-600">(*)</span>
                                        </label>
                                        <select
                                            value={q.type}
                                            onChange={(e) => {
                                                const newType = e.target.value as 'text' | 'multiple-choice' | 'one-choice';
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    questions: prev.questions.map((qItem) =>
                                                        qItem.questionId === q.questionId
                                                            ? { ...qItem, type: newType, options: newType === 'text' ? [] : [''] }
                                                            : qItem
                                                    ),
                                                }));
                                            }}
                                            className="mt-1 p-2 h-[40px] w-full border border-gray-300 rounded-lg"
                                        >
                                            {/* <option value="text">Câu hỏi nhập nội dung trả lời</option> */}
                                            <option value="one-choice">Câu hỏi chọn một đáp án</option>
                                            <option value="multiple-choice">Câu hỏi chọn nhiều đáp án</option>
                                        </select>
                                    </div>

                                    {(q.type === 'multiple-choice' || q.type === 'one-choice') && (
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-[2px]">
                                                Lựa chọn <span className="text-red-600">(*)</span>
                                            </label>
                                            {q.options?.map((opt, index) => (
                                                <div key={index} className="mb-2 flex items-center">
                                                    <input
                                                        type="text"
                                                        value={opt}
                                                        onChange={(e) => handleOptionChange(q.questionId, index, e.target.value)}
                                                        className="p-2 w-full border border-gray-300 rounded-md"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveOption(q.questionId, index)}
                                                        className="ml-2 text-white bg-[#c46574] p-2 rounded-lg"
                                                    >
                                                        <Icon fontSize={18} icon="material-symbols:delete" />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        questions: prev.questions.map((qItem) =>
                                                            qItem.questionId === q.questionId
                                                                ? { ...qItem, options: [...(qItem.options || []), ''] }
                                                                : qItem
                                                        ),
                                                    }))
                                                }
                                                className="mt-2 text-white flex items-center gap-1 bg-blue-500 p-2 rounded-lg ml-auto"
                                            >
                                                <Icon fontSize={18} icon="material-symbols:add-rounded" />
                                            </button>
                                        </div>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => removeQuestion(q.questionId)}
                                        className="mt-2 text-white font-medium bg-[#c46574] flex items-center gap-1 p-2 rounded-lg ml-auto"
                                    >
                                        <Icon fontSize={18} icon="material-symbols:delete" />
                                        Xóa câu hỏi
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 mb-6">
                            <Button
                                variant="secondary"
                                size='medium'
                                onClick={() => addQuestion('one-choice')}
                                fullWidth
                                className="flex"
                            >
                                <div className="flex items-center justify-center gap-1">
                                    <Icon fontSize={18} icon="material-symbols:add-rounded" />
                                    <span className='text-[14px]'>Thêm câu hỏi</span>
                                </div>
                            </Button>
                        </div>

                        <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-3">
                            <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                                <SecondaryButton fullWidth label="Xem trước" handleClick={handlePreview} />
                                <PrimaryButton
                                    fullWidth
                                    label={isPending ? 'Đang xử lý...' : 'Tạo khảo sát'}
                                    handleClick={handleSubmit}
                                    disabled={isPending}
                                />
                            </Box>
                        </div>
                    </Box>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn thêm khảo sát này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    );
};

export default CreateSurveyForm;
