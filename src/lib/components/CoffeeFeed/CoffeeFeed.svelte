<script lang='ts'>
  import CoffeeCard from '@lib/components/CoffeeCard/CoffeeCard.svelte'
  import AppHeader from '@lib/components/Header/AppHeader.svelte'
  import { addOneCoffee, coffees, isImageLoading, isLoading } from '@lib/stores/coffeeStore'
  import { theme } from '@lib/stores/themeStore'
  import { onDestroy, onMount } from 'svelte'
  import styles from './CoffeeFeed.module.css'

  const INACTIVITY_TIMEOUT_MS = 30000

  let inactivityTimer: number | null = null

  const resetInactivityTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer)
    }

    inactivityTimer = setTimeout(() => {
      addOneCoffee()
      resetInactivityTimer()
    }, INACTIVITY_TIMEOUT_MS)
  }

  const handleUserActivity = () => resetInactivityTimer()

  onMount(() => {
    addOneCoffee()
    resetInactivityTimer()
    window.addEventListener('click', handleUserActivity)
  })

  onDestroy(() => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer)
    }
    window.removeEventListener('click', handleUserActivity)
  })
</script>

<div class={styles.wrapperContainer} data-theme={$theme}>
  <AppHeader />

  <main class={styles.wrapper} data-testid='feed'>
    {#if $coffees.length === 0 && $isLoading}
      <div class={styles.spinner} data-testid='spinner'></div>
    {:else if $coffees.length === 0}
      <div class={styles.empty}>No coffee cards</div>
    {:else}
      {#each $coffees as coffee, i (`${coffee.id}-${i}}`)}
        <CoffeeCard {coffee} />
      {/each}
    {/if}
  </main>

  <footer class={styles.footer}>
    <button data-testid='add-button' class={styles.button} disabled={$isLoading || $isImageLoading} on:click={addOneCoffee}>
      Add Coffee
    </button>
  </footer>
</div>
