import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterGallerySections,
  flattenGalleryItems,
  getAdjacentGalleryItem,
  parseGalleryCategoryFromSearch,
} from './galleryFilter';
import { GALLERY_SECTIONS } from '../data/mehndiData';

test('GALLERY_SECTIONS contains 4 categories with 3 distinct items each', () => {
  assert.equal(GALLERY_SECTIONS.length, 4);
  for (const section of GALLERY_SECTIONS) {
    assert.equal(section.items.length, 3);
  }
  const allItems = flattenGalleryItems(GALLERY_SECTIONS);
  const uniqueImages = new Set(allItems.map((i) => i.image));
  assert.equal(uniqueImages.size, 12);
});

test('filterGallerySections returns all sections for All and single section for specific category', () => {
  assert.equal(filterGallerySections(GALLERY_SECTIONS, 'All').length, 4);
  const arabic = filterGallerySections(GALLERY_SECTIONS, 'Arabic');
  assert.equal(arabic.length, 1);
  assert.equal(arabic[0].category, 'Arabic');
  assert.equal(arabic[0].items.length, 3);
});

test('parseGalleryCategoryFromSearch parses query string safely', () => {
  assert.equal(parseGalleryCategoryFromSearch('?category=Eid'), 'Eid');
  assert.equal(parseGalleryCategoryFromSearch('?category=party%20wear'), 'Party Wear');
  assert.equal(parseGalleryCategoryFromSearch('?category=invalid'), 'All');
});

test('getAdjacentGalleryItem wraps around cleanly for prev and next', () => {
  const items = flattenGalleryItems(GALLERY_SECTIONS);
  const first = items[0];
  const last = items[items.length - 1];

  assert.equal(getAdjacentGalleryItem(items, first.id, 'prev')?.id, last.id);
  assert.equal(getAdjacentGalleryItem(items, last.id, 'next')?.id, first.id);
  assert.equal(getAdjacentGalleryItem(items, first.id, 'next')?.id, items[1].id);
});
