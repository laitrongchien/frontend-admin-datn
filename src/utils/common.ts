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
