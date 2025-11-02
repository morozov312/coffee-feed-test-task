<script lang='ts'>
  import CoffeeCard from './lib/components/CoffeCard.svelte'
  import { addOneCoffee, coffees } from './lib/stores/coffeeStore'

  addOneCoffee()
</script>

<main style='max-width: 720px; margin: 0 auto; padding: 16px;'>
  {#if $coffees.length === 0}
    <p>loading…</p>
  {:else}
    {#each $coffees as coffee, i (coffee.title + i)}
      <CoffeeCard {coffee} />
    {/each}
  {/if}
</main>
