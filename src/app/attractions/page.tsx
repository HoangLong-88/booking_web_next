import { AttractionsSearchBar } from "@/component/ui/SearchBar";
import { HeroAttractionsPage } from "@/component/layout/Hero";
import { DestinationsLoadMore } from "@/component/ui/LoadMorePattern";

export default function AttractionsPage() {
  return (
    <>
      <header className="mt-[var(--spacing-top)] ">
        <HeroAttractionsPage />
        <AttractionsSearchBar />
      </header>
      <main className="p-20">
        <p className="text-2xl mt-[100px] mb-5 font-bold">
          Nearby Destinations
        </p>
        <DestinationsLoadMore />
        <div className="mt-[var(--spacing-top)]">
          <p className="text-2xl font-bold">Popular activites options</p>
          <p className="text-stone-500">Explore more things to do</p>
        </div>
      </main>
    </>
  );
}
