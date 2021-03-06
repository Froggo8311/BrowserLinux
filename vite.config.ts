import { svelte } from '@sveltejs/vite-plugin-svelte';
import UnpluginIcons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { prefetch } from './prefetch-plugin';

export default defineConfig({
  plugins: [
    svelte(),
    prefetch(),
    // replace({ ...replacePlugin() }),
    UnpluginIcons({ autoInstall: true, compiler: 'svelte' }),
    VitePWA({
      includeAssets: [
        'robots.txt',
        'assets/app-icons/finder/32.png',
        'assets/cover-image.png',
        'assets/cursors/(normal|link|text|help)-select.svg',
        'assets/**/*.mp3',
        'assets/**/*.webp',
        'assets/wallpapers/37-[12].jpg',
      ],
      manifest: {
        name: 'BrowserLinux',
        short_name: 'BrowserLinux',
        theme_color: '#1e1e1e',
        description: 'A linux environment in the browser.',
        icons: [
          {
            src: 'assets/app-icons/Papirus/apps/utilities-x-terminal.svg',
            sizes: '128x128',
            type: 'image/svg',
          },
          {
            src: 'assets/app-icons/Papirus/apps/utilities-x-terminal.svg',
            sizes: '192x192',
            type: 'image/svg',
          },
          {
            src: 'assets/app-icons/Papirus/apps/utilities-x-terminal.svg',
            sizes: '256x256',
            type: 'image/svg',
          },
          {
            src: 'assets/app-icons/Papirus/apps/utilities-x-terminal.svg',
            sizes: '512x512',
            type: 'image/svg',
          },
          {
            src: 'assets/app-icons/Papirus/apps/utilities-x-terminal.svg',
            sizes: '512x512',
            type: 'image/svg',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '🍎': new URL('./src/', import.meta.url).pathname,
//      '$sysicon': new URL('./assets/app-data/files', import.meta.url).pathname,
    },
  },
  build: {
    minify: 'terser',
  },
  server: {
    port: 80,
    hmr: {
      clientPort: 442,
    },
    //hmr: false,
    proxy: {
      '/blpm': 'http://localhost:5456',
      '/blpm-listall': 'http://localhost:5456',
      '/pip': 'http://localhost:5456',
    },
  },
});

