export const accessRoles = [
  "Investor",
  "Home buyer",
  "Developer",
  "Advisor / broker",
  "Lender / institution",
  "Other",
] as const;

export const accessInterests = ["Land & plots", "Homes & apartments", "Portfolio intelligence"] as const;

export const accessBudgets = [
  "Below INR 50L",
  "INR 50L - 1Cr",
  "INR 1Cr - 5Cr",
  "INR 5Cr - 25Cr",
  "INR 25Cr+",
  "Institutional / custom",
] as const;

export type AccessRequest = {
  name: string;
  email: string;
  phone: string;
  role: (typeof accessRoles)[number];
  interest: (typeof accessInterests)[number];
  budget: (typeof accessBudgets)[number];
  location: string;
  message: string;
  consent: true;
};

type ParseResult =
  | { ok: true; data: AccessRequest; honeypot: string }
  | { ok: false; error: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, maxLength) : "";
}

export function parseAccessRequest(value: unknown): ParseResult {
  if (!value || typeof value !== "object") {
    return { ok: false, error: "Enter your contact details to request a briefing." };
  }

  const input = value as Record<string, unknown>;
  const name = clean(input.name, 80);
  const email = clean(input.email, 160).toLowerCase();
  const phone = clean(input.phone, 32);
  const role = clean(input.role, 40);
  const interest = clean(input.interest, 40);
  const budget = clean(input.budget, 40);
  const location = clean(input.location, 100);
  const message = clean(input.message, 1000);
  const honeypot = clean(input.companyWebsite, 160);

  if (name.length < 2) {
    return { ok: false, error: "Enter your full name." };
  }

  if (!emailPattern.test(email)) {
    return { ok: false, error: "Enter a valid work email address." };
  }

  if (!accessRoles.includes(role as AccessRequest["role"])) {
    return { ok: false, error: "Select the role that best matches you." };
  }

  if (!accessInterests.includes(interest as AccessRequest["interest"])) {
    return { ok: false, error: "Select an intelligence track." };
  }

  if (!accessBudgets.includes(budget as AccessRequest["budget"])) {
    return { ok: false, error: "Select an approximate capital range." };
  }

  if (location.length < 2) {
    return { ok: false, error: "Enter a city, district, or corridor of interest." };
  }

  if (input.consent !== true) {
    return { ok: false, error: "Confirm that NEXA may contact you about this request." };
  }

  return {
    ok: true,
    honeypot,
    data: {
      name,
      email,
      phone,
      role: role as AccessRequest["role"],
      interest: interest as AccessRequest["interest"],
      budget: budget as AccessRequest["budget"],
      location,
      message,
      consent: true,
    },
  };
}
