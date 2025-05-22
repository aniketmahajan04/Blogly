export const formatDate = (dateString: string): string => {
  if(!dateString) return "Unknown date"
  const isoString = dateString.replace(' ', 'T');
  const date = new Date(isoString);
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  // Options for formatting
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  
  return date.toLocaleDateString('en-US', options);
};
