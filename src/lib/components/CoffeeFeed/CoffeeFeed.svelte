<script lang='ts'>
  import CoffeeCard from '@lib/components/CoffeeCard/CoffeeCard.svelte'
  import { addOneCoffee, coffees, isLoading } from '@lib/stores/coffeeStore'
  import { initializeTheme, theme, toggleTheme } from '@lib/stores/themeStore'
  import { onDestroy, onMount } from 'svelte'
  import styles from './CoffeeFeed.module.css'

  const INACTIVITY_TIMEOUT_MS = 30000

  let inactivityTimer: number | null = null

  const resetInactivityTimer = () => {
    if (inactivityTimer)
      clearTimeout(inactivityTimer)
    inactivityTimer = setTimeout(() => {
      addOneCoffee()
      resetInactivityTimer()
    }, INACTIVITY_TIMEOUT_MS)
  }

  const handleUserActivity = () => resetInactivityTimer()

  onMount(() => {
    initializeTheme()
    addOneCoffee()
    resetInactivityTimer()
    window.addEventListener('click', handleUserActivity)
  })

  onDestroy(() => {
    if (inactivityTimer)
      clearTimeout(inactivityTimer)
    window.removeEventListener('click', handleUserActivity)
  })
</script>

<div class={styles.wrapperContainer} data-theme={$theme}>
  <header class={styles.header}>
    <h1 class={styles.title}>Coffee Feed</h1>
    <button class={styles.themeToggle} on:click={toggleTheme} aria-label='Toggle theme'>
      <span class={styles.toggleTrack}>
        <span class={styles.toggleThumb} data-dark={$theme === 'dark'}></span>
      </span>
      <span class={styles.toggleIcons}>
        <span class={styles.sun}>☀️</span>
        <span class={styles.moon}>🌙</span>
      </span>
    </button>
  </header>

  <main class={styles.wrapper}>
    {#if $coffees.length === 0 && $isLoading}
      <div class={styles.spinner}></div>
    {:else if $coffees.length === 0}
      <div class={styles.empty}>No coffee cards</div>
    {:else}
      {#each $coffees as coffee, i (coffee.title + i)}
        <CoffeeCard {coffee} />
      {/each}
    {/if}
  </main>

  <footer class={styles.footer}>
    <button class={styles.button} disabled={$isLoading} on:click={addOneCoffee}>
      Add Coffee
    </button>
  </footer>
</div>
