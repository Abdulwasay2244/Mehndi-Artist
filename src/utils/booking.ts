export const STUDIO_WHATSAPP_DIGITS = '923312950945';
export const STUDIO_WHATSAPP_DISPLAY = '+92 331 2950945';

export const MEHNDI_SERVICE_OPTIONS = [
  'Bridal Mehndi',
  'Arabic Mehndi',
  'Party Wear Mehndi',
  'Eid Mehndi',
  'Engagement Mehndi',
  'Balochi Mehndi',
] as const;

export type MehndiServiceType = (typeof MEHNDI_SERVICE_OPTIONS)[number];

export const EVENT_TIME_OPTIONS = [
  'Flexible / To be confirmed',
  'Morning (10:00 AM – 1:00 PM)',
  'Afternoon (2:00 PM – 5:00 PM)',
  'Evening (6:00 PM – 9:00 PM)',
] as const;

export interface BookingInput {
  name: string;
  whatsappNumber: string;
  mehndiType: string;
  eventDate: string;
  eventTime?: string;
  location?: string;
}

export interface BookingValidationErrors {
  name?: string;
  whatsappNumber?: string;
  mehndiType?: string;
  eventDate?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: BookingValidationErrors;
}

export function normalizePhoneDigits(phone: string): string {
  return phone.replace(/[^\d]/g, '');
}

export function validateBookingInput(input: BookingInput): ValidationResult {
  const errors: BookingValidationErrors = {};

  const trimmedName = (input.name ?? '').trim();
  if (!trimmedName) {
    errors.name = 'Please enter your full name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  const trimmedPhone = (input.whatsappNumber ?? '').trim();
  const digits = normalizePhoneDigits(trimmedPhone);
  if (!trimmedPhone) {
    errors.whatsappNumber = 'Please enter your WhatsApp number.';
  } else if (digits.length < 10 || digits.length > 15) {
    errors.whatsappNumber = 'Please enter a valid WhatsApp number (10 to 15 digits).';
  }

  const service = (input.mehndiType ?? '').trim();
  if (!MEHNDI_SERVICE_OPTIONS.includes(service as MehndiServiceType)) {
    errors.mehndiType = 'Please select a Mehndi service type.';
  }

  const trimmedDate = (input.eventDate ?? '').trim();
  if (!trimmedDate) {
    errors.eventDate = 'Please select your event date.';
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmedDate)) {
    errors.eventDate = 'Please provide a valid date (YYYY-MM-DD).';
  } else {
    const parsed = new Date(`${trimmedDate}T00:00:00Z`);
    if (Number.isNaN(parsed.getTime())) {
      errors.eventDate = 'Please provide a valid calendar date.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatWhatsAppMessage(input: BookingInput): string {
  const name = input.name.trim();
  const whatsappNumber = input.whatsappNumber.trim();
  const mehndiType = input.mehndiType.trim();
  const eventDate = input.eventDate.trim();
  const eventTime = (input.eventTime ?? '').trim() || 'Flexible / To be confirmed';
  const location = (input.location ?? '').trim() || 'To be confirmed';

  return [
    'Hello! I would like to book a Mehndi appointment:',
    `*Name:* ${name}`,
    `*WhatsApp Number:* ${whatsappNumber}`,
    `*Mehndi Type:* ${mehndiType}`,
    `*Event Date:* ${eventDate}`,
    `*Event Time:* ${eventTime}`,
    `*Location:* ${location}`,
  ].join('\n');
}

export function buildWhatsAppUrl(
  input: BookingInput,
  targetDigits: string = STUDIO_WHATSAPP_DIGITS,
): string {
  const message = formatWhatsAppMessage(input);
  return `https://wa.me/${targetDigits}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralWhatsAppUrl(
  customGreeting: string = 'Hello! I would like to inquire about booking a Mehndi appointment.',
  targetDigits: string = STUDIO_WHATSAPP_DIGITS,
): string {
  return `https://wa.me/${targetDigits}?text=${encodeURIComponent(customGreeting)}`;
}

export function parseServiceFromSearch(search: string): MehndiServiceType {
  const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`);
  const requested = params.get('service')?.trim() ?? '';
  if (MEHNDI_SERVICE_OPTIONS.includes(requested as MehndiServiceType)) {
    return requested as MehndiServiceType;
  }
  const normalized = requested.toLowerCase();
  const matched = MEHNDI_SERVICE_OPTIONS.find((opt) =>
    opt.toLowerCase().includes(normalized) && normalized.length > 0,
  );
  return matched ?? 'Bridal Mehndi';
}
