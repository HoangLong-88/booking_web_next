export interface AttractionObject{
    attractionName: string;
    specificType: string;
    category: string;
    duration: string;
    rate: string;
    price: string;
    image: string;
}

export type AttractionSuggestion = {
  attractionName: string;
  categoryName: string;
  locationName: string;
  country: string;
};