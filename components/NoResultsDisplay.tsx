import React from 'react';

interface NoResultsDisplayProps {
    searchQuery: string;
}

const NoResultsDisplay: React.FC<NoResultsDisplayProps> = ({ searchQuery }) => {
  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-2xl mx-auto bg-white/20 dark:bg-black/20 backdrop-blur-sm p-8 rounded-xl shadow-md border border-white/30 dark:border-gray-700/30">
        <svg className="mx-auto h-16 w-16 text-gray-700 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10.5h.01" />
        </svg>
        <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-gray-100">No Results Found</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300 font-semibold">
          Your search for "<span className="italic text-purple-800 dark:text-purple-400">{searchQuery}</span>" did not match any recommendations.
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Try a different search term or change the filter settings.</p>
      </div>
    </div>
  );
};

export default NoResultsDisplay;
