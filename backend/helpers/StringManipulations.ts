/**
 * Processes a project name by removing spaces, replacing any remaining spaces with hyphens,
 * and converting the entire string to lowercase.
 *
 * This function is typically used to normalize project names for URLs, filenames, or other
 * scenarios where spaces are not allowed or need to be standardized.
 *
 * @param {string} input - The project name string to be processed.
 * @returns {string} The processed project name with spaces removed, hyphens inserted,
 *                   and all characters in lowercase.
 *
 * @example
 * const result = processProjectName("My Project Name");
 * console.log(result); // "my-project-name"
 */
export function processProjectName(input: string): string {
  // Remove spaces
  const noSpaces = input.replace(/\s+/g, "");

  // Replace any remaining spaces (if any) with hyphens and convert to lowercase
  const hyphenated = noSpaces.replace(/\s+/g, "-").toLowerCase();

  return hyphenated;
}
