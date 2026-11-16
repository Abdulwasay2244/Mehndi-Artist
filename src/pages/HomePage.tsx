import { ArrowRight, Calendar, Images } from 'lucide-react';
import {
  FEATURED_CATEGORIES,
  HERO_IMAGE,
  SERVICES_LIST,
} from '../data/mehndiData';
import { ResilientImage } from '../components/ResilientImage';
import { ServiceIcon } from '../components/ServiceIcon';

interface HomePageProps {
  onNavigate: (to: string) => void;
}

const CRAFT_HIGHLIGHTS = [
  {
    title: '100% Natural Henna',
    detail: 'Freshly sifted organic henna cones mixed with pure essential oils.',
  },
  {
    title: 'Deep Mahogany Stain',
    detail: 'Rich, long-lasting bridal color crafted without harsh chemicals.',
  },
  {
    title: 'Precision & Neatness',
    detail: 'Symmetrical fine-line mandalas, jaali work, and delicate shading.',
  },
  {
    title: 'Studio & Home Visits',
    detail: 'Dedicated bridal and festive appointments tailored to your schedule.',
  },
];

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      {/* Hero Section */}
      <section className="border-b border-[#E8DDD5] bg-[#FDF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Copy Column */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#8B3A2B]">
                Bridal | Arabic | Party Wear | Eid | Engagement Mehndi
              </p>

              <h1
                className="font-serif font-bold text-[#1E3F20] tracking-tight leading-[1.08]"
                style={{
                  fontSize: 'clamp(2.5rem, 4.5vw, 4.15rem)',
                  textWrap: 'balance',
                }}
              >
                Mehndi Artist
              </h1>

              <p className="text-base sm:text-lg text-[#4A3B35] leading-relaxed max-w-xl">
                Mehndi is not just a design; it is a beautiful emotion. When henna adorns the hands,
                every woman looks even more radiant. We decorate every hand with love, intricate
                detail, and neatness to make your special day truly unforgettable.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('/booking')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#FDF8F5] bg-[#1E3F20] hover:bg-[#8B3A2B] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3F20]"
                >
                  <Calendar className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                  <span>Book Appointment</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/gallery')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#1E3F20] bg-transparent border border-[#1E3F20]/30 hover:border-[#8B3A2B] hover:text-[#8B3A2B] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3F20]"
                >
                  <Images className="w-4 h-4" aria-hidden="true" />
                  <span>View Gallery</span>
                </button>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-6">
              <div className="relative h-full min-h-[320px] sm:min-h-[400px] lg:min-h-[460px] rounded-2xl overflow-hidden border border-[#D4AF37]/40 bg-[#EFE4DC]">
                <ResilientImage
                  src={HERO_IMAGE}
                  alt="South Asian bride's hands adorned with intricate deep maroon bridal mehndi and antique gold bangles"
                  fallbackTitle="Bridal Mehndi Artistry"
                  className="w-full h-full lg:h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* 4-column craft pillars below hero split */}
          <div className="mt-14 pt-10 border-t border-[#E8DDD5] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {CRAFT_HIGHLIGHTS.map((item, idx) => (
              <div key={item.title} className="space-y-1.5">
                <p className="text-xs font-semibold text-[#8B3A2B] tabular-nums">
                  0{idx + 1}.
                </p>
                <h2 className="font-serif text-lg font-semibold text-[#1E3F20]">
                  {item.title}
                </h2>
                <p className="text-sm text-[#5A4942] leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories Preview */}
      <section className="py-16 lg:py-20 bg-[#FFFFFF] border-b border-[#E8DDD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-semibold text-[#8B3A2B]">Curated Collections</p>
              <h2
                className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E3F20]"
                style={{ textWrap: 'balance' }}
              >
                Signature Mehndi Styles
              </h2>
              <p className="text-sm sm:text-base text-[#5A4942]">
                Explore our four signature collections, each tailored to the mood, attire, and
                traditions of your celebration.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('/gallery')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#1E3F20] border border-[#1E3F20]/30 hover:bg-[#1E3F20] hover:text-[#FDF8F5] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 self-start md:self-auto"
            >
              <span>Explore Full Gallery</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_CATEGORIES.map((cat) => (
              <button
                key={cat.category}
                type="button"
                onClick={() => onNavigate(`/gallery?category=${encodeURIComponent(cat.category)}`)}
                className="group text-left bg-[#FDF8F5] rounded-xl overflow-hidden border border-[#E8DDD5] hover:border-[#D4AF37] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3F20]"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#EFE4DC]">
                  <ResilientImage
                    src={cat.image}
                    alt={cat.alt}
                    fallbackTitle={cat.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 space-y-1.5">
                  <h3 className="font-serif text-xl font-semibold text-[#1E3F20] group-hover:text-[#8B3A2B] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-[#5A4942]">{cat.tagline}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Highlights */}
      <section className="py-16 lg:py-20 bg-[#FDF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-semibold text-[#8B3A2B]">Tailored Artistry</p>
              <h2
                className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E3F20]"
                style={{ textWrap: 'balance' }}
              >
                Specialized Henna Services
              </h2>
              <p className="text-sm sm:text-base text-[#5A4942]">
                Whether you are a bride preparing for your wedding week or dressing for Eid, we
                bring calm professionalism and crisp artistry to every appointment.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('/services')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B3A2B] hover:text-[#1E3F20] transition-colors whitespace-nowrap shrink-0 self-start md:self-auto"
            >
              <span>View All 6 Services</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_LIST.map((service) => (
              <div
                key={service.id}
                className="bg-[#FFFFFF] rounded-xl p-6 border border-[#E8DDD5] flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-[#FDF8F5] border border-[#D4AF37]/40 flex items-center justify-center text-[#1E3F20]">
                      <ServiceIcon name={service.icon} className="w-5 h-5" />
                    </div>
                    <span className="text-xs text-[#6E5C54]">
                      {service.durationHint}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-[#1E3F20]">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#5A4942] leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0E6DF] flex items-center justify-between">
                  <span className="text-xs text-[#6E5C54]">{service.coverage}</span>
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate(`/booking?service=${encodeURIComponent(service.title)}`)
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B3A2B] hover:text-[#1E3F20] transition-colors whitespace-nowrap"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Booking Banner */}
      <section className="bg-[#1E3F20] text-[#FDF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs font-semibold text-[#D4AF37]">
                Advance Reservations Open
              </p>
              <h2
                className="font-serif text-3xl sm:text-4xl font-semibold text-[#FDF8F5]"
                style={{ textWrap: 'balance' }}
              >
                Reserve Your Mehndi Date in Advance
              </h2>
              <p className="text-sm sm:text-base text-[#E5DDD5] leading-relaxed">
                Bridal, Eid, and wedding-season dates fill quickly. Share your event date and
                preferred design style to confirm your slot directly on WhatsApp.
              </p>
            </div>

            <div className="shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('/booking')}
                className="inline-flex items-center gap-2.5 px-7 py-4 text-sm font-semibold text-[#1E3F20] bg-[#D4AF37] hover:bg-[#FDF8F5] rounded-lg transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
