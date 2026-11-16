import { useEffect, useState } from 'react';
import { CheckCircle2, ExternalLink, Lock, MessageCircle, RotateCcw } from 'lucide-react';
import {
  buildGeneralWhatsAppUrl,
  buildWhatsAppUrl,
  EVENT_TIME_OPTIONS,
  formatWhatsAppMessage,
  MEHNDI_SERVICE_OPTIONS,
  parseServiceFromSearch,
  STUDIO_WHATSAPP_DISPLAY,
  validateBookingInput,
  type BookingValidationErrors,
} from '../utils/booking';

interface BookingPageProps {
  search: string;
}

interface ConfirmedBookingState {
  bookingId: string;
  whatsappUrl: string;
  formattedMessage: string;
}

export function BookingPage({ search }: BookingPageProps) {
  const [name, setName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [mehndiType, setMehndiType] = useState<string>(() => parseServiceFromSearch(search));
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState<string>(EVENT_TIME_OPTIONS[0]);
  const [location, setLocation] = useState('');

  const [errors, setErrors] = useState<BookingValidationErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<ConfirmedBookingState | null>(null);

  useEffect(() => {
    setMehndiType(parseServiceFromSearch(search));
  }, [search]);

  const openWhatsAppTab = (url: string) => {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    const payload = {
      name,
      whatsappNumber,
      mehndiType,
      eventDate,
      eventTime,
      location,
    };

    const validation = validateBookingInput(payload);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data?.errors) {
          setErrors(data.errors);
        }
        setServerError(data?.error || 'Could not submit your booking. Please check your details.');
        setIsSubmitting(false);
        return;
      }

      const whatsappUrl: string = data.whatsappUrl || buildWhatsAppUrl(payload);
      const formattedMessage: string = data.formattedMessage || formatWhatsAppMessage(payload);

      setConfirmed({
        bookingId: data.bookingId || 'MHN-CONFIRMED',
        whatsappUrl,
        formattedMessage,
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
      openWhatsAppTab(whatsappUrl);
    } catch {
      const fallbackUrl = buildWhatsAppUrl(payload);
      const fallbackMessage = formatWhatsAppMessage(payload);
      setConfirmed({
        bookingId: 'MHN-DIRECT',
        whatsappUrl: fallbackUrl,
        formattedMessage: fallbackMessage,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      openWhatsAppTab(fallbackUrl);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setConfirmed(null);
    setName('');
    setWhatsappNumber('');
    setEventDate('');
    setEventTime(EVENT_TIME_OPTIONS[0]);
    setLocation('');
    setErrors({});
    setServerError(null);
  };

  const directStudioWhatsApp = buildGeneralWhatsAppUrl();

  return (
    <div className="bg-[#FDF8F5] min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <section className="border-b border-[#E8DDD5] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold text-[#8B3A2B]">Appointments &amp; Reservations</p>
            <h1
              className="font-serif text-3xl sm:text-5xl font-semibold text-[#1E3F20]"
              style={{ textWrap: 'balance' }}
            >
              Booking Form
            </h1>
            <p className="text-sm sm:text-base text-[#5A4942] leading-relaxed">
              Fill out the form below to book your appointment. Your number remains completely
              private, and we will reach out to you directly.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form / Confirmation Panel */}
          <div className="lg:col-span-7 bg-[#FFFFFF] rounded-2xl border border-[#E8DDD5] p-6 sm:p-8 lg:p-10">
            {confirmed ? (
              <div className="space-y-6" data-testid="booking-confirmation">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-[#1E3F20]/10 text-[#1E3F20] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-[#8B3A2B] tabular-nums">
                      Reference: {confirmed.bookingId}
                    </p>
                    <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E3F20]">
                      Your WhatsApp Booking Is Ready
                    </h2>
                    <p className="text-sm text-[#5A4942] leading-relaxed">
                      We saved your appointment request and opened WhatsApp with your pre-filled
                      booking message. If WhatsApp did not open automatically, click the button
                      below.
                    </p>
                  </div>
                </div>

                <div className="bg-[#FDF8F5] border border-[#E8DDD5] rounded-xl p-5 space-y-2">
                  <p className="text-xs font-semibold text-[#6E5C54]">
                    Pre-formatted WhatsApp Message
                  </p>
                  <pre className="text-sm text-[#2A1F1B] font-sans whitespace-pre-wrap leading-relaxed tabular-nums">
                    {confirmed.formattedMessage}
                  </pre>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href={confirmed.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#FDF8F5] bg-[#1E3F20] hover:bg-[#8B3A2B] rounded-lg transition-colors duration-150"
                  >
                    <MessageCircle className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                    <span>Continue to WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#1E3F20] border border-[#1E3F20]/30 hover:border-[#8B3A2B] hover:text-[#8B3A2B] rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                    <span>Book Another Date</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {serverError && (
                  <div
                    role="alert"
                    className="p-4 rounded-lg bg-[#8B3A2B]/10 border border-[#8B3A2B]/30 text-sm text-[#8B3A2B]"
                  >
                    {serverError}
                  </div>
                )}

                {/* Your Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="booking-name"
                    className="block text-sm font-semibold text-[#1E3F20]"
                  >
                    Your Name <span className="text-[#8B3A2B]">*</span>
                  </label>
                  <input
                    id="booking-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="Enter your full name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'booking-name-error' : undefined}
                    className={`w-full px-4 py-3 text-sm rounded-lg bg-[#FDF8F5] border transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E3F20]/25 ${
                      errors.name
                        ? 'border-[#8B3A2B]'
                        : 'border-[#DDD0C6] focus:border-[#1E3F20]'
                    }`}
                  />
                  {errors.name && (
                    <p id="booking-name-error" role="alert" className="text-xs font-medium text-[#8B3A2B]">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Your WhatsApp Number */}
                <div className="space-y-2">
                  <label
                    htmlFor="booking-whatsapp"
                    className="block text-sm font-semibold text-[#1E3F20]"
                  >
                    Your WhatsApp Number <span className="text-[#8B3A2B]">*</span>
                  </label>
                  <input
                    id="booking-whatsapp"
                    name="whatsappNumber"
                    type="tel"
                    required
                    value={whatsappNumber}
                    onChange={(e) => {
                      setWhatsappNumber(e.target.value);
                      if (errors.whatsappNumber) {
                        setErrors((prev) => ({ ...prev, whatsappNumber: undefined }));
                      }
                    }}
                    placeholder="e.g., 0300-1234567"
                    aria-invalid={Boolean(errors.whatsappNumber)}
                    aria-describedby={errors.whatsappNumber ? 'booking-whatsapp-error' : undefined}
                    className={`w-full px-4 py-3 text-sm rounded-lg bg-[#FDF8F5] border transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E3F20]/25 ${
                      errors.whatsappNumber
                        ? 'border-[#8B3A2B]'
                        : 'border-[#DDD0C6] focus:border-[#1E3F20]'
                    }`}
                  />
                  {errors.whatsappNumber && (
                    <p
                      id="booking-whatsapp-error"
                      role="alert"
                      className="text-xs font-medium text-[#8B3A2B]"
                    >
                      {errors.whatsappNumber}
                    </p>
                  )}
                </div>

                {/* Select Mehndi Type */}
                <div className="space-y-2">
                  <label
                    htmlFor="booking-mehndi-type"
                    className="block text-sm font-semibold text-[#1E3F20]"
                  >
                    Select Mehndi Type <span className="text-[#8B3A2B]">*</span>
                  </label>
                  <select
                    id="booking-mehndi-type"
                    name="mehndiType"
                    required
                    value={mehndiType}
                    onChange={(e) => {
                      setMehndiType(e.target.value);
                      if (errors.mehndiType) {
                        setErrors((prev) => ({ ...prev, mehndiType: undefined }));
                      }
                    }}
                    aria-invalid={Boolean(errors.mehndiType)}
                    aria-describedby={errors.mehndiType ? 'booking-type-error' : undefined}
                    className={`w-full px-4 py-3 text-sm rounded-lg bg-[#FDF8F5] border transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E3F20]/25 ${
                      errors.mehndiType
                        ? 'border-[#8B3A2B]'
                        : 'border-[#DDD0C6] focus:border-[#1E3F20]'
                    }`}
                  >
                    {MEHNDI_SERVICE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.mehndiType && (
                    <p id="booking-type-error" role="alert" className="text-xs font-medium text-[#8B3A2B]">
                      {errors.mehndiType}
                    </p>
                  )}
                </div>

                {/* Event Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="booking-event-date"
                      className="block text-sm font-semibold text-[#1E3F20]"
                    >
                      Event Date <span className="text-[#8B3A2B]">*</span>
                    </label>
                    <input
                      id="booking-event-date"
                      name="eventDate"
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => {
                        setEventDate(e.target.value);
                        if (errors.eventDate) {
                          setErrors((prev) => ({ ...prev, eventDate: undefined }));
                        }
                      }}
                      aria-invalid={Boolean(errors.eventDate)}
                      aria-describedby={errors.eventDate ? 'booking-date-error' : undefined}
                      className={`w-full px-4 py-3 text-sm rounded-lg bg-[#FDF8F5] border transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E3F20]/25 ${
                        errors.eventDate
                          ? 'border-[#8B3A2B]'
                          : 'border-[#DDD0C6] focus:border-[#1E3F20]'
                      }`}
                    />
                    {errors.eventDate && (
                      <p
                        id="booking-date-error"
                        role="alert"
                        className="text-xs font-medium text-[#8B3A2B]"
                      >
                        {errors.eventDate}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="booking-event-time"
                      className="block text-sm font-semibold text-[#1E3F20]"
                    >
                      Preferred Event Time
                    </label>
                    <select
                      id="booking-event-time"
                      name="eventTime"
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                      className="w-full px-4 py-3 text-sm rounded-lg bg-[#FDF8F5] border border-[#DDD0C6] focus:border-[#1E3F20] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E3F20]/25"
                    >
                      {EVENT_TIME_OPTIONS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label
                    htmlFor="booking-location"
                    className="block text-sm font-semibold text-[#1E3F20]"
                  >
                    Event Location / Address
                  </label>
                  <input
                    id="booking-location"
                    name="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., DHA Phase 6, Lahore or Studio Appointment"
                    className="w-full px-4 py-3 text-sm rounded-lg bg-[#FDF8F5] border border-[#DDD0C6] focus:border-[#1E3F20] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E3F20]/25"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm sm:text-base font-semibold text-[#FDF8F5] bg-[#1E3F20] hover:bg-[#8B3A2B] border border-transparent hover:border-[#D4AF37] rounded-lg transition-all duration-150 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3F20]"
                  >
                    <MessageCircle className="w-5 h-5 text-[#D4AF37]" aria-hidden="true" />
                    <span>{isSubmitting ? 'Preparing WhatsApp...' : 'Send Booking'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Info Sidebar */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="bg-[#1E3F20] text-[#FDF8F5] rounded-2xl p-6 sm:p-8 space-y-5">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[#D4AF37]">Direct Studio Concierge</p>
                <h2 className="font-serif text-2xl font-semibold">
                  Instant WhatsApp Confirmation
                </h2>
                <p className="text-sm text-[#E5DDD5] leading-relaxed">
                  Submitting your booking sends your exact event details straight to our studio
                  WhatsApp line for prompt date availability and design consultation.
                </p>
              </div>

              <div className="pt-4 border-t border-[#FDF8F5]/15 space-y-3">
                <p className="text-xs text-[#C7BFAF]">Official Studio WhatsApp</p>
                <a
                  href={directStudioWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-lg font-semibold text-[#D4AF37] hover:text-[#FDF8F5] transition-colors tabular-nums"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  <span>{STUDIO_WHATSAPP_DISPLAY}</span>
                </a>
              </div>
            </div>

            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8DDD5] p-6 sm:p-8 space-y-5">
              <h3 className="font-serif text-xl font-semibold text-[#1E3F20]">
                What Happens Next
              </h3>
              <ol className="space-y-4 text-sm text-[#5A4942]">
                <li className="space-y-1">
                  <span className="font-semibold text-[#8B3A2B]">01. Submit Your Details</span>
                  <p>Select your mehndi style and preferred event date using the booking form.</p>
                </li>
                <li className="space-y-1">
                  <span className="font-semibold text-[#8B3A2B]">02. Direct WhatsApp Chat</span>
                  <p>Confirm timing, bridal package details, and custom motif preferences.</p>
                </li>
                <li className="space-y-1">
                  <span className="font-semibold text-[#8B3A2B]">03. Fresh Organic Henna</span>
                  <p>We prepare fresh organic cones 24 hours before your session for the deepest stain.</p>
                </li>
              </ol>

              <div className="pt-4 border-t border-[#E8DDD5] flex items-center gap-2.5 text-xs text-[#6E5C54]">
                <Lock className="w-4 h-4 text-[#1E3F20] shrink-0" aria-hidden="true" />
                <span>Your contact details stay strictly private and are never shared.</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
