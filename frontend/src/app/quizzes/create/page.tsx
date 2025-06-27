"use client";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../lib/AuthContext";

const CREATE_QUIZ_MUTATION = gql`
  mutation CreateQuiz($title: String!, $questions: [QuestionInput!]!) {
    createQuiz(input: { title: $title, questions: $questions }) {
      _id
      title
    }
  }
`;

export default function CreateQuizPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { text: "", options: ["", ""], correctAnswer: "" },
  ]);
  const [createQuiz, { loading, error }] = useMutation(CREATE_QUIZ_MUTATION);

  if (!token) {
    router.replace("/login");
    return null;
  }

  const handleQuestionChange = (
    idx: number,
    field: "text" | "correctAnswer",
    value: string
  ) => {
    const updated = [...questions];
    updated[idx][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIdx: number, oIdx: number, value: string) => {
    const updated = [...questions];
    updated[qIdx].options[oIdx] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { text: "", options: ["", ""], correctAnswer: "" }]);
  };

  const removeQuestion = (idx: number) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const addOption = (qIdx: number) => {
    const updated = [...questions];
    updated[qIdx].options.push("");
    setQuestions(updated);
  };

  const removeOption = (qIdx: number, oIdx: number) => {
    const updated = [...questions];
    updated[qIdx].options.splice(oIdx, 1);
    setQuestions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createQuiz({
      variables: {
        title,
        questions: questions.map(q => ({
          text: q.text,
          options: q.options,
          correctAnswer: q.correctAnswer,
        })),
      },
    });
    router.push("/"); // or /quizzes
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Create a New Quiz</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
        <div>
          <label className="block mb-1 font-semibold">Quiz Title</label>
          <input
            className="border px-2 py-1 rounded w-full"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Questions</label>
          {questions.map((q, idx) => (
            <div key={idx} className="border rounded p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Question {idx + 1}</span>
                {questions.length > 1 && (
                  <button type="button" onClick={() => removeQuestion(idx)} className="text-red-600">Remove</button>
                )}
              </div>
              <input
                className="border px-2 py-1 rounded w-full mb-2"
                placeholder="Question text"
                value={q.text}
                onChange={e => handleQuestionChange(idx, "text", e.target.value)}
                required
              />
              <div className="mb-2">
                <label className="block font-semibold mb-1">Options</label>
                {q.options.map((opt, oIdx) => (
                  <div key={oIdx} className="flex items-center gap-2 mb-1">
                    <input
                      className="border px-2 py-1 rounded w-full"
                      placeholder={`Option ${oIdx + 1}`}
                      value={opt}
                      onChange={e => handleOptionChange(idx, oIdx, e.target.value)}
                      required
                    />
                    {q.options.length > 2 && (
                      <button type="button" onClick={() => removeOption(idx, oIdx)} className="text-red-600">x</button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => addOption(idx)} className="text-blue-600 mt-1">Add Option</button>
              </div>
              <div>
                <label className="block font-semibold mb-1">Correct Answer</label>
                <input
                  className="border px-2 py-1 rounded w-full"
                  placeholder="Correct answer (must match one option exactly)"
                  value={q.correctAnswer}
                  onChange={e => handleQuestionChange(idx, "correctAnswer", e.target.value)}
                  required
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={addQuestion} className="text-blue-600">Add Question</button>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          Create Quiz
        </button>
        {error && <div className="text-red-500">{error.message}</div>}
      </form>
    </main>
  );
}