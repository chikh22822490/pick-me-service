export default function containsSpecialCharacters(inputString: string): boolean {
  const regex = /^[a-zA-Z0-9_\s]+$/; // Allow letters, digits, underscores, and spaces

  return regex.test(inputString);
}
