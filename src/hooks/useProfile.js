import { useMutation, useQuery, useQueryClient } from "react-query";
import profileApi from "../services/profileApi";

export function useProfile() {
  const queryKey = ["profile"];
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery(
    queryKey,
    () => profileApi.getProfile(),
    {
      refetchOnWindowFocus: false,
    }
  );

  return {
    isLoading,
    error,
    profile: data,
  };
}
