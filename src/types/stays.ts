import type { Review } from "./review";
export interface StayObject {
    stayName: string;
    address: string;
    rating: string;
    price: string;
    image?: string[];
    days?: number;
    totalPrice?: number; 
}


export interface StayFormData {
  locationID: string
  serviceID: string
  categoryID: string

  stayName: string
  description?: string | null
  address?: string | null

  price: number | string
  rate?: number | string | null

  image?: string[]
}
export interface LocationOption {
  locationID: string
  locationName: string
}

export interface CategoryOption {
  categoryID: string
  categoryName: string
}

export interface StayFormOptions {
  locations: LocationOption[]
  categories: CategoryOption[]
}
export interface StayDetail {
  stayID: string;
  serviceID: string;
  stayName: string;
  description: string | null;
  address: string;
  rating: number | null;
  price: string;
  image_urls: string[];
  location: string;
  service: string;
  category: string;
  reviews?: Review[];  
}

export interface StayHome {
  stayID: string;
  stayName: string;
  address: string;
  rating: number | null;
  price: string;
  images: string[];
}
export interface StayHomeApi {
  stayID: string;
  stayName: string;
  location: string;
  address: string;
  rating: number | null;
  price: string;
  image_url: string[]; 
}
