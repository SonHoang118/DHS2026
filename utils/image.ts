export type NormalizedImage = {
  link: string;
  id: string;
};

type RawImageLike =
  | string
  | {
      link?: unknown;
      id?: unknown;
      url?: unknown;
      src?: unknown;
    };

type NormalizeImageOptions = {
  includeUrl?: boolean;
  includeSrc?: boolean;
};

export function normalizeImageRecords(
  rawImages: unknown,
  options: NormalizeImageOptions = {}
): NormalizedImage[] {
  if (!Array.isArray(rawImages)) {
    return [];
  }

  const normalized = rawImages
    .map((rawItem) => {
      const item = rawItem as RawImageLike;

      if (typeof item === 'string') {
        const link = item.trim();
        return link ? { link, id: '' } : null;
      }

      if (!item || typeof item !== 'object') {
        return null;
      }

      const linkFromLink = typeof item.link === 'string' ? item.link.trim() : '';
      const linkFromUrl = options.includeUrl && typeof item.url === 'string' ? item.url.trim() : '';
      const linkFromSrc = options.includeSrc && typeof item.src === 'string' ? item.src.trim() : '';
      const link = linkFromLink || linkFromUrl || linkFromSrc;
      const id = typeof item.id === 'string' ? item.id.trim() : '';

      if (!link) {
        return null;
      }

      return { link, id };
    })
    .filter((image): image is NormalizedImage => Boolean(image));

  const seen = new Set<string>();
  return normalized.filter((image) => {
    const key = image.id || image.link;
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export function extractImageLinks(
  rawImages: unknown,
  options: NormalizeImageOptions = {}
): string[] {
  return normalizeImageRecords(rawImages, options).map((image) => image.link);
}
