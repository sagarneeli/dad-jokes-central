const API_URL = 'https://icanhazdadjoke.com/';

export async function fetchJoke(): Promise<string> {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch joke');
    }

    const data = await response.json();
    return data.joke;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchJokesByCategory(
  category: string,
): Promise<string[]> {
  try {
    const response = await fetch(
      `${API_URL}/search?limit=10&term=${category}`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch jokes');
    }

    const data = await response.json();
    return data.results.map((joke: { joke: string }) => joke.joke);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function searchJokes(searchTerm: string): Promise<string[]> {
  try {
    const response = await fetch(
      `${API_URL}/search?limit=10&term=${searchTerm}`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch jokes');
    }

    const data = await response.json();
    return data.results.map((joke: { joke: string }) => joke.joke);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
