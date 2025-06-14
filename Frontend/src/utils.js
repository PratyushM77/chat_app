import { toast } from "react-toastify";

export const handleSuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
    hideProgressBar: false,
    progress: undefined,
    pauseOnHover: false,
  });
};
export const handleError = (msg) => {
  toast.error(msg, {
    position: "top-right",
    hideProgressBar: false,
    progress: undefined,
    pauseOnHover: false,
  });
};
