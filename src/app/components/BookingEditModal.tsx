import { useState } from 'react';
import { X } from 'lucide-react';
import { BookingFormValues, BookingStatus } from '../types/booking';

const statuses: BookingStatus[] = ['New', 'Called', 'Emailed', 'Confirmed', 'Cancelled'];

const emptyValues: BookingFormValues = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  course: '',
  preferredDateTime: '',
  message: '',
  status: 'New',
  adminNote: '',
};

interface BookingEditModalProps {
  initialValues?: BookingFormValues;
  title: string;
  onClose: () => void;
  onSubmit: (values: BookingFormValues) => Promise<void>;
}

export function BookingEditModal({ initialValues, title, onClose, onSubmit }: BookingEditModalProps) {
  const [values, setValues] = useState<BookingFormValues>(initialValues || emptyValues);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setError('');
    setValues((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      await onSubmit(values);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save booking.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-0 sm:p-4 z-50 animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-white sm:rounded-2xl max-w-2xl w-full h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto animate-in zoom-in-95 slide-in-from-bottom-4 duration-300" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between sm:rounded-t-2xl z-10">
          <h2 className="text-lg sm:text-xl text-gray-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="space-y-2">
              <span className="block text-xs sm:text-sm text-gray-700">Full Name</span>
              <input name="fullName" value={values.fullName} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </label>

            <label className="space-y-2">
              <span className="block text-xs sm:text-sm text-gray-700">Phone</span>
              <input name="phone" value={values.phone} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </label>
          </div>

          <label className="space-y-2 block">
            <span className="block text-xs sm:text-sm text-gray-700">Email</span>
            <input name="email" type="email" value={values.email} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </label>

          <label className="space-y-2 block">
            <span className="block text-xs sm:text-sm text-gray-700">Address / Location</span>
            <textarea name="address" value={values.address} onChange={handleChange} required rows={2} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none" />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="space-y-2">
              <span className="block text-xs sm:text-sm text-gray-700">Course</span>
              <input name="course" value={values.course} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </label>

            <label className="space-y-2">
              <span className="block text-xs sm:text-sm text-gray-700">Preferred Date and Time</span>
              <input name="preferredDateTime" type="datetime-local" value={values.preferredDateTime} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </label>
          </div>

          <label className="space-y-2 block">
            <span className="block text-xs sm:text-sm text-gray-700">Status</span>
            <select name="status" value={values.status} onChange={handleChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </label>

          <label className="space-y-2 block">
            <span className="block text-xs sm:text-sm text-gray-700">Message</span>
            <textarea name="message" value={values.message} onChange={handleChange} rows={3} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none" />
          </label>

          <label className="space-y-2 block">
            <span className="block text-xs sm:text-sm text-gray-700">Admin Notes</span>
            <textarea name="adminNote" value={values.adminNote} onChange={handleChange} rows={3} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none" />
          </label>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm animate-in fade-in slide-in-from-top-2 duration-300">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={isSaving} className="flex-1 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {isSaving ? (
                <div className="flex items-center gap-2 animate-in fade-in duration-300">
                  <div className="w-5 h-5 relative">
                    <div className="absolute inset-0 rounded-full border-2 border-white/30"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                  </div>
                  <span>Saving...</span>
                </div>
              ) : (
                'Save Booking'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
