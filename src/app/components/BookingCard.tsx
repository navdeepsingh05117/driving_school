import { Phone, Mail, Trash2, Calendar, Clock } from 'lucide-react';
import { Booking, BookingStatus } from '../types/booking';

interface BookingCardProps {
  booking: Booking;
  onViewDetails: (booking: Booking) => void;
  onDelete: (bookingId: string) => void;
  getStatusColor: (status: BookingStatus) => string;
}

export function BookingCard({ booking, onViewDetails, onDelete, getStatusColor }: BookingCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-base text-gray-900 mb-1">{booking.fullName}</h3>
          <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(booking.status)}`}>
            {booking.status}
          </span>
        </div>
        <span className="text-xs text-gray-500">#{booking.id}</span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="text-sm text-gray-600">
          <a href={`mailto:${booking.email}`} className="text-blue-600 hover:underline">
            {booking.email}
          </a>
        </div>
        <div className="text-sm text-gray-600">
          <a href={`tel:${booking.phone}`} className="text-blue-600 hover:underline">
            {booking.phone}
          </a>
        </div>
        <div className="text-sm text-gray-900 pt-2 border-t border-gray-100">
          <span className="text-gray-600">Course:</span> {booking.course}
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(booking.preferredDate).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {booking.preferredTime}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <a
          href={`tel:${booking.phone}`}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Phone className="w-4 h-4" />
          Call
        </a>
        <a
          href={`mailto:${booking.email}`}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Mail className="w-4 h-4" />
          Email
        </a>
        <button
          onClick={() => onViewDetails(booking)}
          className="px-4 py-2 bg-blue-50 text-blue-600 text-sm rounded-lg hover:bg-blue-100 transition-colors"
        >
          View
        </button>
        <button
          onClick={() => onDelete(booking.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
