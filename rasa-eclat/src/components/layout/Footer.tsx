import { Instagram, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useEmailJS } from "@/hooks/useEmailJS";

type FooterForm = { email: string };

export function Footer() {
  const { register, handleSubmit, reset } = useForm<FooterForm>();
  const { state, send } = useEmailJS({ source: "footer" });

  const onSubmit = handleSubmit(async (values) => {
    const ok = await send(values);
    if (ok) reset();
  });

  return (
    <footer className="border-t border-copper/20 bg-obsidian px-5 py-16 md:px-8">
      <div className="mx-auto grid max-w-[1320px] gap-12 md:grid-cols-[1.3fr_1fr_1.3fr]">
        <div>
          <div className="font-display text-[28px] font-normal tracking-[0.16em] text-ivory">RASA ÉCLAT</div>
          <p className="mt-5 max-w-xs font-body text-sm font-light leading-7 text-ivory-dim">
            Lucknow, Uttar Pradesh, India
            <br />
            Est. 2026
          </p>
          <div className="mt-8 flex gap-3">
            <a className="border border-copper/30 p-3 text-ivory-dim hover:text-copper" href="https://instagram.com/rasaeclat" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a className="border border-copper/30 p-3 text-ivory-dim hover:text-copper" href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || "91XXXXXXXXXX"}`} aria-label="WhatsApp">
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <h2 className="font-body text-[12px] uppercase tracking-[0.16em] text-copper">Navigate</h2>
          <div className="mt-6 flex flex-col gap-3 font-body text-sm font-light text-ivory-dim">
            <Link to="/">Maison</Link>
            <Link to="/collection">Collection</Link>
            <Link to="/story">Story</Link>
            <Link to="/#vessel">Atelier</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h2 className="font-body text-[12px] uppercase tracking-[0.16em] text-copper">The Founding Circle</h2>
          {state === "success" ? (
            <p className="mt-6 font-display text-2xl italic text-copper">✦ You're on the list.</p>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
              <Input type="email" placeholder="Your email address" required {...register("email", { required: true })} />
              <Button type="submit" disabled={state === "loading"}>
                {state === "loading" ? "Joining..." : "Join"}
              </Button>
              {state === "error" ? <p className="sm:col-span-2 text-sm text-warning">Something went wrong. Try WhatsApp instead.</p> : null}
            </form>
          )}
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-[1320px] flex-col justify-between gap-3 border-t border-copper/10 pt-6 font-body text-[11px] font-light text-ivory-dim md:flex-row">
        <p>© 2026 RASA ÉCLAT. All rights reserved.</p>
        <p>Crafted in Lucknow.</p>
      </div>
    </footer>
  );
}
