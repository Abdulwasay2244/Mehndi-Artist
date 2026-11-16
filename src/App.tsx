/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { BookingPage } from './pages/BookingPage';
import { GalleryPage } from './pages/GalleryPage';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';

interface RouteLocation {
  pathname: string;
  search: string;
}

function normalizePath(pathname: string): string {
  if (pathname === '/gallery' || pathname === '/services' || pathname === '/booking') {
    return pathname;
  }
  return '/';
}

function readCurrentLocation(): RouteLocation {
  return {
    pathname: normalizePath(window.location.pathname),
    search: window.location.search,
  };
}

export default function App() {
  const [location, setLocation] = useState<RouteLocation>(() => readCurrentLocation());

  useEffect(() => {
    const handlePopState = () => {
      setLocation(readCurrentLocation());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string) => {
    const url = new URL(to, window.location.origin);
    const nextPathname = normalizePath(url.pathname);
    const nextUrl = `${nextPathname}${url.search}`;
    window.history.pushState({}, '', nextUrl);
    setLocation({ pathname: nextPathname, search: url.search });
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF8F5] text-[#2A1F1B]">
      <Navbar currentPath={location.pathname} onNavigate={navigate} />

      <main className="flex-1">
        {location.pathname === '/' && <HomePage onNavigate={navigate} />}
        {location.pathname === '/gallery' && (
          <GalleryPage search={location.search} onNavigate={navigate} />
        )}
        {location.pathname === '/services' && <ServicesPage onNavigate={navigate} />}
        {location.pathname === '/booking' && <BookingPage search={location.search} />}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}
