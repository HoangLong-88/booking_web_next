import { HeroCarPage } from "@/component/layout/Hero";
import { QuestionDropdown } from "@/component/ui/Dropdown";
import { CarSearchBar } from "@/component/ui/SearchBar";

export default function CarsPage() {
  return (
    <>
      <header className="mt-[var(--spacing-top)]">
        <HeroCarPage />
        <CarSearchBar />
      </header>
      <main className="p-20">
          <p className="">...</p>
          <QuestionDropdown/>
      </main>
    </>
  );
}
