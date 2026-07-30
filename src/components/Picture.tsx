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
  const webpSrc = src.replace(/\.(jpe?g|png)$/i, '.webp');
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
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
