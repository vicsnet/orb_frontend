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