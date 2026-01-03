'use client'
import { HeroHomePage } from "@/component/layout/Hero";
import { StayListSearch } from "../component/staysCardList";
import { getStaysFromSearching } from "../hook/useStaysListSearch";
import { DuelDateSearchBar } from "@/component/custom/searchBar/CustomSearchBar";


export default function SearchStaysPage() {
    const {location, checkin, checkout, isLoading, results, error} = getStaysFromSearching();
    return (
        <>
            <header className="mt-[var(--spacing-top)]">
                <HeroHomePage />
                <DuelDateSearchBar />
            </header>
            <main className="px-20 py-10">
                <StayListSearch 
                    location={location}
                    checkin={checkin}
                    checkout={checkout}
                    isLoading={isLoading}
                    results={results}
                    error={error}
                />
            </main>
        </>
    );
}