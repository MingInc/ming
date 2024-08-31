export function generateUID() {
  const timestamp = Date.now().toString(32);
  const randomPart = Math.random().toString(36).substr(2, 5); // Generate 5 random characters
  return `${timestamp}-${randomPart}`;
}
