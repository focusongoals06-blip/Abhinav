import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search in recommendations by title..."
        className="w-full bg-white/50 dark:bg-gray-700/50 border-2 border-white/60 dark:border-gray-500/60 rounded-full pl-11 pr-4 py-3 text-gray-800 dark:text-gray-200 placeholder-gray-600 dark:placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500 transition shadow-md"
        aria-label="Search recommendations"
      />
    </div>
  );
};

export default SearchBar;
