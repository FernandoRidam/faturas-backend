export const normalizeString = ( value: string ): string => {
  return value.toLowerCase().normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
};
