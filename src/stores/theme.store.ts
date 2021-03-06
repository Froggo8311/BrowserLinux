import { writable } from 'svelte-local-storage-store';
import { colors } from '🍎/configs/theme/colors.config';

export type Theme = {
  scheme: 'dark' | 'light';
  primaryColor: keyof typeof colors;
};

export const theme = writable<Theme>('bl:theme-settings', {
  scheme: matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  primaryColor: 'red',
});

theme.subscribe(({ scheme, primaryColor }) => {
  // Color scheme
  const { classList } = document.body;
  classList.remove('light', 'dark');
  classList.add(scheme);

  // Primary color
  const colorObj = colors[primaryColor][scheme];
  document.body.style.setProperty('--system-color-primary', `hsl(${colorObj.hsl})`);
  document.body.style.setProperty('--system-color-primary-hsl', `${colorObj.hsl}`);
  document.body.style.setProperty(
    '--system-color-primary-contrast',
    `hsl(${colorObj.contrastHsl})`,
  );
  document.body.style.setProperty('--system-color-primary-contrast-hsl', `${colorObj.contrastHsl}`);
});
