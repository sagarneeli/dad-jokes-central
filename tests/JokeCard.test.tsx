// tests/JokeCard.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import the extend-expect module

import JokeCard from '../src/components/JokeCard';

describe('JokeCard', () => {
  it('renders the joke text', () => {
    const jokeText =
      'Why don’t scientists trust atoms? Because they make up everything!';
    render(<JokeCard text={jokeText} textColor="text-gray-800" />);
    expect(screen.getByText(jokeText)).toBeInTheDocument(); // Use the toBeInTheDocument matcher
  });
});
