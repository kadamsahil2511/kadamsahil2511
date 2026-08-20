import { defineConfig } from 'vite'
import type { Plugin, ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync } from 'node:fs'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { dirname, join } from 'node:path'

function preserveRootAssets(): Plugin {
  const sourceDir = join(process.cwd(), 'assets')

  return {
    name: 'preserve-root-assets',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/assets', (request: IncomingMessage, response: ServerResponse, next: () => void) => {
        const pathname = request.url?.split('?')[0]?.replace(/^\/+/, '')

        if (!pathname || pathname.includes('..')) {
          next()
          return
        }

        const assetPath = join(sourceDir, pathname)

        if (!existsSync(assetPath) || !statSync(assetPath).isFile()) {
          next()
          return
        }

        response.setHeader('Content-Type', 'application/pdf')
        response.end(readFileSync(assetPath))
      })
    },
    writeBundle() {
      if (!existsSync(sourceDir)) {
        return
      }

      const outputDir = join(process.cwd(), 'dist', 'assets')
      mkdirSync(outputDir, { recursive: true })

      for (const filename of readdirSync(sourceDir)) {
        const sourcePath = join(sourceDir, filename)

        if (statSync(sourcePath).isFile()) {
          const targetPath = join(outputDir, filename)
          mkdirSync(dirname(targetPath), { recursive: true })
          copyFileSync(sourcePath, targetPath)
        }
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), preserveRootAssets()],
})
