<script lang='ts'>
  import type { Coffee } from '@lib/stores/coffeeStore'
  import styles from './CoffeeCard.module.css'

  export let coffee: Coffee

  let imgLoaded = false
  let imgError = false

  const onError = () => {
    imgError = true
    imgLoaded = true
  }
</script>

<div class={styles.card} data-testid='card'>
  <div class={styles.imageWrapper} data-testid='image-wrapper'>
    {#if coffee.image && !imgError}
      {#if !imgLoaded}
        <div class={styles.placeholder}></div>
      {/if}
      <img
        class={imgLoaded ? styles.image : styles.imageHidden}
        src={coffee.image}
        alt={coffee.title}
        loading='lazy'
        decoding='async'
        on:load={() => (imgLoaded = true)}
        on:error={onError}
      />
    {:else}
      <div class={styles.fallbackIcon}>
        No image
      </div>
    {/if}
  </div>

  <h3 class={styles.title}>{coffee.title}</h3>
  <p class={styles.description}>{coffee.description}</p>

  <div class={styles.tagsWrapper} data-testid='tags'>
    {#each coffee.ingredients as ing}
      <span class={styles.tag}>{ing}</span>
    {/each}
  </div>
</div>
