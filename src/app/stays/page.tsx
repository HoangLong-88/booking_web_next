'use client'
import { StaysList } from "@/component/layout/CustomCardsList";
import { StaySearchBar } from "@/component/home/StaySearchBar";
import { HeroHomePage } from "@/component/layout/Hero";

export default function StaysPage() {
  return (
    <>
      <header className="mt-[var(--spacing-top)]">
        <HeroHomePage />
        <StaySearchBar />
      </header>
      <main className="px-20 py-10">
        <StaysList/>
      </main>
    </>
  )
}