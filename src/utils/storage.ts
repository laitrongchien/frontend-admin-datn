export const getLocalAccessToken = () => {
  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage.getItem("user") as string);
    return user?.access_token;
  }
};

export const getLocalRefreshToken = () => {
  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage.getItem("user") as string);
    return user?.refresh_token;
  }
};

export const setUser = (user: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const removeUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
};

export const clear = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
};
