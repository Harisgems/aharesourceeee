import { Container, Reveal } from "./common";
import { ADVANTAGES, INTERNATIONAL, INVEST_STEPS, PARTNERSHIPS, PHASES } from "../data/content";

export function Investments() {
  return (
    <Reveal
      id="investments"
      className="bg-[#002448] text-white border-b"
      style={{ borderColor: "rgba(255,255,255,0.1)" }}
    >
      <Container className="py-20 lg:py-28">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
          <div>
            <div className="kicker text-[#e9d9b4]">INVESTMENT APPROACH</div>
            <h2 className="text-[36px] lg:text-[48px] leading-[0.9] mt-4">
              Opportunity → Feasibility → Structure → Partnership → Investment → Growth.
            </h2>
            <p className="mt-5 text-[14px] leading-6 text-white/70">
              Not just capital — facilitation. We bring the opportunity, check feasibility,
              structure the business, find partners, invest together, and grow.
            </p>
            <div className="mt-8 p-6 bg-white/5 border border-white/10 card-gold">
              <h4 className="text-[11px] tracking-[0.18em] font-bold text-[#e9d9b4]">
                FACILITATION MODEL
              </h4>
              <p className="mt-3 text-[13px] leading-6 text-white/70">
                Idea → Market Research → Legal Structure (PT PMA) → Location → Licenses → Build-out
                → Staffing (Training) → Supply Chain (Agriculture/Fisheries) → Operations
                (Hospitality/Restaurants) → Marketing (Travel) → Export (Trade/Retail).
              </p>
            </div>
          </div>

          <div>
            <div className="grid gap-3">
              {INVEST_STEPS.map((s, i) => {
                const last = i === INVEST_STEPS.length - 1;
                return (
                  <div
                    key={s.no}
                    className={`flex gap-4 p-5 border transition ${
                      last
                        ? "bg-white border-[#e9d9b4]/30 text-[#002448] hover:shadow-lg"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 flex items-center justify-center font-bold text-[12px] shrink-0 ${
                        last ? "bg-[#002448] text-white" : "bg-[#b48430] text-white"
                      }`}
                    >
                      {s.no}
                    </div>
                    <div>
                      <div className="text-[12px] font-bold tracking-widest">{s.title}</div>
                      <div
                        className={`mt-1 text-[12px] leading-5 ${
                          last ? "text-[#45566c]" : "text-white/60"
                        }`}
                      >
                        {s.body}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-3">
              {[
                ["INVESTMENT SIZE", "Flexible: small homestay to boutique hotel, restaurant to export"],
                ["MODEL", "JV, PT PMA 100%, Partnership, Franchise, Management Contract"],
                ["RETURN", "Integrated returns — hotel gives room + F&B + tours + retail + export"],
              ].map(([t, d]) => (
                <div key={t} className="p-4 border border-white/10 bg-white/5">
                  <div className="text-[10px] tracking-widest text-[#e9d9b4]">{t}</div>
                  <div className="mt-1 text-[12px] leading-5">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Reveal>
  );
}

export function Ecosystem() {
  const tourismFlow = [
    "TRAVEL BOOKING",
    "TRANSPORT (AUTOMOTIVE)",
    "ACCOMMODATION",
    "RESTAURANT",
    "RETAIL SOUVENIR",
    "AGRI EXPERIENCE",
    "EXPORT (TRADE)",
  ];
  const productFlow = ["FARM (AGRI)", "RESTAURANT", "RETAIL PACKAGING", "EXPORT"];

  const chip = (label: string, idx: number, flow: string[]) => {
    const first = idx === 0;
    const last = idx === flow.length - 1;
    const gold = flow === tourismFlow && label.startsWith("AGRI");
    let cls = "bg-white border card card-flat text-[#002448]";
    if (first && flow === tourismFlow) cls = "bg-[#002448] text-white";
    if (gold) cls = "bg-[#b48430] text-white";
    if (last && flow === productFlow) cls = "bg-[#002448] text-white";
    return (
      <span key={label} className="contents">
        <span className={`px-3 py-2 ${cls}`} style={{ borderColor: "var(--hair)" }}>
          {label}
        </span>
        {idx < flow.length - 1 && <span className="px-2 py-2 text-[#7b8a9d]">→</span>}
      </span>
    );
  };

  return (
    <Reveal className="bg-white border-b" style={{ borderColor: "var(--hair)" }}>
      <Container className="py-20 lg:py-24 grid lg:grid-cols-2 gap-12">
        <div>
          <div className="kicker">INTEGRATED BUSINESS MODEL</div>
          <h3 className="text-[28px] leading-[1.1] mt-3 text-[#002448]">
            One Tourist, 8 Businesses.
            <br />
            One Product, 4 Businesses.
          </h3>

          <div className="mt-6 p-6 bg-[#f8f6f2] border" style={{ borderColor: "var(--hair)" }}>
            <div className="text-[11px] tracking-[0.18em] font-bold text-[#b48430]">
              EXAMPLE FLOW: TOURISM
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] font-bold tracking-widest">
              {tourismFlow.map((l, i) => chip(l, i, tourismFlow))}
            </div>
            <div className="mt-6 text-[11px] tracking-[0.18em] font-bold text-[#b48430]">
              EXAMPLE FLOW: PRODUCT
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] font-bold tracking-widest">
              {productFlow.map((l, i) => chip(l, i, productFlow))}
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-[12px] tracking-[0.18em] font-bold text-[#002448]">
              STRATEGIC PARTNERSHIPS
            </h4>
            <ul className="mt-3 grid md:grid-cols-2 gap-2 text-[13px] leading-5 text-[#45566c]">
              {PARTNERSHIPS.map((p) => (
                <li key={p}>• {p}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="kicker">COMPETITIVE ADVANTAGE — 7 POINTS</div>
          <div className="mt-4 space-y-3">
            {ADVANTAGES.map((a, i) => (
              <div
                key={a.no}
                className={`p-4 border card ${i % 2 === 0 ? "bg-[#f8f6f2]" : "bg-white"}`}
                style={{ borderColor: "var(--hair)" }}
              >
                <div className="text-[12px] font-bold text-[#002448]">
                  {a.no} {a.title}
                </div>
                <div className="text-[12px] leading-5 text-[#45566c] mt-1">{a.body}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Reveal>
  );
}

export function Growth() {
  return (
    <Reveal className="bg-[#f8f6f2] border-b" style={{ borderColor: "var(--hair)" }}>
      <Container className="py-20 lg:py-24 grid lg:grid-cols-2 gap-12">
        <div>
          <div className="kicker">GROWTH ROADMAP — 5 PHASES</div>
          <h3 className="text-[28px] leading-[1.1] mt-3 text-[#002448]">
            Phase 1 to 5: From Foundation to Regional Hub.
          </h3>
          <div className="mt-6 space-y-3">
            {PHASES.map((p) => (
              <div
                key={p.label}
                className="p-5 bg-white border-l-4 card"
                style={{ borderLeftColor: p.color, borderColor: "var(--hair)", borderLeftWidth: 4 }}
              >
                <div className="text-[11px] font-bold tracking-widest text-[#b48430]">
                  {p.label}
                </div>
                <div className="mt-1 text-[13px] leading-5 text-[#45566c]">{p.body}</div>
              </div>
            ))}
            <div
              className="p-5 bg-[#002448] text-white border-l-4 card"
              style={{ borderLeftColor: "#e9d9b4", borderLeftWidth: 4 }}
            >
              <div className="text-[11px] font-bold tracking-widest text-[#e9d9b4]">
                PHASE 5 — INTEGRATION & SCALE (2025-26)
              </div>
              <div className="mt-1 text-[13px] leading-5 text-white/80">
                Full ecosystem integration, training academy, cruise & medical tourism,
                international partnerships, export platform, regional hub.
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="kicker">APPROACH TO INTERNATIONAL BUSINESS</div>
          <h3 className="text-[28px] leading-[1.1] mt-3 text-[#002448]">
            How We Work With International Partners.
          </h3>
          <div className="mt-6 grid gap-3">
            {INTERNATIONAL.map((x) => (
              <div
                key={x.title}
                className="p-4 bg-white border card"
                style={{ borderColor: "var(--hair)" }}
              >
                <div className="text-[12px] font-bold text-[#002448]">{x.title}</div>
                <div className="text-[12px] leading-5 text-[#45566c] mt-1">{x.body}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 bg-[#002448] text-white card">
            <h4 className="text-[11px] tracking-[0.18em] font-bold text-[#e9d9b4]">
              OUR COMMITMENT
            </h4>
            <p className="mt-3 text-[13px] leading-6 text-white/80">
              We are committed to building a diversified, sustainable, internationally connected
              business group that creates value for customers, investors, partners and communities.
              Profitability with Purpose is not a slogan — it's our operating principle.
            </p>
          </div>
        </div>
      </Container>
    </Reveal>
  );
}
