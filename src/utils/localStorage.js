// Generic localStorage utility for roster data.
// All functions take a storageKey (e.g. 'talent-roster') and derive
// actual localStorage keys as `${storageKey}-data` and `${storageKey}-last-saved`.

function dataKey(storageKey) {
  return `${storageKey}-data`
}

function lastSavedKey(storageKey) {
  return `${storageKey}-last-saved`
}

export function saveRosterData(storageKey, data) {
  try {
    const payload = { data, timestamp: new Date().toISOString(), version: '1.0' }
    localStorage.setItem(dataKey(storageKey), JSON.stringify(payload))
    localStorage.setItem(lastSavedKey(storageKey), new Date().toISOString())
    return true
  } catch (error) {
    console.error('Failed to save roster data:', error)
    return false
  }
}

export function loadRosterData(storageKey) {
  try {
    const saved = localStorage.getItem(dataKey(storageKey))
    if (!saved) return null
    const parsed = JSON.parse(saved)
    if (parsed?.data && Array.isArray(parsed.data)) return parsed.data
    return null
  } catch (error) {
    console.error('Failed to load roster data:', error)
    return null
  }
}

export function clearRosterData(storageKey) {
  try {
    localStorage.removeItem(dataKey(storageKey))
    localStorage.removeItem(lastSavedKey(storageKey))
    return true
  } catch (error) {
    console.error('Failed to clear roster data:', error)
    return false
  }
}

export function getRosterFormattedLastSaved(storageKey) {
  try {
    const saved = localStorage.getItem(lastSavedKey(storageKey))
    if (!saved) return 'Never'
    const date = new Date(saved)
    const now = new Date()
    const diffMinutes = Math.floor((now - date) / (1000 * 60))
    if (diffMinutes < 1) return 'Just now'
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`
    const diffHours = Math.floor(diffMinutes / 60)
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
    return (
      date.toLocaleDateString() +
      ' at ' +
      date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    )
  } catch {
    return 'Unknown'
  }
}
