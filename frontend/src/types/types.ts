export interface Car {
  _id: string;
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
  _id: string;
  name: string;
  description: string;
  rating: number;
  date: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Reservation {
  _id: string;
  carId: string;
  userId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  car: {
    _id: string;
    make: string;
    model: string;
    image: string;
  };
}

export interface AdminReservation {
  _id: string;
  car: Car;
  startDate: string;
  endDate: string;
  totalPrice: number;
  createdAt: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}
