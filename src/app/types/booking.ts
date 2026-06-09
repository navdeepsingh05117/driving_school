export type BookingStatus = 'New' | 'Called' | 'Emailed' | 'Confirmed' | 'Cancelled';

export interface BookingRow {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  course: string;
  preferred_datetime: string;
  message: string | null;
  status: BookingStatus;
  admin_note: string | null;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  course: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  status: BookingStatus;
  adminNote: string;
  createdAt: string;
  updatedAt: string;
}

export type BookingFormValues = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  course: string;
  preferredDateTime: string;
  message: string;
  status: BookingStatus;
  adminNote: string;
};
