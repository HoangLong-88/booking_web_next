import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/component/ui/Card";
import { CustomButton } from "@/component/ui/Button";
import { Loader2 } from "lucide-react";
import { useFetchLocation } from "../../hook/useFetchLocation";
import TagsArrowScroll from "@/component/ui/TagScroll";
import { useModal } from "@/utils/dom/useModal";
import UpdateLocationModal from "@/component/modal/location_update";
import type { Location } from "@/types/location";

interface Props {
  location: Location[];
  refreshKey: number;
}

export default function LocationList({location}: Props) {
    const { locations, loading, error, refetch } = useFetchLocation();
    const { isOpen, open, close } = useModal(); 
    const [selectedLoc, setSelectedLoc] = useState<Location | null>(null);
   if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Failed to load locations {error}</p> ;
  }

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-3">Locations</h2>
      <TagsArrowScroll scrollAmount={400}>
          {locations.map((loc) => (
          <Card
            key={loc.id}
            className="min-w-[280px] w-[280px] flex-none rounded-xl border shadow-sm"
            onClick={() => {open(); setSelectedLoc(loc)}}
          >
            <img
              src={loc.image_url ?? "/no-image.jpg"}
              alt={loc.name}
              className="w-full h-36 object-cover rounded-t-xl"
            />

            <CardContent className="p-4 flex flex-col gap-1">
              <h3 className="text-lg font-semibold">{loc.name}</h3>
              <p className="text-sm text-gray-600">{loc.address}</p>
              <p className="text-sm text-gray-600">{loc.country}</p>
              <p className="text-sm text-gray-600">Pin: {loc.pinCode}</p>
            </CardContent>
          </Card>
        ))}
      </TagsArrowScroll>
       {selectedLoc && (
        <UpdateLocationModal
          open={isOpen}
          onClose={() => {close(); refetch();}} 
          loc={selectedLoc}
        />
      )}
    </div>
  );
}
