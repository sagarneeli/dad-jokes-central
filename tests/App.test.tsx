// tests/App.test.tsx
import React from 'react';
import {
  render,
  waitFor,
  fireEvent,
  act,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../src/App';
import { fetchJoke } from '../src/api';

jest.mock('../src/api', () => ({
  fetchJoke: jest.fn(() =>
    Promise.resolve(
      'Why don’t scientists trust atoms? Because they make up everything!',
    ),
  ),
}));

describe('App', () => {
  it('renders the app correctly', () => {
    const { getByText, getByLabelText } = render(<App />);
    expect(getByText('Welcome to Dad Jokes Central!')).toBeInTheDocument();
    expect(getByLabelText('Random Joke Button')).toBeInTheDocument();
  });

  it('fetches a random joke on initial render', async () => {
    render(<App />);
    await waitFor(() =>
      expect(
        screen.getByText(
          expect.stringContaining(
            'Why don’t scientists trust atoms? Because they make up everything!',
          ),
        ),
      ).toBeInTheDocument(),
    );
  });

  it('fetches a new random joke when "Tell me another one!" button is clicked', async () => {
    await act(async () => {
      const { getByRole, queryByText } = render(<App />);
      const button = getByRole('button', { name: /Tell me another one!/i });
      fireEvent.click(button);
      await waitFor(() => expect(fetchJoke).toHaveBeenCalledTimes(2));
      expect(queryByText('Tell me another one!')).toBeInTheDocument();
    });
  });
});
