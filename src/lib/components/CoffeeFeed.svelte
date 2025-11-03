<script lang='ts'>
  import CoffeeCard from '@lib/components/CoffeeCard.svelte'
  import { addOneCoffee, coffees } from '@lib/stores/coffeeStore'
  import { onMount } from 'svelte'

  onMount(() => {
    addOneCoffee()
  })
</script>

<main>
  {#if $coffees.length === 0}
    <p>loading…</p>
  {:else}
    {#each $coffees as coffee, i (coffee.title + i)}
      <CoffeeCard {coffee} />
    {/each}
  {/if}
</main>
