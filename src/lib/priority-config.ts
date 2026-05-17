export const PRIORITY_CONFIG = {
  priceMonthly: 299, // PLN — zmień tutaj aby A/B testować np. 199
  currency: 'PLN',
  slaHours: 2,
  businessHours: { start: 9, end: 18 },
  businessDays: [1, 2, 3, 4, 5] as number[], // pn=1 … pt=5
  reps: [
    { id: 'r1', name: 'Anna K.', initials: 'AK' },
    { id: 'r2', name: 'Marcin W.', initials: 'MW' },
    { id: 'r3', name: 'Karolina S.', initials: 'KS' },
  ],
} as const;
