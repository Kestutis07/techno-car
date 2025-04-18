export interface Car {
  id: string;
  make: string;
  model: string;
  description: string;
  price: number;
  features: string[];
  transmission: string;
  fuelType: string;
  seats: number;
  year: number;
  image: string;
}

export interface Review {
  id: string;
  name: string;
  description: string;
  rating: number;
  date: string;
}
