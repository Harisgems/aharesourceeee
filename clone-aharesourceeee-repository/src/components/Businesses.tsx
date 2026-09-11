import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Reveal } from "./common";
import { type BizCat } from "../data/content";
import { BUSINESSES } from "../data/businesses";
import { useUI } from "../store/ui";

const FILTERS: { key: BizCat | "all"; label: string }[] = [
  { key: "all", label: "ALL 11" },
  { key: "tourism", label: "TOURISM" },
  { key: "food", label: "FOOD" },
  { key: "trade", label: "TRADE" },
  { key: "service", label: "SERVICES" },
];

export function BusinessGrid() {
  const [filter, setFilter] = useState<BizCat | "all">("all");
  const { showToast } = useUI();

  const apply = (key: BizCat | "all") => {
    setFilter(key);
    showToast(key === "all" ? "Showing all 11 businesses" : `Filtered: ${key.toUpperCase()}`);
  };

  const list = BUSINESSES.filter((b) => filter === "all" || b.cat === filter);

  return (
    <Reveal id="businesses" className="bg-white border-b" style={{ borderColor: "var(--hair)" }}>
      <Container className="py-20 lg:py-24">
        <div className="flex flex-wrap justify-between items-end gap-6">
          <div>
            <div className="kicker">OUR BUSINESSES — 11 INTEGRATED VERTICALS</div>
            <h2 className="text-[36px] lg:text-[52px] leading-[0.9] mt-3 text-[#002448]">
              Diversified Ecosystem.
              <br />
              One Customer Journey.
            </h2>
            <p className="mt-3 text-[13px] text-[#45566c] max-w-[440px]">
              Each vertical has its own page and live booking. Click any card to explore and reserve.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => apply(f.key)}
                className={`text-[10px] tracking-widest font-bold border px-4 py-2 transition ${
                  filter === f.key
                    ? "bg-[#002448] text-white border-[#002448]"
                    : "hover:border-[#b48430] text-[#45566c]"
                }`}
                style={filter === f.key ? undefined : { borderColor: "var(--hair)" }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((b, i) => {
            const from = Math.min(...b.offerings.map((o) => o.price));
            return (
              <Link
                key={b.no}
                to={`/business/${b.slug}`}
                onClick={() => window.scrollTo(0, 0)}
                className={`biz-card group border p-5 text-left hover:border-[#b48430]/50 transition card flex flex-col ${
                  i % 2 === 0 ? "bg-[#f8f6f2]" : "bg-white"
                }`}
                style={{ borderColor: "var(--hair)" }}
              >
                <div className="flex justify-between items-center">
                  <span className="tag">{b.no}</span>
                  <span className="text-[10px] tracking-widest text-[#7b8a9d]">{b.eyebrow}</span>
                </div>
                <h4 className="mt-4 text-[16px] text-[#002448] group-hover:text-[#b48430] transition">
                  {b.name}
                </h4>
                <p className="mt-1 text-[12px] leading-5 text-[#45566c]">{b.tagline}</p>
                <div className="mt-4 h-[130px] overflow-hidden relative">
                  <img
                    src={b.hero}
                    alt={b.name}
                    loading="lazy"
                    className="img-cover group-hover:scale-105 transition duration-700"
                  />
                  <span className="absolute bottom-2 left-2 bg-white/95 text-[#002448] text-[10px] font-bold tracking-widest px-2 py-1">
                    FROM ${from}
                  </span>
                </div>
                <div className="mt-3 text-[11px] font-bold tracking-widest text-[#b48430]">
                  EXPLORE & BOOK →
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </Reveal>
  );
}
