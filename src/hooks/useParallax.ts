import { useEffect, type RefObject } from "react"

// Параллакс фото первого экрана: слой уходит вниз на 18% своей высоты и «отъезжает»
// из scale(1.06) в 1, пока секция прокручивается. Пишем transform прямо в элемент
// (без CSS-переменных на родителе — никакого пересчёта стилей у детей), не чаще раза в кадр
// и только пока секция на экране. При prefers-reduced-motion эффект выключен.
export function useParallax(section: RefObject<HTMLElement | null>, layer: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const sec = section.current
    const el = layer.current
    if (!sec || !el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let raf = 0
    let visible = true
    const update = () => {
      raf = 0
      const p = Math.min(1, Math.max(0, -sec.getBoundingClientRect().top / sec.offsetHeight))
      el.style.transform = `translate3d(0, ${(p * 18).toFixed(3)}%, 0) scale(${(1.06 - p * 0.06).toFixed(4)})`
    }
    const onScroll = () => {
      if (visible && !raf) raf = requestAnimationFrame(update)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
    })
    io.observe(sec)
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [section, layer])
}
