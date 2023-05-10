import moment from "moment";

function DateConversion(dateString) {
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
