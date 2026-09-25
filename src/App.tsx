import { BookingProvider } from "@/components/site/Booking"
import { Header } from "@/components/site/Header"
import { MobileCta } from "@/components/site/MobileCta"
import { About } from "@/components/sections/About"
import { Contacts } from "@/components/sections/Contacts"
import { Faq } from "@/components/sections/Faq"
import { Footer } from "@/components/sections/Footer"
import { Hero } from "@/components/sections/Hero"
import { Masters } from "@/components/sections/Masters"
import { Offers } from "@/components/sections/Offers"
import { Reviews } from "@/components/sections/Reviews"
import { Services } from "@/components/sections/Services"
import { Works } from "@/components/sections/Works"
import { useReveal } from "@/hooks/useReveal"

export default function App() {
  useReveal()

  return (
      <BookingProvider>
        <a
          href="#main"
          className="eyebrow fixed top-3 left-3 z-[80] -translate-y-20 bg-spark px-4 py-3 text-primary-foreground focus:translate-y-0"
        >
          К содержимому
        </a>
        <Header />
        <main id="main">
          <Hero />
          <About />
          <Services />
          <Masters />
          <Works />
          <Reviews />
          <Offers />
          <Faq />
          <Contacts />
        </main>
        <Footer />
        <MobileCta />
        <div aria-hidden className="grain" />
      </BookingProvider>
  )
}
