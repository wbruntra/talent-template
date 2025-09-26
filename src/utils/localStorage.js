// localStorage utility for talent data management

const STORAGE_KEY = 'talent-roster-data';
const LAST_SAVED_KEY = 'talent-roster-last-saved';

/**
 * Save talent data to localStorage
 * @param {Array} data - The talent data to save
 */
export function saveTalentData(data) {
  try {
    const dataToSave = {
      data,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    localStorage.setItem(LAST_SAVED_KEY, new Date().toISOString());
    
    return true;
  } catch (error) {
    console.error('Failed to save talent data to localStorage:', error);
    return false;
  }
}

/**
 * Load talent data from localStorage
 * @returns {Array|null} - The saved talent data or null if not found
 */
export function loadTalentData() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    
    if (!savedData) {
      return null;
    }
    
    const parsed = JSON.parse(savedData);
    
    // Validate the data structure
    if (parsed && parsed.data && Array.isArray(parsed.data)) {
      return parsed.data;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to load talent data from localStorage:', error);
    return null;
  }
}

/**
 * Get the last saved timestamp
 * @returns {string|null} - ISO timestamp string or null
 */
export function getLastSavedTime() {
  try {
    return localStorage.getItem(LAST_SAVED_KEY);
  } catch (error) {
    console.error('Failed to get last saved time:', error);
    return null;
  }
}

/**
 * Clear saved talent data from localStorage
 */
export function clearSavedData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LAST_SAVED_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear saved data:', error);
    return false;
  }
}

/**
 * Check if there's saved data available
 * @returns {boolean}
 */
export function hasSavedData() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData !== null;
  } catch {
    return false;
  }
}

/**
 * Get a human-readable format of the last saved time
 * @returns {string}
 */
export function getFormattedLastSaved() {
  const lastSaved = getLastSavedTime();
  
  if (!lastSaved) {
    return 'Never';
  }
  
  try {
    const date = new Date(lastSaved);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffMinutes < 1) {
      return 'Just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
    } else {
      const diffHours = Math.floor(diffMinutes / 60);
      if (diffHours < 24) {
        return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
      } else {
        return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
    }
  } catch {
    return 'Unknown';
  }
}