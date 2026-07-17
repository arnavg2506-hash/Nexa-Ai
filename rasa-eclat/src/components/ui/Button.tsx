import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { Link, type LinkProps } from "react-router-dom";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2 border px-6 py-3 font-body text-[12px] font-light uppercase tracking-[0.14em] transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper-light disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary: "border-copper bg-copper text-obsidian hover:border-copper-light hover:bg-copper-light",
  secondary: "border-copper/80 bg-transparent text-ivory hover:bg-copper hover:text-obsidian",
  ghost: "border-copper/20 bg-transparent text-ivory-dim hover:border-copper hover:text-copper"
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className = "", variant = "primary", ...props }, ref) => (
  <button ref={ref} className={`${base} ${variants[variant]} ${className}`} {...props} />
));
Button.displayName = "Button";

type ButtonLinkProps = (LinkProps | AnchorHTMLAttributes<HTMLAnchorElement>) & {
  variant?: keyof typeof variants;
  external?: boolean;
};

export function ButtonLink({ className = "", variant = "primary", external, ...props }: ButtonLinkProps) {
  const classes = `${base} ${variants[variant]} ${className}`;
  if (external) {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return <a className={classes} {...anchorProps} />;
  }
  return <Link className={classes} {...(props as LinkProps)} />;
}
