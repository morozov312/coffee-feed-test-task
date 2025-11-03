<script lang='ts'>
  import CoffeeCard from '@lib/components/coffeeCard/CoffeeCard.svelte'
  import { addOneCoffee, coffees } from '@lib/stores/coffeeStore'
  import { onMount } from 'svelte'
  import styles from './CoffeeFeed.module.css'

  onMount(() => {
    addOneCoffee()
  })
</script>

<main class={styles.wrapper}>
  {#if $coffees.length === 0}
    <p></p>
  {:else}
    {#each $coffees as coffee, i (coffee.title + i)}
      <CoffeeCard {coffee} />
    {/each}
  {/if}
</main>
