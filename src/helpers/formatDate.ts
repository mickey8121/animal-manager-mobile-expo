type FormatDate = (value: string | Date, options?: Intl.DateTimeFormatOptions) => string | null;

const defaultOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const formatDate: FormatDate = (value, options = defaultOptions) => {
  const valueAsDate = new Date(value);

  if (!(valueAsDate instanceof Date)) return null;

  return valueAsDate.toLocaleDateString('en-US', options);
};

export default formatDate;
