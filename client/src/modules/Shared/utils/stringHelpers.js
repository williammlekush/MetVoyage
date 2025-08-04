/**
 * Capitalizes the first letter of a string.
 * @param {string} string - The string to capitalize.
 * @returns {string} - The capitalized string.
 */
export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Formats a date string into a more readable format.
 * @param {string} date - The date string to format.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
};

/**
 * Checks if a string is a valid date.
 * @param {string} string - The string to check.
 * @returns {boolean} - True if the string is a valid date, false otherwise.
 */
export const isValidDate = (string) => {
  const date = new Date(string);
  return !isNaN(date.getTime());
}

/**
 * Checks if a date string is in the future.
 * @param {string} dateStr - The date string to check.
 * @returns {boolean} - True if the date is in the future, false otherwise.
 */
export const isFutureDateString = (dateStr) => {
  const inputDate = new Date(dateStr + "T00:00:00");
  const now = new Date();
  return inputDate.getTime() > now.getTime();
}