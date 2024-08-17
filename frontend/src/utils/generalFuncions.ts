export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const day = date.getDate();
  const monthName = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();
  return `${dayName}, ${day} ${monthName} ${year}`;
};

export const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata", 
  };

  
  return date.toLocaleTimeString("en-IN", options);
};