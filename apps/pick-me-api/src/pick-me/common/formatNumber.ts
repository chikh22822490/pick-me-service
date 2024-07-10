export default function formatNumber(number?: number, unit?: string): string {
  let result;
  if (!number || Number(number.toFixed(3)) === 0) result = '0';
  else {
    result = number
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      .replace(/\./g, ',');
  }
  return unit ? result + ' ' + unit : result;
}
