import { useMutation, useQuery, useQueryClient } from "react-query";
import chatApi from "../services/chatApi";

export function useChat(roomId) {
  const queryKey = ["chat"];
  const queryKeyMessage = ["chatMessage"];
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery(
    queryKey,
    () => chatApi.getListPersonChat(),
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: allMessage, refetch } = useQuery(
    queryKeyMessage,
    () => chatApi.getAllMessageRoom(roomId),
    {
      refetchOnWindowFocus: false,
      enabled: !!roomId,
    }
  );

  return {
    isLoading,
    error,
    refetch,
    listRoomChat: data,
    allMessageRoom: allMessage,
  };
}
