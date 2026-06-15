async function fetchNavigationItems() {
  const response = await fetch('/api/navigation-items')

  if (!response.ok) {
    throw new Error(`Navigation item request failed with ${response.status}`)
  }

  const payload = await response.json()
  return Array.isArray(payload.items) ? payload.items : []
}

window.cvItemsApi = {
  fetchNavigationItems,
}
