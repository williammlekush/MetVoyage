/**
 * Capitalizes the first letter of a string.
 * @param {string} string - The string to capitalize.
 * @returns {string} - The capitalized string.
 */
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default capitalize;