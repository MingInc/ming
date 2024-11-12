import { useState, useCallback } from "react";

// Define the hook for managing the dialog state
export const useDialog = () => {
  // Manage the open/close state of the dialog
  const [isOpen, setIsOpen] = useState(false);

  // Function to open the dialog
  const triggerDialog = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Function to close the dialog
  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    triggerDialog,
    closeDialog,
  };
};
