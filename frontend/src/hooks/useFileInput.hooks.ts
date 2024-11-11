import { useState, useCallback } from "react";

export function useFileInput() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileURL, setFileURL] = useState<string | null>(null);

  // Handle file change
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
