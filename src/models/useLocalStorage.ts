import React from "react";

function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
    const [value, setValue] = React.useState<T>(() => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : defaultValue;
        }
        catch(error) {
            console.error(`Error parsing localStorage key "${key}":`, error);
            return defaultValue;
        }
    });

    React.useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch(error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }

    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;
