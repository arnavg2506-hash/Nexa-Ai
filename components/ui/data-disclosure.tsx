import { DatabaseZap, ExternalLink, ShieldCheck } from "lucide-react";

type DataDisclosureProps = {
  compact?: boolean;
};

export function DataDisclosure({ compact = false }: DataDisclosureProps) {
  return (
    <div className="flex items-start gap-3 rounded-[8px] border border-ember/25 bg-ember/[0.08] p-4 text-sm text-white/68">
      {compact ? (
        <DatabaseZap aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ember" />
      ) : (
        <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-ember" />
      )}
      <div className="leading-6">
        <p>
          <span className="font-semibold text-white">
            {compact ? "Schematic NEXA model." : "Illustrative intelligence."}
          </span>{" "}
          {compact
            ? "Corridor names follow the official DPIIT/NICDP register. Paths, nodes, scores and forecasts are illustrative, not live records or advice."
            : "Corridor programme names follow the official DPIIT/NICDP register. Route geometry, node positions, scores, rates and forecasts are product-demo estimates, not live government records, legal diligence, financial advice or guaranteed returns."}
        </p>
        <a
          href="https://www.dpiit.gov.in/offerings/schemes-and-services/details/industrial-corridors-YjM2UDNtQWa"
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 font-semibold text-volt transition hover:text-white"
        >
          Official NICDP programme register
          <ExternalLink aria-hidden="true" className="size-3.5" />
        </a>
      </div>
    </div>
  );
}
