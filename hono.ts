import { Hono } from 'hono'

const app = new Hono()

// Environment variables for your Hono application
const LARAVEL_API_ENDPOINT = 'http://localhost:8000/api/v1/games'
const LARAVEL_API_KEY = 'your_super_secret_and_long_api_key_here' // Must match HONO_API_KEY in Laravel's .env

// Define a type for the expected game data for better type safety
interface Game {
  id: number
  name: string
  title: string
  shop_id: number
  device: number
  bet_options: string[]
  denomination: number
  rtp: number
}

// A simple in-memory cache to reduce redundant API calls
const cache = {
  games: null as Game[] | null,
  lastFetch: 0,
  ttl: 300000, // Cache for 5 minutes (300,000 ms)
}

/**
 * Fetches the list of games from the Laravel API.
 * Includes a simple in-memory cache to avoid spamming the Laravel server.
 */
async function fetchGamesFromLaravel(): Promise<Game[]> {
  const now = Date.now()
  console.log(now)
  // Check if cache is valid
  if (cache.games && now - cache.lastFetch < cache.ttl) {
    console.log('Serving games from cache.')
    return cache.games
  }

  console.log('Fetching games from Laravel API...')

  try {
    const response = await fetch(LARAVEL_API_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-API-KEY': LARAVEL_API_KEY, // The crucial security header
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        `Laravel API responded with status ${response.status}: ${
          errorData.error || 'Unknown error'
        }`
      )
    }

    const jsonResponse = await response.json()

    // Update cache
    cache.games = jsonResponse.data
    cache.lastFetch = now

    return jsonResponse.data
  } catch (error) {
    console.error('Failed to fetch games from Laravel:', error)
    // Return stale cache data if available, otherwise throw
    if (cache.games) {
      console.warn('Returning stale cache due to fetch error.')
      return cache.games
    }
    throw error
  }
}

// Define a Hono route that will trigger the fetch call
app.get('/games', async (c) => {
  try {
    const games = await fetchGamesFromLaravel()
    console.log(games)
    return c.json({ success: true, games: games })
  } catch (error) {
    return c.json({ success: false, error: (error as Error).message }, 500)
  }
})

export default app
