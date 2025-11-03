<script lang='ts'>
  import type { Coffee } from '@lib/stores/coffeeStore'

  export let coffee: Coffee
  let imgLoaded = false

</script>

<div>
  <div>
    {#if !imgLoaded}
      <div>☕</div>
    {/if}
    <img
      src={coffee.image}
      alt={coffee.title}
      loading='lazy'
      on:load={() => (imgLoaded = true)}
      class:hidden={!imgLoaded}
    />
  </div>

  <h3>{coffee.title}</h3>
  <p>{coffee.description}</p>

  <div>
    {#each coffee.ingredients as ing}
      <span class='tag'>{ing}</span>
    {/each}
  </div>
</div>
