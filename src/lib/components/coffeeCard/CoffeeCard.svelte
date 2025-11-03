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

  <h3>{coffee.title}</h3>
  <p>{coffee.description}</p>

  <div>
    {#each coffee.ingredients as ing}
      <span class='tag'>{ing}</span>
    {/each}
  </div>
</div>
