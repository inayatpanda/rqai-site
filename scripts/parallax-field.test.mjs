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
const productsPath = new URL('../src/data/products.ts', import.meta.url)
const aboutPath = new URL('../src/pages/About.tsx', import.meta.url)
const stylesPath = new URL('../src/index.css', import.meta.url)

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

test('project pages tell each story through a promise, feature moments and proof', async () => {
  const products = await readFile(productsPath, 'utf8')
  const appPage = await readFile(appPagePath, 'utf8')

  assert.match(products, /type FeatureMoment/)
  assert.match(products, /type ProofPoint/)
  for (const field of ['recognition', 'promise', 'featureMoments', 'proof', 'controlNote']) {
    assert.match(products, new RegExp(field))
    assert.match(appPage, new RegExp(field))
  }
  assert.match(appPage, /feature\.title/)
  assert.match(appPage, /feature\.body/)
})

test('ResearchAssistant foregrounds systematic review, statistics and economics', async () => {
  const source = await readFile(productsPath, 'utf8')
  const start = source.indexOf("slug: 'researchassistant'")
  const end = source.indexOf("slug: 'clinicalproms'")
  const researchAssistant = source.slice(start, end)

  assert.match(researchAssistant, /systematic review/i)
  assert.match(researchAssistant, /statistics/i)
  assert.match(researchAssistant, /economic/i)
  assert.match(researchAssistant, /Reviewer 2/i)
})

test('Home and About use concise supporting copy', async () => {
  const home = await readFile(homePath, 'utf8')
  const about = await readFile(aboutPath, 'utf8')

  assert.match(home, /Seven focused tools/)

  const commitmentBodies = [...about.matchAll(/body:\s*'([^']+)'/g)].map((match) => match[1])
  assert.equal(commitmentBodies.length, 5)
  for (const body of commitmentBodies) {
    assert.ok(body.trim().split(/\s+/).length <= 45, `Commitment is too long: ${body}`)
  }
})

test('project palettes are calmer and AudioQuill uses violet rather than coral', async () => {
  const identities = await readFile(identitiesPath, 'utf8')
  const styles = await readFile(stylesPath, 'utf8')
  const audioStart = identities.indexOf('audioquill:')
  const audioEnd = identities.indexOf('scribble:', audioStart)
  const audio = identities.slice(audioStart, audioEnd)

  assert.match(audio, /#6D4BC3/)
  assert.match(audio, /#382460/)
  assert.match(audio, /#CBBEFF/)
  assert.doesNotMatch(audio, /#E95F78/)
  assert.match(styles, /var\(--card-border\) 44%/)
  assert.match(styles, /var\(--card-highlight\) 30%/)
})

test('ConsultantPrep uses smoked bronze without a yellow card override', async () => {
  const identities = await readFile(identitiesPath, 'utf8')
  const styles = await readFile(stylesPath, 'utf8')
  const start = identities.indexOf('consultantprep:')
  const end = identities.indexOf('audioquill:', start)
  const consultant = identities.slice(start, end)

  assert.match(consultant, /#8A643A/)
  assert.match(consultant, /#4E3525/)
  assert.match(consultant, /#FAF3E8/)
  assert.doesNotMatch(styles, /project-card\[data-slug="consultantprep"\]/)
})

test('ClinicalPROMs and Chapbook occupy distinct green and petrol palettes', async () => {
  const identities = await readFile(identitiesPath, 'utf8')
  const clinical = identities.slice(
    identities.indexOf('clinicalproms:'),
    identities.indexOf('chapbook:'),
  )
  const chapbook = identities.slice(
    identities.indexOf('chapbook:'),
    identities.indexOf('orthoportfolio:'),
  )

  assert.match(clinical, /#2B7668/)
  assert.match(clinical, /#164A43/)
  assert.match(chapbook, /#287D91/)
  assert.match(chapbook, /#183F5A/)
  assert.notEqual(clinical, chapbook)
})

test('every project story uses a large short headline and concise supporting copy', async () => {
  const products = await readFile(productsPath, 'utf8')
  const appPage = await readFile(appPagePath, 'utf8')

  assert.match(products, /storyHeadline:/)
  assert.match(appPage, /storyHeadline/)
  assert.match(appPage, /text-\[clamp\(2\.5rem,5vw,4rem\)\]/)

  const headlines = [...products.matchAll(/storyHeadline:\s*'([^']+)'/g)].map((match) => match[1])
  const promises = [...products.matchAll(/promise:\s*\n?\s*'([^']+)'/g)].map((match) => match[1])
  assert.equal(headlines.length, 7)
  assert.equal(promises.length, 7)
  for (const headline of headlines) assert.ok(headline.trim().split(/\s+/).length <= 10)
  for (const promise of promises) {
    assert.ok(promise.trim().split(/\s+/).length <= 35)
    for (const sentence of promise.split(/[.!?]+/).filter(Boolean)) {
      assert.ok(sentence.trim().split(/\s+/).length <= 18, `Sentence is too long: ${sentence}`)
    }
  }
})
