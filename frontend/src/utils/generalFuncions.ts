import moment from "moment";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const day = date.getDate();
  const monthName = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();
  return `${dayName}, ${day} ${monthName} ${year}`;
};

export const formatTime = (time: string) => {

  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  
  if (timeRegex.test(time)) {
  
    const [hours, minutes] = time.split(':');
    const timeToday = moment().hours(parseInt(hours)).minutes(parseInt(minutes)).seconds(0);
    
    return timeToday.format("hh:mm A");
  } 
  
  const parsedTime = moment(time);
  if (!parsedTime.isValid()) {
    console.error("Invalid date:", time);
    return "Invalid date";
  }
  return parsedTime.format("hh:mm A");
};