'use client'
import { useEffect, useState } from "react";
import { StayCard } from "../ui/Card";


function StaysList() {
    const [stays, setStays] = useState([]);

    useEffect(() => {
        const fetchStays = async () => {
            const res = await fetch('/api/stays/all');
            const json = await res.json();
            setStays(json)
        };
        fetchStays();
    }, []);
    return (
        <div>
            {stays.map((stay, i) => (
                <StayCard key={i} stay={stay} />
            ))}
        </div>
    );
}

export {StaysList};