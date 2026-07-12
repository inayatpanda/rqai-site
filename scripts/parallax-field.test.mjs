import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const componentPath = new URL('../src/components/ParallaxField.tsx', import.meta.url)
const orbitPath = new URL('../src/components/ProductOrbit.tsx', import.meta.url)
const homePath = new URL('../src/pages/Home.tsx', import.meta.url)
const glyphPath = new URL('../src/components/ProductGlyph.tsx', import.meta.url)
const identitiesPath = new URL('../src/data/productIdentities.ts', import.meta.url)
const showcasePath = new URL('../src/components/PerspectiveShowcase.tsx', import.meta.url)
const appPagePath = new URL('../src/pages/AppPage.tsx', import.meta.url)
const shellPath = new URL('../src/components/Shell.tsx', import.meta.url)

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

test('home and project pages consume one shared product identity source', async () => {
  const identities = await readFile(identitiesPath, 'utf8')
  const showcase = await readFile(showcasePath, 'utf8')
  const appPage = await readFile(appPagePath, 'utf8')

  for (const slug of [
    'researchassistant', 'clinicalproms', 'chapbook', 'orthoportfolio',
    'consultantprep', 'audioquill', 'scribble',
  ]) {
    assert.match(identities, new RegExp(slug))
  }
  assert.match(showcase, /productIdentities/)
  assert.match(appPage, /productIdentities/)
})

test('internal project pages theme bounded regions and destination cross-links', async () => {
  const source = await readFile(appPagePath, 'utf8')

  assert.match(source, /project-page/)
  assert.match(source, /project-hero/)
  assert.match(source, /identityStyle\(product\.slug\)/)
  assert.match(source, /<ProductGlyph slug=\{other\.slug\}/)
  assert.match(source, /identityStyle\(other\.slug\)/)
})

test('product orbit uses one spring-smoothed progress value and wider destinations', async () => {
  const source = await readFile(orbitPath, 'utf8')

  assert.match(source, /useSpring/)
  assert.match(source, /smoothProgress/)
  assert.match(source, /stiffness:\s*72/)
  assert.match(source, /-42vw/)
  assert.match(source, /42vw/)
})

test('desktop project navigation has a larger rail without changing project routes', async () => {
  const source = await readFile(shellPath, 'utf8')

  assert.match(source, /aria-label="All projects"/)
  assert.match(source, /h-14/)
  assert.match(source, /text-\[1\.0625rem\]/)
  assert.match(source, /gap-x-7/)
  assert.match(source, /to=\{`\/\$\{project\.slug\}`\}/)
})
