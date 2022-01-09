// vanilla formatters, can be used without react-intl provider
// For now I am using react-intl
export function getFormattedDate(date: Date) {
  const dateFormatter = new Intl.DateTimeFormat('sv-SE', {
    dateStyle: 'short',
  });

  return dateFormatter
    .formatToParts(date)
    .map(({ type, value }) => {
      switch (type) {
        case 'literal':
          return `/`;
        default:
          return value;
      }
    })
    .join('');
}

export function getFormattedCurrency(amount: number, currency: string) {
  const currencyFormatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
  });
  return currencyFormatter.format(amount);
}
