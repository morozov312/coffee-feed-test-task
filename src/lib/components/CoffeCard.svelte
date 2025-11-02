<script lang='ts'>
  import type { Coffee } from 'src/lib/stores/coffeeStore'

  export let coffee: Coffee
  let imgLoaded = false

</script>

<div class='card' data-testid='card'>
  <div class='image'>
    {#if !imgLoaded}
      <div class='placeholder' data-testid='img-placeholder'>☕</div>
    {/if}
    <img
      data-testid='img'
      src={coffee.image}
      alt={coffee.title}
      loading='lazy'
      on:load={() => (imgLoaded = true)}
      class:hidden={!imgLoaded}
    />
  </div>

  <h3 data-testid='title'>{coffee.title}</h3>
  <p data-testid='desc'>{coffee.description}</p>

  <div class='tags' data-testid='tags' tabindex='0' aria-label='Ingredients tags, horizontal scroll'>
    {#each coffee.ingredients as ing}
      <span class='tag'>{ing}</span>
    {/each}
  </div>
</div>

<style module>
    .card {
        display: grid;
        gap: 8px;
        border-radius: 12px;
        padding: 12px;
        background: #fff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, .06);
        margin: 12px 0;
    }

    .image {
        position: relative;
        width: 100%;
        height: 220px;
        border-radius: 10px;
        overflow: hidden;
        background: #f5f5f5;
    }

    .placeholder {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        font-size: 2rem;
        color: #9b9b9b;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .tags {
        display: flex;
        gap: 6px;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: thin;
    }

    .tag {
        white-space: nowrap;
        background: #efefef;
        border-radius: 999px;
        padding: 4px 10px;
        font-size: .85rem;
    }

    .hidden {
        display: none;
    }
</style>
