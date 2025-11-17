// Base constants
export const SHOP_CONSTANTS = {
  BASE_TITLE: 'Shop Books | Popy Library',
  BASE_DESCRIPTION:
    'Browse and purchase books online from Popy Library. Discover best sellers, academic guides, and new arrivals.',
} as const;

// Metadata templates
export const METADATA_TEMPLATES = {
  SEARCH_AND_CATEGORY: (category: string, searchTerm: string) => ({
    title: `Books in ${category} matching "${searchTerm}" | Popy Library`,
    description: `Browse books from the ${category} category in Popy Library that match "${searchTerm}".`,
  }),
  SEARCH_ONLY: (searchTerm: string) => ({
    title: `Search results for "${searchTerm}" | Popy Library`,
    description: `Browse books from Popy Library that match your search for "${searchTerm}".`,
  }),
  CATEGORY_ONLY: (category: string) => ({
    title: `${category} Books | Popy Library`,
    description: `Discover ${category} books from Popy Library, including best sellers and new arrivals.`,
  }),
} as const;
