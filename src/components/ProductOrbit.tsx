import { projectPath } from '../data/projectPaths'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import { ProductLogo } from './ProductLogo'
import { IllustratedHero, type IllustrationKind } from './IllustratedHero'

const scenes: IllustrationKind[] = ['research', 'shoulder', 'shoulder', 'writing', 'research', 'podium', 'writing', 'writing', 'podium', 'literature', 'signal', 'shoulder']

/** A selectable sketchbook. No hidden links, scroll locking or automatic cycling. */
export function ProductOrbit() {
  const [selected, setSelected] = useState(0)
  const product = PRODUCTS[selected]
  return <section className="project-sketchbook container-edge" aria-labelledby="sketchbook-title">
    <div className="sketchbook-heading">
      <div><p className="eyebrow">A closer look</p><h2 id="sketchbook-title">Meet the projects.</h2><p className="sketchbook-intro">Choose a logo to see what it does.</p></div>
      <a href="#projects">Browse the collection <span aria-hidden="true">↓</span></a>
    </div>
    <div className="sketchbook-layout">
      <div className="sketchbook-index" role="group" aria-label="Choose an app to preview">
        {PRODUCTS.map((item, i) => <button type="button" key={item.slug} onClick={() => setSelected(i)} aria-pressed={selected === i} aria-controls="sketchbook-preview" className={selected === i ? 'is-selected' : ''}>
          <ProductLogo slug={item.slug} /><span>{item.name}</span><span className="sketchbook-dot" aria-hidden="true" />
        </button>)}
      </div>
      <div className="sketchbook-preview" id="sketchbook-preview">
        <span className="sketchbook-number" aria-hidden="true">{String(selected + 1).padStart(2, '0')} / {PRODUCTS.length}</span>
        <IllustratedHero kind={scenes[selected]} caption={false} />
        <div className="sketchbook-caption" aria-live="polite" aria-atomic="true">
          <h3>{product.name}</h3><p>{product.tagline}</p>
          <Link to={projectPath(product.slug)}>{product.status === 'development' ? 'About this project' : 'About this app'} <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </div>
  </section>
}
