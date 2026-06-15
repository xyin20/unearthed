# WEB103 Project 2 - Xiaoyun Yin Academic CV

Submitted by: **Xiaoyun Yin**

About this web app: **A responsive academic CV and research portfolio for Xiaoyun Yin. The site presents research areas, publications, teaching and mentoring, education, awards, professional service, technical skills, a timeline, and a downloadable PDF CV. The homepage list items are supplied by a Render PostgreSQL database.**

Time spent: **About 10 hours**

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured database table for the list items**
  - [ ] **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [ ] **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command `SELECT * FROM cv_navigation_items;` to display your table contents.**

The following **optional** features are implemented:

- [ ] The user can search for items by a specific attribute

The following **additional** features are implemented:

- [x] Database-backed list items for Research, Publications, Teaching, About, and CV
- [x] Express API endpoint at `/api/navigation-items`
- [x] PostgreSQL schema and seed script in `server/config/schema.sql` and `server/scripts/setupDatabase.js`
- [x] Local `.env` support for database configuration without committing secrets
- [x] Responsive desktop and mobile layouts
- [x] Light/dark theme toggle with saved preference
- [x] Sticky navigation bar with active-page state
- [x] Footer with contact email and ORCID link
- [x] Downloadable PDF CV
- [x] Dedicated 404 page

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='output/playwright/cv-walkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with **Playwright screenshots and Pillow**.

**Project 2 submission note:** the current GIF shows the website flow, but it still needs to be replaced with a recording that also shows the Render dashboard database page and a terminal running `SELECT * FROM cv_navigation_items;`.

## Notes

The project is organized with separate frontend and backend folders:

```text
client/
  public/
    scripts/
      api/              # frontend API calls
      cv.js             # page rendering
      header.js         # global navigation and theme toggle
server/
  config/
    database.js         # PostgreSQL pool configuration
    loadEnv.js          # local .env loading
    schema.sql          # cv_navigation_items table definition
  routes/
    navigationItems.js  # PostgreSQL-backed list item API
  scripts/
    setupDatabase.js    # creates and seeds the database table
  server.js             # Express server
```

To run locally:

```bash
cd server
npm install
copy .env.example .env
# Paste the Render PostgreSQL connection string into server/.env
npm run db:setup
npm start
```

Then open `http://localhost:3001/`.

The database table used for the list items is `cv_navigation_items`, with columns for `title`, `path`, `section_summary`, `description`, and `display_order`.

## License

Copyright 2026 Xiaoyun Yin

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
