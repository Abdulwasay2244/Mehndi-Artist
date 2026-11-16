import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildWhatsAppUrl,
  formatWhatsAppMessage,
  parseServiceFromSearch,
  STUDIO_WHATSAPP_DIGITS,
  validateBookingInput,
} from './booking';

test('validateBookingInput rejects empty fields with clear messages', () => {
  const result = validateBookingInput({
    name: '',
    whatsappNumber: '',
    mehndiType: '',
    eventDate: '',
  });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.whatsappNumber);
  assert.ok(result.errors.mehndiType);
  assert.ok(result.errors.eventDate);
});

test('validateBookingInput rejects invalid phone numbers and invalid dates', () => {
  const result = validateBookingInput({
    name: 'Ayesha Khan',
    whatsappNumber: '12345',
    mehndiType: 'Bridal Mehndi',
    eventDate: '16-11-2026',
  });
  assert.equal(result.isValid, false);
  assert.equal(result.errors.name, undefined);
  assert.ok(result.errors.whatsappNumber);
  assert.equal(result.errors.mehndiType, undefined);
  assert.ok(result.errors.eventDate);
});

test('validateBookingInput accepts complete valid booking data', () => {
  const result = validateBookingInput({
    name: 'Hira Fatima',
    whatsappNumber: '0300-1234567',
    mehndiType: 'Balochi Mehndi',
    eventDate: '2026-12-20',
    eventTime: 'Evening (6:00 PM – 9:00 PM)',
    location: 'DHA Phase 6, Lahore',
  });
  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('formatWhatsAppMessage formats all booking fields clearly', () => {
  const msg = formatWhatsAppMessage({
    name: 'Sana Tariq',
    whatsappNumber: '+92 331 2950945',
    mehndiType: 'Engagement Mehndi',
    eventDate: '2026-12-05',
    eventTime: 'Afternoon (2:00 PM – 5:00 PM)',
    location: 'Clifton Block 4, Karachi',
  });

  assert.match(msg, /Hello! I would like to book a Mehndi appointment:/);
  assert.match(msg, /\*Name:\* Sana Tariq/);
  assert.match(msg, /\*WhatsApp Number:\* \+92 331 2950945/);
  assert.match(msg, /\*Mehndi Type:\* Engagement Mehndi/);
  assert.match(msg, /\*Event Date:\* 2026-12-05/);
  assert.match(msg, /\*Event Time:\* Afternoon \(2:00 PM – 5:00 PM\)/);
  assert.match(msg, /\*Location:\* Clifton Block 4, Karachi/);
});

test('buildWhatsAppUrl generates properly encoded wa.me link', () => {
  const url = buildWhatsAppUrl({
    name: 'Zainab Ali',
    whatsappNumber: '0321-7654321',
    mehndiType: 'Arabic Mehndi',
    eventDate: '2026-11-28',
  });

  assert.ok(url.startsWith(`https://wa.me/${STUDIO_WHATSAPP_DIGITS}?text=`));
  const decoded = decodeURIComponent(url.split('?text=')[1]);
  assert.ok(decoded.includes('*Name:* Zainab Ali'));
  assert.ok(decoded.includes('*Mehndi Type:* Arabic Mehndi'));
});

test('parseServiceFromSearch pre-selects valid services and defaults safely', () => {
  assert.equal(parseServiceFromSearch('?service=Balochi%20Mehndi'), 'Balochi Mehndi');
  assert.equal(parseServiceFromSearch('?service=eid'), 'Eid Mehndi');
  assert.equal(parseServiceFromSearch('?service=unknown'), 'Bridal Mehndi');
  assert.equal(parseServiceFromSearch(''), 'Bridal Mehndi');
});
