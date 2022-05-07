import {  useQuery } from "react-query";
import chatApi from "../services/chatApi";

export function useChat() {
  const queryKey = ["chat"];
  // const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    error,
    refetch: refetchListRoom,
  } = useQuery(queryKey, () => chatApi.getListPersonChat(), {
    refetchOnWindowFocus: false,
  });

  return {
    isLoading,
    error,
    refetchListRoom,
    listRoomChat: data,
  };
}
