import { isUrl } from '@lib/utils/isUrl'
import { get, writable } from 'svelte/store'

export interface Coffee {
  id: number | string
  title: string
  description: string
  ingredients: string[] | string
  image: string | null
}

export const coffees = writable<Coffee[]>([])
export const isLoading = writable(false)
export const isImageLoading = writable(false)

const API_URL = 'https://api.sampleapis.com/coffee/hot'

let all: Coffee[] = []

/**
 * Maps raw API coffee data to a consistent format.
 * - Ensures `ingredients` is always an array of strings
 *   (handles plain strings, stringified arrays, and real arrays)
 * - Validates `image` field and sets it to `null` if the value is not a valid URL
 * - Returns a normalized `Coffee` object ready for use in the UI
 */
function normalizeCoffee(data: Coffee): Coffee {
  // normalize ingredients
  let ingredients: string[] = []

  if (Array.isArray(data.ingredients)) {
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

  // normalize image
  const image = isUrl(data.image) ? data.image : null

  return { ...data, image, ingredients }
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
  if (get(isLoading) || get(isImageLoading)) {
    return
  }

  isLoading.set(true)

  try {
    await getCoffeeList()
    const random = all[Math.floor(Math.random() * all.length)]
    isImageLoading.set(!!random.image)
    coffees.update(list => [...list, random])
  }
  finally {
    isLoading.set(false)
  }
}
