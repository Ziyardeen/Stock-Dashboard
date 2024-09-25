import dayjs from "dayjs";

export const convertDateToUnixTimestamp = (date) => {
  return Math.floor(date.getTime() / 1000);
};
export const convertUnixTimestampToDate = (unixTimeStamp) => {
  // const milliseconds = unixTimeStamp * 1000;
  return new Date(unixTimeStamp).toLocaleDateString();
};
export const createDate = (date, days, weeks, months, years) => {
  let newDate = date;
  newDate.setDate(newDate.getDate() + days + 7 * weeks);
  newDate.setMonth(newDate.getMonth() + months);
  newDate.setFullYear(newDate.getFullYear() + years);

  return newDate;
};

export const filterStock = (data, filter) => {
  const today = dayjs();
  let startDate;

  switch (filter) {
    case "1W":
      startDate = today.subtract(7, "day");
      break;
    case "1M":
      startDate = today.subtract(1, "month");
      break;
    case "1Y":
      startDate = today.subtract(1, "year");
      break;
    default:
      throw new Error("Invalid range specified. Use '1W', '1M', or '1Y'.");
  }

  const filteredStock = Object.entries(data).filter(([date, data]) => {
    return dayjs(date).isAfter(startDate);
  });

  return Object.fromEntries(filteredStock);
};
