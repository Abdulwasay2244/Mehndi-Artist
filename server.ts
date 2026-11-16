import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildWhatsAppUrl,
  formatWhatsAppMessage,
  validateBookingInput,
  type BookingInput,
} from './src/utils/booking';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';

interface StoredBooking extends BookingInput {
  bookingId: string;
  createdAt: string;
  whatsappUrl: string;
  formattedMessage: string;
}

const bookingsMemoryStore: StoredBooking[] = [];
const dataFilePath = path.join(__dirname, 'data', 'bookings.json');

function persistBookingBestEffort(record: StoredBooking): void {
  bookingsMemoryStore.push(record);
  try {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    let existing: StoredBooking[] = [];
    if (fs.existsSync(dataFilePath)) {
      const raw = fs.readFileSync(dataFilePath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        existing = parsed;
      }
    }
    existing.push(record);
    fs.writeFileSync(dataFilePath, JSON.stringify(existing, null, 2), 'utf-8');
  } catch {
    // In-memory store remains active if filesystem is read-only
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', bookingsCount: bookingsMemoryStore.length });
  });

  app.post('/api/bookings', (req, res) => {
    const payload: BookingInput = {
      name: String(req.body?.name ?? ''),
      whatsappNumber: String(req.body?.whatsappNumber ?? ''),
      mehndiType: String(req.body?.mehndiType ?? ''),
      eventDate: String(req.body?.eventDate ?? ''),
      eventTime: String(req.body?.eventTime ?? ''),
      location: String(req.body?.location ?? ''),
    };

    const validation = validateBookingInput(payload);
    if (!validation.isValid) {
      res.status(400).json({
        error: 'Please check the highlighted booking fields.',
        errors: validation.errors,
      });
      return;
    }

    const bookingId = `MHN-${Date.now().toString(36).toUpperCase()}`;
    const formattedMessage = formatWhatsAppMessage(payload);
    const whatsappUrl = buildWhatsAppUrl(payload);

    const record: StoredBooking = {
      ...payload,
      name: payload.name.trim(),
      whatsappNumber: payload.whatsappNumber.trim(),
      mehndiType: payload.mehndiType.trim(),
      eventDate: payload.eventDate.trim(),
      eventTime: payload.eventTime?.trim() || 'Flexible / To be confirmed',
      location: payload.location?.trim() || 'To be confirmed',
      bookingId,
      createdAt: new Date().toISOString(),
      whatsappUrl,
      formattedMessage,
    };

    persistBookingBestEffort(record);

    res.status(201).json({
      bookingId,
      whatsappUrl,
      formattedMessage,
      booking: record,
    });
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
