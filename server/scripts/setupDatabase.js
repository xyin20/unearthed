import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPool } from '../config/database.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const schemaPath = path.resolve(__dirname, '../config/schema.sql')

const navigationItems = [
  {
    title: 'Research',
    path: '/research',
    sections: ['Research interests', 'Current projects', 'Lab & collaborators', 'Grants'],
    description: 'Research on Human-AI mutual adaptation, trust dynamics, and bio-behavioral team measurement.',
    displayOrder: 1,
  },
  {
    title: 'Publications',
    path: '/publications',
    sections: ['Journal articles', 'Conference papers', 'Under review'],
    description: 'Peer-reviewed articles, conference proceedings, workshop papers, and manuscripts under review.',
    displayOrder: 2,
  },
  {
    title: 'Teaching',
    path: '/teaching',
    sections: ['Courses', 'Mentoring', 'Resources'],
    description: 'Teaching, course development, research mentorship, and training resources.',
    displayOrder: 3,
  },
  {
    title: 'About',
    path: '/about',
    sections: ['Education', 'Awards & honors', 'Skills & tools', 'Service & review'],
    description: 'Education, awards, technical skills, professional service, and review activities.',
    displayOrder: 4,
  },
  {
    title: 'CV',
    path: '/cv',
    sections: ['PDF download', 'Timeline view'],
    description: 'Downloadable PDF CV and a timeline of selected academic milestones.',
    displayOrder: 5,
  },
]

async function setupDatabase() {
  const pool = getPool()
  const schema = await fs.readFile(schemaPath, 'utf8')

  await pool.query(schema)

  for (const item of navigationItems) {
    await pool.query(
      `
        INSERT INTO cv_navigation_items
          (title, path, section_summary, description, display_order)
        VALUES
          ($1, $2, $3, $4, $5)
        ON CONFLICT (path) DO UPDATE SET
          title = EXCLUDED.title,
          section_summary = EXCLUDED.section_summary,
          description = EXCLUDED.description,
          display_order = EXCLUDED.display_order,
          updated_at = NOW()
      `,
      [item.title, item.path, item.sections, item.description, item.displayOrder],
    )
  }

  await pool.end()
  console.log(`Database ready: ${navigationItems.length} navigation items seeded.`)
}

setupDatabase().catch(async (error) => {
  console.error(error.message)

  try {
    await getPool().end()
  } catch (_) {
    // Pool may not exist when configuration is missing.
  }

  process.exit(1)
})
