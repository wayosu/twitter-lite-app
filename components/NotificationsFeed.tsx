import { useEffect } from "react";
import { BsTwitter } from "react-icons/bs";

import useCurrentUser from "@/hooks/useCurrentUser";
import useNotications from "@/hooks/useNotifications";
import Link from "next/link";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser])

  if (fetchedNotifications.length === 0) {
    return (
      <div
        className="
          text-neutral-600
          text-center
          p-6
          text-xl
        "
      >
        You have no notifications.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <Link
          href={`/posts/${notification.postId}`}
          key={notification.id}
          className="
            flex
            flex-row
            items-center
            p-6
            gap-4
            border-b-[1px]
            border-neutral-800
            hover:bg-neutral-800
            transition
          "
        >
          <BsTwitter color="white" size={32} />
          <p className="text-white">
            {notification.body}
          </p>
        </Link>
      ))}
    </div>
  );
}
 
export default NotificationsFeed;