import React, { useState } from 'react';
import { Recommendation, EntertainmentType } from '../types';
import StarRatingInput from './StarRatingInput';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onWatchTrailer: (url: string) => void;
  onToggleWatchlist: (recommendation: Recommendation) => void;
  isInWatchlist: boolean;
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

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, onWatchTrailer, onToggleWatchlist, isInWatchlist }) => {
  const { title, type, year, genres, rating, short_description, personalization_reason, poster_url, trailer_url } = recommendation;
  const [isExpanded, setIsExpanded] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);
  const fallbackImageUrl = 'https://placehold.co/400x600/e2e8f0/475569?text=Poster+Not+Found';
  
  const canShowTrailer = (type === EntertainmentType.Movie || type === EntertainmentType.TVShow) && trailer_url;

  const handleCopy = () => {
    navigator.clipboard.writeText(title).then(() => {
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000);
    });
  };

  return (
    <div className="group relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg border border-white/30 dark:border-gray-600/30 rounded-xl shadow-lg overflow-hidden flex flex-col h-full transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03]">
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-400 rounded-xl transition-all duration-300 pointer-events-none group-hover:shadow-[0_0_20px_rgba(192,132,252,0.5)]"></div>
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
         <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded-full ${getBadgeColor(type)} shadow-lg`}>
           {type}
         </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-gray-100 flex-1 dark:glowing-text">{title} ({year})</h3>
            <button onClick={handleCopy} title="Copy title" className="ml-2 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              {copyStatus ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
        </div>
        <p className="text-sm text-yellow-500 dark:text-yellow-300 font-bold mb-2 dark:glowing-text">⭐ {rating}/10</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {genres.map(genre => (
            <span key={genre} className="bg-gray-200/70 dark:bg-gray-600/70 text-gray-700 dark:text-gray-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">{genre}</span>
          ))}
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 font-semibold flex-grow">{short_description}</p>
        
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <button 
              onClick={() => onToggleWatchlist(recommendation)}
              className={`w-full font-bold py-2 px-4 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 ${
                isInWatchlist 
                ? 'bg-purple-600 text-white hover:bg-purple-700 hover:scale-105' 
                : 'glowing-button'
              }`}
              aria-label={isInWatchlist ? `Remove ${title} from watchlist` : `Add ${title} to watchlist`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-3.13L5 18V4z" />
              </svg>
              <span>{isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}</span>
            </button>
            {canShowTrailer && (
              <button 
                onClick={() => onWatchTrailer(trailer_url!)}
                className="w-full font-bold py-2 px-4 rounded-lg shadow-md glowing-button flex items-center justify-center gap-2"
                aria-label={`Watch trailer for ${title}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span>Trailer</span>
              </button>
            )}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-300 dark:border-gray-600">
            <button onClick={() => setIsExpanded(!isExpanded)} className="w-full flex justify-between items-center text-left text-sm font-bold text-purple-800 dark:text-purple-400 mb-2 focus:outline-none dark:glowing-text">
              <span>Personalized For You:</span>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
              <div className="bg-black/5 dark:bg-white/5 p-3 rounded-lg">
                <p className="text-gray-800 dark:text-gray-200 text-sm font-semibold">{personalization_reason}</p>
              </div>
            </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
           <StarRatingInput title={title} />
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;