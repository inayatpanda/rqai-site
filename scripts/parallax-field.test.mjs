import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const componentPath = new URL('../src/components/ParallaxField.tsx', import.meta.url)
const orbitPath = new URL('../src/components/ProductOrbit.tsx', import.meta.url)
const homePath = new URL('../src/pages/Home.tsx', import.meta.url)
const glyphPath = new URL('../src/components/ProductGlyph.tsx', import.meta.url)

test('parallax field is decorative and contains a reduced-motion-safe layer contract', async () => {
  const source = await readFile(componentPath, 'utf8')

  assert.match(source, /aria-hidden="true"/)
  assert.match(source, /pointer-events-none/)
  assert.match(source, /parallax-field__grid/)
  assert.match(source, /parallax-field__constellation/)
  assert.match(source, /parallax-field__bloom/)
})

test('product orbit defines a scroll-driven accessible route into the project showcase', async () => {
  const source = await readFile(orbitPath, 'utf8')

  assert.match(source, /useScroll/)
  assert.match(source, /scrollYProgress/)
  assert.match(source, /href="#projects"/)
  assert.match(source, /aria-hidden="true"/)
})

test('home restores the original written hero before the product orbit', async () => {
  const source = await readFile(homePath, 'utf8')

  const hero = 'Streamline the work. Keep the hours.</h1>'
  assert.ok(source.includes(hero))
  assert.ok(source.indexOf(hero) < source.indexOf('<ProductOrbit'))
})

test('product glyph supports every RQAI project slug', async () => {
  const source = await readFile(glyphPath, 'utf8')

  for (const slug of [
    'researchassistant',
    'clinicalproms',
    'chapbook',
    'orthoportfolio',
    'consultantprep',
    'audioquill',
    'scribble',
  ]) {
    assert.match(source, new RegExp(slug))
  }
  assert.match(source, /aria-hidden="true"/)
})
