import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../../utils/supabase';
import { Booking, BookingFormValues, BookingRow, BookingStatus } from '../types/booking';
import { StatCard } from '../components/StatCard';
import { BookingCard } from '../components/BookingCard';
import { BookingDetailModal } from '../components/BookingDetailModal';
import { BookingEditModal } from '../components/BookingEditModal';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  Users,
  Clock,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  ChevronDown,
  LogOut,
  Trash2,
  Plus,
  RefreshCw,
} from 'lucide-react';

const toBooking = (row: BookingRow): Booking => {
  const preferredDate = new Date(row.preferred_datetime);

  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    address: row.address || '',
    course: row.course,
    preferredDate: row.preferred_datetime,
    preferredTime: preferredDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    message: row.message || '',
    status: row.status,
    adminNote: row.admin_note || '',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};

const toDateTimeLocal = (value: string) => {
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

const toFormValues = (booking: Booking): BookingFormValues => ({
  fullName: booking.fullName,
  email: booking.email,
  phone: booking.phone,
  address: booking.address,
  course: booking.course,
  preferredDateTime: toDateTimeLocal(booking.preferredDate),
  message: booking.message,
  status: booking.status,
  adminNote: booking.adminNote,
});

const toBookingPayload = (values: BookingFormValues) => ({
  full_name: values.fullName.trim(),
  email: values.email.trim().toLowerCase(),
  phone: values.phone.trim(),
  address: values.address.trim(),
  course: values.course.trim(),
  preferred_datetime: new Date(values.preferredDateTime).toISOString(),
  message: values.message.trim() || null,
  status: values.status,
  admin_note: values.adminNote.trim() || null,
});

export function AdminDashboard() {
  const navigate = useNavigate();
  const { logout, sessionToken } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'All'>('All');
  const [courseFilter, setCourseFilter] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchBookings = async (isManualRefresh = false) => {
    setError('');
    if (isManualRefresh) setIsRefreshing(true);

    if (!isSupabaseConfigured || !sessionToken) {
      setError('Admin session is not active. Please log in again.');
      setBookings([]);
      setIsLoading(false);
      setIsRefreshing(false);
      return;
    }

    const { data, error: fetchError } = await supabase.rpc('admin_list_bookings', {
      session_token: sessionToken,
    });

    if (fetchError) {
      setError(fetchError.message);
      setBookings([]);
    } else {
      setBookings(((data || []) as BookingRow[]).map(toBooking));
    }

    setIsLoading(false);
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchBookings();
  }, [sessionToken]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const handleCreateBooking = async (values: BookingFormValues) => {
    if (!sessionToken) throw new Error('Admin session expired. Please log in again.');

    const payload = toBookingPayload(values);
    const { error: insertError } = await supabase.rpc('admin_create_booking', {
      session_token: sessionToken,
      booking_full_name: payload.full_name,
      booking_email: payload.email,
      booking_phone: payload.phone,
      booking_address: payload.address,
      booking_course: payload.course,
      booking_preferred_datetime: payload.preferred_datetime,
      booking_message: payload.message,
      booking_status: payload.status,
      booking_admin_note: payload.admin_note,
    });
    if (insertError) throw new Error(insertError.message);
    await fetchBookings();
  };

  const handleEditBooking = async (values: BookingFormValues) => {
    if (!editingBooking) return;
    if (!sessionToken) throw new Error('Admin session expired. Please log in again.');

    const payload = toBookingPayload(values);
    const { error: updateError } = await supabase.rpc('admin_update_booking', {
      session_token: sessionToken,
      booking_id: editingBooking.id,
      booking_full_name: payload.full_name,
      booking_email: payload.email,
      booking_phone: payload.phone,
      booking_address: payload.address,
      booking_course: payload.course,
      booking_preferred_datetime: payload.preferred_datetime,
      booking_message: payload.message,
      booking_status: payload.status,
      booking_admin_note: payload.admin_note,
    });

    if (updateError) throw new Error(updateError.message);
    setEditingBooking(null);
    await fetchBookings();
  };

  const handleUpdateStatus = async (bookingId: string, status: BookingStatus) => {
    if (!sessionToken) {
      setError('Admin session expired. Please log in again.');
      return;
    }

    const { error: updateError } = await supabase.rpc('admin_update_booking_status', {
      session_token: sessionToken,
      booking_id: bookingId,
      booking_status: status,
    });

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, status, updatedAt: new Date().toISOString() }
          : b
      )
    );
    if (selectedBooking?.id === bookingId) {
      setSelectedBooking((prev) => prev ? { ...prev, status } : null);
    }
  };

  const handleUpdateNote = async (bookingId: string, note: string) => {
    if (!sessionToken) {
      setError('Admin session expired. Please log in again.');
      return;
    }

    const { error: updateError } = await supabase.rpc('admin_update_booking_note', {
      session_token: sessionToken,
      booking_id: bookingId,
      booking_admin_note: note.trim() || null,
    });

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, adminNote: note, updatedAt: new Date().toISOString() }
          : b
      )
    );
    if (selectedBooking?.id === bookingId) {
      setSelectedBooking((prev) => prev ? { ...prev, adminNote: note } : null);
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to delete this booking request?')) return;
    if (!sessionToken) {
      setError('Admin session expired. Please log in again.');
      return;
    }

    const { error: deleteError } = await supabase.rpc('admin_delete_booking', {
      session_token: sessionToken,
      booking_id: bookingId,
    });

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  const stats = useMemo(() => {
    const total = bookings.length;
    const newRequests = bookings.filter((b) => b.status === 'New').length;
    const called = bookings.filter((b) => b.status === 'Called').length;
    const emailed = bookings.filter((b) => b.status === 'Emailed').length;
    const confirmed = bookings.filter((b) => b.status === 'Confirmed').length;
    const pending = bookings.filter((b) => b.status !== 'Confirmed' && b.status !== 'Cancelled').length;

    return { total, newRequests, called, emailed, confirmed, pending };
  }, [bookings]);

  const courses = useMemo(() => {
    const uniqueCourses = Array.from(new Set(bookings.map((b) => b.course))).filter(Boolean);
    return ['All', ...uniqueCourses];
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const filtered = bookings.filter((booking) => {
      const matchesSearch =
        !query ||
        booking.fullName.toLowerCase().includes(query) ||
        booking.email.toLowerCase().includes(query) ||
        booking.phone.toLowerCase().includes(query) ||
        booking.course.toLowerCase().includes(query);

      const matchesStatus = statusFilter === 'All' || booking.status === statusFilter;
      const matchesCourse = courseFilter === 'All' || booking.course === courseFilter;

      return matchesSearch && matchesStatus && matchesCourse;
    });

    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [bookings, searchQuery, statusFilter, courseFilter, sortOrder]);

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-700';
      case 'Called':
        return 'bg-purple-100 text-purple-700';
      case 'Emailed':
        return 'bg-yellow-100 text-yellow-700';
      case 'Confirmed':
        return 'bg-green-100 text-green-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl text-gray-900 truncate">Saini Driving School</h1>
              <p className="text-xs sm:text-sm text-gray-600">Admin Dashboard</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl text-gray-900">Dashboard Overview</h2>
            <button
              onClick={() => fetchBookings(true)}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 transition-transform duration-500 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {!isLoading && (
              <>
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: '0ms', animationFillMode: 'backwards' }}>
                  <StatCard title="Total Requests" value={stats.total} icon={Users} color="text-blue-600" />
                </div>
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: '50ms', animationFillMode: 'backwards' }}>
                  <StatCard title="New Requests" value={stats.newRequests} icon={AlertCircle} color="text-orange-600" />
                </div>
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
                  <StatCard title="Called Users" value={stats.called} icon={Phone} color="text-purple-600" />
                </div>
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: '150ms', animationFillMode: 'backwards' }}>
                  <StatCard title="Emailed Users" value={stats.emailed} icon={Mail} color="text-yellow-600" />
                </div>
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}>
                  <StatCard title="Confirmed Bookings" value={stats.confirmed} icon={CheckCircle} color="text-green-600" />
                </div>
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: '250ms', animationFillMode: 'backwards' }}>
                  <StatCard title="Pending Requests" value={stats.pending} icon={Clock} color="text-gray-600" />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h2 className="text-lg sm:text-xl text-gray-900">Booking Requests</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCreating(true)}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Request
                </button>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone, or course..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-col sm:flex-row gap-3`}>
                <div className="relative flex-1 sm:flex-none">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as BookingStatus | 'All')}
                    className="w-full pl-9 pr-8 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none cursor-pointer"
                  >
                    <option value="All">All Status</option>
                    <option value="New">New</option>
                    <option value="Called">Called</option>
                    <option value="Emailed">Emailed</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                <div className="relative flex-1 sm:flex-none">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <select
                    value={courseFilter}
                    onChange={(e) => setCourseFilter(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none cursor-pointer"
                  >
                    {courses.map((course) => (
                      <option key={course} value={course}>
                        {course === 'All' ? 'All Courses' : course}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                <button
                  onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                  className="w-full sm:w-auto px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
                >
                  {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
                </button>
              </div>
            </div>
          </div>

          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Preferred Date</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12">
                      <LoadingSpinner size="md" text="Loading booking requests..." />
                    </td>
                  </tr>
                ) : filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500 animate-in fade-in duration-300">No booking requests found</td>
                  </tr>
                ) : (
                  filteredBookings.map((booking, index) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-gray-50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
                      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{booking.id.slice(0, 8)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.fullName}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{booking.email}</div>
                        <div className="text-sm text-gray-500">{booking.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.course}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{new Date(booking.preferredDate).toLocaleDateString()}</div>
                        <div className="text-sm text-gray-500">{booking.preferredTime}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <a href={`tel:${booking.phone}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Call">
                            <Phone className="w-4 h-4" />
                          </a>
                          <a href={`mailto:${booking.email}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Email">
                            <Mail className="w-4 h-4" />
                          </a>
                          <button onClick={() => setSelectedBooking(booking)} className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            View
                          </button>
                          <button onClick={() => setEditingBooking(booking)} className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                            Edit
                          </button>
                          <button onClick={() => handleDeleteBooking(booking.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden p-4 space-y-4">
            {isLoading ? (
              <div className="py-12">
                <LoadingSpinner size="md" text="Loading booking requests..." />
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="py-12 text-center text-gray-500 animate-in fade-in duration-300">No booking requests found</div>
            ) : (
              filteredBookings.map((booking, index) => (
                <div
                  key={booking.id}
                  className="space-y-2 animate-in fade-in slide-in-from-bottom-3"
                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
                >
                  <BookingCard
                    booking={booking}
                    onViewDetails={setSelectedBooking}
                    onDelete={handleDeleteBooking}
                    getStatusColor={getStatusColor}
                  />
                  <button
                    onClick={() => setEditingBooking(booking)}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Edit
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 text-xs sm:text-sm text-gray-600">
            Showing {filteredBookings.length} of {bookings.length} requests
          </div>
        </div>
      </main>

      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onUpdateStatus={handleUpdateStatus}
          onUpdateNote={handleUpdateNote}
        />
      )}

      {isCreating && (
        <BookingEditModal
          title="Add Booking Request"
          onClose={() => setIsCreating(false)}
          onSubmit={handleCreateBooking}
        />
      )}

      {editingBooking && (
        <BookingEditModal
          title="Edit Booking Request"
          initialValues={toFormValues(editingBooking)}
          onClose={() => setEditingBooking(null)}
          onSubmit={handleEditBooking}
        />
      )}
    </div>
  );
}
