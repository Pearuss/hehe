import axiosClient from "../utils/axiosClient";

const profileApi = {
  getProfile() {
    const url = "/user/me";
    return axiosClient.get(url);
  },
};

export default profileApi;
