<script lang='ts'>
  import type { Coffee } from '@lib/stores/coffeeStore'
  import styles from './CoffeeCard.module.css'

  export let coffee: Coffee

  let imgLoaded = false

</script>

<div class={styles.card}>
  <div class={styles.imageWrapper}>
    {#if !imgLoaded}
      <div class={styles.placeholder}></div>
    {/if}

    <img
      class={imgLoaded ? styles.image : styles.hidden}
      src={coffee.image}
      alt={coffee.title}
      loading='lazy'
      on:load={() => (imgLoaded = true)}
    />

  </div>

  <h3 class={styles.title}>{coffee.title}</h3>
  <p class={styles.description}>{coffee.description}</p>

  <div class={styles.tagsWrapper}>
    {#each coffee.ingredients as ing}
      <span class={styles.tag}>{ing}</span>
    {/each}
  </div>
</div>
