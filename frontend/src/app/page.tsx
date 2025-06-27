"use client";
import { useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/AuthContext";

const MY_QUIZZES_QUERY = gql`
  query {
    myQuizzes {
      _id
      title
      createdAt
      submissionCount
    }
  }
`;

const DELETE_QUIZ_MUTATION = gql`
  mutation DeleteQuiz($id: String!) {
    deleteQuiz(id: $id)
  }
`;

export default function Dashboard() {
  const { token } = useAuth();
  const router = useRouter();
  const { data, loading, error, refetch } = useQuery(MY_QUIZZES_QUERY, {
    skip: !token,
    fetchPolicy: "network-only",
  });

  const [deleteQuiz] = useMutation(DELETE_QUIZ_MUTATION);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this quiz?")) {
      await deleteQuiz({ variables: { id } });
      refetch();
    }
  };

  if (!token) return null;

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-gradient-brand mb-2">
            My Dashboard
          </h1>
          <p className="text-gray-500">
            Create, manage, and track your quizzes.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/quizzes/create"
            className="bg-gradient-brand text-white px-5 py-2 rounded-lg font-semibold shadow hover:scale-105 transition"
          >
            + Add New Quiz
          </Link>
          <Link
            href="/my-submissions"
            className="bg-white border border-blue-600 text-blue-600 px-5 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            My Submissions
          </Link>
        </div>
      </div>
      {loading && (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
          Error loading your quizzes.
        </div>
      )}
      {data?.myQuizzes?.length === 0 && (
        <div className="text-center text-gray-400 py-20">
          <svg
            className="mx-auto mb-4 w-12 h-12 text-gray-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-lg">You have not created any quizzes yet.</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data?.myQuizzes?.map((quiz: any) => (
          <div
            key={quiz._id}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-blue-700">{quiz.title}</h2>
                <span className="text-xs text-gray-400">
                  {new Date(quiz.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 17v-2a4 4 0 014-4h3a4 4 0 014 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                  </svg>
                  {quiz.submissionCount} Submissions
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Link
                href={`/quizzes/${quiz._id}`}
                className="bg-blue-600 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                View Quiz
              </Link>
              <Link
                href={`/quizzes/${quiz._id}/submissions`}
                className="bg-green-600 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-green-700 transition"
              >
                View Submissions
              </Link>
              <Link
                href={`/quizzes/${quiz._id}/edit`}
                className="bg-yellow-400 text-yellow-900 px-4 py-1.5 rounded-lg font-medium hover:bg-yellow-300 transition"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(quiz._id)}
                className="bg-red-600 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}