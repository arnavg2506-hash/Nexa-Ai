import { Instagram, Mail, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { useEmailJS } from "@/hooks/useEmailJS";

type ContactForm = {
  name: string;
  email: string;
  enquiry: string;
  message: string;
};

export default function Contact() {
  const { register, handleSubmit, reset } = useForm<ContactForm>();
  const { state, send } = useEmailJS({ source: "contact" });
  const whatsapp = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || "91XXXXXXXXXX"}`;

  const onSubmit = handleSubmit(async (values) => {
    const ok = await send(values);
    if (ok) reset();
  });

  return (
    <div className="min-h-screen bg-obsidian px-5 pb-24 pt-[120px] md:px-8">
      <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.72fr_1.1fr]">
        <aside>
          <h1 className="font-display text-[36px] tracking-[0.1em] text-ivory">RASA ÉCLAT</h1>
          <p className="mt-5 font-body text-[15px] font-light leading-7 text-ivory-dim">Lucknow, Uttar Pradesh, India</p>
          <div className="my-8 h-px bg-copper/25" />
          <div className="space-y-4 font-body text-sm font-light text-ivory-dim">
            <a href="https://instagram.com/rasaeclat" className="flex items-center gap-3 hover:text-copper">
              <Instagram className="h-4 w-4" /> @rasaeclat
            </a>
            <a href={whatsapp} className="flex items-center gap-3 hover:text-copper">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a href="mailto:hello@rasaeclat.com" className="flex items-center gap-3 hover:text-copper">
              <Mail className="h-4 w-4" /> hello@rasaeclat.com
            </a>
          </div>
          <div className="my-8 h-px bg-copper/25" />
          <p className="max-w-sm font-body text-sm font-light leading-7 text-ivory-dim">
            For corporate gifting, retail, and press enquiries, please use the form.
          </p>
        </aside>
        <section>
          {state === "success" ? (
            <p className="font-display text-3xl italic text-copper">✦ Message received. We'll be in touch within 48 hours.</p>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5">
              <Input placeholder="Full Name" required {...register("name", { required: true })} />
              <Input type="email" placeholder="Email" required {...register("email", { required: true })} />
              <Select required {...register("enquiry", { required: true })}>
                <option>General Enquiry</option>
                <option>Corporate Gifting</option>
                <option>Press & Media</option>
                <option>Retail Partnership</option>
                <option>Wholesale</option>
              </Select>
              <Textarea placeholder="Message" required rows={6} {...register("message", { required: true })} />
              <Button type="submit" className="w-full py-[18px]" disabled={state === "loading"}>
                {state === "loading" ? "Sending..." : "Send Message"}
              </Button>
              {state === "error" ? (
                <p className="font-body text-sm text-warning">
                  Something went wrong. Please try <a className="underline" href={whatsapp}>WhatsApp</a> instead.
                </p>
              ) : null}
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
