CREATE TABLE IF NOT EXISTS cv_navigation_items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(80) NOT NULL,
  path VARCHAR(120) NOT NULL UNIQUE,
  section_summary TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  description TEXT NOT NULL DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS cv_navigation_items_display_order_idx
  ON cv_navigation_items (display_order, title);
