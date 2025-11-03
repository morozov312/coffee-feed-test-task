<script lang='ts'>
  import CoffeeCard from '@lib/components/CoffeeCard/CoffeeCard.svelte'
  import { addOneCoffee, coffees, isLoading } from '@lib/stores/coffeeStore'
  import { onDestroy, onMount } from 'svelte'
  import styles from './CoffeeFeed.module.css'

  const INACTIVITY_TIMEOUT_MS = 30000 // 30 seconds

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

  const handleUserActivity = () => {
    resetInactivityTimer()
  }

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

<div class={styles.wrapperContainer}>
  <main class={styles.wrapper}>
    {#if $coffees.length === 0 && $isLoading}
      <div class={styles.spinner}></div>
    {:else if $coffees.length === 0}
      <div>No coffee cards</div>
    {:else}
      {#each $coffees as coffee, i (coffee.title + i)}
        <CoffeeCard {coffee} />
      {/each}
    {/if}

  </main>
  <footer class={styles.footer}>
    <button class={styles.button} disabled={$isLoading} on:click={addOneCoffee}>Add Coffee</button>
  </footer>
</div>
