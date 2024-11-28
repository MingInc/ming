import { useEffect, useState } from "react";

/**
 * Custom hook to debounce a value.
 * This hook delays updating the state of `debouncedValue` until after a specified delay.
 * It can be useful for handling events like user input or search queries, where you want to avoid
 * performing an action (e.g., an API request) too frequently.
 *
 * @param {string} value - The value to debounce. This could be a string representing user input or any other value.
 * @param {number} delay - The delay in milliseconds to wait before updating the debounced value.
 *
 * @returns {string} The debounced value, which will be updated after the specified `delay`.
 *
 * @example
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 *
 * // The `debouncedSearchTerm` will only update after the user stops typing for 500ms.
 */

export const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
