import { useEffect, useRef, useState, type ReactNode } from 'react'
import { GlobalWorkerOptions, getDocument, type PDFDocumentProxy } from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { downloadPdf, fileNameFromSrc, parseViewerSrc, sharePdf } from './pdf'

GlobalWorkerOptions.workerSrc = pdfWorker

const SCALE = 1.35

type PdfViewerProps = {
  search: string
  onBack: () => void
}

export function PdfViewer({ search, onBack }: PdfViewerProps) {
  const src = parseViewerSrc(search)
  const title = src ? fileNameFromSrc(src).replace(/\.pdf$/i, '').replaceAll('-', ' ') : 'Missing file'

  if (!src) {
    return (
      <PdfChrome title={title} onBack={onBack} src={null} status="This file is not available." />
    )
  }

  return <PdfPages key={src} src={src} title={title} onBack={onBack} />
}

function PdfPages({ src, title, onBack }: { src: string; title: string; onBack: () => void }) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState('Loading PDF…')
  const [busy, setBusy] = useState<'download' | 'share' | null>(null)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    let cancelled = false
    let documentProxy: PDFDocumentProxy | undefined
    const loadingTask = getDocument({ url: src })
    const host = canvasRef.current
    if (host) {
      host.replaceChildren()
    }

    void (async () => {
      try {
        documentProxy = await loadingTask.promise
        if (cancelled || !canvasRef.current) {
          return
        }

        for (let pageNumber = 1; pageNumber <= documentProxy.numPages; pageNumber += 1) {
          const page = await documentProxy.getPage(pageNumber)
          if (cancelled) {
            return
          }
          const viewport = page.getViewport({ scale: SCALE })
          const canvas = document.createElement('canvas')
          canvas.width = viewport.width
          canvas.height = viewport.height
          canvas.className = 'mb-4 w-full bg-white'
          const context = canvas.getContext('2d')
          if (!context) {
            continue
          }
          await page.render({ canvas, canvasContext: context, viewport }).promise
          canvasRef.current?.append(canvas)
        }
        if (!cancelled) {
          setStatus('')
        }
      } catch {
        if (!cancelled) {
          setStatus('Could not render this PDF. Download it instead.')
        }
      }
    })()

    return () => {
      cancelled = true
      documentProxy?.cleanup()
      void loadingTask.destroy()
    }
  }, [src])

  async function onDownload() {
    setBusy('download')
    setNotice('')
    try {
      await downloadPdf(src, fileNameFromSrc(src))
    } catch {
      setNotice('Download failed. Try again.')
    } finally {
      setBusy(null)
    }
  }

  async function onShare() {
    setBusy('share')
    setNotice('')
    try {
      await sharePdf(src, title, fileNameFromSrc(src))
      if (!navigator.share) {
        setNotice('Link copied.')
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return
      }
      setNotice('Share failed. The download button still works.')
    } finally {
      setBusy(null)
    }
  }

  return (
    <PdfChrome
      title={title}
      onBack={onBack}
      src={src}
      status={status}
      notice={notice}
      busy={busy}
      onDownload={() => void onDownload()}
      onShare={() => void onShare()}
    >
      <div ref={canvasRef} className="grid" />
    </PdfChrome>
  )
}

function PdfChrome({
  title,
  onBack,
  src,
  status,
  notice = '',
  busy = null,
  onDownload,
  onShare,
  children,
}: {
  title: string
  onBack: () => void
  src: string | null
  status: string
  notice?: string
  busy?: 'download' | 'share' | null
  onDownload?: () => void
  onShare?: () => void
  children?: ReactNode
}) {
  return (
    <main className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="border-0 bg-transparent p-0 text-xs leading-4 text-[var(--muted)] hover:text-[var(--text)]"
        >
          Back
        </button>
        <div className="flex gap-4 text-xs leading-4">
          <button
            type="button"
            disabled={!src || busy !== null}
            onClick={onDownload}
            className="border-0 bg-transparent p-0 text-[var(--muted)] hover:text-[var(--text)] disabled:opacity-50"
          >
            {busy === 'download' ? 'Downloading…' : 'Download'}
          </button>
          <button
            type="button"
            disabled={!src || busy !== null}
            onClick={onShare}
            className="border-0 bg-transparent p-0 text-[var(--muted)] hover:text-[var(--text)] disabled:opacity-50"
          >
            {busy === 'share' ? 'Sharing…' : 'Share'}
          </button>
        </div>
      </div>
      <h1 className="text-lg font-bold capitalize leading-5 text-[var(--text)]">{title}</h1>
      {notice ? <p className="text-xs leading-4 text-[var(--muted)]">{notice}</p> : null}
      {status ? <p className="text-sm leading-5 text-[var(--text)]">{status}</p> : null}
      {children}
    </main>
  )
}
