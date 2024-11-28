import { useState, useCallback } from "react";

interface useFileResult {
  file: File | null;
  fileName: string | null;
  fileURL: string | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile: () => void;
}

/**
 * Custom hook to manage file input for file uploads.
 * It handles selecting a file, generating a preview URL for the file,
 * and clearing the file data.
 *
 * @returns {useFileResult} The hook returns the file data and handlers for file input:
 *   - `file`: The selected file, or `null` if no file is selected.
 *   - `fileName`: The name of the selected file, or `null` if no file is selected.
 *   - `fileURL`: A preview URL for the selected file, or `null` if no file is selected.
 *   - `handleFileChange`: A function to handle file selection from the input.
 *   - `handleRemoveFile`: A function to clear the selected file data.
 */
export function useFileInput(): useFileResult {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileURL, setFileURL] = useState<string | null>(null);

  /**
   * Handles the file input change event and updates the file state with the selected file.
   * It also generates a preview URL for the file.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The file input change event.
   */
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      console.log("files :", event.target.files);
      if (file) {
        setFile(file);
        setFileName(file.name);
        setFileURL(URL.createObjectURL(file)); // Generate a preview URL for the file
      }
    },
    []
  );

  // Clear file data
  const handleRemoveFile = useCallback(() => {
    setFile(null);
    setFileName(null);
    setFileURL(null);
  }, []);

  // Return file data and the UI for the preview
  return {
    file,
    fileName,
    fileURL,
    handleFileChange,
    handleRemoveFile,
  };
}
