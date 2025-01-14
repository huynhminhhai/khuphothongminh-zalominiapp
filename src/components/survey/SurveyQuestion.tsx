import React from 'react';

interface QuestionType {
  id: number;
  question: string;
  type: "text" | "multiple-choice" | "one-choice";
  options?: string[];
}

interface Response {
  questionId: number;
  answer: string | string[];
}

interface QuestionProps {
  question: QuestionType;
  response: Response | undefined;
  handleAnswerChange: (questionId: number, answer: string | string[]) => void;
  index: number;
}

const SurveyQuestion: React.FC<QuestionProps> = ({ question, response, handleAnswerChange, index }) => {
  return (
    <div className="p-4 border-b">
      <label className="block text-sm font-semibold mb-3 text-black">
        Câu hỏi {index + 1}: {question.question}
      </label>

      {/* Câu hỏi dạng text */}
      {question.type === "text" && (
        <input
          type="text"
          value={response?.answer || ""}
          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          className="p-2 w-full border border-gray-300 rounded-lg"
        />
      )}

      {/* Câu hỏi dạng multiple-choice (checkbox) */}
      {question.type === "multiple-choice" && (
        <div className="flex flex-col">
          {question.options?.map((opt, idx) => (
            <div key={idx} className="mb-2 flex items-center gap-2">
              <input
                type="checkbox"
                checked={response?.answer.includes(opt) || false}
                onChange={(e) => {
                  const selectedOptions = (response?.answer as string[]) || [];
                  const newOptions = e.target.checked
                    ? [...selectedOptions, opt]
                    : selectedOptions.filter((option) => option !== opt);
                  handleAnswerChange(question.id, newOptions);
                }}
              />
              <span>{opt}</span>
            </div>
          ))}
        </div>
      )}

      {/* Câu hỏi dạng one-choice (radio) */}
      {question.type === "one-choice" && (
        <div className="flex flex-col">
          {question.options?.map((opt, idx) => (
            <div key={idx} className="mb-2 flex items-center">
              <input
                type="radio"
                checked={response?.answer === opt}
                onChange={() => handleAnswerChange(question.id, opt)}
              />
              <span>{opt}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SurveyQuestion;
