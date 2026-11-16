import { useEffect, useState } from 'react';
import { Expand } from 'lucide-react';
import { GALLERY_SECTIONS } from '../data/mehndiData';
import {
  filterGallerySections,
  flattenGalleryItems,
  GALLERY_CATEGORIES,
  getAdjacentGalleryItem,
  parseGalleryCategoryFromSearch,
  type GalleryCategoryFilter,
  type GalleryDesignItem,
} from '../utils/galleryFilter';
import { ResilientImage } from '../components/ResilientImage';
import { LightboxModal } from '../components/LightboxModal';

interface GalleryPageProps {
  search: string;
  onNavigate: (to: string) => void;
}

export function GalleryPage({ search, onNavigate }: GalleryPageProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategoryFilter>(() =>
    parseGalleryCategoryFromSearch(search),
  );
  const [selectedItem, setSelectedItem] = useState<GalleryDesignItem | null>(null);

  useEffect(() => {
    setActiveCategory(parseGalleryCategoryFromSearch(search));
  }, [search]);

  const visibleSections = filterGallerySections(GALLERY_SECTIONS, activeCategory);
  const visibleItems = flattenGalleryItems(visibleSections);

  const handleSelectCategory = (category: GalleryCategoryFilter) => {
    setActiveCategory(category);
  };

  const handleBookStyle = (serviceType: string) => {
    setSelectedItem(null);
    onNavigate(`/booking?service=${encodeURIComponent(serviceType)}`);
  };

  return (
    <div className="bg-[#FDF8F5] min-h-[calc(100vh-4rem)]">
      {/* Page Header & Category Tabs */}
      <section className="border-b border-[#E8DDD5] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold text-[#8B3A2B]">Portfolio Showcase</p>
            <h1
              className="font-serif text-3xl sm:text-5xl font-semibold text-[#1E3F20]"
              style={{ textWrap: 'balance' }}
            >
              Mehndi Designs Gallery
            </h1>
            <p className="text-sm sm:text-base text-[#5A4942] leading-relaxed">
              Browse handcrafted bridal heirlooms, flowing Arabic trails, joyful Eid motifs, and
              delicate party designs. Click any photograph to inspect details up close.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div
            role="tablist"
            aria-label="Gallery categories"
            className="mt-8 inline-flex flex-wrap items-center gap-2 p-1.5 bg-[#FDF8F5] border border-[#E8DDD5] rounded-xl"
          >
            {GALLERY_CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelectCategory(category)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#1E3F20] ${
                    isSelected
                      ? 'bg-[#1E3F20] text-[#FDF8F5]'
                      : 'text-[#5A4942] hover:text-[#1E3F20] hover:bg-[#F3EAE2]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
        {visibleSections.map((section) => (
          <div key={section.category} className="space-y-7">
            <div className="max-w-3xl space-y-2 pb-4 border-b border-[#E8DDD5]">
              <div className="flex items-center gap-2 text-xs font-medium text-[#8B3A2B]">
                <span>{section.category} Collection</span>
                <span aria-hidden="true">·</span>
                <span>{section.items.length} Designs</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E3F20]">
                {section.title}
              </h2>
              <p className="text-sm sm:text-base text-[#5A4942] leading-relaxed">
                {section.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  aria-label={`Preview ${item.title} (${item.category} Mehndi)`}
                  className="group text-left bg-[#FFFFFF] rounded-xl overflow-hidden border border-[#E8DDD5] hover:border-[#D4AF37] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3F20]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE4DC]">
                    <ResilientImage
                      src={item.image}
                      alt={item.alt}
                      fallbackTitle={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-[#1E3F20]/85 text-[#FDF8F5] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    >
                      <Expand className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="p-5 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-[#8B3A2B]">
                      <span>{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.duration}</span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-[#1E3F20] group-hover:text-[#8B3A2B] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#6E5C54]">{item.styleNote}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

      <LightboxModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onPrev={() =>
          selectedItem &&
          setSelectedItem(getAdjacentGalleryItem(visibleItems, selectedItem.id, 'prev'))
        }
        onNext={() =>
          selectedItem &&
          setSelectedItem(getAdjacentGalleryItem(visibleItems, selectedItem.id, 'next'))
        }
        onBookStyle={handleBookStyle}
      />
    </div>
  );
}
