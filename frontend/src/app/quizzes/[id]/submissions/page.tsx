"use client";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import Link from "next/link";

const QUIZ_SUBMISSIONS_QUERY = gql`
  query QuizSubmissions($quizId: String!) {
    quizSubmissions(quizId: $quizId) {
      _id
      score
      answers
      createdAt
      user {
        username
        email
      }
    }
  }
`;

export default function QuizSubmissionsPage() {
  const { id } = useParams();
  const { data, loading, error, refetch } = useQuery(QUIZ_SUBMISSIONS_QUERY, {
    variables: { quizId: id },
  });

  if (loading)
    return <div className="flex justify-center py-20">Loading...</div>;
  if (error)
    return (
      <div className="text-red-500 mb-4 text-center">
        Error loading submissions.
        <br />
        <span className="text-xs">{error.message}</span>
        <button
          onClick={() => refetch()}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
        >
          Retry
        </button>
      </div>
    );

  const submissions = data?.quizSubmissions || [];

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Quiz Submissions</h1>
      {submissions.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          No submissions yet for this quiz.
        </div>
      ) : (
        <table className="min-w-full border bg-white rounded-xl shadow">
          <thead>
            <tr>
              <th className="border px-2 py-1">User</th>
              <th className="border px-2 py-1">Score</th>
              <th className="border px-2 py-1">Answers</th>
              <th className="border px-2 py-1">Date</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub: any) => (
              <tr key={sub._id}>
                <td className="border px-2 py-1">
                  {sub.user?.username ||
                    sub.user?.email || (
                      <span className="italic text-gray-400">Unknown</span>
                    )}
                </td>
                <td className="border px-2 py-1">{sub.score}</td>
                <td className="border px-2 py-1">
                  {Array.isArray(sub.answers) ? sub.answers.join(", ") : ""}
                </td>
                <td className="border px-2 py-1">
                  {sub.createdAt
                    ? new Date(sub.createdAt).toLocaleString()
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link
        href="/"
        className="text-blue-600 mt-4 inline-block"
      >
        Back to Dashboard
      </Link>
    </main>
  );
}