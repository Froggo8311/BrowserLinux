<script lang="ts">
  import { fadeIn, fadeOut } from '🍎/helpers/fade';
  import { shouldShowNotch } from '🍎/stores/menubar.store';
  import { appsInFullscreen } from '🍎/stores/apps.store';

  import ActionCenterToggle from './ActionCenterToggle.svelte';
  import TopBarTime from './TopBarTime.svelte';
</script>

<header
  class:hide={appsInFullscreen}
>
  <span style:flex="1 1 auto" />

  <ActionCenterToggle />

  <button>
    <TopBarTime />
  </button>
</header>

<style lang="scss">
  header {
    display: flex;
    align-items: center;

    position: relative;

    width: 100%;
    height: 1.8rem;

    background-color: hsla(var(--system-color-light-hsl), 0.3);

    color: var(--system-color-light-contrast);
    fill: var(--system-color-light-contrast);

    button {
      font-weight: 500;
      font-size: 0.8rem;
      font-family: var(--system-font-family);

      letter-spacing: 0.3px;

      position: relative;

      height: 100%;

      text-shadow: 0 0 1px hsla(0, 0%, 0%, 0.1);
    }

    /*&.hide {
      transform: translate3d(0, -100%, 0);

      &::before {
        width: calc(100% - 2px);
        height: calc(100% - 2px);

        margin-top: 1px;
        margin-left: 1px;
      }
    }*/
  
  }

  header::before {
    content: '';

    width: inherit;
    height: inherit;

    position: fixed;
    left: 0;
    top: 0;

    z-index: 0;
    backdrop-filter: blur(12px);
  }
</style>
