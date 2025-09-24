import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrophyIcon, FireIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { useUser } from '../context/UserContext';

const Leaderboard = () => {
  const { stats } = useUser();
  const [activeTab, setActiveTab] = useState<'drops' | 'lessons' | 'streak'>('drops');

  // Mock leaderboard data
  const leaderboardData = {
    drops: [
      { id: 1, name: 'Alex Chen', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', score: 847, rank: 1 },
      { id: 2, name: 'Sarah Johnson', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', score: 623, rank: 2 },
      { id: 3, name: 'Mike Rodriguez', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', score: 589, rank: 3 },
      { id: 4, name: 'Emma Wilson', avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', score: 456, rank: 4 },
      { id: 5, name: 'David Kim', avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', score: 423, rank: 5 },
      { id: 6, name: 'Lisa Zhang', avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', score: 389, rank: 6 },
      { id: 7, name: 'James Brown', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', score: 345, rank: 7 },
      { id: 8, name: 'Anna Petrov', avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', score: 312, rank: 8 },
      { id: 9, name: 'Tom Anderson', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', score: 289, rank: 9 },
      { id: 10, name: 'Maria Garcia', avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', score: 267, rank: 10 },
      { id: 11, name: 'John Smith', avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', score: 234, rank: 11 },
      { id: 12, name: 'Demo User', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', score: stats.waterDrops, rank: stats.rank }
    ],
    lessons: [
      { id: 1, name: 'Alex Chen', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', score: 89, rank: 1 },
      { id: 2, name: 'Sarah Johnson', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', score: 76, rank: 2 },
      { id: 3, name: 'Mike Rodriguez', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', score: 64, rank: 3 },
      { id: 12, name: 'Demo User', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', score: stats.completedLessons, rank: 15 }
    ],
    streak: [
      { id: 1, name: 'Alex Chen', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', score: 45, rank: 1 },
      { id: 2, name: 'Sarah Johnson', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', score: 32, rank: 2 },
      { id: 3, name: 'Mike Rodriguez', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', score: 28, rank: 3 },
      { id: 12, name: 'Demo User', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', score: stats.currentStreak, rank: 8 }
    ]
  };

  const tabs = [
    { key: 'drops', label: 'Water Drops', icon: '💧', color: 'blue' },
    { key: 'lessons', label: 'Lessons', icon: AcademicCapIcon, color: 'green' },
    { key: 'streak', label: 'Streak', icon: FireIcon, color: 'orange' }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-600 bg-yellow-50';
      case 2:
        return 'text-gray-600 bg-gray-50';
      case 3:
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const currentData = leaderboardData[activeTab];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            🏆 Leaderboard 🏆
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how you stack up against other CodeBurry learners! 
            Compete in different categories and climb the ranks.
          </p>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg mb-8"
        >
          <div className="flex flex-col sm:flex-row">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
                  activeTab === tab.key
                    ? 'bg-green-600 text-white rounded-xl m-2'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                } flex items-center justify-center space-x-2`}
              >
                {typeof tab.icon === 'string' ? (
                  <span className="text-xl">{tab.icon}</span>
                ) : (
                  <tab.icon className="h-5 w-5" />
                )}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <TrophyIcon className="h-6 w-6 text-yellow-600" />
              <span>Top Performers - {tabs.find(t => t.key === activeTab)?.label}</span>
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {currentData
              .sort((a, b) => b.score - a.score)
              .map((user, index) => {
                const actualRank = index + 1;
                const isCurrentUser = user.name === 'Demo User';
                
                return (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`p-6 flex items-center space-x-4 hover:bg-gray-50 transition-colors ${
                      isCurrentUser ? 'bg-green-50 border-l-4 border-green-500' : ''
                    }`}
                  >
                    {/* Rank */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${getRankColor(actualRank)}`}>
                      {getRankIcon(actualRank)}
                    </div>

                    {/* Avatar */}
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    {/* User Info */}
                    <div className="flex-1">
                      <h3 className={`font-semibold ${isCurrentUser ? 'text-green-700' : 'text-gray-900'}`}>
                        {user.name}
                        {isCurrentUser && (
                          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            You
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {activeTab === 'drops' && `${user.score} water drops`}
                        {activeTab === 'lessons' && `${user.score} lessons completed`}
                        {activeTab === 'streak' && `${user.score} day streak`}
                      </p>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        activeTab === 'drops' ? 'text-blue-600' :
                        activeTab === 'lessons' ? 'text-green-600' :
                        'text-orange-600'
                      }`}>
                        {user.score}
                      </div>
                      <div className="text-sm text-gray-500">
                        {activeTab === 'drops' && '💧'}
                        {activeTab === 'lessons' && '📚'}
                        {activeTab === 'streak' && '🔥'}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </motion.div>

        {/* Motivational Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Keep Learning, Keep Growing! 🌱</h3>
          <p className="text-green-100 mb-6">
            Every lesson you complete brings you closer to the top. Remember, the best time to plant a tree was 20 years ago. 
            The second best time is now!
          </p>
          <div className="text-4xl">🚀📚💧🌳🏆</div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;