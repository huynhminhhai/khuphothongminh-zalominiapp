import { SurveyType } from 'constants/utinities';
import React from 'react';
import { formatDate } from 'utils/date';
import { Box, Button, Modal } from 'zmp-ui';

type SurveyPreviewModalProps = {
  visible: boolean;
  onClose: () => void;
  formData: SurveyType
}

const SurveyPreviewModal: React.FC<SurveyPreviewModalProps> = ({
  visible,
  onClose,
  formData,
}) => {

  return (
    <Modal
      visible={visible}
      title={''}
      onClose={onClose}
      verticalActions
    >
      <Box p={4}>
        {/* Tiêu đề và mô tả */}
        <h3 className='text-[18px] text-[black] leading-[22px] font-semibold text-center mb-2'>{formData.title}</h3>
        <p className="text-[16px] text-gray-600 mb-1 text-center">Thời hạn: <span className='font-semibold text-[black]'>{formatDate(formData.expiryDate)}</span></p>
        <p className="text-[16px] text-gray-600 mb-4 text-center">{formData.description}</p>

        {/* Danh sách câu hỏi */}
        <div className="space-y-4 mb-4">
          {formData.questions.map((q, index) => (
            <div key={index} className="border-t-[1px] pt-3 mb-3">
              <h3 className="font-medium mb-2">
                Câu hỏi {index + 1}: {q.question}
              </h3>

              {/* Render tùy chọn */}
              {q.type === 'text' && <input type='text' className='border w-[100%] h-[28px] px-2' placeholder='Nhập thông tin...' />}

              {q.type === 'one-choice' && (
                <div className="space-y-2">
                  {q.options?.map((opt, i) => (
                    <label key={i} className="flex items-center space-x-2">
                      <input type="radio" name={`question-${q.questionId}`} />
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
          onClick={onClose}
          fullWidth
          size='small'
        >
          Đóng
        </Button>
      </Box>
    </Modal>
  );
};

export default SurveyPreviewModal;
