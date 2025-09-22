import React, { useState, useCallback } from 'react';
import { Recommendation, EntertainmentType } from './types';
import { getEntertainmentRecommendations } from './services/geminiService';
import InputForm from './components/InputForm';
import RecommendationCard from './components/RecommendationCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import InitialStateDisplay from './components/InitialStateDisplay';
import FilterTabs from './components/FilterTabs';

const App: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<EntertainmentType | 'All'>('All');

  const handleGetRecommendations = useCallback(async (mood: string, genres: string, likeThis: string) => {
    setIsLoading(true);
    setError(null);
    setRecommendations([]);
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

  const filteredRecommendations = recommendations.filter(rec => 
    activeFilter === 'All' || rec.type === activeFilter
  );

  return (
    <div className="min-h-screen text-gray-800 font-semibold font-sans">
      <header className="py-12 text-center">
        <h1 className="text-7xl md:text-8xl font-righteous animate-header-gradient">
          VibeFlow
        </h1>
        <p className="text-gray-700 font-righteous text-lg md:text-xl mt-4 max-w-2xl mx-auto font-bold">
          Your personal AI guide to what to watch, read, and play next.
        </p>
      </header>
      <main className="container mx-auto px-4 pb-16">
        <div className="max-w-2xl mx-auto bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-lg mb-12 border border-white/40">
          <InputForm onGetRecommendations={handleGetRecommendations} isLoading={isLoading} />
        </div>

        {isLoading && <LoadingSpinner />}
        {error && <ErrorDisplay message={error} />}
        
        {!isLoading && !error && recommendations.length > 0 && (
          <>
            <FilterTabs 
              recommendations={recommendations} 
              activeFilter={activeFilter} 
              setActiveFilter={setActiveFilter} 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecommendations.map((rec) => (
                <RecommendationCard key={rec.title} recommendation={rec} />
              ))}
            </div>
          </>
        )}

        {!isLoading && !error && recommendations.length === 0 && (
          <InitialStateDisplay />
        )}
      </main>
    </div>
  );
};

export default App;
