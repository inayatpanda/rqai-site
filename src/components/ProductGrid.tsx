import { products } from '../data/products'
import { ProductTile } from './ProductTile'

export function ProductGrid() {
  return (
    <section aria-labelledby="products-title" className="py-4 sm:py-5">
      <h2
        id="products-title"
        className="mb-2.5 text-xs font-bold uppercase tracking-[0.08em] text-accent-cyan"
      >
        Products
      </h2>

      {/*
        Bento grid: 1 col (mobile) -> 2 col (tablet) -> 4 col (desktop).
        AudioQuill (feature) spans 2 columns on desktop as the flagship tile.
      */}
      <ul className="grid grid-cols-1 gap-2.5 sm:auto-rows-fr sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, i) => (
          <ProductTile key={product.name} product={product} index={i} />
        ))}
      </ul>
    </section>
  )
}
