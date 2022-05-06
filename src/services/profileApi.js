import axiosClient from "../utils/axiosClient";
import axiosFormData from "../utils/axiosFormData";

const profileApi = {
  getProfile() {
    const url = "/user/me";
    return axiosClient.get(url);
  },
  updateProfile(data) {
    const url = "/user";
    return axiosFormData.post(url, data);
  },
};

export default profileApi;
