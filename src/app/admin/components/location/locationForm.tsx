"use client";
import { useState } from "react";
import { useLocationForm } from "../../hook/useLocations";

function Radio({ name, checked, onChange, children }: any) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="form-radio" />
      <span>{children}</span>
    </label>
  );
}

export default function LocationForm() {
  const { state, actions } = useLocationForm();
  const { locations, loading, error } = state;
  const { addLocationBlock, updateLocationField, removeLocationBlock, submit } = actions;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="space-y-6"
    >
      {locations.map((loc, idx) => (
        <div key={loc.id} className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex gap-4">
            <input
              value={loc.name}
              onChange={(e) => updateLocationField(idx, "name", e.target.value)}
              placeholder="Location Name"
              className="flex-1 px-4 py-3 border rounded"
            />
            <input
              value={loc.tagsInput}
              onChange={(e) => updateLocationField(idx, "tagsInput", e.target.value)}
              placeholder="Tags (eg. tag1, tag2)"
              className="w-64 px-4 py-3 border rounded"
            />
          </div>

          <div className="mt-6">
            <div className="text-xs text-gray-500 mb-3">LOCATION TYPE</div>
            <div className="flex gap-6 items-center">
              <Radio
                name={`type-${loc.id}`}
                checked={loc.type === "center"}
                onChange={() => updateLocationField(idx, "type", "center")}
              >
                <span className="font-medium">Center Point & Radius</span>
              </Radio>
              <Radio
                name={`type-${loc.id}`}
                checked={loc.type === "region"}
                onChange={() => updateLocationField(idx, "type", "region")}
              >
                <span className="font-medium">City, State, Country, etc.</span>
              </Radio>
            </div>
          </div>

          {loc.type === "center" && (
            <div className="mt-6 space-y-3">
              <label className="block text-sm text-gray-600">Address or Center Point</label>
              <div className="relative">
                <input
                  value={loc.query}
                  onChange={(e) => updateLocationField(idx, "query", e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault();
                  }}
                  placeholder="Search for a location"
                  className="w-full px-4 py-3 border rounded"
                />
                {loc.suggestions.length > 0 && (
                  <ul className="absolute z-20 left-0 right-0 bg-white border rounded mt-1 max-h-48 overflow-auto">
                    {loc.suggestions.map((s) => (
                      <li
                        key={s.place_id}
                        onClick={() => updateLocationField(idx, "selectSuggestion", s)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        {s.display_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex gap-3 items-center">
                <div className="w-28">
                  <label className="text-xs text-gray-500">Radius</label>
                  <input
                    type="number"
                    value={loc.radius}
                    onChange={(e) => updateLocationField(idx, "radius", e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Unit</label>
                  <select
                    value={loc.unit}
                    onChange={(e) => updateLocationField(idx, "unit", e.target.value)}
                    className="px-3 py-2 border rounded"
                  >
                    <option value="km">km</option>
                    <option value="mi">mi</option>
                  </select>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500">Latitude</label>
                    <input
                      value={loc.lat ?? ""}
                      onChange={(e) => updateLocationField(idx, "lat", e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Longitude</label>
                    <input
                      value={loc.lon ?? ""}
                      onChange={(e) => updateLocationField(idx, "lon", e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {idx > 0 && (
            <div className="mt-4 text-right">
              <button type="button" onClick={() => removeLocationBlock(idx)} className="text-sm text-red-600">
                Remove
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="flex items-center gap-4">
        <button type="button" onClick={addLocationBlock} className="text-indigo-600 flex items-center gap-2">
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

      <div className="mt-6">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded text-white bg-pink-500 hover:bg-pink-600 font-semibold"
        >
          {loading ? "Saving..." : "SAVE LOCATION"}
        </button>
        {error && <div className="text-sm text-red-600 mt-3">{error}</div>}
      </div>
    </form>
  );
}