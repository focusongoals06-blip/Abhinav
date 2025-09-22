import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 rounded-xl shadow-lg overflow-hidden h-full">
      <div className="bg-gray-300 dark:bg-gray-700 h-64 w-full"></div>
      <div className="p-5">
        <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
        <div className="flex flex-wrap gap-2 mb-4">
            <div className="h-5 w-16 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
            <div className="h-5 w-20 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
        </div>
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
        <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;