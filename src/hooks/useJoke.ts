import { useState, useCallback } from 'react';
import { fetchJoke, fetchJokesByCategory, searchJokes, Joke } from '../api';

export const useJoke = () => {
    const [joke, setJoke] = useState<Joke | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetchRandomJoke = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchJoke();
            setJoke(data);
        } catch (err) {
            setError('Failed to fetch a joke. The dad servers must be napping.');
        } finally {
            setLoading(false);
        }
    }, []);

    const handleSearch = useCallback(async (term: string) => {
        setLoading(true);
        setError(null);
        try {
            const results = await searchJokes(term);
            if (results.length > 0) {
                const randomJoke = results[Math.floor(Math.random() * results.length)];
                setJoke(randomJoke);
            } else {
                setError(`No jokes found for "${term}". Try "pizza" maybe?`);
                setJoke(null);
            }
        } catch (err) {
            setError('Search failed. The comedic database is confused.');
        } finally {
            setLoading(false);
        }
    }, []);

    const handleCategorySelect = useCallback(async (category: string) => {
        setLoading(true);
        setError(null);
        try {
            const results = await fetchJokesByCategory(category);
            if (results.length > 0) {
                const randomJoke = results[Math.floor(Math.random() * results.length)];
                setJoke(randomJoke);
            } else {
                setError(`No jokes found in ${category}.`);
                setJoke(null);
            }
        } catch (err) {
            setError('Category fetch failed.');
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        joke,
        loading,
        error,
        fetchRandomJoke: handleFetchRandomJoke,
        searchJokes: handleSearch,
        fetchJokesByCategory: handleCategorySelect
    };
};
