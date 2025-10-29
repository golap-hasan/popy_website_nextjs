import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SuccessToast = (msg: String) => {
  toast.success(msg);
};
export const ErrorToast = (msg: String) => {
  toast.error(msg);
};
export const InfoToast = (msg: String) => {
  toast.info(msg);
};
export const WarningToast = (msg: String) => {
  toast.warning(msg);
};
