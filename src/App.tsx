import React, { useState, useEffect } from 'react';
import JokeCard from './components/JokeCard';
import { fetchJoke, fetchJokesByCategory, searchJokes } from './api';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const [joke, setJoke] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRandomJoke = async () => {
    const joke = await fetchJoke();
    setJoke(joke);
    setSearchTerm('');
  };

  const fetchJokesBySelectedCategory = async (selectedCategory: string) => {
    const jokes = await fetchJokesByCategory(selectedCategory);
    if (jokes.length > 0) {
      const randomIndex = Math.floor(Math.random() * jokes.length);
      setJoke(jokes[randomIndex]);
      setSearchTerm('');
    } else {
      setJoke('No jokes found in this category.');
      setSearchTerm('');
    }
  };

  const handleSearch = async () => {
    const jokes = await searchJokes(searchTerm);
    if (jokes.length > 0) {
      const randomIndex = Math.floor(Math.random() * jokes.length);
      setJoke(jokes[randomIndex]);
    } else {
      setJoke('No matching jokes found. Please try another search term.');
    }
    setSearchTerm('');
  };

  useEffect(() => {
    fetchRandomJoke();
  }, []);

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  return (
    <>
      <div className="bg-image min-h-screen">
        <div className="flex flex-col items-center justify-center h-screen px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to Dad Jokes Central!
          </motion.h1>
          <div className="max-w-md mx-auto space-y-6">
            {/* Joke Categories */}
            <motion.div
              className="rounded-lg shadow-md p-6 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg flex space-x-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              role="toolbar"
              aria-label="Joke Categories"
            >
              <h2 className="text-lg text-gray-800">Joke Categories</h2>
              {/* Render your joke categories here */}
              {/* Example: */}
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                onClick={() => fetchJokesBySelectedCategory('pun')}
                aria-label="Pun Jokes"
              >
                Pun Jokes
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                onClick={() => fetchJokesBySelectedCategory('one-liner')}
                aria-label="One-Liner Jokes"
              >
                One-Liner Jokes
              </button>
            </motion.div>

            {/* Joke Search */}
            <motion.div
              className="rounded-lg shadow-md p-6 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-lg text-gray-800">Joke Search</h2>
              {/* Add your joke search input and button here */}
              {/* Example: */}
              <div className="flex space-x-4">
                <input
                  className="border rounded px-3 py-2 flex-grow"
                  type="text"
                  placeholder="Search for jokes"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Joke Search Input"
                />
                <button
                  className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
                  onClick={handleSearch}
                  aria-label="Search Button"
                >
                  Search
                </button>
              </div>
            </motion.div>

            {/* Random Joke Generator */}
            <motion.div
              className="rounded-lg shadow-md p-6 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-lg text-gray-800">Random Joke Generator</h2>
              {/* Render your random joke and "Tell me another one!" button here */}
              {/* Example: */}
              <JokeCard text={joke} textColor="text-gray-800" />
              <motion.button
                className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={fetchRandomJoke}
                aria-label="Random Joke Button"
              >
                Tell me another one!
              </motion.button>
            </motion.div>
          </div>
        </div>
        <footer className="bg-gray-800 text-center py-4 text-white text-sm">
          Made with ❤️ by Dad Jokes Central &copy; 2023
        </footer>
      </div>
    </>
  );
};

export default App;
