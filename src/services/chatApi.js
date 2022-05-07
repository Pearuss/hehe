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
  searchUser(value) {
    const url = `/user?content=${value}`;
    return axiosClient.get(url);
  },
  videoCall(friendId, data) {
    const url = `/chat/${friendId}`;
    return axiosClient.post(url, data);
  },
  getFriend(chatId) {
    const url = `/chat/friend/${chatId}`;
    return axiosClient.get(url);
  },
};

export default chatApi;
