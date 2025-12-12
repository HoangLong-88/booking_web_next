export const locationService = {
  async fetchLocations() {
    const res = await fetch('/api/admin/locations/get', {
      method: 'GET',
    });
    return res.json();
  },

  async updateLocation(data: {
    id: string;
    locationName: string;
    address: string;
    country: string;
    pinCode: string;
    oldImagePath: string;
    image?: File;
  }) {
    const res = await fetch('/api/admin/locations/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async addLocation(formData: FormData) {
    const res = await fetch("/api/admin/locations/add", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Failed to add location");
    }

    return res.json();
  }
};