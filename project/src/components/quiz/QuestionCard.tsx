import React, { useState } from 'react';
import Card, { CardBody, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { Question } from '../../types';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string | number | boolean) => void;
  showResult: boolean;
  userAnswer?: string | number | boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  onAnswer, 
  showResult,
  userAnswer 
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  
  const isCorrect = showResult && userAnswer === question.correctAnswer;
  const isWrong = showResult && userAnswer !== question.correctAnswer;

  const handleSelectOption = (option: string) => {
    if (!showResult) {
      setSelectedOption(option);
      onAnswer(option);
    }
  };

  const handleTextSubmit = () => {
    if (!showResult) {
      onAnswer(textAnswer);
    }
  };

  const handleTrueFalse = (value: boolean) => {
    if (!showResult) {
      onAnswer(value);
    }
  };

  return (
    <Card className="w-full">
      <CardBody>
        <div className="flex justify-between items-start mb-4">
          <span className={`text-xs px-2 py-1 rounded-full ${
            question.difficulty === 'easy' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
              : question.difficulty === 'medium'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
          }`}>
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {question.points} {question.points === 1 ? 'point' : 'points'}
          </span>
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {question.text}
        </h3>
        
        {question.image && (
          <div className="mb-4">
            <img 
              src={question.image} 
              alt="Question visual" 
              className="w-full h-auto rounded-lg shadow-sm"
            />
          </div>
        )}

        <div className="mt-4">
          {question.type === 'multiple-choice' && question.options && (
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectOption(option)}
                  disabled={showResult}
                  className={`w-full p-3 text-left rounded-md border ${
                    showResult && option === question.correctAnswer
                      ? 'bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-600'
                      : showResult && option === userAnswer && option !== question.correctAnswer
                        ? 'bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-600'
                        : option === selectedOption
                          ? 'bg-blue-100 border-blue-500 dark:bg-blue-900/30 dark:border-blue-600'
                          : 'border-gray-300 hover:border-blue-400 dark:border-gray-600 dark:hover:border-blue-500'
                  } transition-colors`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800 dark:text-gray-200">{option}</span>
                    {showResult && option === question.correctAnswer && (
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    )}
                    {showResult && option === userAnswer && option !== question.correctAnswer && (
                      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {question.type === 'true-false' && (
            <div className="flex space-x-4">
              <button
                onClick={() => handleTrueFalse(true)}
                disabled={showResult}
                className={`flex-1 p-3 rounded-md border ${
                  showResult && question.correctAnswer === true
                    ? 'bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-600'
                    : showResult && userAnswer === true && question.correctAnswer !== true
                      ? 'bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-600'
                      : userAnswer === true
                        ? 'bg-blue-100 border-blue-500 dark:bg-blue-900/30 dark:border-blue-600'
                        : 'border-gray-300 hover:border-blue-400 dark:border-gray-600 dark:hover:border-blue-500'
                } transition-colors`}
              >
                <div className="flex items-center justify-center">
                  <span className="text-gray-800 dark:text-gray-200">True</span>
                  {showResult && question.correctAnswer === true && (
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 ml-2" />
                  )}
                  {showResult && userAnswer === true && question.correctAnswer !== true && (
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 ml-2" />
                  )}
                </div>
              </button>
              <button
                onClick={() => handleTrueFalse(false)}
                disabled={showResult}
                className={`flex-1 p-3 rounded-md border ${
                  showResult && question.correctAnswer === false
                    ? 'bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-600'
                    : showResult && userAnswer === false && question.correctAnswer !== false
                      ? 'bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-600'
                      : userAnswer === false
                        ? 'bg-blue-100 border-blue-500 dark:bg-blue-900/30 dark:border-blue-600'
                        : 'border-gray-300 hover:border-blue-400 dark:border-gray-600 dark:hover:border-blue-500'
                } transition-colors`}
              >
                <div className="flex items-center justify-center">
                  <span className="text-gray-800 dark:text-gray-200">False</span>
                  {showResult && question.correctAnswer === false && (
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 ml-2" />
                  )}
                  {showResult && userAnswer === false && question.correctAnswer !== false && (
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 ml-2" />
                  )}
                </div>
              </button>
            </div>
          )}

          {question.type === 'fill-in' && (
            <div>
              <input
                type="text"
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                disabled={showResult}
                placeholder="Type your answer here..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              {!showResult && (
                <Button 
                  variant="primary" 
                  className="mt-2" 
                  onClick={handleTextSubmit}
                  disabled={!textAnswer.trim()}
                >
                  Submit Answer
                </Button>
              )}
              {showResult && (
                <div className={`mt-3 p-3 rounded-md ${
                  isCorrect 
                    ? 'bg-green-100 dark:bg-green-900/30' 
                    : 'bg-red-100 dark:bg-red-900/30'
                }`}>
                  <div className="flex items-start">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2 mt-0.5" />
                    )}
                    <div>
                      <p className={`font-medium ${
                        isCorrect 
                          ? 'text-green-800 dark:text-green-300' 
                          : 'text-red-800 dark:text-red-300'
                      }`}>
                        {isCorrect ? 'Correct!' : 'Incorrect'}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        The correct answer is: <span className="font-medium">{question.correctAnswer.toString()}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {showResult && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-md">
            <div className="flex items-start">
              <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Explanation</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default QuestionCard;