export const SearchParams = {
  LOCATION: 'location',
  CHECKIN: 'checkin',
  CHECKOUT: 'checkout',
} as const;

export type SearchParamsType = typeof SearchParams;
