import { Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { buildGeneralWhatsAppUrl, STUDIO_WHATSAPP_DISPLAY } from '../utils/booking';

interface FooterProps {
  onNavigate: (to: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const whatsappUrl = buildGeneralWhatsAppUrl();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="bg-[#1E3F20] text-[#FDF8F5] border-t border-[#D4AF37]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-[#FDF8F5]">
              Mehndi Atelier
            </h2>
            <p className="text-sm leading-relaxed text-[#E5DDD5] max-w-md">
              Handcrafted organic henna artistry celebrating Pakistani &amp; South Asian traditions.
              From intricate bridal heirlooms to modern Arabic vines, every design is mixed fresh
              for rich color and timeless grace.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect on WhatsApp"
                className="w-10 h-10 rounded-lg border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1E3F20] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="/gallery"
                onClick={(e) => handleNav(e, '/gallery')}
                aria-label="Browse Portfolio Gallery"
                className="w-10 h-10 rounded-lg border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1E3F20] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="/booking"
                onClick={(e) => handleNav(e, '/booking')}
                aria-label="Book an Appointment"
                className="w-10 h-10 rounded-lg border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1E3F20] transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-serif text-lg font-medium text-[#D4AF37]">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-[#E5DDD5]">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleNav(e, '/')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/gallery"
                  onClick={(e) => handleNav(e, '/gallery')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Mehndi Designs Gallery
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  onClick={(e) => handleNav(e, '/services')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Our Services
                </a>
              </li>
              <li>
                <a
                  href="/booking"
                  onClick={(e) => handleNav(e, '/booking')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Booking Form
                </a>
              </li>
            </ul>
          </div>

          {/* Specialties & Direct Contact */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="font-serif text-lg font-medium text-[#D4AF37]">
              Studio &amp; Appointments
            </h3>
            <ul className="space-y-2.5 text-sm text-[#E5DDD5]">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" aria-hidden="true" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D4AF37] transition-colors tabular-nums"
                >
                  WhatsApp: {STUDIO_WHATSAPP_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" aria-hidden="true" />
                <span>Studio &amp; Home Visits by Appointment</span>
              </li>
            </ul>
            <p className="text-xs text-[#C7BFAF] pt-2 leading-relaxed">
              Specializing in Bridal, Arabic, Party Wear, Eid, Engagement, and Balochi Mehndi.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#FDF8F5]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C7BFAF]">
          <p>© {new Date().getFullYear()} Mehndi Atelier. Crafted with natural organic henna.</p>
          <div className="flex items-center gap-3">
            <span>Bridal</span>
            <span aria-hidden="true">·</span>
            <span>Arabic</span>
            <span aria-hidden="true">·</span>
            <span>Eid</span>
            <span aria-hidden="true">·</span>
            <span>Balochi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
