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
// TODO: initialise this only once, move to top context
export function getFormattedCurrency(amount: number) {
  const currencyFormatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'SEK',
  });
  return currencyFormatter.format(amount);
}
