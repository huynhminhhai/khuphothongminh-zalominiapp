import { SURVEYRESULT } from "constants/utinities";

export const generateColors = (numColors: number): string[] => {
    const colors: string[] = []; // Khai báo kiểu rõ ràng cho mảng
    for (let i = 0; i < numColors; i++) {
        colors.push(`hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`); // Màu ngẫu nhiên HSL
    }
    return colors;
};

export const processSurveyResults = (data: typeof SURVEYRESULT) => {
    const questionsMap: Record<
        number,
        { question: string; type: string; answers: Record<string, number> }
    > = {};

    data.forEach((response) => {
        console.log(response)
        response.responses.forEach((answer) => {
            const { id, type, answer: answerValue } = answer;


            if (!questionsMap[id]) {
                questionsMap[id] = {
                    question: `Câu hỏi ${id}`,
                    type,
                    answers: {},
                };
            }

            if (type === "one-choice") {
                const choice = answerValue as string;
                questionsMap[id].answers[choice] =
                    (questionsMap[id].answers[choice] || 0) + 1;
            }

            if (type === "multiple-choice") {
                const choices = answerValue as string[];
                choices.forEach((choice) => {
                    questionsMap[id].answers[choice] =
                        (questionsMap[id].answers[choice] || 0) + 1;
                });
            }

            if (type === "text") {
                const text = answerValue as string;
                questionsMap[id].answers[text] =
                    (questionsMap[id].answers[text] || 0) + 1;
            }
        });
    });

    return Object.values(questionsMap).map((q) => ({
        question: q.question,
        type: q.type as "one-choice" | "multiple-choice" | "text",
        answers: Object.entries(q.answers).map(([answer, count]) => ({
            answer,
            count,
        })),
    }));
};