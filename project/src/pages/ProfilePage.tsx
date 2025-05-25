import React from 'react';
import { useAuth } from '../context/AuthContext';
import Card, { CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProgressChart from '../components/learning/ProgressChart';
import AchievementCard from '../components/learning/AchievementCard';
import { progress, achievements, topics } from '../data/mockData';
import { User, Settings, BookOpen, Trophy, BarChart2 } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <div>Please log in to view your profile.</div>;
  }

  // Filter progress and achievements for the current user
  const userProgress = progress.filter(p => p.userId === currentUser.id);
  const userAchievements = achievements;

  // Calculate stats
  const completedQuizzes = userProgress.length;
  const averageScore = userProgress.length 
    ? Math.round(userProgress.reduce((sum, p) => sum + p.score, 0) / userProgress.length) 
    : 0;
  const unlockedAchievements = userAchievements.filter(a => a.unlockedAt).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your progress and manage your account
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Info */}
          <div>
            <Card className="mb-8">
              <CardBody className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-600 dark:border-blue-400 mb-4">
                    <img 
                      src={currentUser.avatar || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300'} 
                      alt={currentUser.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {currentUser.name}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {currentUser.email}
                  </p>
                  
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium mb-6">
                    {currentUser.role === 'student' ? 'Student' : 'Teacher'}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    fullWidth
                    leftIcon={<Settings size={16} />}
                  >
                    Account Settings
                  </Button>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Learning Stats
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900/30 mr-3">
                        <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Completed Quizzes</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">{completedQuizzes}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-2 rounded-md bg-green-100 dark:bg-green-900/30 mr-3">
                        <BarChart2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Average Score</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">{averageScore}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-2 rounded-md bg-yellow-100 dark:bg-yellow-900/30 mr-3">
                        <Trophy className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Achievements</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {unlockedAchievements}/{userAchievements.length}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Progress Section */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardBody className="p-6">
                <ProgressChart progressData={userProgress} />
              </CardBody>
            </Card>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            
            <div className="space-y-4 mb-8">
              {userProgress.slice(0, 3).map((progress, index) => {
                const topic = topics.find(t => t.id === progress.topicId);
                return (
                  <Card key={index}>
                    <CardBody className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {topic?.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Completed on {new Date(progress.completedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                            {progress.score}%
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {progress.correctAnswers}/{progress.totalQuestions} correct
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                );
              })}
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Achievements
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {userAchievements.map((achievement) => (
                <AchievementCard 
                  key={achievement.id} 
                  achievement={achievement} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;