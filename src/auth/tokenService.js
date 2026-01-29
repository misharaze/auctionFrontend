const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";

export const getAccessToken = () =>
  localStorage.getItem(ACCESS_KEY);

export const getRefreshToken = () =>
  localStorage.getItem(REFRESH_KEY);

export const setAccessToken = (token) =>
  localStorage.setItem(ACCESS_KEY, token);

export const setRefreshToken = (token) =>
  localStorage.setItem(REFRESH_KEY, token);

export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token");

  const res = await fetch("http://localhost:4000/api/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    throw new Error("Refresh failed");
  }

  const data = await res.json();
  setAccessToken(data.accessToken);
  return data.accessToken;
};

export const logout = () => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  window.location.href = "/auth";
};
