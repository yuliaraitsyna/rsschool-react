import React from "react";

function useLocalStorage(key: string, defaultValue: string): [string, (value: string) => void] {
    const [value, setValue] = React.useState<string>(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    });

    React.useEffect(() => {
        return () => {
            localStorage.setItem(key, JSON.stringify(value));
        };
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;
