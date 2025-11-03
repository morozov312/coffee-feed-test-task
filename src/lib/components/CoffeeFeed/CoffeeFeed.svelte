<script lang='ts'>
  import CoffeeCard from '@lib/components/CoffeeCard/CoffeeCard.svelte'
  import { addOneCoffee, coffees, isLoading } from '@lib/stores/coffeeStore'
  import { onMount } from 'svelte'
  import styles from './CoffeeFeed.module.css'

  onMount(() => {
    addOneCoffee()
  })
</script>

<div class={styles.wrapperContainer}>
  <main class={styles.wrapper}>
    {#if $coffees.length === 0}
      <p></p>
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
