import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import giftsRouter from './routes/gifts.js'

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clientRoot = path.resolve(__dirname, '../client')
const clientPublic = path.join(clientRoot, 'public')
const clientIndex = path.join(clientRoot, 'index.html')

app.use(express.static(clientPublic))

app.use('/gifts', giftsRouter)

app.get('/style.css', (req, res) => {
  res.sendFile(path.join(clientRoot, 'style.css'))
})

app.get(['/', '/research', '/publications', '/teaching', '/about', '/cv'], (req, res) => {
  res.sendFile(clientIndex)
})

app.use((req, res) => {
  res.status(404).send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Page Not Found | Xiaoyun Yin</title>
        <style>
          body {
            min-height: 100vh;
            margin: 0;
            display: grid;
            place-items: center;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            color: #151713;
            background: #fbfaf6;
          }

          main {
            width: min(560px, calc(100% - 32px));
          }

          h1 {
            margin-bottom: 10px;
            font-size: 2.5rem;
          }

          a {
            color: #005c55;
            font-weight: 700;
          }
        </style>
      </head>
      <body>
        <main>
          <h1>Page not found</h1>
          <p>This page is not part of the CV site. <a href="/">Return home</a>.</p>
        </main>
      </body>
    </html>
  `)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
