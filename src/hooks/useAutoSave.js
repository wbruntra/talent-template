import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for debounced execution of a function
 * @param {Function} callback - The function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - The debounced function
 */
export function useDebounce(callback, delay) {
  const timeoutRef = useRef(null);

  const debouncedCallback = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Function to immediately execute and cancel pending debounced calls
  const flush = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return { debouncedCallback, flush };
}

/**
 * Custom hook for auto-save functionality with debouncing
 * @param {*} data - The data to save
 * @param {Function} saveFunction - Function to save the data
 * @param {number} delay - Debounce delay in milliseconds (default: 10000ms = 10 seconds)
 * @returns {Object} - Save status and manual save function
 */
export function useAutoSave(data, saveFunction, delay = 10000) {
  const { debouncedCallback, flush } = useDebounce(saveFunction, delay);
  const initialDataRef = useRef(data);
  const lastSavedDataRef = useRef(null);

  // Manual save function
  const saveNow = useCallback(() => {
    flush(); // Cancel any pending debounced save
    const success = saveFunction(data);
    if (success) {
      lastSavedDataRef.current = JSON.stringify(data);
    }
    return success;
  }, [data, saveFunction, flush]);

  // Auto-save effect
  useEffect(() => {
    // Don't auto-save on initial mount
    if (initialDataRef.current === data) {
      initialDataRef.current = null;
      return;
    }

    // Don't save if data hasn't actually changed
    const currentDataString = JSON.stringify(data);
    if (lastSavedDataRef.current === currentDataString) {
      return;
    }

    // Trigger debounced save
    debouncedCallback(data);
  }, [data, debouncedCallback]);

  // Save immediately on unmount if there are pending changes
  useEffect(() => {
    return () => {
      const currentDataString = JSON.stringify(data);
      if (lastSavedDataRef.current !== currentDataString) {
        saveFunction(data);
      }
    };
  }, [data, saveFunction]);

  return { saveNow };
}