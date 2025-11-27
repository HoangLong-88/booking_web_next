'use client'
import Link from 'next/link';
import { KeySearchBar, DateBar } from '../ui/SearchBar';
import { useState } from 'react';
import { searchStays } from '@/services/searchServices';

const HomeSearchBar: React.FC = () => {
  const [location, setLocation] = useState<string>("");
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [stays, setStays] = useState([]);

  const handleSearch = async () => {
    const results = await searchStays({location, checkIn, checkOut });
    setStays(results);
  };

  return (
    <div className="relative left-1/2 -translate-x-1/2 bottom-[40px] z-20 w-[92%] md:w-[85%] max-w-6xl">
      <form className="bg-white rounded-xl shadow-2xl ring-1 ring-black/5 p-3 flex gap-3 items-center border-2 border-orange-300"
        onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>

        <div className="flex grow gap-3">
          <div className="flex grow items-center gap-3 px-4 py-3 rounded-lg hover:border-gray-200 w-72 bg-white">
            <KeySearchBar onChange={setLocation} />
          </div>

          <div className="flex grow items-center gap-3 px-4 py-3 rounded-lg hover:border-gray-200 bg-white">
            <DateBar
              onCheckInChange={setCheckIn}
              onCheckOutChange={setCheckOut}
            />
          </div>
        </div>

        <button 
        type="submit" 
        className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-orange-300
        text-white text-base shadow-md cursor-pointer"
        >
          Tìm kiếm
        </button>
      </form>
    </div>
  );
};



const AttractionsSearchBar: React.FC = () => {
  return (
    <div className="relative left-1/2 -translate-x-1/2 bottom-[40px] z-20 w-[92%] md:w-[85%] max-w-6xl">
      <form className="bg-white rounded-xl shadow-2xl ring-1 ring-black/5 p-3 flex gap-3 items-center border-2 border-orange-300">
        <div className="flex-1 flex items-center gap-3">
          <div className="flex grow items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:border-gray-200 w-72 bg-white">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 11V6a5 5 0 00-10 0v5M7 11h10v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6z" /></svg>
            <KeySearchBar />
          </div>

          <div className="flex grow items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:border-gray-200 bg-white">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z" /></svg>
            <DateBar />
          </div>
        </div>
        <button type="submit" className="px-6 py-3 rounded-lg bg-blue-600 text-white text-base shadow-md grow-0">
          Tìm
        </button>
      </form>
    </div>
  );
};


const CarSearchBar: React.FC = () => {
  return (
    <div className="relative left-1/2 -translate-x-1/2 bottom-[40px] z-20 w-[92%] md:w-[85%] max-w-6xl">
      <form className="bg-white rounded-xl shadow-2xl ring-1 ring-black/5 p-3 flex gap-3 items-center border-2 border-orange-300">
        <div className="flex-1 flex items-center gap-3">
          <div className="flex grow items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:border-gray-200 w-72 bg-white">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 11V6a5 5 0 00-10 0v5M7 11h10v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6z" /></svg>
            <KeySearchBar />
          </div>

          <div className="flex grow items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:border-gray-200 bg-white">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z" /></svg>
            <DateBar />
          </div>
        </div>
        <button type="submit" className="px-6 py-3 rounded-lg bg-blue-600 text-white text-base shadow-md grow-0">
          Tìm
        </button>
      </form>
    </div>
  );
};

export { HomeSearchBar, AttractionsSearchBar, CarSearchBar };