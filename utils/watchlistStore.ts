import { Recommendation } from '../types';

const WATCHLIST_STORAGE_KEY = 'vibeFlowWatchlist';

export const getWatchlist = (): Recommendation[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const watchlistJson = localStorage.getItem(WATCHLIST_STORAGE_KEY);
    return watchlistJson ? JSON.parse(watchlistJson) : [];
  } catch (error) {
    console.error("Error reading watchlist from localStorage", error);
    return [];
  }
};

const saveWatchlist = (watchlist: Recommendation[]): void => {
    if (typeof window === 'undefined') {
        return;
    }
    try {
        localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(watchlist));
    } catch (error) {
        console.error("Error saving watchlist to localStorage", error);
    }
}

export const addToWatchlist = (recommendation: Recommendation): void => {
  const watchlist = getWatchlist();
  if (!watchlist.some(item => item.title === recommendation.title)) {
    const updatedWatchlist = [...watchlist, recommendation];
    saveWatchlist(updatedWatchlist);
  }
};

export const removeFromWatchlist = (title: string): void => {
  const watchlist = getWatchlist();
  const updatedWatchlist = watchlist.filter(item => item.title !== title);
  saveWatchlist(updatedWatchlist);
};
