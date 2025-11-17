import { SHOP_CONSTANTS, METADATA_TEMPLATES } from './constants';

/**
 * Converts a slug string to a human-readable format
 * Example: 'science-fiction' -> 'Science Fiction'
 */
export const humanizeCategory = (slug: string): string => {
  if (!slug) return '';
  
  return slug
    .split('-')
    .map((part) => part && part[0].toUpperCase() + part.slice(1))
    .join(' ')
    .trim();
};

/**
 * Generates a price range description based on min and max prices
 */
export const getPriceDescription = (minPrice?: string, maxPrice?: string): string => {
  if (minPrice && maxPrice) return ` with prices between ৳${minPrice} and ৳${maxPrice}`;
  if (minPrice) return ` with prices above ৳${minPrice}`;
  if (maxPrice) return ` with prices below ৳${maxPrice}`;
  return '';
};

/**
 * Processes sort text for display
 */
export const processSortText = (sortValue?: string): string => {
  if (!sortValue) return '';
  return sortValue
    .replace(/,?(\s*)/g, ' and ')
    .replace('-', 'descending ');
};

/**
 * Gets the appropriate metadata based on search and category
 */
export const getPageMetadata = (searchTerm: string, category: string) => {
  if (!searchTerm && !category) {
    return {
      title: SHOP_CONSTANTS.BASE_TITLE,
      description: SHOP_CONSTANTS.BASE_DESCRIPTION,
    };
  }

  const catLabel = humanizeCategory(category);
  
  if (searchTerm && category) {
    return METADATA_TEMPLATES.SEARCH_AND_CATEGORY(catLabel, searchTerm);
  }
  
  if (searchTerm) {
    return METADATA_TEMPLATES.SEARCH_ONLY(searchTerm);
  }
  
  return METADATA_TEMPLATES.CATEGORY_ONLY(catLabel);
};
