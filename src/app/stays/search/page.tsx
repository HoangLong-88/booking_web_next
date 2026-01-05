'use client'
import { StayListSearch } from "@/component/layout/CustomCardsList";
import { StaySearchBar } from "@/component/home/StaySearchBar";
import { HeroHomePage } from "@/component/layout/Hero";


export default function SearchStaysPage() {
    return (
        <>
            <header className="mt-[var(--spacing-top)]">
                <HeroHomePage />
                <StaySearchBar />
            </header>
            <main className="px-20 py-10">
                <StayListSearch/>
            </main>
        </>
    );
}