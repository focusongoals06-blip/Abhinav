import React from 'react';
import { Recommendation } from '../types';
import StarRatingInput from './StarRatingInput';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const getBadgeColor = (type: string) => {
  switch (type) {
    case 'Movie': return 'bg-blue-500 text-white';
    case 'TV Show': return 'bg-green-500 text-white';
    case 'Book': return 'bg-yellow-400 text-gray-900';
    case 'Game': return 'bg-red-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  const { title, type, year, genres, rating, short_description, personalization_reason, poster_url } = recommendation;
  const fallbackImageUrl = 'https://placehold.co/400x600/e2e8f0/475569?text=Poster+Not+Found';

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl shadow-lg overflow-hidden flex flex-col h-full transform hover:scale-105 transition-transform duration-300">
      <div className="relative h-64 w-full">
         <img 
            src={poster_url || fallbackImageUrl} 
            alt={`Poster for ${title}`} 
            className="w-full h-full object-cover"
            onError={(e) => {
              if (e.currentTarget.src !== fallbackImageUrl) {
                e.currentTarget.src = fallbackImageUrl;
              }
            }}
         />
         <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded-full ${getBadgeColor(type)}`}>
           {type}
         </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-1 text-gray-900">{title} ({year})</h3>
        <p className="text-sm text-yellow-600 font-bold mb-2">⭐ {rating}/10</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {genres.map(genre => (
            <span key={genre} className="bg-gray-200 text-gray-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">{genre}</span>
          ))}
        </div>
        <p className="text-gray-700 text-sm mb-4 font-semibold">{short_description}</p>
        <div className="mt-auto bg-black/5 p-4 rounded-lg">
          <p className="text-sm font-bold text-purple-800 mb-1">Personalized For You:</p>
          <p className="text-gray-800 text-sm font-semibold">{personalization_reason}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-300">
           <StarRatingInput title={title} />
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;