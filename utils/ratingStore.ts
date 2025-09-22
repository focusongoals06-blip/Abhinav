const RATING_STORAGE_KEY = 'entertainmentConciergeRatings';

type Ratings = Record<string, number>;

const getRatings = (): Ratings => {
  if (typeof window === 'undefined') {
    return {};
  }
  try {
    const ratingsJson = localStorage.getItem(RATING_STORAGE_KEY);
    return ratingsJson ? JSON.parse(ratingsJson) : {};
  } catch (error) {
    console.error("Error reading ratings from localStorage", error);
    return {};
  }
};

export const getRatingForTitle = (title: string): number | null => {
  return getRatings()[title] || null;
};

export const saveRatingForTitle = (title: string, rating: number): void => {
  if (typeof window === 'undefined') {
    return;
  }
  const ratings = getRatings();
  ratings[title] = rating;
  try {
    localStorage.setItem(RATING_STORAGE_KEY, JSON.stringify(ratings));
  } catch (error) {
    console.error("Error saving rating to localStorage", error);
  }
};
