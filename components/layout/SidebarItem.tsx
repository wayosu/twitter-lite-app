import React, { useCallback } from "react";
import { IconType } from "react-icons";
import { useRouter } from "next/router";
import { BsDot } from "react-icons/bs";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  label, 
  href, 
  icon: Icon, 
  onClick ,
  auth,
  alert
}) => {
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const router = useRouter();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, href, onClick, currentUser, auth, loginModal]);

  return ( 
    <div onClick={handleClick} className="flex flex-row items-center justify-center lg:justify-start">
      <div 
        className="
          relative
          rounded-full
          h-12
          w-12
          flex
          items-center
          justify-center
          p-3
          hover:bg-blue-300
          hover:bg-opacity-10
          cursor-pointer
          lg:hidden
        "
      >
        <Icon size={28} color="white" />
        {alert ? 
          <BsDot 
            className="
              text-sky-500 
              absolute
              -top-4
              left-0
            "
            size={70}
          /> 
        : null}
      </div>
      <div
        className="
          relative
          hidden
          lg:flex
          items-center
          gap-4
          p-4
          rounded-full
          hover:bg-slate-300
          hover:bg-opacity-10
          cursor-pointer
        "
      >
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">
          {label}
        </p>
        {alert ? 
          <BsDot 
            className="
              text-sky-500 
              absolute
              -top-4
              left-0
            "
            size={70}
          /> 
        : null}
      </div>
    </div>
  );
}
 
export default SidebarItem;