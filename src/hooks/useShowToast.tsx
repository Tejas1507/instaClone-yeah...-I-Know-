import { useCallback } from "react";
import { toaster } from "../components/ui/toaster";

const useShowToast = () => {
  //useCallback is used to prevent infinite loop, by caching the function
  const showToast = useCallback(
    (title: any, description: any, status: any) => {
      toaster.create({
        title: title,
        description: description,
        // status: status,
        duration: 3000,
        isClosable: true,
      });
    },
    [toaster]
  );
  return showToast;
};

export default useShowToast;
