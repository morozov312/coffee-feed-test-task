import { get, writable } from 'svelte/store'

export interface Coffee {
  id?: number
  title: string
  description: string
  ingredients: string[]
  image: string
}

export const coffees = writable<Coffee[]>([])
export const isLoading = writable(false)

const API_URL = 'https://api.sampleapis.com/coffee/hot'

let all: Coffee[] = []

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
  all = await res.json()
}

export async function addOneCoffee() {
  if (get(isLoading)) {
    return
  }

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
