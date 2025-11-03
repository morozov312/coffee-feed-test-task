<script lang='ts'>
  import type { Coffee } from '@lib/stores/coffeeStore'
  import styles from './CoffeeCard.module.css'

  export let coffee: Coffee

  let imgLoaded = false
  let imgError = false

  const onError = (e: Event) => {
    imgError = true
    imgLoaded = true;
    (e.currentTarget as HTMLImageElement).style.display = 'none'
  }

</script>

<div class={styles.card}>
  <div class={styles.imageWrapper}>
    {#if !imgLoaded}
      <div class={styles.placeholder}></div>
    {/if}

    {#if !imgError}
      <img
        class={imgLoaded ? styles.image : styles.imageHidden}
        src={coffee.image}
        alt={coffee.title}
        loading='lazy'
        on:load={() => (imgLoaded = true)}
        on:error={onError}
      />
    {/if}

    {#if imgError}
      <div class={styles.fallbackIcon} aria-label='image unavailable'>No image</div>
    {/if}

  </div>

  <h3 class={styles.title}>{coffee.title}</h3>
  <p class={styles.description}>{coffee.description}</p>

  <div class={styles.tagsWrapper}>
    {#each coffee.ingredients as ing}
      <span class={styles.tag}>{ing}</span>
    {/each}
  </div>
</div>
