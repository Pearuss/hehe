import axiosClient from "../utils/axiosClient";

const chatApi = {
  getListPersonChat() {
    const url = "/chat";
    return axiosClient.get(url);
  },
  getAllMessageRoom(id) {
    const url = `/chat/${id}`;
    return axiosClient.get(url);
  },
  sendMessage(payload) {
    const url = `/chat/${payload.chattingUserId}`;
    return axiosClient.post(url, { data: payload.data });
  },
};

export default chatApi;
