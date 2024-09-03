export function extractFolderName(gitUrl: string): string {
  // Split the URL by '/' and get the last part
  const parts = gitUrl.split("/");
  const folderNameWithExtension = parts[parts.length - 1];

  // Remove the '.git' extension if it exists
  const folderName = folderNameWithExtension.endsWith(".git")
    ? folderNameWithExtension.replace(".git", "")
    : folderNameWithExtension;

  return folderName;
}
