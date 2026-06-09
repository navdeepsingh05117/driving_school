import { useState } from "react";
import {
  Calendar,
  User,
  Phone,
  BookOpen,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Check,
  MapPin,
  Star,
} from "lucide-react";
import {
  supabase,
  isSupabaseConfigured,
} from "../../utils/supabase";
import BookingSuccessModal from "./BookingSuccessModal";

const emptyFormData = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  course: "",
  datetime: "",
  message: "",
};

const courseOptions = [
  {
    value: "Complete Driving Course",
    label: "Complete Driving Course",
  },
];

export default function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(emptyFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showSuccessModal, setShowSuccessModal] =
    useState(false);
  const [validationErrors, setValidationErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    datetime: "",
  });

  const totalSteps = 3;

  const validateFullName = (name: string): string => {
    if (!name.trim()) {
      return "Full name is required";
    }
    if (name.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    if (!/^[a-zA-Z\s'-]+$/.test(name)) {
      return "Name can only contain letters, spaces, hyphens, and apostrophes";
    }
    return "";
  };

  const validateEmail = (email: string): string => {
    if (!email.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePhone = (phone: string): string => {
    if (!phone.trim()) {
      return "Phone number is required";
    }
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, "");
    if (digitsOnly.length !== 10) {
      return "Phone number must be exactly 10 digits";
    }
    return "";
  };

  const validateAddress = (address: string): string => {
    if (!address.trim()) {
      return "Address is required";
    }
    if (address.trim().length < 5) {
      return "Please provide a complete address";
    }
    return "";
  };

  const validateDateTime = (datetime: string): string => {
    if (!datetime) {
      return "Please select a date and time";
    }
    const selectedDate = new Date(datetime);
    const now = new Date();

    if (selectedDate <= now) {
      return "Please select a future date and time";
    }

    // Check if it's within business hours (8 AM - 8 PM)
    const hours = selectedDate.getHours();
    if (hours < 8 || hours >= 20) {
      return "Please select a time between 8:00 AM and 8:00 PM";
    }

    // Check if it's not a Sunday (0 = Sunday)
    if (selectedDate.getDay() === 0) {
      return "We are closed on Sundays. Please select another day";
    }

    return "";
  };

  const validateCurrentStep = (): boolean => {
    const errors = { ...validationErrors };
    let isValid = true;

    if (currentStep === 1) {
      errors.fullName = validateFullName(formData.fullName);
      errors.email = validateEmail(formData.email);
      errors.phone = validatePhone(formData.phone);
      errors.address = validateAddress(formData.address);

      if (
        errors.fullName ||
        errors.email ||
        errors.phone ||
        errors.address
      ) {
        isValid = false;
      }
    } else if (currentStep === 3) {
      errors.datetime = validateDateTime(formData.datetime);
      if (errors.datetime) {
        isValid = false;
      }
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep < totalSteps) {
      setSubmitError("");
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitting(true);
      setSubmitError("");

      if (!isSupabaseConfigured) {
        setIsSubmitting(false);
        setSubmitError(
          "The booking system is not yet configured. Please contact us directly at info@sainidrivingschool.com or call +91 98147 12236 / +91 98554 65008.",
        );
        return;
      }

      const { error } = await supabase.from("bookings").insert({
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        course: formData.course,
        preferred_datetime: new Date(
          formData.datetime,
        ).toISOString(),
        message: formData.message.trim() || null,
        status: "New",
      });

      setIsSubmitting(false);

      if (error) {
        console.error("Booking submission failed:", error);
        setSubmitError(
          "Sorry, your booking could not be submitted. Please try again or contact us directly.",
        );
        return;
      }

      setShowSuccessModal(true);
      setFormData(emptyFormData);
      setCurrentStep(1);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setSubmitError("");
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear validation error for this field
    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    let error = "";

    switch (name) {
      case "fullName":
        error = validateFullName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "address":
        error = validateAddress(value);
        break;
      case "datetime":
        error = validateDateTime(value);
        break;
    }

    setValidationErrors({
      ...validationErrors,
      [name]: error,
    });
  };

  const formatPhoneNumber = (value: string): string => {
    const digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length <= 3) {
      return digitsOnly;
    } else if (digitsOnly.length <= 6) {
      return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`;
    } else {
      return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({
      ...formData,
      phone: formatted,
    });
    setValidationErrors({
      ...validationErrors,
      phone: "",
    });
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setValidationErrors({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      datetime: "",
    });
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.fullName &&
          formData.email &&
          formData.phone &&
          formData.address &&
          !validationErrors.fullName &&
          !validationErrors.email &&
          !validationErrors.phone &&
          !validationErrors.address
        );
      case 2:
        return formData.course;
      case 3:
        return formData.datetime && !validationErrors.datetime;
      default:
        return false;
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 relative overflow-hidden bg-gradient-to-b from-white to-[#F5F5F7] px-4 py-10 sm:px-6 sm:py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-6 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] mb-3 sm:mb-4">
            Book Your Trial Lesson
          </h2>
          <p className="text-base sm:text-xl text-[#6E6E73] max-w-2xl mx-auto leading-relaxed">
            Start with a focused lesson, meet your instructor, and get a clear
            plan for becoming road-test ready.
          </p>
        </div>

        <div className="grid items-start gap-3 sm:gap-7 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:gap-10 xl:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)]">
          <div className="order-1 rounded-[20px] border border-[#DDE7F4] bg-white p-4 shadow-[0_18px_46px_rgba(37,99,235,0.08)] sm:rounded-[22px] sm:p-6 lg:sticky lg:top-24">
            <div className="space-y-3.5 sm:space-y-5">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#2563EB]">
                  Why choose Saini Driving School
                </p>
                <h3 className="text-lg font-semibold leading-tight text-[#1D1D1F] sm:text-2xl">
                  Trusted training for confident drivers.
                </h3>
              </div>

              <div className="grid gap-2 sm:gap-2.5">
                {[
                  { label: "10,000+ Students Trained", showOnMobile: true },
                  { label: "98% Pass Rate", showOnMobile: true },
                  { label: "Certified Instructors", showOnMobile: true },
                  { label: "Modern Training Vehicles", showOnMobile: false },
                  { label: "Flexible Scheduling", showOnMobile: false },
                  { label: "Road Test Preparation", showOnMobile: true },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`items-center gap-2.5 rounded-2xl border border-[#E8EEF6] bg-[#F8FBFF] px-3 py-2.5 sm:flex sm:gap-3 sm:px-3.5 sm:py-3 ${
                      item.showOnMobile ? "flex" : "hidden"
                    }`}
                  >
                    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB] sm:h-7 sm:w-7">
                      <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </span>
                    <span className="text-[13px] font-medium leading-5 text-[#1D1D1F] sm:text-sm">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-[#DBEAFE] bg-[#EFF6FF] px-3 py-1.5 text-xs font-semibold text-[#1D1D1F] sm:px-3.5 sm:py-2 sm:text-sm">
                <Star className="h-3.5 w-3.5 fill-[#2563EB] text-[#2563EB] sm:h-4 sm:w-4" />
                Rated 4.9/5 by Students
              </div>

              <div className="space-y-2 rounded-2xl border border-[#E8EEF6] bg-white px-3.5 py-3 sm:space-y-3 sm:px-4 sm:py-3.5">
                <a
                  href="tel:+919814712236"
                  className="flex items-center gap-2.5 text-xs font-medium text-[#1D1D1F] transition-colors hover:text-[#2563EB] sm:gap-3 sm:text-sm"
                >
                  <Phone className="h-3.5 w-3.5 text-[#2563EB] sm:h-4 sm:w-4" />
                  +91 98147 12236
                </a>
                <div className="flex items-center gap-2.5 text-xs font-medium text-[#1D1D1F] sm:gap-3 sm:text-sm">
                  <MapPin className="h-3.5 w-3.5 text-[#2563EB] sm:h-4 sm:w-4" />
                  Bakarpur, Punjab
                </div>
              </div>
            </div>
          </div>

          <div className="order-2 space-y-3 sm:space-y-7">
            <div>
              <div className="flex items-center justify-between max-w-lg mx-auto">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm transition-all sm:h-12 sm:w-12 sm:text-base ${
                        currentStep >= step
                          ? "bg-gradient-to-br from-[#0071E3] to-[#0051A8] text-white shadow-lg"
                          : "backdrop-blur-xl bg-[rgba(255,255,255,0.72)] border border-[rgba(255,255,255,0.45)] text-[#6E6E73]"
                      }`}
                    >
                      {currentStep > step ? (
                        <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        step
                      )}
                    </div>
                    {step < 3 && (
                      <div
                        className={`mx-1.5 h-0.5 w-8 rounded-full transition-all sm:mx-2 sm:h-1 sm:w-20 md:w-28 ${
                          currentStep > step
                            ? "bg-gradient-to-r from-[#0071E3] to-[#0051A8]"
                            : "bg-[rgba(0,0,0,0.1)]"
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between max-w-lg mx-auto mt-2 px-1 sm:mt-3">
                <span className="text-[11px] text-[#6E6E73] sm:text-xs">
                  Personal Info
                </span>
                <span className="text-[11px] text-[#6E6E73] sm:text-xs">
                  Course
                </span>
                <span className="text-[11px] text-[#6E6E73] sm:text-xs">
                  Schedule
                </span>
              </div>
            </div>

            <div
          className="w-full backdrop-blur-xl bg-[rgba(255,255,255,0.82)] border border-[#DDE7F4] rounded-[1.5rem] p-4 shadow-[0_24px_70px_rgba(0,47,108,0.12)] transition-all duration-500 sm:rounded-[2rem] sm:p-8 md:p-10"
          style={{
            boxShadow:
              "0 10px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="min-h-[360px] flex flex-col sm:min-h-[400px]"
          >
            <div className="flex-1">
              {currentStep === 1 && (
                <div className="space-y-5 sm:space-y-6 animate-in fade-in slide-in-from-right-5 duration-500">
                  <div className="text-center mb-6 sm:mb-8">
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] mb-2">
                      Personal Information
                    </h3>
                    <p className="text-[#6E6E73]">
                      Let's start with your contact details
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="fullName"
                      className="flex items-center gap-2 text-[#1D1D1F] font-medium"
                    >
                      <User className="w-4 h-4 text-[#0071E3]" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      autoComplete="name"
                      className={`min-h-[52px] w-full px-4 py-3 text-base rounded-2xl border backdrop-blur-sm bg-[rgba(255,255,255,0.8)] focus:outline-none focus:ring-2 transition-all hover:bg-white ${
                        validationErrors.fullName
                          ? "border-red-400 focus:ring-red-400"
                          : "border-[rgba(0,0,0,0.1)] focus:ring-[#0071E3] focus:border-transparent"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {validationErrors.fullName && (
                      <p className="text-sm text-red-600 flex items-start gap-1">
                        {/* <span className="mt-0.5">⚠️</span> */}
                        {validationErrors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="flex items-center gap-2 text-[#1D1D1F] font-medium"
                    >
                      <MessageSquare className="w-4 h-4 text-[#0071E3]" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      autoComplete="email"
                      className={`min-h-[52px] w-full px-4 py-3 text-base rounded-2xl border backdrop-blur-sm bg-[rgba(255,255,255,0.8)] focus:outline-none focus:ring-2 transition-all hover:bg-white ${
                        validationErrors.email
                          ? "border-red-400 focus:ring-red-400"
                          : "border-[rgba(0,0,0,0.1)] focus:ring-[#0071E3] focus:border-transparent"
                      }`}
                      placeholder="Enter your email address"
                    />
                    {validationErrors.email && (
                      <p className="text-sm text-red-600 flex items-start gap-1">
                        {/* <span className="mt-0.5">⚠️</span> */}
                        {validationErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="flex items-center gap-2 text-[#1D1D1F] font-medium"
                    >
                      <Phone className="w-4 h-4 text-[#0071E3]" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      onBlur={handleBlur}
                      required
                      autoComplete="tel"
                      maxLength={14}
                      className={`min-h-[52px] w-full px-4 py-3 text-base rounded-2xl border backdrop-blur-sm bg-[rgba(255,255,255,0.8)] focus:outline-none focus:ring-2 transition-all hover:bg-white ${
                        validationErrors.phone
                          ? "border-red-400 focus:ring-red-400"
                          : "border-[rgba(0,0,0,0.1)] focus:ring-[#0071E3] focus:border-transparent"
                      }`}
                      placeholder="Enter your Phone Number"
                    />
                    {validationErrors.phone && (
                      <p className="text-sm text-red-600 flex items-start gap-1">
                        {validationErrors.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="address"
                      className="flex items-center gap-2 text-[#1D1D1F] font-medium"
                    >
                      <MapPin className="w-4 h-4 text-[#0071E3]" />
                      Address / Location
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      autoComplete="street-address"
                      rows={2}
                      className={`min-h-24 w-full px-4 py-3 text-base rounded-2xl border backdrop-blur-sm bg-[rgba(255,255,255,0.8)] focus:outline-none focus:ring-2 transition-all hover:bg-white resize-none ${
                        validationErrors.address
                          ? "border-red-400 focus:ring-red-400"
                          : "border-[rgba(0,0,0,0.1)] focus:ring-[#0071E3] focus:border-transparent"
                      }`}
                      placeholder="Enter your full address (street, city, state, zip)"
                    />
                    {validationErrors.address && (
                      <p className="text-sm text-red-600 flex items-start gap-1">
                        {/* <span className="mt-0.5">⚠️</span> */}
                        {validationErrors.address}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-5 sm:space-y-6 animate-in fade-in slide-in-from-right-5 duration-500">
                  <div className="text-center mb-6 sm:mb-8">
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] mb-2">
                      Choose Your Course
                    </h3>
                    <p className="text-[#6E6E73]">
                      Select the program that fits your needs
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="course"
                      className="flex items-center gap-2 text-[#1D1D1F] font-medium"
                    >
                      <BookOpen className="w-4 h-4 text-[#0071E3]" />
                      Course Selection
                    </label>
                    <select
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      required
                      className="min-h-[52px] w-full px-4 py-3 text-base rounded-2xl border border-[rgba(0,0,0,0.1)] backdrop-blur-sm bg-[rgba(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent transition-all hover:bg-white"
                    >
                      <option value="">Select a course</option>
                      {courseOptions.map((course) => (
                        <option
                          key={course.value}
                          value={course.value}
                        >
                          {course.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="flex items-center gap-2 text-[#1D1D1F] font-medium"
                    >
                      <MessageSquare className="w-4 h-4 text-[#0071E3]" />
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="min-h-32 w-full px-4 py-3 text-base rounded-2xl border border-[rgba(0,0,0,0.1)] backdrop-blur-sm bg-[rgba(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent transition-all resize-none hover:bg-white"
                      placeholder="Tell us about your experience level or any specific requirements..."
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-5 sm:space-y-6 animate-in fade-in slide-in-from-right-5 duration-500">
                  <div className="text-center mb-6 sm:mb-8">
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] mb-2">
                      When Would You Like to Start?
                    </h3>
                    <p className="text-[#6E6E73]">
                      Choose your preferred date and time to
                      begin lessons
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="datetime"
                      className="flex items-center gap-2 text-[#1D1D1F] font-medium"
                    >
                      <Calendar className="w-4 h-4 text-[#0071E3]" />
                      Preferred Start Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      id="datetime"
                      name="datetime"
                      value={formData.datetime}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={`min-h-[52px] w-full px-4 py-3 text-base rounded-2xl border backdrop-blur-sm bg-[rgba(255,255,255,0.8)] focus:outline-none focus:ring-2 transition-all hover:bg-white ${
                        validationErrors.datetime
                          ? "border-red-400 focus:ring-red-400"
                          : "border-[rgba(0,0,0,0.1)] focus:ring-[#0071E3] focus:border-transparent"
                      }`}
                    />
                    {validationErrors.datetime && (
                      <p className="text-sm text-red-600 flex items-start gap-1">
                        {/* <span className="mt-0.5">⚠️</span> */}
                        {validationErrors.datetime}
                      </p>
                    )}
                    <p className="text-xs text-[#6E6E73]">
                      Available: Monday-friday, 7:00 AM - 7:00 PM
                    </p>
                  </div>

                  <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-2xl backdrop-blur-sm bg-[rgba(0,113,227,0.05)] border border-[rgba(0,113,227,0.1)]">
                    <h4 className="font-semibold text-[#1D1D1F] mb-4">
                      Booking Summary
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#6E6E73]">
                          Name:
                        </span>
                        <span className="text-[#1D1D1F] font-medium">
                          {formData.fullName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6E6E73]">
                          Email:
                        </span>
                        <span className="text-[#1D1D1F] font-medium">
                          {formData.email}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6E6E73]">
                          Phone:
                        </span>
                        <span className="text-[#1D1D1F] font-medium">
                          {formData.phone}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6E6E73]">
                          Course:
                        </span>
                        <span className="text-[#1D1D1F] font-medium">
                          {formData.course}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {submitError && (
              <p className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 animate-in fade-in slide-in-from-top-2 duration-300">
                {submitError}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 mt-6 sm:mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="min-h-[52px] flex-1 px-6 py-3 rounded-full border-2 border-[#0071E3] text-[#0071E3] font-medium hover:bg-[#0071E3] hover:text-white transition-all hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>
              )}
              <button
                type="submit"
                disabled={!isStepValid() || isSubmitting}
                className={`min-h-[52px] flex-1 px-6 py-3 rounded-full font-medium transition-all flex items-center justify-center gap-2 ${
                  isStepValid() && !isSubmitting
                    ? "bg-gradient-to-r from-[#0071E3] to-[#0051A8] text-white hover:shadow-2xl hover:-translate-y-1"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2 animate-in fade-in duration-300">
                    <div className="w-5 h-5 relative">
                      <div className="absolute inset-0 rounded-full border-2 border-white/30"></div>
                      <div className="absolute inset-0 rounded-full border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                    </div>
                    <span>Submitting...</span>
                  </div>
                ) : currentStep === totalSteps ? (
                  <>
                    <Check className="w-4 h-4" />
                    Complete Booking
                  </>
                ) : (
                  <>
                    Next Step
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
              </form>
            </div>
          </div>

        </div>
      </div>

      <BookingSuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
      />
    </section>
  );
}
