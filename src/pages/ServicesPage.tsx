import { ArrowRight } from 'lucide-react';
import { SERVICES_LIST } from '../data/mehndiData';
import { ResilientImage } from '../components/ResilientImage';
import { ServiceIcon } from '../components/ServiceIcon';

interface ServicesPageProps {
  onNavigate: (to: string) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  return (
    <div className="bg-[#FDF8F5] min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <section className="border-b border-[#E8DDD5] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold text-[#8B3A2B]">Henna Specialties</p>
            <h1
              className="font-serif text-3xl sm:text-5xl font-semibold text-[#1E3F20]"
              style={{ textWrap: 'balance' }}
            >
              Our Services
            </h1>
            <p className="text-sm sm:text-base text-[#5A4942] leading-relaxed">
              Every occasion calls for its own rhythm of artistry. Choose from our six dedicated
              mehndi services—each crafted with fresh organic henna paste and personalized care.
            </p>
          </div>
        </div>
      </section>

      {/* 6-Card Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {SERVICES_LIST.map((service) => (
            <article
              key={service.id}
              className="bg-[#FFFFFF] rounded-xl overflow-hidden border border-[#E8DDD5] flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] overflow-hidden bg-[#EFE4DC]">
                  <ResilientImage
                    src={service.image}
                    alt={service.alt}
                    fallbackTitle={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FDF8F5] border border-[#D4AF37]/40 flex items-center justify-center text-[#1E3F20]">
                      <ServiceIcon name={service.icon} className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#6E5C54]">
                      <span>{service.durationHint}</span>
                      <span aria-hidden="true">·</span>
                      <span>{service.coverage}</span>
                    </div>
                  </div>

                  <h2 className="font-serif text-2xl font-semibold text-[#1E3F20]">
                    {service.title}
                  </h2>

                  <p className="text-sm text-[#5A4942] leading-relaxed">
                    {service.fullDesc}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    onNavigate(`/booking?service=${encodeURIComponent(service.title)}`)
                  }
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#FDF8F5] bg-[#1E3F20] hover:bg-[#8B3A2B] rounded-lg transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3F20]"
                >
                  <span>Book This Service</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
