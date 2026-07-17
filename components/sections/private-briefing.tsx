"use client";

import { CheckCircle2, LoaderCircle, LockKeyhole, Mail, Send, ShieldCheck, Sparkles } from "lucide-react";
import { FormEvent, useState } from "react";
import { accessBudgets, accessInterests, accessRoles } from "@/lib/access-request";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

type FormStatus =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; message: string; preview: boolean; requestId?: string }
  | { state: "error"; message: string };

export function PrivateBriefing() {
  const [interest, setInterest] = useState<(typeof accessInterests)[number]>(accessInterests[0]);
  const [status, setStatus] = useState<FormStatus>({ state: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          role: formData.get("role"),
          interest,
          budget: formData.get("budget"),
          location: formData.get("location"),
          message: formData.get("message"),
          companyWebsite: formData.get("companyWebsite"),
          consent: formData.get("consent") === "on",
        }),
      });
      const data = (await response.json().catch(() => null)) as {
        error?: string;
        message?: string;
        requestId?: string;
        delivery?: string;
      } | null;

      if (!response.ok) {
        throw new Error(data?.error ?? "We could not send your request. Try again.");
      }

      setStatus({
        state: "success",
        message: data?.message ?? "Your request has been received.",
        preview: data?.delivery === "preview",
        requestId: data?.requestId,
      });
      form.reset();
      setInterest(accessInterests[0]);
    } catch (error) {
      setStatus({
        state: "error",
        message: error instanceof Error ? error.message : "We could not send your request. Try again.",
      });
    }
  }

  return (
    <section id="private-briefing" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Private intelligence briefing"
          title="Bring a mandate. Leave with a decision framework."
          copy="Tell NEXA what you are trying to acquire, where and with how much capital. The request is delivered securely through Resend to the NEXA work inbox."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-start">
          <GlassCard className="p-5 sm:p-7">
            <form onSubmit={handleSubmit} className="relative z-10 grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" name="name" autoComplete="name" required placeholder="Arnav Gupta" />
                <Field label="Work email" name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
                <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" placeholder="+91 98..." />
                <label className="grid gap-2 text-sm text-white/70">
                  Role
                  <select
                    name="role"
                    required
                    defaultValue=""
                    className="min-h-12 rounded-[8px] border border-white/12 bg-graphite-900 px-3 text-white focus:border-volt/45 focus:outline-none"
                  >
                    <option value="" disabled>Select your role</option>
                    {accessRoles.map((role) => <option key={role}>{role}</option>)}
                  </select>
                </label>
              </div>

              <fieldset>
                <legend className="text-sm text-white/70">Intelligence track</legend>
                <input type="hidden" name="interest" value={interest} />
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  {accessInterests.map((item) => (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={interest === item}
                      onClick={() => setInterest(item)}
                      className={`min-h-12 rounded-[8px] border px-3 text-sm font-semibold transition ${
                        interest === item
                          ? "border-volt/45 bg-volt/12 text-volt"
                          : "border-white/10 bg-white/[0.04] text-white/58 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-white/70">
                  Capital range
                  <select
                    name="budget"
                    required
                    defaultValue=""
                    className="min-h-12 rounded-[8px] border border-white/12 bg-graphite-900 px-3 text-white focus:border-volt/45 focus:outline-none"
                  >
                    <option value="" disabled>Select a range</option>
                    {accessBudgets.map((budget) => <option key={budget}>{budget}</option>)}
                  </select>
                </label>
                <Field label="Target market" name="location" required placeholder="Dholera, Bengaluru, DMIC..." />
              </div>

              <label className="grid gap-2 text-sm text-white/70">
                Mandate or decision question (optional)
                <textarea
                  name="message"
                  maxLength={1000}
                  rows={4}
                  placeholder="Example: Compare industrial land near Dholera and Nagpur for a 7-year hold."
                  className="resize-y rounded-[8px] border border-white/12 bg-black/25 px-3 py-3 text-white placeholder:text-white/30 focus:border-volt/45 focus:outline-none"
                />
              </label>

              <input type="text" name="companyWebsite" tabIndex={-1} autoComplete="off" hidden />

              <label className="flex items-start gap-3 text-sm leading-6 text-white/55">
                <input name="consent" type="checkbox" required className="mt-1 size-4 accent-[#78f7d4]" />
                NEXA may contact me about this request. I understand current product data is illustrative until licensed live sources are connected.
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={status.state === "submitting"}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-volt px-6 text-sm font-semibold text-graphite-950 transition hover:bg-white disabled:cursor-wait disabled:opacity-60"
                >
                  {status.state === "submitting" ? (
                    <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
                  ) : (
                    <Send aria-hidden="true" className="size-4" />
                  )}
                  {status.state === "submitting" ? "Delivering request" : "Request private briefing"}
                </button>
                <p className="flex items-center gap-2 text-xs text-white/40">
                  <LockKeyhole aria-hidden="true" className="size-3.5 text-volt" />
                  Server-side delivery. No public API key.
                </p>
              </div>

              <div aria-live="polite" className="min-h-6">
                {status.state === "success" ? (
                  <p className="flex items-start gap-2 text-sm leading-6 text-volt">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                    <span>
                      {status.message} {status.requestId ? `Reference ${status.requestId}.` : ""}
                      {status.preview ? " This environment is in Resend preview mode." : ""}
                    </span>
                  </p>
                ) : status.state === "error" ? (
                  <p className="text-sm text-red-300">{status.message}</p>
                ) : null}
              </div>
            </form>
          </GlassCard>

          <div className="grid gap-6 lg:pt-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-volt">What happens next</p>
              <div className="mt-6 grid gap-6">
                {[
                  [Sparkles, "Mandate triage", "Asset class, capital, horizon and target markets are structured into a decision brief."],
                  [ShieldCheck, "Evidence gate", "Unknowns, title risk and missing source evidence are surfaced before recommendations."],
                  [Mail, "Private follow-up", "Your request reaches the NEXA work inbox with a reply path to your email."],
                ].map(([Icon, title, copy], index) => {
                  const StepIcon = Icon as typeof Sparkles;
                  return (
                    <div key={String(title)} className="grid grid-cols-[44px_1fr] gap-4">
                      <span className="grid size-11 place-items-center rounded-[8px] border border-white/10 bg-white/[0.05] text-volt">
                        <StepIcon aria-hidden="true" className="size-5" />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-white/35">0{index + 1}</p>
                        <h3 className="mt-1 font-display text-xl font-semibold text-white">{String(title)}</h3>
                        <p className="mt-2 text-sm leading-7 text-white/58">{String(copy)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[8px] border border-volt/20 bg-volt/[0.07] p-5">
              <p className="flex items-center gap-2 font-semibold text-white">
                <ShieldCheck aria-hidden="true" className="size-4 text-volt" />
                Built for serious inquiries
              </p>
              <p className="mt-3 text-sm leading-7 text-white/58">
                No guaranteed-return language, no public client data, and no pretending an estimate is a verified fact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm text-white/70">
      {label}
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        maxLength={type === "email" ? 160 : 100}
        className="min-h-12 rounded-[8px] border border-white/12 bg-black/25 px-3 text-white placeholder:text-white/30 focus:border-volt/45 focus:outline-none"
      />
    </label>
  );
}
