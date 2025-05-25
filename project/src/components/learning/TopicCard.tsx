import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card, { CardBody } from '../ui/Card';
import Button from '../ui/Button';
import { Topic } from '../../types';
import { ChevronRight } from 'lucide-react';
import { getIconByName } from '../../data/mockData';

interface TopicCardProps {
  topic: Topic;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  const navigate = useNavigate();
  const Icon = getIconByName(topic.icon);

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

  const difficultyBadge = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  };

  return (
    <Card 
      hoverable 
      className="h-full transition-all"
    >
      <CardBody className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg ${colors.bg}`}>
            <Icon className={`h-6 w-6 ${colors.icon}`} />
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${difficultyBadge[topic.difficulty]}`}>
            {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{topic.title}</h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">{topic.description}</p>
        
        <div className="flex justify-between items-center mt-auto">
          <span className={`text-sm font-medium ${colors.text}`}>
            {topic.category.charAt(0).toUpperCase() + topic.category.slice(1)}
          </span>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(`/topics/${topic.id}`)}
            rightIcon={<ChevronRight size={16} />}
          >
            Explore
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default TopicCard;