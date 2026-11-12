const ASSET_PREFIX = '/assets/'

export function isAssetPdf(href: string) {
  const path = href.split('?')[0]
  return path.startsWith(ASSET_PREFIX) && path.toLowerCase().endsWith('.pdf')
}

export function viewerPath(href: string) {
  const path = href.split('?')[0]
  let decoded = path
  try {
    decoded = decodeURIComponent(path)
  } catch {
    decoded = path
  }
  return `/view/?src=${encodeURIComponent(decoded)}`
}

export function parseViewerSrc(search: string) {
  const src = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search).get('src') ?? ''
  const path = decodeURIComponent(src).split('?')[0]

  if (!path.startsWith(ASSET_PREFIX) || path.includes('..') || !path.toLowerCase().endsWith('.pdf')) {
    return null
  }

  return path
}

export function fileNameFromSrc(src: string) {
  return decodeURIComponent(src.split('/').pop() ?? 'document.pdf')
}

export async function fetchPdfBlob(src: string) {
  const response = await fetch(src)
  if (!response.ok) {
    throw new Error(`Could not load ${src}`)
  }
  return response.blob()
}

export async function downloadPdf(src: string, filename: string) {
  const blob = await fetchPdfBlob(src)
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.append(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export async function sharePdf(src: string, title: string, filename: string) {
  const url = `${window.location.origin}${viewerPath(src)}`

  try {
    const blob = await fetchPdfBlob(src)
    const file = new File([blob], filename, { type: 'application/pdf' })
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title })
      return
    }
  } catch {
    // Fall through to URL share or copy.
  }

  if (navigator.share) {
    await navigator.share({ title, url })
    return
  }

  await navigator.clipboard.writeText(url)
}
