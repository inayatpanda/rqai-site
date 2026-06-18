import { Hero } from './components/Hero'
import { ProductGrid } from './components/ProductGrid'
import { About } from './components/About'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="min-h-dvh">
      <Hero />
      <main className="mx-auto w-full max-w-5xl px-5">
        <ProductGrid />
        <About />
      </main>
      <Footer />
    </div>
  )
}
