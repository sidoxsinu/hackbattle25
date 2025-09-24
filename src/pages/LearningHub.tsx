import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useUser } from '../context/UserContext';

const LearningHub = () => {
  const { completeLesson, addWaterDrops } = useUser();
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const topics = [
    {
      id: 'python',
      title: 'Python Programming',
      description: 'Master Python from basics to advanced concepts',
      icon: '🐍',
      color: 'bg-yellow-500',
      lessons: [
        { id: 'py-1', title: 'Python Basics & Syntax', difficulty: 'Beginner', duration: '30 min' },
        { id: 'py-2', title: 'Data Types & Variables', difficulty: 'Beginner', duration: '45 min' },
        { id: 'py-3', title: 'Control Flow & Loops', difficulty: 'Intermediate', duration: '60 min' },
        { id: 'py-4', title: 'Functions & Modules', difficulty: 'Intermediate', duration: '90 min' }
      ]
    },
    {
      id: 'java',
      title: 'Java Development',
      description: 'Learn Java programming and object-oriented concepts',
      icon: '☕',
      color: 'bg-orange-500',
      lessons: [
        { id: 'java-1', title: 'Java Fundamentals', difficulty: 'Beginner', duration: '45 min' },
        { id: 'java-2', title: 'Object-Oriented Programming', difficulty: 'Intermediate', duration: '75 min' },
        { id: 'java-3', title: 'Collections & Generics', difficulty: 'Intermediate', duration: '90 min' },
        { id: 'java-4', title: 'Exception Handling', difficulty: 'Advanced', duration: '60 min' }
      ]
    },
    {
      id: 'webdev',
      title: 'Web Development',
      description: 'Build modern web applications with HTML, CSS, and JavaScript',
      icon: '🌐',
      color: 'bg-blue-500',
      lessons: [
        { id: 'web-1', title: 'HTML & CSS Basics', difficulty: 'Beginner', duration: '60 min' },
        { id: 'web-2', title: 'JavaScript Fundamentals', difficulty: 'Beginner', duration: '90 min' },
        { id: 'web-3', title: 'React.js Introduction', difficulty: 'Intermediate', duration: '120 min' },
        { id: 'web-4', title: 'API Integration', difficulty: 'Advanced', duration: '90 min' }
      ]
    },
    {
      id: 'algorithms',
      title: 'Data Structures & Algorithms',
      description: 'Master computer science fundamentals',
      icon: '🧮',
      color: 'bg-purple-500',
      lessons: [
        { id: 'algo-1', title: 'Arrays & Strings', difficulty: 'Beginner', duration: '75 min' },
        { id: 'algo-2', title: 'Linked Lists', difficulty: 'Intermediate', duration: '90 min' },
        { id: 'algo-3', title: 'Trees & Graphs', difficulty: 'Advanced', duration: '120 min' },
        { id: 'algo-4', title: 'Sorting Algorithms', difficulty: 'Intermediate', duration: '60 min' }
      ]
    }
  ];

  const handleStartLesson = (lessonId: string) => {
    // Simulate lesson completion
    setTimeout(() => {
      setCompletedLessons(prev => new Set([...prev, lessonId]));
      completeLesson();
      addWaterDrops(5);
      alert(`Lesson completed! You earned 5 water drops! 💧`);
    }, 2000);
    
    alert('Starting lesson... (This is a demo - lesson will complete in 2 seconds)');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Learning Hub</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your learning path and start building your coding skills. 
            Complete lessons to earn water drops and grow your virtual garden!
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {topics.map((topic, topicIndex) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: topicIndex * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Topic Header */}
              <div className={`${topic.color} p-6 text-white`}>
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{topic.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold">{topic.title}</h2>
                    <p className="text-white/90">{topic.description}</p>
                  </div>
                </div>
              </div>

              {/* Lessons */}
              <div className="p-6">
                <div className="space-y-4">
                  {topic.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lesson.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                            {completedLessons.has(lesson.id) && (
                              <CheckCircleIcon className="h-5 w-5 text-green-600" />
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}
                            >
                              {lesson.difficulty}
                            </span>
                            <span>⏱️ {lesson.duration}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleStartLesson(lesson.id)}
                          disabled={completedLessons.has(lesson.id)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                            completedLessons.has(lesson.id)
                              ? 'bg-green-100 text-green-600 cursor-default'
                              : 'bg-green-600 hover:bg-green-700 text-white'
                          }`}
                        >
                          {completedLessons.has(lesson.id) ? (
                            <>
                              <CheckCircleIcon className="h-4 w-4" />
                              <span>Completed</span>
                            </>
                          ) : (
                            <>
                              <PlayIcon className="h-4 w-4" />
                              <span>Start</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Topic Progress */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Topic Progress</span>
                    <span className="text-sm text-gray-600">
                      {topic.lessons.filter(lesson => completedLessons.has(lesson.id)).length} / {topic.lessons.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${(topic.lessons.filter(lesson => completedLessons.has(lesson.id)).length / topic.lessons.length) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">🏆 Keep Learning, Keep Growing!</h3>
          <p className="text-gray-600 mb-4">
            Every lesson you complete earns you water drops. Use them to grow your virtual plant 
            and eventually plant trees in your garden!
          </p>
          <div className="text-4xl mb-4">💧➡️🌱➡️🌳</div>
        </motion.div>
      </div>
    </div>
  );
};

export default LearningHub;