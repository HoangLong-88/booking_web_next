export const locationService = {
  async fetchLocations() {
    const res = await fetch('/api/admin/locations/get', {
      method: 'GET',
    });
    console.log('fetchLocations response:', res);
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
  async addLocation(data: {
    locationName: string;
    address: string;
    country: string;
    pinCode: string;
    image?: File;
  }) {
    const res = await fetch('/api/admin/locations/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res.json();
  }
};