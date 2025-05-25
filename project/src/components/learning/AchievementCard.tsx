import React from 'react';
import Card, { CardBody } from '../ui/Card';
import { Achievement } from '../../types';
import { getIconByName } from '../../data/mockData';
import { LockKeyhole } from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const isUnlocked = !!achievement.unlockedAt;
  const Icon = achievement.icon ? getIconByName(achievement.icon) : LockKeyhole;

  return (
    <Card 
      className={`h-full transition-all ${!isUnlocked ? 'opacity-60 grayscale' : ''}`}
      hoverable={isUnlocked}
    >
      <CardBody className="flex flex-col items-center text-center p-6">
        <div className={`p-4 rounded-full mb-4 ${
          isUnlocked 
            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' 
            : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
        }`}>
          <Icon className="h-6 w-6" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {achievement.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
          {achievement.description}
        </p>
        
        {isUnlocked ? (
          <div className="text-xs text-green-600 dark:text-green-400 font-medium">
            Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
          </div>
        ) : (
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Criteria: {achievement.criteria}
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default AchievementCard;