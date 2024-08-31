export function processProjectName(input: string): string {
  // Remove spaces
  const noSpaces = input.replace(/\s+/g, "");

  // Replace any remaining spaces (if any) with hyphens and convert to lowercase
  const hyphenated = noSpaces.replace(/\s+/g, "-").toLowerCase();

  return hyphenated;
}
