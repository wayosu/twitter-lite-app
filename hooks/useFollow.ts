import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";
import useLoginModal from "./useLoginModal";
import axios from "axios";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const LoginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [userId, currentUser?.followingIds]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return LoginModal.onOpen();
    }

    try {
      let request;

      if (isFollowing) {
        request = () =>
          axios.delete("/api/follow", {
            data: {
              userId,
            },
          });
      } else {
        request = () =>
          axios.post("/api/follow", {
            userId,
          });
      }

      await request();

      mutateCurrentUser();
      mutateFetchedUser();

      if (!isFollowing) {
        toast.success("User followed");
      } else {
        toast.success("User unfollowed");
      }
    } catch (error) {
      toast.error("Failed to follow user");
    }
  }, [
    currentUser,
    isFollowing,
    userId,
    mutateCurrentUser,
    mutateFetchedUser,
    LoginModal,
  ]);

  return {
    isFollowing,
    toggleFollow,
  };
};


export default useFollow;