import { useState } from 'react'
import type { ImgHTMLAttributes } from 'react'

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  placeholder?: string
}

export function LazyImage({ src, alt, className = '', placeholder, ...props }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <span className={`relative block overflow-hidden ${className}`}>
      {!loaded && placeholder && (
        <span className="absolute inset-0 flex items-center justify-center bg-surface-inset">
          {placeholder}
        </span>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        {...props}
      />
    </span>
  )
}
