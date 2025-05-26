export const formatDate = (dateString: string): string => {

  if(!dateString) return "Unknown date";

  const timestamp = Number(dateString);
  let date: Date;  
  // Check if the date is valid
  if (!isNaN(timestamp) && dateString.trim().length >=10) {
    date = new Date(timestamp);
  } else {
    const isoString = dateString.trim().replace(' ', 'T');
    date = new Date(isoString);
  }
  
  if(isNaN(date.getTime())) {
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
