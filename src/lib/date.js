import dayjs from "dayjs";

export const formatDate = (date) => {
  return dayjs(date).format("DD MMM YYYY");
};

export const formatTime = (date) => {
  return dayjs(date).format("hh:mm A");
};

export const formatDateTime = (date) => {
  return dayjs(date).format("DD MMM YYYY • hh:mm A");
};
