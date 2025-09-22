import React from 'react';
import { Recommendation } from '../types';

interface WatchlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  watchlist: Recommendation[];
  onRemove: (title: string) => void;
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

const WatchlistModal: React.FC<WatchlistModalProps> = ({ isOpen, onClose, watchlist, onRemove }) => {
  if (!isOpen) return null;

  const fallbackImageUrl = 'https://placehold.co/200x300/e2e8f0/475569?text=Poster';

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="relative bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-300 dark:border-gray-600">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 font-righteous">My Watchlist</h2>
            <button
            onClick={onClose}
            className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full h-8 w-8 flex items-center justify-center text-xl font-bold z-10 hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Close watchlist"
            >
            &times;
            </button>
        </div>
        
        <div className="overflow-y-auto pr-2">
            {watchlist.length === 0 ? (
                <div className="text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <p className="mt-4 text-gray-600 dark:text-gray-400 font-semibold">Your watchlist is empty.</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">Add items from the recommendations to see them here.</p>
                </div>
            ) : (
                <ul className="space-y-4">
                    {watchlist.map(item => (
                        <li key={item.title} className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm flex items-center gap-4">
                            <img 
                                src={item.poster_url || fallbackImageUrl} 
                                alt={`Poster for ${item.title}`}
                                className="w-16 h-24 object-cover rounded-md flex-shrink-0"
                                onError={(e) => {
                                    if (e.currentTarget.src !== fallbackImageUrl) {
                                      e.currentTarget.src = fallbackImageUrl;
                                    }
                                  }}
                            />
                            <div className="flex-grow">
                                <h3 className="font-bold text-gray-800 dark:text-gray-200">{item.title} <span className="text-gray-500 dark:text-gray-400 font-normal">({item.year})</span></h3>
                                <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${getBadgeColor(item.type)}`}>
                                    {item.type}
                                </span>
                            </div>
                            <button 
                                onClick={() => onRemove(item.title)}
                                className="bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-300 dark:hover:bg-red-900/60 font-bold py-2 px-3 rounded-md transition-colors text-sm"
                                aria-label={`Remove ${item.title} from watchlist`}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
      </div>
    </div>
  );
};

export default WatchlistModal;