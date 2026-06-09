import { X, Phone, Mail, Calendar, Clock, MessageSquare, User } from 'lucide-react';
import { Booking, BookingStatus } from '../types/booking';

interface BookingDetailModalProps {
  booking: Booking;
  onClose: () => void;
  onUpdateStatus: (bookingId: string, status: BookingStatus) => void;
  onUpdateNote: (bookingId: string, note: string) => void;
}

export function BookingDetailModal({ booking, onClose, onUpdateStatus, onUpdateNote }: BookingDetailModalProps) {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateStatus(booking.id, e.target.value as BookingStatus);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateNote(booking.id, e.target.value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Clean phone number for tel: protocol (remove formatting)
  const cleanPhoneNumber = (phone: string) => {
    return phone.replace(/\D/g, '');
  };

  // Create email with subject and body
  const createEmailLink = () => {
    const subject = encodeURIComponent(`Booking Inquiry - ${booking.fullName}`);
    const body = encodeURIComponent(
      `Hello ${booking.fullName},\n\nThank you for your interest in Saini Driving School!\n\nRegarding your booking request for: ${booking.course}\n\nBest regards,\nSaini Driving School Team`
    );
    return `mailto:${booking.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-0 sm:p-4 z-50 animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-white sm:rounded-2xl max-w-2xl w-full h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto animate-in zoom-in-95 slide-in-from-bottom-4 duration-300" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between sm:rounded-t-2xl z-10">
          <h2 className="text-lg sm:text-xl text-gray-900">Booking Request Details</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Request ID</p>
                <p className="text-base text-gray-900 font-medium">#{booking.id.slice(0, 8)}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Submitted</p>
                <p className="text-base text-gray-900 font-medium">{formatDate(booking.createdAt)}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-5">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Contact Information</h3>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1.5">Full Name</p>
                <p className="text-base text-gray-900">{booking.fullName}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 mb-1.5">Address / Location</p>
                <p className="text-base text-gray-900">{booking.address}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1.5">Email Address</p>
                  <a
                    href={createEmailLink()}
                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 hover:underline break-all"
                    title="Click to send email"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="break-all">{booking.email}</span>
                  </a>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1.5">Phone Number</p>
                  <a
                    href={`tel:+1${cleanPhoneNumber(booking.phone)}`}
                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 hover:underline"
                    title="Click to call"
                  >
                    <Phone className="w-4 h-4" />
                    {booking.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-5">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Booking Details</h3>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1.5">Selected Course</p>
                <p className="text-base text-gray-900">{booking.course}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1.5">Preferred Date</p>
                  <div className="flex items-center gap-2 text-base text-gray-900">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(booking.preferredDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1.5">Preferred Time</p>
                  <div className="flex items-center gap-2 text-base text-gray-900">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {booking.preferredTime}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {booking.message && (
            <div className="border-t-2 border-gray-300 pt-5">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Customer Message</h3>
              <div className="bg-gray-50 border-l-4 border-gray-400 rounded-r-lg p-4">
                <div className="flex gap-3">
                  <MessageSquare className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <p className="text-base text-gray-700 leading-relaxed">"{booking.message}"</p>
                </div>
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 pt-5">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Admin Actions</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="status" className="block text-xs font-medium text-gray-700 mb-2">
                  Update Status
                </label>
                <select
                  id="status"
                  value={booking.status}
                  onChange={handleStatusChange}
                  className="w-full px-4 py-2.5 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="New">New</option>
                  <option value="Called">Called</option>
                  <option value="Emailed">Emailed</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label htmlFor="adminNote" className="block text-xs font-medium text-gray-700 mb-2">
                  Internal Notes
                </label>
                <textarea
                  id="adminNote"
                  value={booking.adminNote}
                  onChange={handleNoteChange}
                  placeholder="Add internal notes (not visible to customer)..."
                  rows={4}
                  className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2 pb-safe border-t border-gray-200">
            <a
              href={`tel:+1${cleanPhoneNumber(booking.phone)}`}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              title={`Call ${booking.fullName} at ${booking.phone}`}
            >
              <Phone className="w-4 h-4" />
              Call Customer
            </a>
            <a
              href={createEmailLink()}
              className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              title={`Email ${booking.fullName} at ${booking.email}`}
            >
              <Mail className="w-4 h-4" />
              Send Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
