import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Card, { CardBody } from '../components/ui/Card';
import { topics } from '../data/mockData';
import TopicCard from '../components/learning/TopicCard';
import { ArrowRight, BookOpen, BrainCircuit, LineChart, Sparkles } from 'lucide-react';

const HomePage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Featured topics - just show 3 random topics
  const featuredTopics = topics.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                AI-Powered Learning for STEM Subjects
              </h1>
              <p className="text-lg text-blue-100 mb-8 max-w-xl">
                Personalized quizzes, interactive explanations, and adaptive learning paths to help you master Math, Science, and Technology.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => navigate('/topics')}
                  rightIcon={<ArrowRight size={16} />}
                >
                  Explore Topics
                </Button>
                {!currentUser && (
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                    onClick={() => navigate('/register')}
                  >
                    Sign Up Free
                  </Button>
                )}
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Students learning" 
                className="rounded-lg shadow-xl max-w-md w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Supercharge Your Learning
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our AI-powered platform adapts to your learning style and helps you master complex STEM concepts with ease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardBody className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <BrainCircuit className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  AI-Powered Assessment
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Our AI analyzes your strengths and weaknesses to create a personalized learning path.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Interactive Quizzes
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Engage with adaptive quizzes that adjust to your knowledge level and learning pace.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Visual Explanations
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Complex concepts explained with clear diagrams, animations, and step-by-step guidance.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                    <LineChart className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Progress Tracking
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Monitor your learning journey with detailed progress analytics and achievement badges.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Featured Topics
            </h2>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/topics')}
              rightIcon={<ArrowRight size={16} />}
            >
              View All Topics
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTopics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-800 dark:to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already mastering STEM subjects with our AI-powered learning platform.
          </p>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => navigate(currentUser ? '/topics' : '/register')}
            className="bg-white text-purple-700 hover:bg-gray-100"
          >
            {currentUser ? 'Start Learning Now' : 'Create Free Account'}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;