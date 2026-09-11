export type CoverSource = {
  image_url?: string | null;
  primary_image_url?: string | null;
  isbn13?: string | null;
  isbn10?: string | null;
  book_images?: Array<{ url?: string | null; position?: number | null }> | null;
};

/** Prefer https so Expo web / mixed-content pages can load Google Books covers. */
export function secureImageUrl(url: string | null | undefined): string | null {
  const trimmed = (url ?? "").trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("http://")) {
    return `https://${trimmed.slice("http://".length)}`;
  }
  return trimmed;
}

export function openLibraryIsbnCover(isbn: string | null | undefined): string | null {
  const digits = (isbn ?? "").replace(/[^0-9Xx]/g, "");
  if (digits.length !== 10 && digits.length !== 13) return null;
  return `https://covers.openlibrary.org/b/isbn/${digits}-L.jpg?default=false`;
}

/** Seller photo → stored primary cover → ISBN art. No letter monograms. */
export function listingCoverCandidates(row: CoverSource): string[] {
  const fromGallery =
    row.book_images?.find((image) => image.position === 0)?.url ??
    row.book_images?.[0]?.url ??
    null;
  const urls = [
    secureImageUrl(fromGallery),
    secureImageUrl(row.image_url),
    secureImageUrl(row.primary_image_url),
    openLibraryIsbnCover(row.isbn13),
    openLibraryIsbnCover(row.isbn10),
  ];
  return [...new Set(urls.filter((url): url is string => Boolean(url)))];
}

export function resolveListingCover(row: CoverSource): string | null {
  return listingCoverCandidates(row)[0] ?? null;
}
