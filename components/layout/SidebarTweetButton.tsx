import { useRouter } from "next/router";
import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";

const SidebarTweetButton = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  const onClick = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    router.push('/');
  }, [loginModal, router, currentUser]);

  return (
    <div onClick={onClick} className="flex justify-center lg:block">
      <div
        className="
          mt-2
          lg:hidden
          rounded-full
          h-11
          w-11
          p-3
          flex
          items-center
          justify-center
          bg-sky-500
          hover:bg-opacity-80
          transition
          cursor-pointer
        "
      >
        <FaFeather size={24} color="white" />
      </div>
      <div
        className="
          mt-6
          hidden
          lg:block
          px-4
          py-2
          rounded-full
          bg-sky-500
          hover:bg-opacity-80
          transition
          cursor-pointer
        "
      >
        <p className="
          hidden
          lg:block
          text-center
          font-semibold
          text-white
          text-[20px]
        ">
          Tweet
        </p>
      </div>
    </div>    
  );
}
 
export default SidebarTweetButton;