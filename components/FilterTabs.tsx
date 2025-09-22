import React from 'react';
import { EntertainmentType, Recommendation } from '../types';

interface FilterTabsProps {
  recommendations: Recommendation[];
  activeFilter: EntertainmentType | 'All';
  setActiveFilter: (filter: EntertainmentType | 'All') => void;
}

const allFilters: (EntertainmentType | 'All')[] = ['All', EntertainmentType.Movie, EntertainmentType.TVShow, EntertainmentType.Book, EntertainmentType.Game];

const filterIcons: Record<string, JSX.Element> = {
  'All': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  'Movie': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
  'TV Show': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>,
  'Book': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  'Game': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.5 13.5h-5M12 11v5M4 12a8 8 0 1116 0 8 8 0 01-16 0z" /></svg>,
};


const FilterTabs: React.FC<FilterTabsProps> = ({ recommendations, activeFilter, setActiveFilter }) => {
  const availableTypes = new Set(recommendations.map(r => r.type));
  
  const relevantFilters = allFilters.filter(filter => {
    if (filter === 'All') return true;
    return availableTypes.has(filter);
  });

  if (relevantFilters.length <= 2) { // Only 'All' and one other type, not worth showing filters
    return null;
  }

  return (
    <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-8">
      {relevantFilters.map(filter => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-4 py-2 text-sm md:text-base font-bold rounded-full transition-all duration-300 transform hover:scale-105 ${
            activeFilter === filter
              ? 'bg-purple-600 text-white shadow-lg dark:shadow-purple-500/50'
              : 'bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 hover:bg-white/80 dark:hover:bg-gray-600/80'
          }`}
        >
          <span className={`flex items-center justify-center gap-2 ${activeFilter === filter ? 'dark:glowing-text' : ''}`}>
            {filterIcons[filter]}
            {filter}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;