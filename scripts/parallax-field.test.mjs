import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const componentPath = new URL('../src/components/ParallaxField.tsx', import.meta.url)

test('parallax field is decorative and contains a reduced-motion-safe layer contract', async () => {
  const source = await readFile(componentPath, 'utf8')

  assert.match(source, /aria-hidden="true"/)
  assert.match(source, /pointer-events-none/)
  assert.match(source, /parallax-field__grid/)
  assert.match(source, /parallax-field__constellation/)
  assert.match(source, /parallax-field__bloom/)
})
