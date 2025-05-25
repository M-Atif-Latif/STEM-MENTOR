import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card, { CardBody, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { Quiz, Topic } from '../../types';
import { Clock, ListChecks } from 'lucide-react';
import { topics } from '../../data/mockData';

interface QuizCardProps {
  quiz: Quiz;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const navigate = useNavigate();
  const topic = topics.find(t => t.id === quiz.topicId) as Topic;

  const categoryColors = {
    math: 'border-l-4 border-blue-500',
    science: 'border-l-4 border-green-500',
    technology: 'border-l-4 border-purple-500',
  };

  return (
    <Card 
      className={`transition-all h-full ${categoryColors[topic.category]}`}
      hoverable
      bordered={false}
    >
      <CardBody className="flex flex-col h-full">
        <div className="mb-2">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {topic.category.charAt(0).toUpperCase() + topic.category.slice(1)} · {topic.title}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{quiz.title}</h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">{quiz.description}</p>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <ListChecks size={16} className="mr-1" />
            <span>{quiz.questions.length} questions</span>
          </div>
          {quiz.timeLimit && (
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{quiz.timeLimit} min</span>
            </div>
          )}
        </div>
      </CardBody>
      <CardFooter className="bg-gray-50 dark:bg-gray-800/50">
        <Button 
          variant="primary" 
          fullWidth
          onClick={() => navigate(`/quizzes/${quiz.id}`)}
        >
          Start Quiz
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;