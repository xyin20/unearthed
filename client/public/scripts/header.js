const header = document.querySelector('.site-header')

const navItems = [
  { label: 'Research', path: '/research' },
  { label: 'Publications', path: '/publications' },
  { label: 'Teaching', path: '/teaching' },
  { label: 'About', path: '/about' },
  { label: 'CV', path: '/cv' },
]

function iconSvg(kind) {
  const icons = {
    sun: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
      </svg>
    `,
    moon: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 3a6.8 6.8 0 0 0 9 8.9A9 9 0 1 1 12 3Z"></path>
      </svg>
    `,
  }

  return icons[kind]
}

function preferredTheme() {
  const storedTheme = localStorage.getItem('theme')
  if (storedTheme) return storedTheme

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme
  localStorage.setItem('theme', theme)

  const isDark = theme === 'dark'
  themeButton.setAttribute('aria-label', isDark ? 'Use light theme' : 'Use dark theme')
  themeButton.setAttribute('title', isDark ? 'Use light theme' : 'Use dark theme')
  themeButton.innerHTML = iconSvg(isDark ? 'sun' : 'moon')
}

const shell = document.createElement('div')
shell.className = 'header-shell'

const brand = document.createElement('a')
brand.className = 'brand'
brand.href = '/'
brand.dataset.route = ''
brand.innerHTML = `
  <span class="brand-mark" aria-hidden="true">XY</span>
  <span>
    <span class="brand-name">Xiaoyun Yin</span>
    <span class="brand-role">Human-AI teaming researcher</span>
  </span>
`

const nav = document.createElement('nav')
nav.className = 'nav-links'
nav.setAttribute('aria-label', 'Primary navigation')

navItems.forEach((item) => {
  const link = document.createElement('a')
  link.href = item.path
  link.dataset.route = ''
  link.textContent = item.label
  nav.appendChild(link)
})

const actions = document.createElement('div')
actions.className = 'header-actions'

const themeButton = document.createElement('button')
themeButton.className = 'theme-toggle'
themeButton.type = 'button'
themeButton.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
  setTheme(nextTheme)
})

actions.appendChild(themeButton)
shell.appendChild(brand)
shell.appendChild(nav)
shell.appendChild(actions)
header.appendChild(shell)

setTheme(preferredTheme())

document.addEventListener('route:change', (event) => {
  const currentPath = event.detail.path
  document.querySelectorAll('[data-route]').forEach((link) => {
    const linkPath = new URL(link.href, window.location.origin).pathname
    const isCurrent = linkPath === currentPath

    if (isCurrent) {
      link.setAttribute('aria-current', 'page')
    } else {
      link.removeAttribute('aria-current')
    }
  })
})
