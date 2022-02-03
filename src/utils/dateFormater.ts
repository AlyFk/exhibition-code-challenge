export const EDATEwFormat = (date: string) => {
  let d = new Date(date);
  let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  let mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d);
  let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  return `${da}.${mo}.${ye}`;
};
