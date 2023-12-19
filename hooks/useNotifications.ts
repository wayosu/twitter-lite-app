import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useNotications = (userId?: string) => {
  const url = userId ? `/api/notifications/${userId}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
}

export default useNotications;