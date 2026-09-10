import { defineConfig } from 'vite'
import type { Plugin, ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, cpSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { join, resolve, sep } from 'node:path'

function preserveRootAssets(): Plugin {
  const sourceDir = join(process.cwd(), 'assets')
  const staticRoutes = ['work', 'proof']

  return {
    name: 'preserve-root-assets',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/assets', (request: IncomingMessage, response: ServerResponse, next: () => void) => {
        const encodedPathname = request.url?.split('?')[0]

        if (!encodedPathname) {
          next()
          return
        }

        let pathname: string
        try {
          pathname = decodeURIComponent(encodedPathname).replace(/^\/+/, '')
        } catch {
          next()
          return
        }

        const assetPath = resolve(sourceDir, pathname)

        if (!assetPath.startsWith(`${sourceDir}${sep}`) || !existsSync(assetPath) || !statSync(assetPath).isFile()) {
          next()
          return
        }

        response.setHeader('Content-Type', 'application/pdf')
        response.end(readFileSync(assetPath))
      })
    },
    writeBundle() {
      const distDir = join(process.cwd(), 'dist')

      if (existsSync(sourceDir)) {
        const outputDir = join(distDir, 'assets')
        cpSync(sourceDir, outputDir, { recursive: true })
      }

      const indexPath = join(distDir, 'index.html')

      if (!existsSync(indexPath)) {
        return
      }

      for (const route of staticRoutes) {
        const routeDir = join(distDir, route)
        mkdirSync(routeDir, { recursive: true })
        copyFileSync(indexPath, join(routeDir, 'index.html'))
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), preserveRootAssets()],
})
