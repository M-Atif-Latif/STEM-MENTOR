import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Mail, Lock } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to log in');
    }
  };

  // Demo credentials
  const handleDemoLogin = async (role: 'student' | 'teacher') => {
    try {
      if (role === 'student') {
        await login('alex@example.com', 'password');
      } else {
        await login('taylor@example.com', 'password');
      }
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to log in');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Sign in to continue your learning journey
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md text-sm">
            {error}
          </div>
        )}

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          fullWidth
          leftIcon={<Mail size={18} />}
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          fullWidth
          leftIcon={<Lock size={18} />}
        />

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <Link to="/forgot-password" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          isLoading={loading}
          fullWidth
          className="mb-4"
        >
          Sign in
        </Button>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-gray-300 dark:border-gray-700 absolute w-full"></div>
          <div className="bg-white dark:bg-gray-800 px-4 text-sm text-gray-500 dark:text-gray-400 relative">
            Or continue with demo
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleDemoLogin('student')}
            disabled={loading}
          >
            Student Demo
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleDemoLogin('teacher')}
            disabled={loading}
          >
            Teacher Demo
          </Button>
        </div>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;