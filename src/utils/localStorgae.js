// localStorage.js

/**
 * Sets a value in localStorage.
 * @param {string} key - The key under which the value is stored.
 * @param {*} value - The value to store. It will be stringified using JSON.stringify.
 */
export const setItem = (key, value) => {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.error(
			"Error setting item in localStorage",
			error
		);
	}
};

/**
 * Gets a value from localStorage.
 * @param {string} key - The key of the value to retrieve.
 * @returns {*} - The retrieved value, parsed using JSON.parse. Returns null if the key does not exist.
 */
export const getItem = (key) => {
	try {
		const value = localStorage.getItem(key);
		return value ? JSON.parse(value) : null;
	} catch (error) {
		console.error(
			"Error getting item from localStorage",
			error
		);
		return null;
	}
};

/**
 * Removes an item from localStorage.
 * @param {string} key - The key of the value to remove.
 */
export const removeItem = (key) => {
	try {
		localStorage.removeItem(key);
	} catch (error) {
		console.error(
			"Error removing item from localStorage",
			error
		);
	}
};

/**
 * Clears all items from localStorage.
 */
export const clear = () => {
	try {
		localStorage.clear();
	} catch (error) {
		console.error("Error clearing localStorage", error);
	}
};
