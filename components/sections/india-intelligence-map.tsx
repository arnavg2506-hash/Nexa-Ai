"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Filter, Layers3, Map, Minus, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { districts, infrastructureLayers, nationalCorridors, slugify } from "@/lib/platform-data";
import { DataDisclosure } from "@/components/ui/data-disclosure";
import { GlassCard } from "@/components/ui/glass-card";

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const corridorLabelPositions = [
  { x: 151, y: 383 },
  { x: 356, y: 237 },
  { x: 334, y: 525 },
  { x: 383, y: 421 },
  { x: 287, y: 462 },
  { x: 284, y: 466 },
  { x: 411, y: 314 },
  { x: 282, y: 365 },
  { x: 318, y: 386 },
  { x: 276, y: 552 },
  { x: 234, y: 282 },
];

const airportMarkers = [
  { code: "DEL", x: 218, y: 211 },
  { code: "AMD", x: 161, y: 358 },
  { code: "BOM", x: 317, y: 422 },
  { code: "HYD", x: 291, y: 403 },
  { code: "BLR", x: 302, y: 499 },
  { code: "MAA", x: 365, y: 512 },
  { code: "VIZ", x: 385, y: 358 },
  { code: "COK", x: 270, y: 557 },
];

type IndiaIntelligenceMapProps = {
  standalone?: boolean;
};

export function IndiaIntelligenceMap({ standalone = false }: IndiaIntelligenceMapProps) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(5);
  const [query, setQuery] = useState("");
  const [layers, setLayers] = useState(infrastructureLayers);
  const mapNode = useRef<HTMLDivElement | null>(null);
  const searchInput = useRef<HTMLInputElement | null>(null);
  const zoomInButton = useRef<HTMLButtonElement | null>(null);
  const firstLayerButton = useRef<HTMLButtonElement | null>(null);
  const district = districts[active];

  useEffect(() => {
    if (!token || !mapNode.current) {
      return;
    }

    let destroy: (() => void) | undefined;

    import("mapbox-gl")
      .then(({ default: mapboxgl }) => {
        mapboxgl.accessToken = token;
        const map = new mapboxgl.Map({
          container: mapNode.current as HTMLDivElement,
          style: "mapbox://styles/mapbox/dark-v11",
          center: [78.9629, 22.5937],
          zoom: 3.9,
          attributionControl: false,
        });

        destroy = () => map.remove();
      })
      .catch(() => {
        destroy = undefined;
      });

    return () => {
      destroy?.();
    };
  }, []);

  const filteredDistricts = districts.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  function focusMapTool(tool: "zoom" | "search" | "filter") {
    document.getElementById("india-map")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      if (tool === "zoom") {
        zoomInButton.current?.focus();
      } else if (tool === "search") {
        searchInput.current?.focus();
      } else {
        firstLayerButton.current?.focus();
      }
    }, 450);
  }

  return (
    <section
      id="india-map"
      className={`relative overflow-hidden px-4 sm:px-6 lg:px-8 ${
        standalone ? "pb-6 pt-6" : "py-24"
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/35 to-transparent" />
      <div className="mx-auto max-w-[1500px]">
        <div className={`${standalone ? "mb-4" : "mb-8"} flex flex-col justify-between gap-5 lg:flex-row lg:items-end`}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-volt">
              India intelligence map
            </p>
            <h2
              className={`mt-4 max-w-4xl font-display font-semibold leading-tight text-white ${
                standalone ? "text-3xl lg:text-5xl" : "text-4xl lg:text-6xl"
              }`}
            >
              Map every corridor, catalyst and risk layer before capital moves.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => focusMapTool("zoom")}
              className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-white/60 transition hover:border-volt/35 hover:text-volt"
            >
              Zoom
            </button>
            <button
              type="button"
              onClick={() => focusMapTool("search")}
              className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-white/60 transition hover:border-volt/35 hover:text-volt"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => focusMapTool("filter")}
              className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-white/60 transition hover:border-volt/35 hover:text-volt"
            >
              Filter
            </button>
            <Link
              href="/compare"
              className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-white/60 transition hover:border-volt/35 hover:text-volt"
            >
              Compare
            </Link>
          </div>
        </div>

        <div className="mb-5 max-w-4xl">
          <DataDisclosure compact />
        </div>

        <GlassCard className={`${standalone ? "min-h-[calc(100vh-172px)]" : "min-h-[760px]"} p-0`}>
          <div
            className={`relative z-10 grid ${
              standalone ? "min-h-[calc(100vh-172px)]" : "min-h-[760px]"
            } lg:grid-cols-[320px_1fr_360px]`}
          >
            <aside className="order-2 border-b border-white/10 p-5 lg:order-none lg:border-b-0 lg:border-r">
              <div id="map-search" className="flex items-center gap-3 rounded-[8px] border border-white/10 bg-black/25 px-3 py-3">
                <Search aria-hidden="true" className="size-4 text-volt" />
                <input
                  ref={searchInput}
                  aria-label="Search district"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search district"
                  className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
                />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <p id="map-layers" className="text-xs uppercase tracking-[0.24em] text-white/40">Map layers</p>
                <Layers3 aria-hidden="true" className="size-4 text-signal" />
              </div>

              <div className="mt-4 grid gap-2">
                {layers.map((layer, index) => {
                  const Icon = layer.icon;

                  return (
                    <button
                      ref={index === 0 ? firstLayerButton : undefined}
                      key={layer.label}
                      type="button"
                      aria-pressed={layer.active}
                      onClick={() =>
                        setLayers((current) =>
                          current.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, active: !item.active } : item,
                          ),
                        )
                      }
                      className={`flex items-center justify-between rounded-[8px] border px-3 py-3 text-left text-sm transition ${
                        layer.active
                          ? "border-volt/35 bg-volt/10 text-white"
                          : "border-white/10 bg-white/[0.035] text-white/50"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon aria-hidden="true" className="size-4 text-volt" />
                        {layer.label}
                      </span>
                      <span className="size-2 rounded-full bg-current opacity-70" />
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-[8px] border border-volt/20 bg-volt/10 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-volt">11-corridor national graph</p>
                <div className="mt-3 grid max-h-[22rem] gap-2 overflow-y-auto pr-1">
                  {nationalCorridors.map((corridor) => (
                    <div key={corridor.shortName} className="rounded-[8px] border border-white/10 bg-black/20 p-2">
                      <p className="text-sm font-semibold text-white">{corridor.shortName}</p>
                      <p className="mt-1 text-xs leading-5 text-white/55">{corridor.nodes.join(" -> ")}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <div className={`relative order-1 overflow-hidden bg-graphite-950 lg:order-none ${standalone ? "min-h-[620px]" : "min-h-[520px]"}`}>
              <div ref={mapNode} className="absolute inset-0 opacity-70" />
              <IndiaMapCanvas active={active} onSelect={setActive} zoom={zoom} layers={layers} />

              <div className="absolute left-4 top-4 flex gap-2">
                <button
                  ref={zoomInButton}
                  type="button"
                  aria-label="Zoom in"
                  onClick={() => setZoom((value) => Math.min(8, value + 1))}
                  className="grid size-10 place-items-center rounded-full border border-white/10 bg-black/45 text-white backdrop-blur-xl transition hover:border-volt/40"
                >
                  <Plus aria-hidden="true" className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Zoom out"
                  onClick={() => setZoom((value) => Math.max(3, value - 1))}
                  className="grid size-10 place-items-center rounded-full border border-white/10 bg-black/45 text-white backdrop-blur-xl transition hover:border-volt/40"
                >
                  <Minus aria-hidden="true" className="size-4" />
                </button>
              </div>

              <div className="absolute bottom-4 left-4 right-4 grid gap-3 rounded-[8px] border border-white/10 bg-black/50 p-3 backdrop-blur-xl sm:grid-cols-3">
                <Legend color="bg-volt" label="High opportunity" />
                <Legend color="bg-ember" label="Moderate" />
                <Legend color="bg-red-400" label="Low" />
              </div>
            </div>

            <aside className="order-3 border-t border-white/10 p-5 lg:order-none lg:border-l lg:border-t-0">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.24em] text-white/40">India intelligence nodes</p>
                <Filter aria-hidden="true" className="size-4 text-volt" />
              </div>
              <div className="mt-5 grid max-h-[28rem] gap-3 overflow-y-auto pr-1">
                {filteredDistricts.map((item) => {
                  const realIndex = districts.findIndex((districtItem) => districtItem.name === item.name);

                  return (
                    <div
                      key={item.name}
                      className={`rounded-[8px] border p-4 text-left transition ${
                        active === realIndex
                          ? "border-volt/40 bg-volt/10"
                          : "border-white/10 bg-white/[0.035] hover:border-white/20"
                      }`}
                    >
                      <button
                        type="button"
                        aria-pressed={active === realIndex}
                        aria-label={`Preview ${item.name} district intelligence`}
                        onClick={() => setActive(realIndex)}
                        className="block w-full text-left"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-white">{item.name}</p>
                          <p className="font-display text-xl font-semibold text-volt">{item.score}</p>
                        </div>
                        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/40">
                          {item.state} / {item.opportunity}
                        </p>
                      </button>
                      <Link
                        href={`/districts/${slugify(item.name)}`}
                        className="mt-3 inline-flex rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-semibold text-white/65 transition hover:border-volt/35 hover:text-volt"
                      >
                        Open full report
                      </Link>
                    </div>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={district.name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  className="mt-6 rounded-[8px] border border-white/10 bg-black/25 p-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                        Selected district
                      </p>
                      <h3 className="mt-2 font-display text-3xl font-semibold text-white">
                        {district.name}
                      </h3>
                    </div>
                    <Map aria-hidden="true" className="size-5 text-signal" />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-white/60">{district.report}</p>
                  <Link
                    href={`/districts/${slugify(district.name)}`}
                    className="mt-5 inline-flex rounded-full border border-volt/25 bg-volt/10 px-4 py-2 text-sm font-semibold text-volt transition hover:bg-volt/[0.16]"
                  >
                    View district intelligence
                  </Link>
                </motion.div>
              </AnimatePresence>
            </aside>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

function IndiaMapCanvas({
  active,
  onSelect,
  zoom,
  layers,
}: {
  active: number;
  onSelect: (index: number) => void;
  zoom: number;
  layers: typeof infrastructureLayers;
}) {
  const isLayerActive = (label: string) => layers.some((layer) => layer.label === label && layer.active);

  return (
    <div
      className="absolute inset-0 origin-center transition duration-500"
      style={{ transform: `scale(${1 + (zoom - 5) * 0.04})` }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(102,227,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(102,227,255,0.08)_1px,transparent_1px)] bg-[size:34px_34px]" />
      <svg
        role="img"
        aria-label="Full map of India with real estate intelligence layers"
        viewBox="0 0 520 640"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full p-6"
      >
        <defs>
          <radialGradient id="indiaOpportunityNorth" cx="42%" cy="30%" r="26%">
            <stop offset="0%" stopColor="#78f7d4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#78f7d4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="indiaOpportunityWest" cx="56%" cy="66%" r="24%">
            <stop offset="0%" stopColor="#ffb86b" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffb86b" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="indiaOpportunityEast" cx="78%" cy="34%" r="20%">
            <stop offset="0%" stopColor="#66e3ff" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#66e3ff" stopOpacity="0" />
          </radialGradient>
          <filter id="indiaMapGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <title>India opportunity map</title>
        <g opacity="0.72">
          <path
            d="M187 34 L224 55 L257 43 L285 78 L324 91 L331 128 L362 151 L347 188 L374 223 L357 264 L394 308 L386 356 L412 397 L389 440 L399 482 L365 530 L334 596 L287 614 L252 579 L222 529 L180 487 L151 435 L141 381 L121 341 L143 301 L125 260 L148 218 L134 174 L161 135 L158 95 Z"
            fill="rgba(255,255,255,0.045)"
            stroke="rgba(102,227,255,0.56)"
            strokeWidth="2.2"
            filter="url(#indiaMapGlow)"
          />
          <path
            d="M365 190 L421 169 L476 195 L454 235 L407 245 L379 227 Z"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(102,227,255,0.44)"
            strokeWidth="1.8"
          />
          <path
            d="M301 605 C309 618 313 629 305 637 C291 633 284 622 287 609 Z"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(102,227,255,0.38)"
          />
        </g>

        <g aria-hidden="true" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1">
          <path d="M171 93 C212 122 251 122 323 102" />
          <path d="M150 150 C210 178 281 182 357 157" />
          <path d="M132 207 C207 241 285 247 378 225" />
          <path d="M130 270 C211 302 300 311 389 295" />
          <path d="M143 335 C217 365 309 376 399 361" />
          <path d="M158 401 C219 431 307 453 389 430" />
          <path d="M184 466 C237 496 315 520 389 491" />
          <path d="M219 529 C259 551 312 568 357 539" />
        </g>

        <g aria-hidden="true" fill="none" stroke="#78f7d4" strokeOpacity="0.16" strokeWidth="18" strokeLinecap="round">
          {nationalCorridors.map((corridor) => (
            <path key={`${corridor.shortName}-halo`} d={corridor.route} />
          ))}
        </g>

        <g aria-hidden="true">
          <ellipse cx="222" cy="201" rx="126" ry="96" fill="url(#indiaOpportunityNorth)" />
          <ellipse cx="293" cy="421" rx="110" ry="92" fill="url(#indiaOpportunityWest)" />
          <ellipse cx="404" cy="220" rx="96" ry="76" fill="url(#indiaOpportunityEast)" />
        </g>

        <g strokeLinecap="round" strokeLinejoin="round" fill="none">
          {isLayerActive("Highways") ? (
            <path
              d="M188 86 C202 145 219 188 243 231 C269 278 279 334 288 390 C299 465 306 529 291 606"
              stroke="#78f7d4"
              strokeWidth="3"
              strokeDasharray="8 9"
            />
          ) : null}
          {isLayerActive("Expressways") ? (
            <>
              <path d="M169 198 C202 216 229 224 265 227" stroke="#66e3ff" strokeWidth="3" />
              <path d="M197 221 C240 252 276 283 319 330" stroke="#66e3ff" strokeWidth="2.4" strokeDasharray="6 8" />
            </>
          ) : null}
          {isLayerActive("Metro projects") ? (
            <path d="M188 189 C206 178 229 179 250 193 C263 202 275 213 289 222" stroke="#a58cff" strokeWidth="3" />
          ) : null}
          {isLayerActive("Industrial corridors") ? (
            <g>
              {nationalCorridors.map((corridor) => (
                <path
                  key={corridor.shortName}
                  d={corridor.route}
                  stroke="#78f7d4"
                  strokeWidth="4.2"
                  strokeDasharray="12 8"
                />
              ))}
            </g>
          ) : null}
          {isLayerActive("Warehousing hubs") ? (
            <g fill="#78f7d4" stroke="rgba(3,4,6,0.8)" strokeWidth="2">
              <rect x="188" y="176" width="12" height="12" rx="2" />
              <rect x="220" y="214" width="12" height="12" rx="2" />
              <rect x="337" y="430" width="12" height="12" rx="2" />
              <rect x="272" y="372" width="12" height="12" rx="2" />
            </g>
          ) : null}
          {isLayerActive("Airports") ? (
            <g fill="#66e3ff">
              {airportMarkers.map((airport) => (
                <g key={airport.code}>
                  <circle cx={airport.x} cy={airport.y} r="5.5" />
                  <text x={airport.x + 9} y={airport.y - 4} fill="#dffaff" fontSize="11" fontWeight="700">
                    {airport.code}
                  </text>
                </g>
              ))}
            </g>
          ) : null}
          {isLayerActive("Smart cities") ? (
            <g fill="#a58cff">
              <path d="M243 267 l8 8 l-8 8 l-8 -8 Z" />
              <path d="M352 391 l8 8 l-8 8 l-8 -8 Z" />
              <path d="M428 210 l8 8 l-8 8 l-8 -8 Z" />
            </g>
          ) : null}
          {isLayerActive("Economic zones") ? (
            <g stroke="#78f7d4" strokeWidth="2" fill="rgba(120,247,212,0.08)">
              {districts.filter((district) => district.opportunity === "High").map((district) => (
                <circle
                  key={district.name}
                  cx={(district.x / 100) * 520}
                  cy={(district.y / 100) * 640}
                  r="22"
                />
              ))}
            </g>
          ) : null}
        </g>

        {isLayerActive("Industrial corridors") ? (
          <g aria-hidden="true" fill="#dffaf1" fontSize="10" fontWeight="800" letterSpacing="1.1">
            {nationalCorridors.map((corridor, index) => (
              <text
                key={`${corridor.shortName}-label`}
                x={corridorLabelPositions[index]?.x ?? 250}
                y={corridorLabelPositions[index]?.y ?? 320}
              >
                {corridor.shortName}
              </text>
            ))}
          </g>
        ) : null}

        <g aria-hidden="true" fill="rgba(255,255,255,0.62)" fontSize="11" fontWeight="600" letterSpacing="1">
          <text x="163" y="118">NORTH</text>
          <text x="290" y="585">SOUTH</text>
          <text x="126" y="355">WEST</text>
          <text x="419" y="267">EAST</text>
        </g>
      </svg>

      {districts.map((district, index) => (
        <Link
          key={district.name}
          aria-label={`Open ${district.name} district intelligence`}
          href={`/districts/${slugify(district.name)}`}
          onClick={() => onSelect(index)}
          onFocus={() => onSelect(index)}
          onMouseEnter={() => onSelect(index)}
          className="absolute z-20 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/55 text-white shadow-[0_0_38px_rgba(102,227,255,0.26)] backdrop-blur-xl transition hover:border-volt/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-volt"
          style={{ left: `${district.x}%`, top: `${district.y}%` }}
        >
          <span className="absolute size-12 animate-ping rounded-full bg-current opacity-15" />
          <span
            className={`relative size-3 rounded-full ${
              district.opportunity === "High"
                ? "bg-volt"
                : district.opportunity === "Moderate"
                  ? "bg-ember"
                  : "bg-red-400"
            } ${active === index ? "ring-4 ring-white/20" : ""}`}
          />
        </Link>
      ))}
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/60">
      <span className={`size-2.5 rounded-full ${color}`} />
      {label}
    </div>
  );
}
