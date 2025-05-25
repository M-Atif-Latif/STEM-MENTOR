import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { BrainCircuit } from 'lucide-react';

interface AuthPageProps {
  type: 'login' | 'register';
}

const AuthPage: React.FC<AuthPageProps> = ({ type }) => {
  const { currentUser } = useAuth();

  // Redirect if already logged in
  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto mb-8 text-center">
          <div className="flex justify-center mb-4">
            <BrainCircuit size={48} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            STEM Mentor
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            AI-powered learning for STEM subjects
          </p>
        </div>

        {type === 'login' ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export const LoginPage: React.FC = () => <AuthPage type="login" />;
export const RegisterPage: React.FC = () => <AuthPage type="register" />;