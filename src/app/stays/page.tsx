import { DuelDateSearchBar } from "@/component/custom/searchBar/CustomSearchBar";
import { HeroHomePage } from "@/component/layout/Hero";
import { StaysList } from "./component/staysCardList";
import { getAllStay } from "./hook/useStaysListSearch";

export default function StaysPage() {
  const {stays} = getAllStay();
  return (
    <>
      <header className="mt-[var(--spacing-top)]">
        <HeroHomePage />
        <DuelDateSearchBar service={`stays`} />
      </header>
      <main className="px-20 py-10">
        <StaysList stays={stays}/>
      </main>
    </>
  )
}