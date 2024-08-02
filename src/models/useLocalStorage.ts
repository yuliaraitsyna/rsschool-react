import React from "react";

function useLocalStorage(key: string, defaultValue: string): [string, (value: string) => void] {
    const isClient = typeof window !== "undefined";

    const [value, setValue] = React.useState<string>(() => {
        if (isClient) {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : defaultValue;
        }
        return defaultValue;
    });

    React.useEffect(() => {
        if (isClient) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.error(`Error setting localStorage key "${key}":`, error);
            }
        }
    }, [key, value, isClient]);

    React.useEffect(() => {
        return () => {
            if (isClient) {
                localStorage.setItem(key, JSON.stringify(value));
            }
        };
    }, [key, value, isClient]);

    return [value, setValue];
}

export default useLocalStorage;
