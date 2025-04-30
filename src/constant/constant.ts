export const epochToTime =(epochTime:string)=>{
    // const epochTime = 1727827200;

// Convert epoch time to milliseconds by multiplying by 1000
const date = new Date(Number(epochTime) * 1000);

// Format the date as a string (e.g., DD/MM/YYYY)
const dateString = date.toLocaleDateString("en-GB"); // "en-GB" for DD/MM/YYYY format
return dateString;
}

export const currentDate =()=>{
    const date = new Date()
    const dateString = date.toLocaleDateString("en-GB")
    return dateString;
}

export function padHexAddress(address:string ){
   
        address = '0x0' + address.substring(2); 
    return address
}

export function timeAgo(date: string) {
    const now = new Date();
    const dateGiven = new Date(date);
    const difference = dateGiven.getTime() - now.getTime();  // Notice we're now subtracting 'now' from 'dateGiven'
  
    const absDifference = Math.abs(difference);
    const seconds = Math.floor(absDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    if (difference < 0) {
      // Date is in the past
      if (years > 0) return `${years} years ago`;
      if (months > 0) return `${months} months ago`;
      if (days > 0) return `${days} days ago`;
      if (hours > 0) return `${hours} hours ago`;
      if (minutes > 0) return `${minutes} minutes ago`;
      return `${seconds} seconds ago`;
    } else {
      // Date is in the future
      if (years > 0) return `in ${years} years`;
      if (months > 0) return `in ${months} months`;
      if (days > 0) return `in ${days} days`;
      if (hours > 0) return `in ${hours} hours`;
      if (minutes > 0) return `in ${minutes} minutes`;
      return `in ${seconds} seconds`;
    }
  }
  
 

  
  