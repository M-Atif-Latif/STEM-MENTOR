import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  Users, 
  BookOpen, 
  BarChart2, 
  CalendarDays,
  UserPlus,
  PlusCircle,
  Search,
  CheckCircle
} from 'lucide-react';

const TeacherDashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!currentUser || currentUser.role !== 'teacher') {
    return <Navigate to="/" />;
  }

  // Mock student data
  const students = [
    { id: '1', name: 'Alex Johnson', email: 'alex@example.com', progress: 75, lastActive: '2023-05-15' },
    { id: '2', name: 'Jamie Smith', email: 'jamie@example.com', progress: 60, lastActive: '2023-05-14' },
    { id: '3', name: 'Taylor Wilson', email: 'taylor@example.com', progress: 90, lastActive: '2023-05-16' },
    { id: '4', name: 'Jordan Miller', email: 'jordan@example.com', progress: 45, lastActive: '2023-05-10' },
  ];

  // Mock assigned quizzes
  const assignedQuizzes = [
    { id: '1', title: 'Solving Linear Equations', dueDate: '2023-05-20', completed: 2, total: 4 },
    { id: '2', title: 'Atomic Structure', dueDate: '2023-05-25', completed: 1, total: 4 },
    { id: '3', title: 'Introduction to Coding', dueDate: '2023-05-30', completed: 0, total: 4 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Teacher Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor student progress and manage learning resources
          </p>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'overview'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'students'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
            onClick={() => setActiveTab('students')}
          >
            Students
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'assignments'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
            onClick={() => setActiveTab('assignments')}
          >
            Assignments
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'reports'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
            onClick={() => setActiveTab('reports')}
          >
            Reports
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-4">
                      <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{students.length}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 mr-4">
                      <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Active Assignments</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{assignedQuizzes.length}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 mr-4">
                      <BarChart2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Completion</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">67%</p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mr-4">
                      <CalendarDays className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming Due</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">2</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Recent Activity & Upcoming Assignments */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader className="px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Student Activity</h2>
                </CardHeader>
                <CardBody className="p-0">
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {students.map((student) => (
                      <div key={student.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3 overflow-hidden">
                              <img 
                                src={`https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300`} 
                                alt={student.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Last active: {student.lastActive}</p>
                            </div>
                          </div>
                          <div className="w-24">
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" 
                                  style={{ width: `${student.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{student.progress}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader className="px-6 py-4 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Active Assignments</h2>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    leftIcon={<PlusCircle size={16} />}
                  >
                    Assign New
                  </Button>
                </CardHeader>
                <CardBody className="p-0">
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {assignedQuizzes.map((quiz) => (
                      <div key={quiz.id} className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{quiz.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Due: {quiz.dueDate}</p>
                          </div>
                          <div className="text-sm text-gray-700 dark:text-gray-300">
                            {quiz.completed}/{quiz.total} completed
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search students..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <Button 
                variant="primary"
                leftIcon={<UserPlus size={16} />}
              >
                Add Student
              </Button>
            </div>

            <Card>
              <CardBody className="p-0">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Student
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Progress
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Last Active
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                              <img 
                                src={`https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300`} 
                                alt={student.name} 
                                className="h-10 w-10 object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {student.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600 dark:text-gray-400">{student.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  student.progress >= 80 
                                    ? 'bg-green-600 dark:bg-green-500' 
                                    : student.progress >= 50
                                      ? 'bg-yellow-600 dark:bg-yellow-500'
                                      : 'bg-red-600 dark:bg-red-500'
                                }`}
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {student.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600 dark:text-gray-400">{student.lastActive}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Manage Assignments</h2>
              <Button 
                variant="primary"
                leftIcon={<PlusCircle size={16} />}
              >
                Create Assignment
              </Button>
            </div>

            <div className="space-y-6">
              {assignedQuizzes.map((quiz) => (
                <Card key={quiz.id}>
                  <CardBody className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{quiz.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Due: {quiz.dueDate} • {quiz.completed}/{quiz.total} completed
                        </p>
                      </div>
                      <div className="flex space-x-2 mt-4 md:mt-0">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">View Results</Button>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Student Completion</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {students.map((student, index) => (
                          <div key={student.id} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                <img 
                                  src={`https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300`} 
                                  alt={student.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="text-sm text-gray-700 dark:text-gray-300">{student.name}</span>
                            </div>
                            {index < quiz.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                            ) : (
                              <span className="text-xs text-gray-500 dark:text-gray-400">Pending</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div>
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Reports & Analytics</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Detailed performance analytics and reports are coming soon!
              </p>
              <div className="w-32 h-32 mx-auto mb-4">
                <BarChart2 className="w-full h-full text-blue-600 dark:text-blue-400 opacity-50" />
              </div>
              <Button variant="outline">Request Early Access</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboardPage;