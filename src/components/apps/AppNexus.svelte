<script lang="ts">
  import type { AppID } from '🍎/stores/apps.store';

  export let appID: AppID;
  export let isBeingDragged: boolean;
</script>

{#if appID === 'files'}
  {#await import('./Files/Files.svelte') then { default: Files }}
    <Files {isBeingDragged} />
  {/await}
      
{:else if appID === 'vscode'}
  {#await import('./VSCode/VSCode.svelte') then { default: VSCode }}
    <VSCode {isBeingDragged} />
  {/await}
      
{:else if appID === 'settings'}
  {#await import('./Settings/Settings.svelte') then { default: Settings }}
    <Settings {isBeingDragged} />
  {/await}
      
{:else if appID === 'terminal'}
  {#await import('./Terminal/Terminal.svelte') then { default: Terminal }}
    <Terminal {isBeingDragged} />
  {/await}

{:else if appID === 'calendar'}
  {#await import('./Calendar/Calendar.svelte') then { default: Calendar }}
    <Calendar />
  {/await}
      
{:else}
  {#await import('./ExternalApp/ExternalApp.svelte') then { default: ExternalApp }}
    <ExternalApp {isBeingDragged} />
  {/await}
      
{/if}
