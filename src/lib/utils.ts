/* eslint-disable @typescript-eslint/no-explicit-any */

import { clsx } from "clsx";
import { format } from "date-fns";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

// Replace White Background
export const replaceWhiteBackground = (html: string) => {
  if (!html) return "";

  return html.replace(/style="([^"]*)"/g, (match, styleString: string) => {
    const styleProperties = styleString
      .split(";")
      .filter((prop: string) => prop.trim() !== "");

    const filteredProperties = styleProperties.filter((prop: string) => {
      const i = prop.indexOf(":");
      if (i === -1) return true;

      const propName = prop.substring(0, i).trim();
      const propValue = prop.substring(i + 1).trim();

      // Exclude 'background-color' only if it's white
      if (propName === "background-color") {
        const lowerCaseValue = propValue.toLowerCase().replace(/\s/g, "");
        if (
          lowerCaseValue === "white" ||
          lowerCaseValue === "#fff" ||
          lowerCaseValue === "#ffffff" ||
          lowerCaseValue === "rgb(255,255,255)"
        ) {
          return false;
        }
      }

      return true;
    });

    if (filteredProperties.length > 0) {
      const newStyleString = filteredProperties.join("; ");
      return `style="${newStyleString};"`;
    } else {
      return "";
    }
  });
};

// Success Toast
export const SuccessToast = (msg: string) => {
  toast.success(msg);
};

// Error Toast
export const ErrorToast = (msg: string) => {
  toast.error(msg);
};

// Warning Toast
export const WarningToast = (msg: string) => {
  toast.warning(msg);
};

// Info Toast
export const InfoToast = (msg: string) => {
  toast.info(msg);
};

// Get Initials
export const getInitials = (name: string) => {
  if (!name) return "NA";
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || "N";
  const second = parts[1]?.[0] || parts[0]?.[1] || "A";
  return (first + second).toUpperCase();
};

// Format Date
export const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd MMM yyyy");
};

// Time Ago
export const timeAgo = (createdAt: string) => {
  if (!createdAt) return "";
  const s = Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000);
  if (s < 60) return "Just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
};

// Format date for display
export const formatDateForDisplay = (dateString?: string) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60)
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  if (diffInHours < 24)
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  if (diffInDays < 7)
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
