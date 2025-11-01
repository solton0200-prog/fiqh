import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { login as apiLogin } from '../services/api';
import { FaBook, FaSpinner } from '../components/icons';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const { token } = await apiLogin(username, password);
      login(token);
    } catch (err) {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
            <FaBook className="text-5xl text-cyan-400 mb-3" />
            <h1 className="text-3xl font-bold text-white">ورشة فقه دانش</h1>
            <p className="text-slate-400 mt-1">لوحة تحكم المسؤول</p>
        </div>
        <div className="bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-700">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="username">
                اسم المستخدم
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="password">
                كلمة المرور
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>
            {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-200 flex items-center justify-center"
              >
                {isLoading && <FaSpinner className="animate-spin -ms-1 me-3" />}
                <span>تسجيل الدخول</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
