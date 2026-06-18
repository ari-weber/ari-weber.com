import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://ari-weber.com',

  integrations: [
    sitemap(),
  ],
  output: 'server',
  adapter: vercel({
    imageService: true, // Configures the Vercel Image Optimization API
  }),
});