import axios from "axios";

const axiosFormData = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}/api`,
  headers: {
    "content-type": "multipart/form-data",
  },
});

//Add a request interceptor
axiosFormData.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const userToken = localStorage.getItem("access_token");
    // console.log(userToken);

    if (config.url !== "/login" && userToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${userToken}`,
      };
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosFormData.interceptors.response.use(
  function (response) {
    if (response.status === 200) return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log(error);

    if (error.response) {
      // if (error.response.status >= 500) {
      //   alert("Server Internal Error");
      //   return;
      // }
      // if (error.response.status >= 402) {
      //   alert("Server Error!");
      //   return;
      // }
      if (error.response.status === 401) {
        // clear old token
        localStorage.removeItem("access_token");
        window.location.reload();
        //alert("Token error, reload the pages");
        // console.log("Token error , redirect to login and show notification");
        return;
      }
    }

    return Promise.reject(error.response);
  }
);

export default axiosFormData;
