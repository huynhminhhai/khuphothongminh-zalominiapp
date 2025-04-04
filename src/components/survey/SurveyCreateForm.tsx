import React, { useState } from 'react';
import { Box, Button, DatePicker, Modal, useNavigate, useSnackbar } from 'zmp-ui';
import { PrimaryButton } from 'components/button';
import { Icon } from '@iconify/react';
import SecondaryButton from 'components/button/SecondaryButton';
import { formatDate, parseDate } from 'components/form/DatePicker';
import SurveyPreviewModal from './SurveyPreviewModal';
import { ConfirmModal } from 'components/modal';
import { SurveyType } from 'constants/utinities';

// type QuestionType = {
//     questionId: number;
//     type: 'text' | 'multiple-choice' | 'one-choice';  // Đổi 'rating' thành 'one-choice'
//     question: string;
//     options?: string[];
// };

// type SurveyType = {
//     title: string;
//     description: string;
//     expiryDate: string;
//     questions: QuestionType[];
// };

const defaultValues: SurveyType = {
    title: '',
    description: '',
    expiryDate: '',
    questions: [],
};

const CreateSurveyForm: React.FC = () => {

    const [formData, setFormData] = useState<SurveyType>(defaultValues)
    const [popupVisible, setPopupVisible] = useState<boolean>(false);
    const [previewVisible, setPreviewVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [descModal, setDescModal] = useState<string>('')
    const [isConfirmVisible, setConfirmVisible] = useState(false);

    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const addQuestion = (type: 'text' | 'multiple-choice' | 'one-choice') => {
        // Kiểm tra các câu hỏi hiện có
        for (const q of formData.questions) {
            if (!q.question.trim()) {
                setDescModal('Câu hỏi chưa có tiêu đề')
                setPopupVisible(true);
                return;
            }

            if ((q.type === 'multiple-choice' || q.type === 'one-choice') && q.options?.some(opt => !opt.trim())) {
                setDescModal('Các lựa chọn không được để trống')
                setPopupVisible(true);
                return;
            }
        }

        setFormData((prev) => ({
            ...prev,
            questions: [
                ...prev.questions,
                { questionId: Date.now(), type, question: '', options: type === 'multiple-choice' || type === 'one-choice' ? [''] : [] },
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

    const handleSubmit = () => {

        if (formData) {
            if (!formData.title.trim() || !formData.description.trim()) {
                setDescModal("Tiêu đề và mô tả không thể trống. Hãy điền đầy đủ thông tin để tiếp tục")
                setPopupVisible(true)
                return;
            }

            if (formData.questions.length <= 0) {
                setDescModal("Khảo sát phải có ít nhất một câu hỏi")
                setPopupVisible(true)
                return;
            }

            // Kiểm tra các câu hỏi hiện có
            for (const q of formData.questions) {
                if (!q.question.trim()) {
                    setDescModal('Câu hỏi chưa có tiêu đề')
                    setPopupVisible(true);
                    return;
                }

                if ((q.type === 'multiple-choice' || q.type === 'one-choice') && q.options?.some(opt => !opt.trim())) {
                    setDescModal('Các lựa chọn không được để trống')
                    setPopupVisible(true);
                    return;
                }
            }
        }

        setConfirmVisible(true);
    };

    const handlePreview = () => {
        if (formData) {
            if (!formData.title.trim() || !formData.description.trim() || formData.questions.length === 0) {
                setDescModal('Chưa đầy đủ thông tin để xem trước khảo sát')
                setPopupVisible(true);
                return;
            }
        }
        setPreviewVisible(true);
    };

    const handleConfirm = () => {
        setConfirmVisible(false);
        if (formData) {

            const updatedQuestions = formData.questions.map(({ questionId, ...rest }) => ({
                ...rest, // Giữ lại tất cả các trường khác ngoài id
            }));

            console.log('Survey submitted:', { ...formData, questions: updatedQuestions });

            openSnackbar({
                text: "Tạo khảo sát thành công",
                type: "success",
                duration: 5000,
            });


            // navigate('/survey-management')
        }
    };

    const handleCancel = () => {
        console.log("Cancelled!");
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
                onClose={() => {
                    setPopupVisible(false);
                }}
                verticalActions
                description={descModal}
            >
                <Box mt={6} p={6}>
                    <Button
                        variant='secondary'
                        onClick={() => {
                            setPopupVisible(false);
                        }}
                        fullWidth
                    >
                        Xác nhận
                    </Button>
                </Box>
            </Modal>
            <Box p={4}>
                <div className="bg-white rounded-xl">
                    <Box>
                        {/* Tiêu đề và mô tả khảo sát */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-[2px]">
                                Tiêu đề khảo sát <span className="text-red-600">(*)</span>
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="p-2 w-full border border-gray-300 rounded-lg"
                            // required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-[2px]">
                                Ngày hết hạn <span className="text-red-600">(*)</span>
                            </label>
                            <DatePicker
                                placeholder="Chọn ngày hết hạn"
                                dateFormat='dd/mm/yyyy'
                                value={formData.expiryDate ? parseDate(formData.expiryDate) : undefined}
                                onChange={(date) => {
                                    if (date) {
                                        setFormData((prev) => ({
                                            ...prev,
                                            expiryDate: formatDate(date as Date | null),
                                        }));
                                    }

                                }}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-[2px]">
                                Mô tả khảo sát <span className="text-red-600">(*)</span>
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="p-2 h-[100px] w-full border border-gray-300 rounded-lg"
                            // required
                            />
                        </div>

                        {/* Câu hỏi */}
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
                                            className="p-2 w-full border border-gray-300 rounded-lg "
                                            required
                                        />
                                    </div>

                                    {/* Lựa chọn loại câu hỏi */}
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
                                                        qItem.questionId === q.questionId ? { ...qItem, type: newType, options: newType === 'multiple-choice' || newType === 'one-choice' ? [''] : [] } : qItem
                                                    ),
                                                }));
                                            }}
                                            className="mt-1 p-2 h-[40px] w-full border border-gray-300 rounded-lg"
                                        >
                                            <option value="text">Văn bản</option>
                                            <option value="multiple-choice">Trắc nghiệm</option>
                                            <option value="one-choice">Lựa chọn đơn</option>
                                        </select>
                                    </div>

                                    {/* Hiển thị câu hỏi lựa chọn */}
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
                                                        className="p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveOption(q.questionId, index)}
                                                        className="ml-2 text-white bg-red-700 focus:outline-none p-2 rounded-lg"
                                                    >
                                                        <Icon fontSize={18} icon='material-symbols:delete' />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        questions: prev.questions.map((qItem) =>
                                                            qItem.questionId === q.questionId
                                                                ? { ...qItem, options: [...(qItem.options || []), ''] }
                                                                : qItem
                                                        ),
                                                    }));
                                                }}
                                                className="mt-2 text-white flex items-center gap-1 bg-indigo-500 p-2 rounded-lg ml-auto"
                                            >
                                                <Icon fontSize={18} icon='material-symbols:add-rounded' />
                                                {/* Thêm lựa chọn */}
                                            </button>
                                        </div>
                                    )}

                                    {/* Xóa câu hỏi */}
                                    <button
                                        type="button"
                                        onClick={() => removeQuestion(q.questionId)}
                                        className="mt-2 text-white font-medium bg-red-700 flex items-center gap-1 p-2 rounded-lg ml-auto"
                                    >
                                        <Icon fontSize={18} icon='material-symbols:delete' />
                                        Xóa câu hỏi
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Nút thêm câu hỏi */}
                        <div className="mt-4 mb-6">
                            <Button
                                variant='secondary'
                                onClick={() => addQuestion('text')}
                                fullWidth
                                className='flex'
                            >
                                <div className='flex items-center justify-center gap-1'><Icon fontSize={18} icon='material-symbols:add-rounded' />
                                    Thêm câu hỏi văn bản</div>
                            </Button>
                        </div>

                        <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-3">
                            <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                                <SecondaryButton fullWidth label='Xem trước' handleClick={() => handlePreview()} />
                                <PrimaryButton fullWidth label={loading ? "Đang xử lý..." : "Tạo khảo sát"} handleClick={() => handleSubmit()} />
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
