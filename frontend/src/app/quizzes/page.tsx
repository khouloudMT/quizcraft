"use client";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

const QUIZZES_QUERY = gql`
  query {
    quizzes {
      _id
      title
      createdAt
      submissionCount
      creator {
        username
        email
      }
    }
  }
`;

export default function QuizzesPage() {
  const { data, loading, error } = useQuery(QUIZZES_QUERY);

  if (loading) return <div className="flex justify-center py-20">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-10">Error: {error.message}</div>;

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-10 text-center">All Quizzes</h1>
      {(!data?.quizzes || data.quizzes.length === 0) ? (
        <div className="text-center text-gray-400 py-20">No quizzes found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.quizzes.map((quiz: any) => (
            <Link
              key={quiz._id}
              href={`/quizzes/${quiz._id}`}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition group border border-blue-100"
            >
              <div>
                <h2 className="text-2xl font-bold text-blue-700 mb-2 group-hover:underline">{quiz.title}</h2>
                <div className="text-sm text-gray-500 mb-4">
                  By {quiz.creator?.username || quiz.creator?.email || "Unknown"} &middot;{" "}
                  {new Date(quiz.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-center group-hover:bg-blue-700 transition">
                  Take Quiz
                </span>
                <span className="text-xs text-gray-400 ml-2">{quiz.submissionCount} submissions</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}