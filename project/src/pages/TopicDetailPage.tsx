import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { topics, quizzes } from '../data/mockData';
import Card, { CardBody, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import QuizCard from '../components/learning/QuizCard';
import { ArrowLeft, BookOpen, Clock, PlayCircle, Puzzle as PuzzlePiece } from 'lucide-react';
import { getIconByName } from '../data/mockData';

const TopicDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const topic = topics.find(t => t.id === id);
  
  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Topic Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The topic you're looking for doesn't exist or has been removed.
            </p>
            <Button 
              variant="primary"
              onClick={() => navigate('/topics')}
              leftIcon={<ArrowLeft size={16} />}
            >
              Back to Topics
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Get related quizzes
  const topicQuizzes = quizzes.filter(q => q.topicId === topic.id);
  const Icon = getIconByName(topic.icon);
  
  // Define category colors
  const categoryColors = {
    math: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-700 dark:text-blue-300',
      icon: 'text-blue-600 dark:text-blue-400',
    },
    science: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-700 dark:text-green-300',
      icon: 'text-green-600 dark:text-green-400',
    },
    technology: {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      text: 'text-purple-700 dark:text-purple-300',
      icon: 'text-purple-600 dark:text-purple-400',
    },
  };
  
  const colors = categoryColors[topic.category];

  const getIntroText = () => {
    if (topic.category === 'math') {
      return 'Mathematics is the language of the universe, providing us with powerful tools to understand patterns, quantities, and relationships. In this topic, we\'ll explore key concepts that form the foundation of mathematical thinking.';
    } else if (topic.category === 'science') {
      return 'Science helps us understand the natural world through observation, experimentation, and analysis. This topic introduces fundamental principles that explain how our universe works.';
    } else {
      return 'Technology is rapidly transforming our world, creating new possibilities and solutions. This topic explores core concepts that drive modern technological innovation.';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/topics')}
            leftIcon={<ArrowLeft size={16} />}
          >
            Back to Topics
          </Button>
        </div>

        {/* Topic Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <div className={`p-4 rounded-lg ${colors.bg}`}>
                <Icon className={`h-10 w-10 ${colors.icon}`} />
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex flex-wrap items-center mb-2 gap-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mr-2">
                  {topic.title}
                </h1>
                <span className={`text-xs px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                  {topic.category.charAt(0).toUpperCase() + topic.category.slice(1)}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300`}>
                  {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {topic.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="primary"
                  leftIcon={<PlayCircle size={16} />}
                  onClick={() => navigate(`/learn/${topic.id}`)}
                >
                  Start Learning
                </Button>
                <Button 
                  variant="outline"
                  leftIcon={<PuzzlePiece size={16} />}
                  onClick={() => navigate(`/quizzes?topic=${topic.id}`)}
                >
                  Practice Quizzes
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Topic Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Topic Overview */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Overview
            </h2>
            <Card>
              <CardBody className="p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  What You'll Learn
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Key Concepts</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        {topic.category === 'math' && 'Master fundamental mathematical principles through interactive examples and practice problems.'}
                        {topic.category === 'science' && 'Explore scientific theories and phenomena with visual explanations and virtual experiments.'}
                        {topic.category === 'technology' && 'Learn practical technology skills with hands-on coding exercises and real-world applications.'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <PuzzlePiece className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Problem Solving</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        Develop critical thinking and analytical skills through challenging problems with step-by-step guidance.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Estimated Time</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        {topic.difficulty === 'beginner' && 'Approximately 2-3 hours to complete all content and quizzes.'}
                        {topic.difficulty === 'intermediate' && 'Approximately 4-6 hours to complete all content and quizzes.'}
                        {topic.difficulty === 'advanced' && 'Approximately 8-10 hours to complete all content and quizzes.'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Sample Content */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Topic Preview
              </h2>
              <Card>
                <CardBody className="p-6">
                  {/* This would be dynamically generated content based on the topic */}
                  <div className="prose dark:prose-invert max-w-none">
                    <h3>{topic.title} - Introduction</h3>
                    <p>{getIntroText()}</p>
                    
                    <div className="my-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <h4 className="text-lg font-medium mb-2">Key Points</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Understanding fundamental concepts and principles</li>
                        <li>Applying theoretical knowledge to practical problems</li>
                        <li>Developing critical thinking and analytical skills</li>
                        <li>Connecting ideas across different areas of {topic.category}</li>
                      </ul>
                    </div>
                    
                    <p>
                      This is just a preview of the full content. Start learning to access interactive explanations, diagrams, practice problems, and quizzes!
                    </p>
                  </div>
                </CardBody>
                <CardFooter className="bg-gray-50 dark:bg-gray-800/50">
                  <Button 
                    variant="primary" 
                    fullWidth
                    onClick={() => navigate(`/learn/${topic.id}`)}
                  >
                    Start Learning
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Related Quizzes */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Practice Quizzes
            </h2>
            {topicQuizzes.length > 0 ? (
              <div className="space-y-4">
                {topicQuizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} />
                ))}
              </div>
            ) : (
              <Card>
                <CardBody className="p-6 text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    No quizzes available for this topic yet.
                  </p>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetailPage;