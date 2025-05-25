import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizzes, topics } from '../data/mockData';
import QuestionCard from '../components/quiz/QuestionCard';
import Button from '../components/ui/Button';
import Card, { CardBody } from '../components/ui/Card';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Trophy } from 'lucide-react';

const QuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const quiz = quizzes.find(q => q.id === id);
  
  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Quiz Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The quiz you're looking for doesn't exist or has been removed.
            </p>
            <Button 
              variant="primary"
              onClick={() => navigate('/quizzes')}
              leftIcon={<ArrowLeft size={16} />}
            >
              Back to Quizzes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const topic = topics.find(t => t.id === quiz.topicId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Array<string | number | boolean | null>>(
    Array(quiz.questions.length).fill(null)
  );
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit ? quiz.timeLimit * 60 : null);
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  useEffect(() => {
    let timer: number | undefined;
    
    if (timeLeft !== null && timeLeft > 0 && !quizCompleted) {
      timer = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev !== null && prev > 0) {
            return prev - 1;
          }
          return 0;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      submitQuiz();
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeLeft, quizCompleted]);
  
  const handleAnswer = (answer: string | number | boolean) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };
  
  const goToNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const submitQuiz = () => {
    setQuizCompleted(true);
  };
  
  // Calculate quiz results
  const calculateResults = () => {
    let correctAnswers = 0;
    let totalPoints = 0;
    let earnedPoints = 0;
    
    quiz.questions.forEach((question, index) => {
      totalPoints += question.points;
      if (userAnswers[index] === question.correctAnswer) {
        correctAnswers++;
        earnedPoints += question.points;
      }
    });
    
    const percentageScore = Math.round((earnedPoints / totalPoints) * 100);
    
    return {
      correctAnswers,
      totalQuestions: quiz.questions.length,
      earnedPoints,
      totalPoints,
      percentageScore
    };
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  // If quiz is completed, show results
  if (quizCompleted) {
    const results = calculateResults();
    
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card>
            <CardBody className="p-8">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-green-100 dark:bg-green-900/30">
                    <Trophy className="h-12 w-12 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Quiz Results
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {quiz.title}
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
                <div className="flex flex-col items-center">
                  <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {results.percentageScore}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Overall Score
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {results.correctAnswers}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Correct Answers
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {results.earnedPoints}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Points Earned
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Review Your Answers
                </h2>
                <div className="space-y-6">
                  {quiz.questions.map((question, index) => (
                    <QuestionCard 
                      key={question.id}
                      question={question}
                      onAnswer={() => {}}
                      showResult={true}
                      userAnswer={userAnswers[index]}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline"
                  onClick={() => navigate(`/topics/${topic?.id}`)}
                  leftIcon={<ArrowLeft size={16} />}
                >
                  Back to Topic
                </Button>
                <Button 
                  variant="primary"
                  onClick={() => navigate('/quizzes')}
                  rightIcon={<ArrowRight size={16} />}
                >
                  Try Another Quiz
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/quizzes')}
            leftIcon={<ArrowLeft size={16} />}
          >
            Exit Quiz
          </Button>
          
          {timeLeft !== null && (
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
              <span className={`font-medium ${
                timeLeft < 60 ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
              }`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {quiz.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {topic?.title}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </span>
                <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div 
                    className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" 
                    style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <QuestionCard 
          question={currentQuestion}
          onAnswer={handleAnswer}
          showResult={false}
          userAnswer={userAnswers[currentQuestionIndex]}
        />

        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
            leftIcon={<ArrowLeft size={16} />}
          >
            Previous
          </Button>
          
          {currentQuestionIndex < quiz.questions.length - 1 ? (
            <Button 
              variant="primary" 
              onClick={goToNextQuestion}
              disabled={userAnswers[currentQuestionIndex] === null}
              rightIcon={<ArrowRight size={16} />}
            >
              Next
            </Button>
          ) : (
            <Button 
              variant="success" 
              onClick={submitQuiz}
              disabled={userAnswers[currentQuestionIndex] === null}
              rightIcon={<CheckCircle size={16} />}
            >
              Submit Quiz
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;