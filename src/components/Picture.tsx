type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: 'lazy' | 'eager';
};

/**
 * Renders a WebP <source> (same basename, .webp) alongside the original
 * <img> as fallback. Only pass `src` for images that actually have a
 * matching optimized .webp twin in public/images (see scripts/optimize-images.mjs).
 */
export function Picture({ src, alt, width, height, className, loading = 'lazy' }: Props) {
  // `src` is always an absolute path like "/images/foo.jpg", written assuming
  // the app is served from the domain root. When deployed under a subpath
  // (e.g. GitHub Pages project sites at /<repo>/), that leading slash needs
  // to be resolved against Vite's configured base instead.
  const resolvedSrc = src.startsWith('/')
    ? `${import.meta.env.BASE_URL}${src.slice(1)}`
    : src;
  const webpSrc = resolvedSrc.replace(/\.(jpe?g|png)$/i, '.webp');
  return (
    // bg-green-tint shows behind the image while it loads, so a lazy image
    // on a slow connection reads as "loading" rather than a blank white gap.
    <picture className="block bg-green-tint">
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={resolvedSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
