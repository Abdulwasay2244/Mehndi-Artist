import type { MehndiServiceType } from './booking';

export const GALLERY_CATEGORIES = [
  'All',
  'Bridal',
  'Arabic',
  'Eid',
  'Party Wear',
] as const;

export type GalleryCategoryFilter = (typeof GALLERY_CATEGORIES)[number];
export type GalleryCategoryName = Exclude<GalleryCategoryFilter, 'All'>;

export interface GalleryDesignItem {
  id: string;
  title: string;
  category: GalleryCategoryName;
  serviceType: MehndiServiceType;
  styleNote: string;
  duration: string;
  image: string;
  alt: string;
}

export interface GallerySection {
  category: GalleryCategoryName;
  title: string;
  description: string;
  items: GalleryDesignItem[];
}

export function filterGallerySections(
  sections: GallerySection[],
  activeCategory: GalleryCategoryFilter,
): GallerySection[] {
  if (activeCategory === 'All') {
    return sections;
  }
  return sections.filter((section) => section.category === activeCategory);
}

export function flattenGalleryItems(sections: GallerySection[]): GalleryDesignItem[] {
  return sections.flatMap((section) => section.items);
}

export function parseGalleryCategoryFromSearch(search: string): GalleryCategoryFilter {
  const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`);
  const requested = params.get('category')?.trim() ?? '';
  if (GALLERY_CATEGORIES.includes(requested as GalleryCategoryFilter)) {
    return requested as GalleryCategoryFilter;
  }
  const matched = GALLERY_CATEGORIES.find(
    (cat) => cat.toLowerCase() === requested.toLowerCase(),
  );
  return matched ?? 'All';
}

export function getAdjacentGalleryItem(
  items: GalleryDesignItem[],
  currentId: string,
  direction: 'prev' | 'next',
): GalleryDesignItem | null {
  if (items.length === 0) {
    return null;
  }
  const index = items.findIndex((item) => item.id === currentId);
  if (index === -1) {
    return items[0];
  }
  const offset = direction === 'next' ? 1 : -1;
  const nextIndex = (index + offset + items.length) % items.length;
  return items[nextIndex];
}
