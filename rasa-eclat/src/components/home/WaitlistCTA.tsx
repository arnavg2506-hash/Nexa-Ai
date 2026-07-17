import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ParticleField } from "@/components/three/ParticleField";
import { useEmailJS } from "@/hooks/useEmailJS";

type WaitlistForm = { email: string };

export function WaitlistCTA() {
  const { register, handleSubmit, reset } = useForm<WaitlistForm>();
  const { state, send } = useEmailJS({ source: "waitlist" });

  const onSubmit = handleSubmit(async (values) => {
    const ok = await send(values);
    if (ok) reset();
  });

  return (
    <section id="contact-cta" className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-copper-cta px-5 py-24 text-center md:px-8">
      <ParticleField density={420} warm />
      <div className="relative z-10 mx-auto max-w-2xl">
        <p className="font-body text-[10px] uppercase tracking-[0.2em] text-ivory">Launching in Lucknow</p>
        <h2 className="mt-5 font-display text-[clamp(40px,6vw,80px)] font-light leading-none text-ivory">
          Be first to experience RASA ÉCLAT.
        </h2>
        <p className="mx-auto mt-6 max-w-md font-body text-base font-light leading-8 text-ivory/70">
          Join the founding circle. First 100 customers receive exclusive founding edition packaging.
        </p>
        {state === "success" ? (
          <p className="mt-10 font-display text-2xl italic text-copper-light">✦ You're on the list. We'll be in touch.</p>
        ) : (
          <form onSubmit={onSubmit} className="mx-auto mt-10 grid max-w-md gap-3">
            <Input
              type="email"
              placeholder="Your email address"
              required
              aria-invalid={state === "error"}
              {...register("email", { required: true })}
            />
            <Button type="submit" className="w-full bg-ivory text-obsidian hover:border-ivory hover:bg-ivory" disabled={state === "loading"}>
              {state === "loading" ? "Reserving..." : "Reserve Your Place"}
            </Button>
            {state === "error" ? <p className="text-left font-body text-sm text-warning">Something went wrong. Please try again.</p> : null}
          </form>
        )}
        <p className="mt-5 font-body text-[11px] font-light text-ivory/40">No spam. Ever. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
