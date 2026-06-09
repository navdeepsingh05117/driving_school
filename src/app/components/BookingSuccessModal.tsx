import { CheckCircle, X, Mail, Phone } from 'lucide-react';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface BookingSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingSuccessModal({ isOpen, onClose }: BookingSuccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      // Trigger confetti celebration
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      return () => clearInterval(interval);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Success Icon */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
            <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Booking Request Sent!
          </h2>

          {/* Message */}
          <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">
            Thank you for choosing Saini Driving School! We've received your booking request and will contact you shortly to confirm your lesson.
          </p>

          {/* Contact Info */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-blue-100">
            <p className="text-sm text-gray-700 mb-4 font-medium">
              Need immediate assistance?
            </p>
            <div className="space-y-3">
              <div className="space-y-2">
                <a
                  href="tel:+919814712236"
                  className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">+91 98147 12236</span>
                </a>
                <a
                  href="tel:+919855465008"
                  className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">+91 98554 65008</span>
                </a>
              </div>
              <a
                href="mailto:info@sainidrivingschool.com"
                className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                {/* <Mail className="w-4 h-4" />
                <span className="font-medium">info@sainidrivingschool.com</span> */}
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              Back to Home
            </button>
            <button
              onClick={onClose}
              className="w-full px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-3xl">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
