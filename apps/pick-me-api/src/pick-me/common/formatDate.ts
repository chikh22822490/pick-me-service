export default function formatDate(date: Date | undefined): string {
  if (!date) {
    return '';
  }
  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  const formatedDateString = new Date(date).toLocaleDateString(
    'fr-FR',
    dateFormatOptions
  );
  return formatedDateString;
}
