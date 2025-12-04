import { StaysList } from "@/component/layout/CustomCardsList";
import { HomeSearchBar } from "@/component/layout/CustomSearchBar";
import { HeroHomePage } from "@/component/layout/Hero";

export default function StaysPage() {
  return (
    <>
      <header className="mt-[var(--spacing-top)]">
        <HeroHomePage />
        <HomeSearchBar />
      </header>
      <main className="px-20 py-3">
        <StaysList/>
      </main>
    </>
  )
}