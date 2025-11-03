import { get, writable } from 'svelte/store'

export interface Coffee {
  id?: number
  title: string
  description: string
  ingredients: string[] | string
  image: string
}

export const coffees = writable<Coffee[]>([])
export const isLoading = writable(false)

const API_URL = 'https://api.sampleapis.com/coffee/hot'

let all: Coffee[] = []

/**
 * Universal mapper for API data.
 * - Converts a string like "[a,b,c]" → ["abc"]
 * - Converts a plain string "milk" → ["milk"]
 * - Converts an array ["a","b","c"] → ["abc"]
 * - Fallback: returns an empty array
 */
function normalizeCoffee(data: Coffee): Coffee {
  let ingredients: string[] = []

  if (Array.isArray(data.ingredients)) {
    // join array elements into a single string
    ingredients = [data.ingredients.join('')]
  }
  else if (typeof data.ingredients === 'string') {
    const cleaned = data.ingredients.trim()
    if (cleaned.startsWith('[') && cleaned.endsWith(']')) {
      const joined = cleaned
        .replace(/[[\]\s'"]/g, '')
        .split(',')
        .filter(Boolean)
        .join('')
      ingredients = [joined]
    }
    else {
      ingredients = [cleaned]
    }
  }

  return { ...data, ingredients }
}

async function getCoffeeList() {
  // cache
  if (all.length) {
    // simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))
    return
  }

  const res = await fetch(API_URL)
  if (!res.ok) {
    throw new Error('Failed to fetch coffee list')
  }

  const json = await res.json()
  all = json.map(normalizeCoffee)
}

export async function addOneCoffee() {
  if (get(isLoading))
    return

  isLoading.set(true)

  try {
    await getCoffeeList()
    const random = all[Math.floor(Math.random() * all.length)]
    coffees.update(list => [...list, random])
  }
  finally {
    isLoading.set(false)
  }
}
