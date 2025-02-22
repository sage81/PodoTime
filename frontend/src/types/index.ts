export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  category: 'regular' | 'vip';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  id: string;
  clientId: string;
  startTime: Date;
  endTime: Date;
  services: Service[];
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  totalPrice: number;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  duration: number; // в хвилинах
  price: number;
} 