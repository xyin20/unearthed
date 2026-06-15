import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const envPath = path.resolve(__dirname, '../.env')

function cleanValue(value) {
  const trimmed = value.trim()
  const quote = trimmed[0]

  if ((quote === '"' || quote === "'") && trimmed[trimmed.length - 1] === quote) {
    return trimmed.slice(1, -1)
  }

  return trimmed
}

try {
  const contents = fs.readFileSync(envPath, 'utf8')

  contents.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) return

    const separatorIndex = trimmed.indexOf('=')
    if (separatorIndex === -1) return

    const key = trimmed.slice(0, separatorIndex).trim()
    const value = cleanValue(trimmed.slice(separatorIndex + 1))

    if (key && process.env[key] === undefined) {
      process.env[key] = value
    }
  })
} catch (error) {
  if (error.code !== 'ENOENT') {
    throw error
  }
}
