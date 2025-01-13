import React, { useState } from 'react';
import { Box, Button, DatePicker, Modal } from 'zmp-ui';
import * as yup from 'yup';
import { PrimaryButton } from 'components/button';
import { Icon } from '@iconify/react';
import SecondaryButton from 'components/button/SecondaryButton';
import { formatDate, parseDate } from 'components/form/DatePicker';

type QuestionType = {
    id: string;
    type: 'text' | 'multiple-choice' | 'one-choice';  // Đổi 'rating' thành 'one-choice'
    question: string;
    options?: string[];
};

type SurveyType = {
    title: string;
    description: string;
    expiryDate: string;
    questions: QuestionType[];
};

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
                { id: Date.now().toString(), type, question: '', options: type === 'multiple-choice' || type === 'one-choice' ? [''] : [] },
            ],
        }));
    };

    const handleQuestionChange = (id: string, field: 'question' | 'options', value: string) => {
        setFormData((prev) => ({
            ...prev,
            questions: prev.questions.map((q) =>
                q.id === id ? { ...q, [field]: value } : q
            ),
        }));
    };

    const handleOptionChange = (id: string, index: number, value: string) => {
        setFormData((prev) => ({
            ...prev,
            questions: prev.questions.map((q) =>
                q.id === id
                    ? { ...q, options: q.options?.map((opt, i) => (i === index ? value : opt)) }
                    : q
            ),
        }));
    };

    const removeQuestion = (id: string) => {
        setFormData((prev) => ({
            ...prev,
            questions: prev.questions.filter((q) => q.id !== id),
        }));
    };

    const handleRemoveOption = (questionId: string, index: number) => {
        setFormData((prev) => ({
            ...prev,
            questions: prev.questions.map((q) =>
                q.id === questionId
                    ? { ...q, options: q.options?.filter((_, i) => i !== index) }
                    : q
            ),
        }));
    };

    const handleSubmit = () => {

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

        console.log('Survey submitted:', formData);
    };

    const handlePreview = () => {
        if (!formData.title.trim() || !formData.description.trim() || formData.questions.length === 0) {
            setPopupVisible(true);
            return;
        }
        setPreviewVisible(true);
    };

    return (
        <Box>
            <Modal
                visible={previewVisible}
                title={''}
                onClose={() => setPreviewVisible(false)}
                verticalActions
            >
                <Box p={4}>
                    {/* Tiêu đề và mô tả */}
                    <h3 className='text-[18px] text-[black] leading-[22px] font-semibold text-center mb-2'>{formData.title}</h3>
                    <p className="text-[16px] text-gray-600 mb-1 text-center">Thời hạn: <span className='font-semibold text-[black]'>25/01/2025</span></p>
                    <p className="text-[16px] text-gray-600 mb-4 text-center">{formData.description}</p>

                    {/* Danh sách câu hỏi */}
                    <div className="space-y-4 mb-4">
                        {formData.questions.map((q, index) => (
                            <div key={q.id} className="border-t-[1px] pt-3 mb-3">
                                <h3 className="font-medium mb-2">
                                    Câu hỏi {index + 1}: {q.question}
                                </h3>

                                {/* Render tùy chọn */}
                                {q.type === 'text' && <input type='text' className='border w-[100%] h-[28px] px-2' placeholder='Nhập thông tin...'/>}

                                {q.type === 'one-choice' && (
                                    <div className="space-y-2">
                                        {q.options?.map((opt, i) => (
                                            <label key={i} className="flex items-center space-x-2">
                                                <input type="radio" name={`question-${q.id}`} />
                                                <span>{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}

                                {q.type === 'multiple-choice' && (
                                    <div className="space-y-2">
                                        {q.options?.map((opt, i) => (
                                            <label key={i} className="flex items-center space-x-2">
                                                <input type="checkbox" />
                                                <span>{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Nút đóng */}
                    <Button
                        variant="secondary"
                        onClick={() => setPreviewVisible(false)}
                        fullWidth
                    >
                        Đóng
                    </Button>
                </Box>
            </Modal>
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
                                Tiêu đề khảo sát <span className="text-red-600">(*)</span>
                            </label>
                            <DatePicker
                                placeholder="Chọn ngày hết hạn"
                                dateFormat='dd/mm/yyyy'
                                value={formData.expiryDate ? parseDate(formData.expiryDate, 'dd/mm/yyyy') : undefined}
                                onChange={(date) => {
                                    if (date) {
                                        setFormData((prev) => ({
                                            ...prev,
                                            expiryDate: formatDate(date as Date | null, 'dd/mm/yyyy'),
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
                                <div key={q.id} className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-[2px]">
                                            Câu hỏi {index + 1} <span className="text-red-600">(*)</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={q.question}
                                            onChange={(e) => handleQuestionChange(q.id, 'question', e.target.value)}
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
                                                        qItem.id === q.id ? { ...qItem, type: newType, options: newType === 'multiple-choice' || newType === 'one-choice' ? [''] : [] } : qItem
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
                                                        onChange={(e) => handleOptionChange(q.id, index, e.target.value)}
                                                        className="p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveOption(q.id, index)}
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
                                                            qItem.id === q.id
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
                                        onClick={() => removeQuestion(q.id)}
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

                        <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-1">
                            <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                                <SecondaryButton fullWidth label='Xem trước' handleClick={() => handlePreview()} />
                                <PrimaryButton fullWidth label={loading ? "Đang xử lý..." : "Tạo khảo sát"} handleClick={() => handleSubmit()} />
                            </Box>
                        </div>
                    </Box>
                </div>
            </Box>
        </Box>
    );
};

export default CreateSurveyForm;
