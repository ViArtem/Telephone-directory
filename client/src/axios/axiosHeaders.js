import axios from "axios";
import validateRefresh from "./refreshRequest.js";
axios.interceptors.request.use(function (req) {
  return req;
});

axios.interceptors.response.use(
  (res) => {
    if (res.data.success === "Avatar updated") {
      return localStorage.setItem("Authorization", res.data.access);
    }

    if (res.data.success === "User is authorized") {
      localStorage.setItem("Refresh", res.data.refresh);
      return localStorage.setItem("Authorization", res.data.data);
    }

    if (res.data.success === "The user is registered") {
      localStorage.setItem("Refresh", res.data.refreshToken);

      return localStorage.setItem("Authorization", res.data.accessToken);
    }

    return res;
  },
  async (error) => {
    if (error.response.status === 401) {
      try {
        const originalRequest = error.config;

        const isValidate = await validateRefresh();

        if (!Object.keys(isValidate.data).length) {
          localStorage.clear();
          return (window.location.href = "/");
        }

        if (isValidate.data.access) {
          localStorage.setItem("Authorization", isValidate.data.access);
          localStorage.setItem("Refresh", isValidate.data.refresh);

          setAuthToken(
            localStorage.getItem("Authorization"),
            localStorage.getItem("Refresh")
          );

          if (originalRequest.method === "get") {
            return axios.get(originalRequest.url);
          }

          if (originalRequest.method === "post") {
            return axios.post(
              originalRequest.url,
              typeof originalRequest.data === "string"
                ? JSON.parse(originalRequest.data)
                : originalRequest.data
            );
          }

          if (originalRequest.method === "put") {
            return axios.put(
              originalRequest.url,
              JSON.parse(originalRequest.data)
            );
          }

          if (originalRequest.method === "delete") {
            return axios.delete(originalRequest.url, {
              data: JSON.parse(originalRequest.data),
            });
          }
        }
        return error;
      } catch (e) {
        return e;
      }
    }
    if (error.response.status === 403) {
      localStorage.clear();

      return (window.location.href = "/");
    }

    return error;
  }
);

export const setAuthToken = (access, refresh) => {
  if (access) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    axios.defaults.headers.common["Refresh"] = refresh;
  } else delete axios.defaults.headers.common["Authorization"];
};
