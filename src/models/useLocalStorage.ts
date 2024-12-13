import React from "react";

function useLocalStorage(key: string, defaultValue: string): [string, (value: string) => void] {
    const [value, setValue] = React.useState<string>(() => {
        if (typeof window !== "undefined") {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : defaultValue;
        } else {
            return defaultValue;
        }
    });

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.error(`Error setting localStorage key "${key}":`, error);
            }
        }
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;
