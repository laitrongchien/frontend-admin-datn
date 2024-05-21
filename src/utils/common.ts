export const formatCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(1000 * value);
};

export const formatTime = (dateString: any) => {
  const date = new Date(dateString);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const formatTimeDate = (dateString: any) => {
  const date = new Date(dateString);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  return `${hours}:${minutes} ${day}-${month}-${year}`;
};

export const getTimeFromCreated = (created: any) => {
  const currentTime = new Date(Date.now()).getTime();
  const createdTime = new Date(created).getTime();
  const time = (currentTime - createdTime) / 1000;
  if (time < 60) return "Vừa xong";
  if (time >= 60 && time < 3600) return `${Math.floor(time / 60)} phút trước`;
  if (time >= 3600 && time < 86400)
    return `${Math.floor(time / 3600)} giờ trước`;
  if (time >= 86400 && time < 604800)
    return `${Math.floor(time / 86400)} ngày trước`;
  if (time >= 604800 && time < 4 * 604800)
    return `${Math.floor(time / 604800)} tuần trước`;
  if (time >= 30 * 86400 && time < 365 * 86400)
    return `${Math.floor(time / (30 * 86400))} tháng trước`;
  return `${Math.floor(time / (365 * 86400))} năm trước`;
};
