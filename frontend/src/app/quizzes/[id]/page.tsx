"use client";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const QUIZ_QUERY = gql`
  query Quiz($id: String!) {
    quiz(id: $id) {
      _id
      title
      questions {
        text
        options
      }
    }
  }
`;

const SUBMIT_QUIZ_MUTATION = gql`
  mutation SubmitQuiz($quizId: String!, $answers: [Int!]!) {
    submitQuiz(input: { quizId: $quizId, answers: $answers }) {
      _id
      score
      createdAt
    }
  }
`;

export default function QuizPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data, loading, error } = useQuery(QUIZ_QUERY, { variables: { id } });
  const [submitQuiz, { data: submitData, loading: submitLoading, error: submitError }] = useMutation(SUBMIT_QUIZ_MUTATION);
  const [answers, setAnswers] = useState<(number | undefined)[]>([]);
  const [submitted, setSubmitted] = useState(false);

  if (loading) return <div className="flex justify-center py-20">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  const quiz = data?.quiz;
  if (!quiz) return <div>Quiz not found.</div>;

  const handleChange = (qIdx: number, optIdx: number) => {
    const updated = [...answers];
    updated[qIdx] = optIdx;
    setAnswers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (answers.length !== quiz.questions.length || answers.includes(undefined)) {
      alert("Please answer all questions.");
      return;
    }
    await submitQuiz({ variables: { quizId: quiz._id, answers } });
    setSubmitted(true);
    setTimeout(() => router.push(`/quizzes/${quiz._id}/submissions`), 1800);
  };

  if (submitted && submitData) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-12 flex flex-col items-center">
        <div className="bg-green-100 text-green-700 px-6 py-4 rounded-lg shadow mb-6 text-lg font-semibold">
          🎉 Quiz submitted! Your score: <span className="font-bold">{submitData.submitQuiz.score}</span>
        </div>
        <div className="text-gray-600">Redirecting to submissions...</div>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">{quiz.title}</h1>
      <div className="mb-6 text-center text-blue-700 font-medium">
        {answers.filter(a => a !== undefined).length} / {quiz.questions.length} answered
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        {quiz.questions.map((q: any, qIdx: number) => (
          <div
            key={qIdx}
            className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100"
          >
            <div className="font-semibold mb-4 text-lg flex items-center gap-2">
              <span className="inline-block bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                {qIdx + 1}
              </span>
              {q.text}
            </div>
            <div className="grid gap-3">
              {q.options.map((opt: string, optIdx: number) => (
                <label
                  key={optIdx}
                  className={`flex items-center px-3 py-2 rounded-lg cursor-pointer border transition
                    ${answers[qIdx] === optIdx
                      ? "bg-blue-50 border-blue-500 ring-2 ring-blue-200"
                      : "bg-gray-50 border-gray-200 hover:border-blue-300"}`}
                >
                  <input
                    type="radio"
                    name={`q${qIdx}`}
                    value={optIdx}
                    checked={answers[qIdx] === optIdx}
                    onChange={() => handleChange(qIdx, optIdx)}
                    className="mr-3 accent-blue-600"
                  />
                  <span className="text-base">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          type="submit"
          disabled={submitLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition mt-4 shadow"
        >
          {submitLoading ? "Submitting..." : "Submit Quiz"}
        </button>
        {submitError && (
          <div className="text-red-500 mt-4">{submitError.message}</div>
        )}
      </form>
    </main>
  );
}