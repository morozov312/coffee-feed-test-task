import { writable } from 'svelte/store'

export const theme = writable<'light' | 'dark'>('light')

export function toggleTheme() {
  theme.update(current => current === 'light' ? 'dark' : 'light')
}

export function initializeTheme() {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme')
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (saved === 'dark' || (!saved && systemDark)) {
      theme.set('dark')
    }
  }
}
