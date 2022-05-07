import { useQuery } from "react-query";
import chatApi from "../services/chatApi";

export function useMessage(roomId) {
  const queryKey = ["chatMessage", roomId];
  // const queryClient = useQueryClient();
  const {
    data: allMessage,
    refetch,
    isLoading,
    error,
  } = useQuery(queryKey, () => chatApi.getAllMessageRoom(roomId), {
    // refetchOnWindowFocus: false,
    enabled: !!roomId,
  });

  return {
    isLoading,
    error,
    refetch,
    allMessageRoom: allMessage,
  };
}
