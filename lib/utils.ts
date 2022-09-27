import path from 'node:path'
import { fileURLToPath } from 'node:url'

export function refPath(filePath) {
  const rootPath = path.dirname(fileURLToPath(import.meta.url))
  return path.join(rootPath, '../ref', filePath)
}

export function message(msg) {
  console.log(`\ngin: ${msg}`)
}
