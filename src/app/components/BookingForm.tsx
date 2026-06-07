import { useState } from 'react';
import { Calendar, User, Phone, BookOpen, MessageSquare, ArrowRight, ArrowLeft, Check } from 'lucide-react';

export default function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    datetime: '',
    message: '',
  });

  const totalSteps = 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      alert('Thank you for your booking request! We will contact you shortly to confirm your lesson.');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        course: '',
        datetime: '',
        message: '',
      });
      setCurrentStep(1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.email && formData.phone;
      case 2:
        return formData.course;
      case 3:
        return formData.datetime;
      default:
        return false;
    }
  };

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-b from-white to-[#F5F5F7] relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#0071E3] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0051A8] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-[#1D1D1F] mb-4">Book Your Lesson</h2>
          <p className="text-xl text-[#6E6E73] max-w-2xl mx-auto">
            Ready to start your driving journey? Complete the steps below to schedule your lesson.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between max-w-md mx-auto">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    currentStep >= step
                      ? 'bg-gradient-to-br from-[#0071E3] to-[#0051A8] text-white shadow-lg'
                      : 'backdrop-blur-xl bg-[rgba(255,255,255,0.72)] border border-[rgba(255,255,255,0.45)] text-[#6E6E73]'
                  }`}
                >
                  {currentStep > step ? <Check className="w-5 h-5" /> : step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 md:w-24 h-1 mx-2 rounded-full transition-all ${
                      currentStep > step ? 'bg-gradient-to-r from-[#0071E3] to-[#0051A8]' : 'bg-[rgba(0,0,0,0.1)]'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between max-w-md mx-auto mt-3">
            <span className="text-xs text-[#6E6E73]">Personal Info</span>
            <span className="text-xs text-[#6E6E73]">Course</span>
            <span className="text-xs text-[#6E6E73]">Schedule</span>
          </div>
        </div>

        <div
          className="backdrop-blur-xl bg-[rgba(255,255,255,0.72)] border border-[rgba(255,255,255,0.45)] rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,113,227,0.2)] hover:-translate-y-2 transition-all duration-500"
          style={{
            boxShadow: '0 10px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6)',
          }}
        >
          <form onSubmit={handleSubmit} className="min-h-[400px] flex flex-col">
            <div className="flex-1">
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-500">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold text-[#1D1D1F] mb-2">Personal Information</h3>
                    <p className="text-[#6E6E73]">Let's start with your contact details</p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="fullName" className="flex items-center gap-2 text-[#1D1D1F] font-medium">
                      <User className="w-4 h-4 text-[#0071E3]" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-[rgba(0,0,0,0.1)] backdrop-blur-sm bg-[rgba(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent transition-all hover:bg-white"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="flex items-center gap-2 text-[#1D1D1F] font-medium">
                      <MessageSquare className="w-4 h-4 text-[#0071E3]" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-[rgba(0,0,0,0.1)] backdrop-blur-sm bg-[rgba(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent transition-all hover:bg-white"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="flex items-center gap-2 text-[#1D1D1F] font-medium">
                      <Phone className="w-4 h-4 text-[#0071E3]" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-[rgba(0,0,0,0.1)] backdrop-blur-sm bg-[rgba(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent transition-all hover:bg-white"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-500">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold text-[#1D1D1F] mb-2">Choose Your Course</h3>
                    <p className="text-[#6E6E73]">Select the program that fits your needs</p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="course" className="flex items-center gap-2 text-[#1D1D1F] font-medium">
                      <BookOpen className="w-4 h-4 text-[#0071E3]" />
                      Course Selection
                    </label>
                    <select
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-[rgba(0,0,0,0.1)] backdrop-blur-sm bg-[rgba(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent transition-all hover:bg-white"
                    >
                      <option value="">Select a course</option>
                      <option value="beginner">Beginner Course - 8 weeks</option>
                      <option value="advanced">Advanced Course - 6 weeks</option>
                      <option value="intensive">Intensive Course - 2 weeks</option>
                      <option value="single">Single Lesson - $45</option>
                      <option value="package10">Package of 10 - $400</option>
                      <option value="full">Full Course - $750</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="flex items-center gap-2 text-[#1D1D1F] font-medium">
                      <MessageSquare className="w-4 h-4 text-[#0071E3]" />
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-2xl border border-[rgba(0,0,0,0.1)] backdrop-blur-sm bg-[rgba(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent transition-all resize-none hover:bg-white"
                      placeholder="Tell us about your experience level or any specific requirements..."
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-500">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold text-[#1D1D1F] mb-2">Pick Your Schedule</h3>
                    <p className="text-[#6E6E73]">Choose a convenient date and time</p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="datetime" className="flex items-center gap-2 text-[#1D1D1F] font-medium">
                      <Calendar className="w-4 h-4 text-[#0071E3]" />
                      Preferred Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      id="datetime"
                      name="datetime"
                      value={formData.datetime}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-[rgba(0,0,0,0.1)] backdrop-blur-sm bg-[rgba(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent transition-all hover:bg-white"
                    />
                  </div>

                  <div className="mt-8 p-6 rounded-2xl backdrop-blur-sm bg-[rgba(0,113,227,0.05)] border border-[rgba(0,113,227,0.1)]">
                    <h4 className="font-semibold text-[#1D1D1F] mb-4">Booking Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#6E6E73]">Name:</span>
                        <span className="text-[#1D1D1F] font-medium">{formData.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6E6E73]">Email:</span>
                        <span className="text-[#1D1D1F] font-medium">{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6E6E73]">Phone:</span>
                        <span className="text-[#1D1D1F] font-medium">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6E6E73]">Course:</span>
                        <span className="text-[#1D1D1F] font-medium">
                          {formData.course ? formData.course.charAt(0).toUpperCase() + formData.course.slice(1) : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3 rounded-full border-2 border-[#0071E3] text-[#0071E3] font-medium hover:bg-[#0071E3] hover:text-white transition-all hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>
              )}
              <button
                type="submit"
                disabled={!isStepValid()}
                className={`flex-1 px-6 py-3 rounded-full font-medium transition-all flex items-center justify-center gap-2 ${
                  isStepValid()
                    ? 'bg-gradient-to-r from-[#0071E3] to-[#0051A8] text-white hover:shadow-2xl hover:-translate-y-1'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentStep === totalSteps ? (
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
    </section>
  );
}
