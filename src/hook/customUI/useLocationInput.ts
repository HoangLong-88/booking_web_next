import { useEffect, useRef, useState } from "react";
import useDebounce from "../useDebounce";

export const getLocationInput = (onChange?: (value: string) => void) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const debouncedQuery = useDebounce(query, 200);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Fetch suggestions
    useEffect(() => {
        const getSuggest = async () => {
            if (!debouncedQuery) {
                setSuggestions([]);
                return;
            }

            const res = await fetch(`/api/keywords?q=${encodeURIComponent(debouncedQuery)}`);
            const data: string[] = await res.json();
            setSuggestions(data);
            setIsOpen(true);
        };

        getSuggest();
    }, [debouncedQuery]);

    useEffect(() => {
    }, [suggestions]);

    useEffect(() => {
    }, [isOpen]);

    // Close outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        onChange?.(e.target.value);
    };

    const handleSelect = (value: string) => {
        setQuery(value);
        setIsOpen(false);
        onChange?.(value);
    };

    return ({ query, suggestions, isOpen, wrapperRef, setIsOpen, handleInputChange, handleSelect })
}