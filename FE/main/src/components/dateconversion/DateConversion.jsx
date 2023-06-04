import moment from "moment";

function arrayToDate(dateArray) {
  const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4], dateArray[5], dateArray[6] / 1000000);
  return date.toISOString();
}

function DateConversion(dateArray) {
  const dateString = arrayToDate(dateArray);
  const date = moment(dateString);
  const now = moment();

  const minutes = now.diff(date, "minutes");
  const hours = now.diff(date, "hours");
  const days = now.diff(date, "days");
  const weeks = now.diff(date, "weeks");
  const months = now.diff(date, "months");

  if (minutes < 60) {
    return `${minutes}분 전`;
  } else if (hours < 24) {
    return `${hours}시간 전`;
  } else if (days < 7) {
    return `${days}일 전`;
  } else if (weeks < 5) {
    return `${weeks}주 전`;
  } else {
    return `${months}개월 전`;
  }
}

export default DateConversion;


