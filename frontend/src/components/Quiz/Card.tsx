export default function QuizCard() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
      <div className="h-2 bg-gradient-brand"></div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">JavaScript Basics</h3>
        <p className="text-gray-600 mb-4">Test your knowledge of fundamental JS concepts</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-blue-600 font-medium">10 Questions</span>
          <button className="px-4 py-2 bg-gradient-brand text-white rounded-lg hover:opacity-90 transition">
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}