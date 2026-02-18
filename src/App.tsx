import React, { useEffect } from 'react';
import { Layout } from './components/Layout';
import { JokeDisplay } from './components/JokeDisplay';
import { Controls } from './components/Controls';
import { Actions } from './components/Actions';
import { useJoke } from './hooks/useJoke';
import confetti from 'canvas-confetti';

const App: React.FC = () => {
  const {
    joke,
    loading,
    error,
    fetchRandomJoke,
    searchJokes,
    fetchJokesByCategory
  } = useJoke();

  const handleVote = (type: 'up' | 'down' | 'meh') => {
    // Just visual feedback for now
    if (type === 'up') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  useEffect(() => {
    fetchRandomJoke();
  }, [fetchRandomJoke]);

  return (
    <Layout>
      <div className="space-y-8">
        <JokeDisplay
          joke={joke?.joke || null}
          isLoading={loading}
          error={error}
        />

        {joke && !loading && !error && (
          <Actions jokeText={joke.joke} onVote={handleVote} />
        )}

        <div className="mt-12">
          <Controls
            onNewJoke={fetchRandomJoke}
            onSearch={searchJokes}
            onCategorySelect={fetchJokesByCategory}
            isLoading={loading}
          />
        </div>
      </div>
    </Layout>
  );
};

export default App;
