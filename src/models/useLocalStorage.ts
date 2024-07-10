import React from "react";

function useLocalStorage(key: string, defaultValue: string): [string, (value: string) => void] {
    const [value, setValue] = React.useState<string>(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    });

    React.useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, value]);

    React.useEffect(() => {
        return () => {
            localStorage.setItem(key, JSON.stringify(value));
        };
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;
