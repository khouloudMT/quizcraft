export default function AuthForm({ isLogin }: { isLogin: boolean }) {
  return (
    <div className="max-w-md mx-auto mt-10 p-8 rounded-xl shadow-lg bg-white">
      <h2 className={`text-3xl font-bold mb-6 text-center ${isLogin ? 'text-blue-600' : 'text-red-600'}`}>
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </h2>
      <form className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-gray-700 mb-2">Username</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input 
            type="email" 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Password</label>
          <input 
            type="password" 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-3 px-4 rounded-lg text-white font-bold ${isLogin ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'} transition`}
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );
}