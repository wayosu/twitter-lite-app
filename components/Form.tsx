import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";

import Button from "./Button";
import Avatar from "./Avatar";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post("/api/posts", { body });

      toast.success("Tweet created successfully.");

      setBody("");
      mutatePosts();
    } catch (error) {
      toast.error("An error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4 my-4">
          <div>
            <Avatar
              userId={currentUser?.id}
            />
          </div>
          <div className="w-full">
            <textarea 
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              placeholder={placeholder}
              className="
                disabled:opacity-80
                peer
                resize-none
                w-full
                bg-transparent
                text-white
                placeholder-neutral-500
                outline-none
                ring-0
                font-normal
                text-[20px]
              "
            />
            <hr 
              className="
                opacity-0
                peer-focus:opacity-100
                h-[1px]
                w-full
                border-neutral-800
                transition
              " 
            />
            <div className="mt-4 flex flex-row justify-end">
              <Button
                disabled={isLoading || !body}
                onClick={onSubmit}
                label="Tweet"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1
            className="
            text-white
            text-2xl
            text-center
            mb-4
            font-bold
          "
          >
            Welcome to Twitter
          </h1>
          <div
            className="
            flex
            flex-row
            item-center
            justify-center
            gap-4
          "
          >
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
