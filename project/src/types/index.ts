export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
  avatar?: string;
}

export interface Topic {
  id: string;
  title: string;
  category: 'math' | 'science' | 'technology';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  icon: string;
}

export interface Quiz {
  id: string;
  topicId: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit?: number; // in minutes
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'fill-in';
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  image?: string;
}

export interface Progress {
  userId: string;
  topicId: string;
  quizId: string;
  score: number;
  completedAt: Date;
  correctAnswers: number;
  totalQuestions: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  criteria: string;
  unlockedAt?: Date;
}

export interface LearningPath {
  userId: string;
  topics: string[]; // Topic IDs in recommended order
  currentTopicIndex: number;
  strengths: string[];
  areasForImprovement: string[];
}