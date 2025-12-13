import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/component/ui/Dialog"
import { useModal } from "@/utils/dom/useModal";
import type { Location } from "@/types/location";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CustomButton } from "../ui/Button";
import DragAndDropUpload from "../ui/DragAndDropUpload";
import { useUpdateLocations } from "@/app/admin/hook/useUpdateLocation";
import { useEffect } from "react";
import CountryPinCodeSelector from "../admin/countryPinCodeSelector";

interface Props {
  open: boolean;
  onClose: () => void;
  loc: Location;
}

export default function UpdateLocationModal({
  open,
  onClose,
  loc,
}: Props) {
    const { locations, loading, error, initialize ,updateLocation, updateLocationImage, submit } = useUpdateLocations()
    useEffect(() => {
    if (open && loc) {
      initialize([loc]); // hook does the mapping
    }
  }, [open, loc]);
  if (!open) return null;
  const current = locations[0];
  if (!current) return null;
  
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle onClose={onClose}>
            Update Location
          </DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-4"
          onSubmit={(e) => {
          e.preventDefault();
          submit().then(onClose);
        }}
        >
            {/* Location Name */}
            <div className="relative">
                <Input
                id="locationName"
                name="locationName"
                type="text"
                defaultValue={current.locationName}
                placeholder=""
                onChange={(e) => 
                  updateLocation(current.id, {
                  locationName: e.target.value,
                })
                }
                />
                <Label htmlFor="locationName">
                Location Name
                </Label>
            </div>

            {/* Address */}
            <div className="relative">
                <Input
                id="address"
                name="address"
                type="text"
                defaultValue={current.address}
                placeholder=""
                onChange={(e) =>
                  updateLocation(current.id, {
                    address: e.target.value,
                  })
                }
                />
                <Label htmlFor="address">
                Address
                </Label>
            </div>

            {/* Country */}
            <div className="relative">
                <CountryPinCodeSelector 
                  country={current.country}
                  pinCode={current.pinCode}
                  onChange={(country, pinCode) =>
                    { updateLocation(current.id, {
                    country,
                    pinCode,
                  })}
                  }
                />
            </div>
            <div className="relative">
                <DragAndDropUpload 
                    havingImagePreview={false}
                    onUpload={(file) =>{ updateLocationImage(current.id, file)}}
                    fileName={current.fileName}
                />
            </div>

            {/* Submit */}
            <div className="relative flex flex-row gap-2 ">
                <CustomButton
                    variant={'default'}
                    type="submit"
                    className=""
                >
                    Save
                </CustomButton>
                <CustomButton
                    variant={'secondary'}
                    className=""
                >
                    Delete Location
                </CustomButton>
            </div>
            </form>
      </DialogContent>
    </Dialog>
  );
}