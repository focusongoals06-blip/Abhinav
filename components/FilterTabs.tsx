import React from 'react';
import { EntertainmentType, Recommendation } from '../types';

interface FilterTabsProps {
  recommendations: Recommendation[];
  activeFilter: EntertainmentType | 'All';
  setActiveFilter: (filter: EntertainmentType | 'All') => void;
}

const allFilters: (EntertainmentType | 'All')[] = ['All', EntertainmentType.Movie, EntertainmentType.TVShow, EntertainmentType.Book, EntertainmentType.Game];

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
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white/50 text-gray-800 hover:bg-white/80'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
