'use client'
import { AttractionSearchList } from "@/component/layout/CustomCardsList";
import { AttractionsSearchBar } from "@/component/layout/CustomSearchBar";
import { HeroAttractionsPage } from "@/component/layout/Hero";


export default function SearchStaysPage() {
    return (
        <>
            <header className="mt-[var(--spacing-top)]">
                <HeroAttractionsPage />
                <AttractionsSearchBar />
            </header>
            <main className="px-50">
                <AttractionSearchList/>
            </main>
        </>
    );
}