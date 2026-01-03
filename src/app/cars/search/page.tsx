'use client'
import { HeroHomePage } from "@/component/layout/Hero";
import { CarsListSearch } from "../component/carsCardList";
import { getCarsFromSearching } from "../hook/useCarsListSearch";
import { DuelDateSearchBar } from "@/component/custom/searchBar/CustomSearchBar";


export default function SearchStaysPage() {
    const {location, checkin, checkout, isLoading, results, error} = getCarsFromSearching();
    return (
        <>
            <header className="mt-[var(--spacing-top)]">
                <HeroHomePage />
                <DuelDateSearchBar service={`cars`} />
            </header>
            <main className="px-20 py-5 ">
                <CarsListSearch
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
