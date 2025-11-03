<script lang='ts'>
  import { initializeTheme, theme, toggleTheme } from '@lib/stores/themeStore'
  import { onMount } from 'svelte'
  import styles from './AppHeader.module.css'

  onMount(() => {
    initializeTheme()
  })
</script>

<header class={styles.header}>
  <h1 class={styles.title}>Coffee Feed</h1>
  <button class={styles.themeToggle} on:click={toggleTheme} aria-label='Toggle theme'>
    <span class={styles.toggleTrack}>
      <span class={styles.toggleThumb} data-dark={$theme === 'dark'}></span>
    </span>
    <span class={styles.toggleIcons}>
      <span class={styles.sun}>☀️</span>
      <span class={styles.moon}>🌙</span>
    </span>
  </button>
</header>
