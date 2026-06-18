import type { ImageMetadata } from 'astro';

export interface Photo {
  src: ImageMetadata;
  alt: string;
  title: string;
}

export function globToPhotos(
  modules: Record<string, { default: ImageMetadata }>
): Photo[] {
  return Object.entries(modules).map(([path, mod]) => {
    const filename = path.split('/').pop()!;
    const sortName = filename
      .replace(/\.[^.]+$/, '')                      // remove extension
      .replace(/_/g, ' ');                          // underscores → spaces
    const name = sortName.replace(/^\d{3}_/, '')     // remove leading number + underscore
    return { src: mod.default, alt: sortName, title: name };
  });
}