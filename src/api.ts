export interface Joke {
  id: string;
  joke: string;
  status: number;
}

export interface SearchResponse {
  current_page: number;
  limit: number;
  next_page: number;
  previous_page: number;
  results: Joke[];
  search_term: string;
  status: number;
  total_jokes: number;
  total_pages: number;
}

const API_URL = 'https://icanhazdadjoke.com/';
const HEADERS = {
  Accept: 'application/json',
};

export async function fetchJoke(): Promise<Joke> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

  try {
    const response = await fetch(API_URL, {
      headers: HEADERS,
      signal: controller.signal
    });
    if (!response.ok) throw new Error('Failed to fetch joke');
    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('Fetch timed out');
      throw new Error('Joke timed out');
    }
    console.error('Error fetching joke:', error);
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchJokesByCategory(category: string): Promise<Joke[]> {
  try {
    const response = await fetch(
      `${API_URL}/search?limit=30&term=${encodeURIComponent(category)}`,
      { headers: HEADERS }
    );
    if (!response.ok) throw new Error('Failed to fetch jokes');
    const data: SearchResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching jokes by category:', error);
    throw error;
  }
}

export async function searchJokes(searchTerm: string): Promise<Joke[]> {
  try {
    const response = await fetch(
      `${API_URL}/search?limit=30&term=${encodeURIComponent(searchTerm)}`,
      { headers: HEADERS }
    );
    if (!response.ok) throw new Error('Failed to search jokes');
    const data: SearchResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching jokes:', error);
    throw error;
  }
}
