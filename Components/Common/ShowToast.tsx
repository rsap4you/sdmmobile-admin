import toast from "react-hot-toast";
const toastStyles = {
  success: {
    background: 'linear-gradient(135deg, #e0e0e0, #f8f8f8)',
    border: 'solid #4caf50',
    borderWidth: '0 0 0 6px', 
    color: '#388e3c', 
    boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.15)',
  },
  error: {
    background: '#ffebee', 
    border: '1px solid #f44336',
    color: '#f44336', 
    boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.2)', 
  },
  warning: {
    background: 'rgba(255, 245, 224, 0.7)', 
    border: 'solid #ffb300', 
    borderWidth: '0 0 0 6px', 
    color: '#ffb300',
    boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.2)',
  },
};

export default function ShowToast(
  message: any,
  type: "success" | "error" | "warning", 
  position: "top-center" | "top-right" | "top-left" | "bottom-right" | "bottom-left" | "bottom-center" = "top-center"
) {
  const toastParam = {
    position: position,
    autoClose: 3000, 
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    hideProgressBar: false,
    style: toastStyles[type], 
  };

  const toastLoad = (type: "success" | "error" | "warning") => {
    switch (type) {
      case "success":
        toast.success(message, toastParam);
        break;
      case "error":
        toast.error(message, toastParam);
        break;
      case "warning":
        toast(message, { ...toastParam, style: toastStyles.warning });
        break;
      default:
        console.log("No type matched for toast");
    }
  };

  toastLoad(type);
}
