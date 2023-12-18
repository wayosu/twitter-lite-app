import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useUsers = () => {
  const { 
    data, 
    error, 
    isLoading, 
    mutate 
  } = useSWR('/api/users', fetcher);

  return {
    data,
    isLoading,
    error,
    mutate
  }
}

export default useUsers;