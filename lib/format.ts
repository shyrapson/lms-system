export const formatPrice = (price: number) => {
  return Intl.NumberFormat('en-US', {
    currency: 'USD',
  }).format(price);
};
