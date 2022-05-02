import axiosClient from "../utils/axiosClient";

const authApi = {
  login(data) {
    const url = "/auth/login";
    return axiosClient.post(url, data);
  },

  //   getById(id: string): Promise<Student> {
  //     const url = `/quizzes/${id}`;
  //     return axiosClient.get(url);
  //   },
};

export default authApi;
