'use client'
import { HeroAttractionsPage } from "@/component/layout/Hero";
import { AttractionSearchList } from "../component/attractionsCardList";
import { getAttractionsFromSearching } from "../hook/useAttractionListSearch";
import { SingleDateSearchBar } from "@/component/custom/searchBar/CustomSearchBar";


export default function SearchStaysPage() {
    const {location, checkdate, isLoading, results, error} = getAttractionsFromSearching();
    return (
        <>
            <header className="mt-[var(--spacing-top)]">
                <HeroAttractionsPage />
                <SingleDateSearchBar service={`attractions`}/>
            </header>
            <main className="px-50">
                <AttractionSearchList
                    location={location}
                    checkdate={checkdate}
                    isLoading={isLoading}
                    results={results}
                    error={error}
                />
            </main>
        </>
    );
}