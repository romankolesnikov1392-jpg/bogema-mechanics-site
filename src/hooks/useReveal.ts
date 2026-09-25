import { useEffect } from "react"

// Один IntersectionObserver на весь сайт: элементы с data-reveal получают data-revealed,
// когда впервые попадают в экран. Анимация целиком в CSS (index.css) — off main thread.
export function useReveal() {
  useEffect(() => {
    ;(window as Window & { __appReady?: boolean }).__appReady = true
    document.documentElement.classList.add("js")
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])")
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.setAttribute("data-revealed", ""))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-revealed", "")
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])
}
