import { useEffect } from "react";

/**
 * A custom hook that detects outside clicks or touches on a specified element.
 *
 * @param {React.RefObject<HTMLDivElement>} ref - The reference to the DOM element you want to monitor for outside clicks.
 * @param {() => void} callback - The function that is called when a click outside the referenced element occurs.
 */
export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: () => void
) => {
  useEffect(() => {
    // Event listener to handle click/touch outside the element
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      // Call the callback if click/touch was outside
      callback();
    };

    // Adding event listeners for mouse and touch events
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};
