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
export const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${month}-${day}-${year}`;
};