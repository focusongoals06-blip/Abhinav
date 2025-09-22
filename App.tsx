import React, { useState, useCallback, useEffect } from 'react';
import { Recommendation, EntertainmentType } from './types';
import { getEntertainmentRecommendations } from './services/geminiService';
import { getWatchlist, addToWatchlist, removeFromWatchlist } from './utils/watchlistStore';
import InputForm from './components/InputForm';
import RecommendationCard from './components/RecommendationCard';
import SkeletonGrid from './components/SkeletonGrid';
import ErrorDisplay from './components/ErrorDisplay';
import InitialStateDisplay from './components/InitialStateDisplay';
import FilterTabs from './components/FilterTabs';
import TrailerModal from './components/TrailerModal';
import WatchlistModal from './components/WatchlistModal';
import ThemeToggleButton from './components/ThemeToggleButton';
import { useTheme } from './hooks/useTheme';
import SearchBar from './components/SearchBar';
import NoResultsDisplay from './components/NoResultsDisplay';

const App: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<EntertainmentType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrailerUrl, setSelectedTrailerUrl] = useState<string | null>(null);
  const [watchlist, setWatchlist] = useState<Recommendation[]>([]);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();

  useEffect(() => {
    setWatchlist(getWatchlist());
  }, []);

  const handleGetRecommendations = useCallback(async (mood: string, genres: string, likeThis: string) => {
    setIsLoading(true);
    setError(null);
    setRecommendations([]);
    setSearchQuery('');
    setActiveFilter('All');
    try {
      const results = await getEntertainmentRecommendations(mood, genres, likeThis);
      setRecommendations(results);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleWatchTrailer = (url: string) => {
    setSelectedTrailerUrl(url);
  };

  const handleCloseTrailer = () => {
    setSelectedTrailerUrl(null);
  };

  const handleToggleWatchlist = (recommendation: Recommendation) => {
    const isInWatchlist = watchlist.some(item => item.title === recommendation.title);
    if (isInWatchlist) {
      removeFromWatchlist(recommendation.title);
    } else {
      addToWatchlist(recommendation);
    }
    setWatchlist(getWatchlist());
  };

  const watchlistTitles = new Set(watchlist.map(item => item.title));

  const filteredRecommendations = recommendations.filter(rec => {
    const filterMatch = activeFilter === 'All' || rec.type === activeFilter;
    const searchMatch = searchQuery ? rec.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return filterMatch && searchMatch;
  });

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200 font-semibold font-sans flex flex-col">
      <header className="py-12 text-center relative">
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10 flex items-center gap-3">
            <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
            <button
              onClick={() => setIsWatchlistOpen(true)}
              className="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md text-purple-800 dark:text-purple-300 font-bold py-2 px-4 rounded-lg shadow-md hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all transform hover:scale-105"
              aria-label="Open my watchlist"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-3.13L5 18V4z" />
              </svg>
              <span className="hidden sm:inline">My Watchlist</span>
              {watchlist.length > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {watchlist.length}
                </span>
              )}
            </button>
        </div>
        <h1 className="header-title font-righteous animate-header-gradient dark:glowing-text">
          VibeFlow
        </h1>
        <p className="text-gray-700 dark:text-gray-300/90 font-righteous text-lg md:text-xl mt-4 max-w-2xl mx-auto font-bold dark:glowing-text">
          Your personal AI guide to what to watch, read, and play next.
        </p>
        
        {recommendations.length > 0 && !isLoading && (
          <div className="container mx-auto px-4 mt-8 max-w-2xl">
              <SearchBar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
          </div>
        )}
      </header>
      <main className="container mx-auto px-4 pb-16 flex-grow">
        <div className="max-w-2xl mx-auto bg-white/30 dark:bg-black/30 backdrop-blur-lg p-8 rounded-2xl shadow-lg mb-12 border border-white/40 dark:border-gray-700/60">
          <InputForm onGetRecommendations={handleGetRecommendations} isLoading={isLoading} />
        </div>

        {isLoading && <SkeletonGrid />}
        {error && <ErrorDisplay message={error} />}
        
        {!isLoading && !error && recommendations.length > 0 && (
          <>
            <FilterTabs 
              recommendations={recommendations} 
              activeFilter={activeFilter} 
              setActiveFilter={setActiveFilter} 
            />
            {filteredRecommendations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRecommendations.map((rec) => (
                    <RecommendationCard 
                    key={rec.title} 
                    recommendation={rec} 
                    onWatchTrailer={handleWatchTrailer}
                    onToggleWatchlist={handleToggleWatchlist}
                    isInWatchlist={watchlistTitles.has(rec.title)}
                    />
                ))}
                </div>
            ) : (
                <NoResultsDisplay searchQuery={searchQuery} />
            )}
          </>
        )}

        {!isLoading && !error && recommendations.length === 0 && (
          <InitialStateDisplay />
        )}
      </main>

      {selectedTrailerUrl && (
        <TrailerModal 
          trailerUrl={selectedTrailerUrl} 
          onClose={handleCloseTrailer} 
        />
      )}

      <WatchlistModal 
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlist={watchlist}
        onRemove={(title) => {
          removeFromWatchlist(title);
          setWatchlist(getWatchlist());
        }}
      />

      <footer className="text-center py-8 px-4 text-gray-700 dark:text-gray-400 font-bold text-sm">
        <p>VibeFlow AI - Recommendations are generated by AI and may not be perfect. &copy; 2024</p>
        <p>Poster images and trailer content are the property of their respective copyright holders.</p>
      </footer>
    </div>
  );
};

export default App;