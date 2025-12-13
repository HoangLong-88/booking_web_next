  "use client";
  import { useState } from "react";
  import { CustomButton } from "@/component/ui/Button";
  import { useLocationForm } from "../../hook/useAddLocations";
  import { Label } from "@/component/ui/label";
  import { Input } from "@/component/ui/input";
  import DragAndDropUpload from "@/component/ui/DragAndDropUpload";
  import CountryPinCodeSelector from "@/component/admin/countryPinCodeSelector";
  import { useRef, useEffect } from "react";
  import { SetUpNavbarScroll } from "@/utils/dom/Scroll";
  

  export default function LocationForm() {
    const { state, actions } = useLocationForm();
    const { locations, loading, error } = state;
    const { addLocation, updateField, removeLocation, submit } = actions;
    const [navbarHidden, setNavbarHidden] = useState(false);
    const navbarRef =  useRef<HTMLDivElement>(null)
    

    useEffect(() => {

      if (!navbarRef.current) return; 
      const initialHidden = window.scrollY > 50;
      setNavbarHidden(initialHidden);
      navbarRef.current.style.transform = initialHidden ? 'translateY(-100%)' : 'translateY(0)';
      
      const cleanup = SetUpNavbarScroll(navbarRef.current, setNavbarHidden);

      return () => {
        if (cleanup) cleanup();
      };
    }, []);
    return (
      <div className="relative">
        {/* HEADER + BUTTON */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="space-y-6"
      >
      <div 
      ref={navbarRef}
      className="
        fixed left-0 right-0 z-30 
        bg-white border-b 
        px-4 py-3 
        flex items-center justify-between 
        transition-all duration-300
      " 
      style={{
          top: navbarHidden ? 70 : 90,
          transform: navbarHidden ? 'translateY(-100%)' : 'translateY(0)'
      }}>
        <h2 className="text-lg font-semibold">Location Settings</h2>
        <CustomButton type='submit'>{ loading ? 'loading' : 'Confirm Add'}</CustomButton>
      </div>


        {locations.map((loc, idx) => (
          <div key={idx} className="bg-white rounded-lg p-6 mt-[2.5rem] shadow-sm border">
            <div className="flex flex-row items-center justify-center gap-3">
              <div className="relative w-full">
                <Input
                  id={`locationname-${idx}`}
                  name="locationname"
                  type="text"
                  placeholder={("")}
                  onChange={(e) => updateField(idx, "name", e.target.value)}
                />
                <Label htmlFor={`locationname-${idx}`}>Location Name</Label>
              </div>
              <div className="relative w-full ">
                <Input
                  id={`locationaddress-${idx}`}
                  name="locationaddress"
                  type="text"
                  placeholder={("")}
                  onChange={(e) => updateField(idx, "address", e.target.value)}
                />
                <Label htmlFor={`locationaddress-${idx}`}>Location Address </Label>
              </div>
            </div>
            <DragAndDropUpload 
              variant="location"
              className="mt-3"
              accept="image/*"
              onUpload={(file) => {
                updateField(idx, "image", file);
              }}
              preview={loc.preview}
              fileName={loc.fileName}
            />
            
            <CountryPinCodeSelector 
            className="mt-3"
               onChange={(country, pinCode) => {
                  updateField(idx, "country", country);
                  updateField(idx, "pinCode", pinCode);
                }}
            />
            <p>{error}</p>
            {idx > 0 && (
              <div className="mt-4 text-right">
                <button type="button" onClick={() => removeLocation(idx)} className="text-sm text-red-600">
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}

        <div className="flex items-center gap-4">
          <button type="button" onClick={() => {addLocation()}} className="text-indigo-600 flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M12 4v16M4 12h16"/></svg>
            Add another location
          </button>
        </div>

        <div className="pt-6">
          <label className="inline-flex items-center gap-3">
            <input type="checkbox" checked={false} readOnly className="form-checkbox" />
            <span className="text-sm text-gray-600">Notify me about related locations</span>
          </label>
        </div>
        
      </form>
      </div>
    );
  }