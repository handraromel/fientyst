import { toast } from "react-toastify";

const useToast = () => {
  const showToast = (text, type = "default") => {
    if (type === "success") {
      toast.success(text);
    } else if (type === "error") {
      toast.error(text);
    } else if (type === "info") {
      toast.info(text);
    } else {
      toast(text);
    }
  };

  return { showToast };
};

export default useToast;
