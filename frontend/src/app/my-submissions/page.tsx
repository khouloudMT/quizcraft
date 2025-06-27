"use client";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

const MY_SUBMISSIONS_QUERY = gql`
  query {
    mySubmissions {
      _id
      score
      answers
      createdAt
      quiz {
        _id
        title
      }
    }
  }
`;

export default function MySubmissionsPage() {
  const { data, loading, error } = useQuery(MY_SUBMISSIONS_QUERY);

  if (loading) return <div className="flex justify-center py-20">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-10">Error: {error.message}</div>;

  const submissions = data?.mySubmissions || [];

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">My Submissions</h1>
      {submissions.length === 0 ? (
        <div className="text-center text-gray-400 py-20">You haven't submitted any quizzes yet.</div>
      ) : (
        <table className="min-w-full border bg-white rounded-xl shadow">
          <thead>
            <tr>
              <th className="border px-2 py-1">Quiz</th>
              <th className="border px-2 py-1">Score</th>
              <th className="border px-2 py-1">Answers</th>
              <th className="border px-2 py-1">Date</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub: any) => (
              <tr key={sub._id}>
                <td className="border px-2 py-1">
                  <Link href={`/quizzes/${sub.quiz._id}`} className="text-blue-700 hover:underline">
                    {sub.quiz.title}
                  </Link>
                </td>
                <td className="border px-2 py-1">{sub.score}</td>
                <td className="border px-2 py-1">{Array.isArray(sub.answers) ? sub.answers.join(", ") : ""}</td>
                <td className="border px-2 py-1">{sub.createdAt ? new Date(sub.createdAt).toLocaleString() : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}