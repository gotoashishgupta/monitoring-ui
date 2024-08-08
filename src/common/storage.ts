import { StorageEnum } from "#wf-types/enum";

export const getItem = <T>(key: StorageEnum): T | null => {
	let value: T | null = null;
	try {
		const result = window.localStorage.getItem(key);
		if (result) {
			value = JSON.parse(result) as T;
		}
	} catch (error) {
		console.error(error);
	}
	return value;
};

export const getStringItem = (key: StorageEnum): string | null => {
	return localStorage.getItem(key);
};

export const setItem = <T>(key: StorageEnum, value: T): void => {
	localStorage.setItem(key, JSON.stringify(value));
};
export const removeItem = (key: StorageEnum): void => {
	localStorage.removeItem(key);
};
export const clearItems = () => {
	localStorage.clear();
};
