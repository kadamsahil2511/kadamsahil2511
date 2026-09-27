import assert from 'node:assert/strict'
import { existsSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import test from 'node:test'

const sourceDir = join(process.cwd(), 'assets', 'Proof of work')
const outputDir = join(process.cwd(), 'dist', 'assets', 'Proof of work')
const awsCertificate = join('certifications', '2025-12-aws-cloud-practitioner-essentials', 'certificate.pdf')

function pdfsIn(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? pdfsIn(path) : path.endsWith('.pdf') ? [path] : []
  })
}

test('the production build publishes every proof document', () => {
  const proofFiles = pdfsIn(sourceDir)

  assert.ok(proofFiles.length > 0, 'expected proof documents in the source folder')
  for (const file of proofFiles) {
    assert.ok(existsSync(join(outputDir, relative(sourceDir, file))), `missing ${relative(sourceDir, file)}`)
  }
})

test('the AWS Cloud Practitioner Essentials certificate is published', () => {
  assert.ok(existsSync(join(sourceDir, awsCertificate)), 'missing source certificate')
  assert.ok(existsSync(join(outputDir, awsCertificate)), 'missing built certificate')
})
