import { User, Topic, Quiz, Question, Progress, Achievement } from '../types';
import { ArrowBigRightDash, Atom, Binary, BrainCircuit, Calculator, BarChart as ChartBar, Hexagon, PiSquare, Sigma, Waypoints } from 'lucide-react';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: '2',
    name: 'Mrs. Taylor',
    email: 'taylor@example.com',
    role: 'teacher',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

// Mock Topics
export const topics: Topic[] = [
  {
    id: '1',
    title: 'Algebra Fundamentals',
    category: 'math',
    difficulty: 'beginner',
    description: 'Master the basics of algebra including equations, inequalities, and graphing.',
    icon: 'Calculator',
  },
  {
    id: '2',
    title: 'Geometry & Spatial Reasoning',
    category: 'math',
    difficulty: 'intermediate',
    description: 'Explore shapes, angles, and spatial relationships.',
    icon: 'Hexagon',
  },
  {
    id: '3',
    title: 'Chemistry Basics',
    category: 'science',
    difficulty: 'beginner',
    description: 'Learn about atoms, molecules, and chemical reactions.',
    icon: 'Atom',
  },
  {
    id: '4',
    title: 'Physics Mechanics',
    category: 'science',
    difficulty: 'intermediate',
    description: 'Understand forces, motion, and energy in physical systems.',
    icon: 'ArrowBigRightDash',
  },
  {
    id: '5',
    title: 'Introduction to Coding',
    category: 'technology',
    difficulty: 'beginner',
    description: 'Get started with programming concepts and syntax.',
    icon: 'Binary',
  },
  {
    id: '6',
    title: 'Data Analysis',
    category: 'technology',
    difficulty: 'intermediate',
    description: 'Learn to collect, analyze, and visualize data.',
    icon: 'ChartBar',
  },
  {
    id: '7',
    title: 'Calculus Fundamentals',
    category: 'math',
    difficulty: 'advanced',
    description: 'Introduction to derivatives, integrals, and limits.',
    icon: 'Sigma',
  },
  {
    id: '8',
    title: 'Machine Learning Basics',
    category: 'technology',
    difficulty: 'advanced',
    description: 'Understand the fundamentals of AI and machine learning algorithms.',
    icon: 'BrainCircuit',
  },
];

// Mock Quizzes
export const quizzes: Quiz[] = [
  {
    id: '1',
    topicId: '1',
    title: 'Solving Linear Equations',
    description: 'Test your skills in solving different types of linear equations.',
    questions: [
      {
        id: '101',
        text: 'Solve for x: 3x + 5 = 14',
        type: 'multiple-choice',
        options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
        correctAnswer: 'x = 3',
        explanation: 'To solve, subtract 5 from both sides: 3x = 9, then divide by 3: x = 3',
        difficulty: 'easy',
        points: 5,
      },
      {
        id: '102',
        text: 'What is the solution to the equation 2(x - 3) = 10?',
        type: 'multiple-choice',
        options: ['x = 4', 'x = 5', 'x = 8', 'x = 13'],
        correctAnswer: 'x = 8',
        explanation: 'First, distribute: 2x - 6 = 10. Then add 6 to both sides: 2x = 16. Finally, divide by 2: x = 8.',
        difficulty: 'medium',
        points: 10,
      },
      {
        id: '103',
        text: 'Is the equation 3x - 6 = 3(x - 2) always true?',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'When we distribute on the right side, we get 3x - 6 = 3x - 6, which is always true.',
        difficulty: 'medium',
        points: 10,
      },
    ],
    timeLimit: 15,
  },
  {
    id: '2',
    topicId: '3',
    title: 'Atomic Structure',
    description: 'Test your knowledge of atomic structure and the periodic table.',
    questions: [
      {
        id: '201',
        text: 'What is the charge of an electron?',
        type: 'multiple-choice',
        options: ['Positive', 'Negative', 'Neutral', 'It varies'],
        correctAnswer: 'Negative',
        explanation: 'Electrons have a negative charge, protons have a positive charge, and neutrons have no charge.',
        difficulty: 'easy',
        points: 5,
      },
      {
        id: '202',
        text: 'How many electrons can the first electron shell hold?',
        type: 'fill-in',
        correctAnswer: '2',
        explanation: 'The first electron shell (n=1) can hold a maximum of 2 electrons.',
        difficulty: 'medium',
        points: 10,
        image: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=600',
      },
    ],
    timeLimit: 10,
  },
];

// Mock Progress
export const progress: Progress[] = [
  {
    userId: '1',
    topicId: '1',
    quizId: '1',
    score: 85,
    completedAt: new Date('2023-11-15'),
    correctAnswers: 17,
    totalQuestions: 20,
  },
  {
    userId: '1',
    topicId: '3',
    quizId: '2',
    score: 90,
    completedAt: new Date('2023-11-20'),
    correctAnswers: 9,
    totalQuestions: 10,
  },
];

// Mock Achievements
export const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Math Explorer',
    description: 'Complete your first math quiz',
    icon: 'PiSquare',
    criteria: 'Complete 1 math quiz',
    unlockedAt: new Date('2023-11-15'),
  },
  {
    id: '2',
    title: 'Science Enthusiast',
    description: 'Score above 80% on a science quiz',
    icon: 'Atom',
    criteria: 'Score >80% on any science quiz',
    unlockedAt: new Date('2023-11-20'),
  },
  {
    id: '3',
    title: 'Perfect Score',
    description: 'Get 100% on any quiz',
    icon: 'Waypoints',
    criteria: 'Score 100% on any quiz',
  },
];

// Get icon component by name
export const getIconByName = (name: string) => {
  const icons: Record<string, React.ComponentType> = {
    Calculator,
    Hexagon,
    Atom,
    ArrowBigRightDash,
    Binary,
    ChartBar,
    Sigma,
    BrainCircuit,
    PiSquare,
    Waypoints,
  };
  
  return icons[name] || Calculator;
};