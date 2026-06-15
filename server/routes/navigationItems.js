import express from 'express'
import { query } from '../config/database.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT
        id,
        title,
        path,
        section_summary AS sections,
        description,
        display_order AS "displayOrder"
      FROM cv_navigation_items
      ORDER BY display_order ASC, title ASC
    `)

    res.status(200).json({ items: result.rows })
  } catch (error) {
    const isMissingConfig = error.message === 'DATABASE_URL is not set'

    res.status(isMissingConfig ? 503 : 500).json({
      error: isMissingConfig ? 'Database is not configured.' : 'Unable to load navigation items.',
    })
  }
})

export default router
