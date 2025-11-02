import { writable } from 'svelte/store'

export interface Coffee {
  id?: number
  title: string
  description: string
  ingredients: string[]
  image: string
}

export const coffees = writable<Coffee[]>([])
export const isLoading = writable(false)

let all: Coffee[] = []

async function ensureAllLoaded() {
  if (all.length) {
    return
  }
  const res = await fetch('https://api.sampleapis.com/coffee/hot')
  if (!res.ok) {
    throw new Error('Failed to fetch coffee list')
  }
  all = await res.json()
}

export async function addOneCoffee() {
  if (getIsLoading()) {
    return
  }
  isLoading.set(true)

  try {
    await ensureAllLoaded()
    const random = all[Math.floor(Math.random() * all.length)]
    coffees.update(list => [...list, random])
  }
  finally {
    isLoading.set(false)
  }
}

function getIsLoading() {
  let v = false
  const unsub = isLoading.subscribe(x => (v = x))
  unsub()
  return v
}
