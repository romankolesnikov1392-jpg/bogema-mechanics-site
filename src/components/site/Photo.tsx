import { useEffect, useRef, useState, type CSSProperties } from "react"
import { cn } from "cn"

import { getImage } from "@/lib/images"

type PhotoProps = {
  name: string
  alt: string
  sizes?: string
  className?: string
  imgClassName?: string
  priority?: boolean
  reveal?: boolean
  position?: string
  style?: CSSProperties
}

// Адаптивное фото: webp нужной ширины + размытое превью, пока грузится оригинал.
// При reveal картинка при появлении в кадре «оседает» из scale(1.06).
export function Photo({
  name,
  alt,
  sizes = "100vw",
  className,
  imgClassName,
  priority,
  reveal = true,
  position = "center",
  style,
}: PhotoProps) {
  const img = getImage(name)
  const ref = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth) setLoaded(true)
  }, [])

  return (
    <div
      data-reveal={reveal ? "photo" : undefined}
      className={cn("relative overflow-hidden bg-steel", className)}
      style={{
        backgroundImage: `url(${img.lqip})`,
        backgroundSize: "cover",
        backgroundPosition: position,
        ...style,
      }}
    >
      <img
        ref={ref}
        src={img.src}
        srcSet={img.srcSet}
        sizes={sizes}
        width={img.w}
        height={img.h}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        draggable={false}
        onLoad={() => setLoaded(true)}
        data-loaded={priority || loaded || undefined}
        className={cn("photo-img size-full object-cover", imgClassName)}
        style={{ objectPosition: position }}
      />
    </div>
  )
}
