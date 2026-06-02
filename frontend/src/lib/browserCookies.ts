import { SESSION_COOKIE_MAX_AGE_SECONDS } from "./sessionCookies";

export const setBrowserCookie = (name: string, value: string): void => {
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    `Max-Age=${SESSION_COOKIE_MAX_AGE_SECONDS}`,
    "SameSite=Lax",
  ];

  if (window.location.protocol === "https:") {
    parts.push("Secure");
  }

  document.cookie = parts.join("; ");
};
