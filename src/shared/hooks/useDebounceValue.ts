import { useEffect, useState } from 'react';

export default function useDebounceValue(value: any, duration = 500) {
    const [debounceValue, setDebounceValue] = useState();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceValue(value);
        }, duration);

        return () => clearTimeout(timeout);
    }, [value, duration]);

    return debounceValue;
}
