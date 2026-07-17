import { useState } from "react";
import emailjs from "@emailjs/browser";

export type EmailState = "idle" | "loading" | "success" | "error";

export function useEmailJS(templateParams?: Record<string, string>) {
  const [state, setState] = useState<EmailState>("idle");

  async function send(values: Record<string, string>) {
    setState("loading");
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      if (!serviceId || !templateId || !publicKey || serviceId.startsWith("your_")) {
        await new Promise((resolve) => window.setTimeout(resolve, 650));
      } else {
        await emailjs.send(serviceId, templateId, { ...templateParams, ...values }, { publicKey });
      }
      setState("success");
      return true;
    } catch {
      setState("error");
      return false;
    }
  }

  return { state, send, reset: () => setState("idle") };
}
