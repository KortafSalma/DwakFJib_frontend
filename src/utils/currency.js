export const CURRENCY_SYMBOL = 'DH';
export const CURRENCY_CODE = 'MAD';

export const formatMAD = (value) => {
  if (value == null || isNaN(value)) return `0 ${CURRENCY_SYMBOL}`;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return `${num.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ${CURRENCY_SYMBOL}`;
};

export const formatMADShort = (value) => {
  if (value == null || isNaN(value)) return `0 ${CURRENCY_SYMBOL}`;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)} M ${CURRENCY_SYMBOL}`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)} k ${CURRENCY_SYMBOL}`;
  return `${num.toLocaleString('fr-FR')} ${CURRENCY_SYMBOL}`;
};

export const formatMADIntl = (value) => {
  if (value == null || isNaN(value)) return `0 ${CURRENCY_SYMBOL}`;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'MAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num).replace('MAD', 'DH').trim();
};

export const parseMAD = (formatted) => {
  if (!formatted) return 0;
  const cleaned = formatted.replace(/[^0-9,.-]/g, '').replace(',', '');
  return parseFloat(cleaned) || 0;
};

export default formatMAD;
