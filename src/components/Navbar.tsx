import { useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import { buildGeneralWhatsAppUrl } from '../utils/booking';

export type AppRoute = '/' | '/gallery' | '/services' | '/booking';

interface NavbarProps {
  currentPath: string;
  onNavigate: (to: string) => void;
}

const NAV_LINKS: { label: string; path: AppRoute }[] = [
  { label: 'Home', path: '/' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Services', path: '/services' },
  { label: 'Booking', path: '/booking' },
];

export function Navbar({ currentPath, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const whatsappHref = buildGeneralWhatsAppUrl();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: AppRoute) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDF8F5]/95 backdrop-blur-md border-b border-[#E8DDD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#1E3F20] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3F20]"
        >
          Mehndi Atelier
        </a>

        {/* Zone 2: Concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5A4942]"
        >
          {NAV_LINKS.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.path)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3F20] ${
                  isActive
                    ? 'text-[#1E3F20] font-semibold'
                    : 'text-[#5A4942] hover:text-[#8B3A2B]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-[#D4AF37]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary action + Mobile toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-[#FDF8F5] bg-[#1E3F20] hover:bg-[#8B3A2B] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3F20]"
          >
            <MessageCircle className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
            <span>Book on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#1E3F20] hover:bg-[#F3EAE2] transition-colors focus-visible:outline-2 focus-visible:outline-[#1E3F20]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E8DDD5] bg-[#FDF8F5] px-4 py-4 space-y-2">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {NAV_LINKS.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#1E3F20]/10 text-[#1E3F20] font-semibold'
                      : 'text-[#4A3B35] hover:bg-[#F3EAE2]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <div className="pt-2 border-t border-[#E8DDD5]">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[#FDF8F5] bg-[#1E3F20] hover:bg-[#8B3A2B] rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              <span>Book on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
