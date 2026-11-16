import { useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryDesignItem } from '../utils/galleryFilter';
import { ResilientImage } from './ResilientImage';

interface LightboxModalProps {
  item: GalleryDesignItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onBookStyle: (serviceType: string) => void;
}

export function LightboxModal({
  item,
  onClose,
  onPrev,
  onNext,
  onBookStyle,
}: LightboxModalProps) {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [item, onClose, onPrev, onNext]);

  if (!item) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} preview`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FDF8F5] rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/30 grid grid-cols-1 md:grid-cols-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-[#1E3F20] text-[#FDF8F5] hover:bg-[#8B3A2B] flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image pane */}
        <div className="md:col-span-7 relative bg-[#1A1412] aspect-[4/3] md:aspect-auto md:min-h-[420px]">
          <ResilientImage
            src={item.image}
            alt={item.alt}
            fallbackTitle={item.title}
            className="w-full h-full object-cover"
          />

          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous design"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#FDF8F5]/90 text-[#1E3F20] hover:bg-[#FDF8F5] flex items-center justify-center shadow-md transition-colors focus-visible:outline-2 focus-visible:outline-[#1E3F20]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label="Next design"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#FDF8F5]/90 text-[#1E3F20] hover:bg-[#FDF8F5] flex items-center justify-center shadow-md transition-colors focus-visible:outline-2 focus-visible:outline-[#1E3F20]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Details pane */}
        <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#FDF8F5]">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-medium text-[#8B3A2B]">
              <span>{item.category} Mehndi</span>
              <span aria-hidden="true">·</span>
              <span>{item.duration}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E3F20] leading-tight">
              {item.title}
            </h3>

            <p className="text-sm text-[#5A4942] leading-relaxed">
              {item.alt}. {item.styleNote}.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-[#E8DDD5] space-y-3">
            <button
              type="button"
              onClick={() => onBookStyle(item.serviceType)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#FDF8F5] bg-[#1E3F20] hover:bg-[#8B3A2B] rounded-lg transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3F20]"
            >
              <Calendar className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              <span>Book This Style</span>
            </button>
            <p className="text-xs text-[#6E5C54] text-center" style={{ textWrap: 'balance' }}>
              Pre-selects {item.serviceType} in the booking form
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
