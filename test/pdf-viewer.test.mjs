import assert from 'node:assert/strict'
import test from 'node:test'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

const ASSET_PREFIX = '/assets/'

function parseViewerSrc(search) {
  const src = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search).get('src') ?? ''
  const path = decodeURIComponent(src).split('?')[0]

  if (!path.startsWith(ASSET_PREFIX) || path.includes('..') || !path.toLowerCase().endsWith('.pdf')) {
    return null
  }

  return path
}

function viewerPath(href) {
  const path = href.split('?')[0]
  let decoded = path
  try {
    decoded = decodeURIComponent(path)
  } catch {
    decoded = path
  }
  return `/view/?src=${encodeURIComponent(decoded)}`
}

test('the viewer only opens PDFs under /assets/', () => {
  assert.equal(parseViewerSrc('?src=%2Fassets%2Fresearch%2Fpamc-paper.pdf'), '/assets/research/pamc-paper.pdf')
  assert.equal(parseViewerSrc('?src=/assets/foo.pdf'), '/assets/foo.pdf')
  assert.equal(parseViewerSrc('?src=https://evil.example/x.pdf'), null)
  assert.equal(parseViewerSrc('?src=/assets/../secret.pdf'), null)
  assert.equal(parseViewerSrc('?src=/assets/research/pamc-talk.mp4'), null)
})

test('viewerPath encodes spaces once even if the source href is already escaped', () => {
  assert.equal(
    viewerPath('/assets/Proof%20of%20work/certifications/certificate.pdf'),
    '/view/?src=%2Fassets%2FProof%20of%20work%2Fcertifications%2Fcertificate.pdf',
  )
  assert.equal(
    parseViewerSrc('?src=%2Fassets%2FProof%20of%20work%2Fcertifications%2Fcertificate.pdf'),
    '/assets/Proof of work/certifications/certificate.pdf',
  )
})

test('research assets are in the source tree', () => {
  const dir = join(process.cwd(), 'assets', 'research')
  assert.ok(existsSync(join(dir, 'pamc-paper.pdf')))
  assert.ok(existsSync(join(dir, 'pamc-talk.mp4')))
  assert.ok(existsSync(join(dir, 'pamc-slides.pptx')))
})
