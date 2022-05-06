import { useQuery } from "react-query";
import profileApi from "../services/profileApi";

export function useProfile() {
  const queryKey = ["profile"];
  const { data, isLoading, refetch } = useQuery(
    queryKey,
    () => profileApi.getProfile(),
    {
      refetchOnWindowFocus: false,
    }
  );

  return {
    isLoading,
    refetch,
    profile: data,
  };
}
