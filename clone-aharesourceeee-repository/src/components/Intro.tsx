import { Container, Photo, Reveal } from "./common";
import { IMG } from "../data/images";
import { PILLARS } from "../data/content";

export function WhoWeAre() {
  return (
    <Reveal className="bg-white border-b" style={{ borderColor: "var(--hair)" }}>
      <Container className="py-20 lg:py-28 grid lg:grid-cols-[0.95fr_1.05fr] gap-14">
        <div>
          <div className="tag">WHO WE ARE</div>
          <h2 className="text-[36px] lg:text-[50px] leading-[0.92] mt-5 text-[#002448]">
            A Diversified Platform Built on Integration, Not Isolation.
          </h2>
          <div className="mt-6 space-y-4 text-[15px] leading-7 text-[#45566c]">
            <p>
              <strong className="text-[#122238]">AHA Resources</strong> is a diversified business
              platform operating across 11 verticals: Tourism, Hospitality, Restaurants, Retail,
              Automotive, Agriculture, Fisheries, Import-Export, Healthcare, Legal & Corporate
              Consultancy, and Training & Skills Development.
            </p>
            <p>
              We are not 11 separate companies. We are{" "}
              <span className="font-bold text-[#002448]">one integrated ecosystem</span> where each
              business feeds the next. Our model:{" "}
              <span className="font-bold text-[#002448] bg-[#f6efe0] px-1">
                Resources → Expertise → Investment → Opportunities → Markets → Value.
              </span>
            </p>
            <p>
              Headquartered with <strong>Indonesia as hub</strong> and{" "}
              <strong>International as corridor</strong>, we connect Indonesian resources, culture,
              and products to global demand — and bring international expertise, capital, and
              tourists into Indonesia.
            </p>
          </div>

          <div className="mt-8 grid gap-3">
            {[
              [
                "Resources:",
                "Indonesia's 17,000 islands, culture, agriculture, fisheries, people, MSMEs",
              ],
              [
                "Expertise:",
                "Legal PT PMA, hospitality ops, trade documentation, farm management, tourism curation",
              ],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex gap-3 items-start p-3.5 bg-[#f8f6f2] border hover:border-[#b48430]/30 transition"
                style={{ borderColor: "var(--hair)" }}
              >
                <div className="w-8 h-8 bg-[#002448] text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                  →
                </div>
                <div className="text-[13px] leading-5">
                  <span className="font-bold text-[#002448]">{k}</span> {v}
                </div>
              </div>
            ))}
            <div className="flex gap-3 items-start p-3.5 bg-[#002448] text-white border border-[#002448]">
              <div className="w-8 h-8 bg-[#b48430] text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                →
              </div>
              <div className="text-[13px] leading-5">
                <span className="font-bold text-[#e9d9b4]">Value:</span> Sustainable businesses,
                jobs, exports, authentic experiences, profitability with purpose
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-3">
            <Photo src={IMG.komodoHarbor} alt="Labuan Bajo harbour" className="h-[220px]" />
            <Photo src={IMG.riceDrone} alt="Rice terraces" className="h-[150px]" />
            <Photo src={IMG.marketSpice} alt="Spice market" className="h-[180px]" />
          </div>
          <div className="space-y-3 mt-8">
            <Photo src={IMG.villaAerial} alt="Villa aerial" className="h-[180px]" />
            <Photo src={IMG.charcoal} alt="Grill kitchen" className="h-[220px]" />
            <Photo src={IMG.containers} alt="Export corridor" className="h-[150px]" />
          </div>
        </div>
      </Container>
    </Reveal>
  );
}

export function VisionMission() {
  return (
    <Reveal className="bg-[#f8f6f2] border-b" style={{ borderColor: "var(--hair)" }}>
      <Container className="py-16 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="bg-white p-8 card group">
            <div className="kicker">VISION</div>
            <h3 className="text-[24px] leading-[1.1] mt-3 text-[#002448] group-hover:text-[#b48430] transition">
              To be a trusted, diversified, internationally connected business group.
            </h3>
            <p className="mt-4 text-[14px] leading-6 text-[#45566c]">
              A group that creates sustainable value by connecting Indonesian resources and
              opportunities with international markets, while maintaining the highest standards of
              professionalism, integrity, and service excellence.
            </p>
            <div className="mt-6 h-px bg-gradient-to-r from-[#b48430]/40 to-transparent" />
          </div>

          <div className="bg-[#002448] p-8 text-white card relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#b48430]/20 rounded-full blur-2xl" />
            <div className="kicker text-[#e9d9b4] relative">AMBITION</div>
            <h3 className="text-[24px] leading-[1.1] mt-3 relative">
              Indonesia as Hub.
              <br />
              International as Corridor.
            </h3>
            <p className="mt-4 text-[14px] leading-6 text-white/80 relative">
              Establish Indonesia as the central hub for our diversified operations and create a
              seamless corridor connecting Indonesia with international markets — facilitating
              tourism, trade, investment, and cultural exchange. To be the bridge between Indonesia
              and the world.
            </p>
            <div className="mt-6 flex gap-2 relative">
              <span className="text-[10px] tracking-widest border border-white/20 px-2.5 py-1.5">
                TOURISM CORRIDOR
              </span>
              <span className="text-[10px] tracking-widest border border-white/20 px-2.5 py-1.5">
                TRADE CORRIDOR
              </span>
            </div>
          </div>

          <div className="bg-white p-8 card group">
            <div className="kicker">MISSION</div>
            <h3 className="text-[24px] leading-[1.1] mt-3 text-[#002448] group-hover:text-[#b48430] transition">
              Connect. Develop. Facilitate. Grow.
            </h3>
            <ul className="mt-4 space-y-2.5 text-[13px] leading-5 text-[#45566c]">
              {[
                ["Connect:", "Indonesian resources with international markets"],
                ["Develop:", "Sustainable businesses across 11 sectors"],
                ["Facilitate:", "Investment, tourism, and trade opportunities"],
                ["Grow:", "With our partners, communities, and stakeholders"],
                ["Create Value:", "For customers, investors, and society"],
              ].map(([k, v]) => (
                <li key={k} className="flex gap-2">
                  <span className="text-[#b48430] font-bold">—</span>
                  <span>
                    <strong className="text-[#122238]">{k}</strong> {v}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Reveal>
  );
}

export function Philosophy() {
  return (
    <Reveal className="bg-white border-b" style={{ borderColor: "var(--hair)" }}>
      <Container className="py-20 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="kicker">BUSINESS PHILOSOPHY</div>
            <h2 className="text-[36px] lg:text-[52px] leading-[0.9] mt-3 text-[#002448]">
              Connecting Resources,
              <br />
              Creating Value.
            </h2>
          </div>
          <p className="max-w-[420px] text-[14px] leading-6 text-[#45566c]">
            Six interdependent resources. We don't just run businesses — we connect these six to
            create sustainable value across the entire group.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {PILLARS.map((p, i) => (
            <div
              key={p.no}
              className={`border p-7 card group ${i % 2 === 0 ? "bg-[#f8f6f2]" : "bg-white"}`}
              style={{ borderColor: "var(--hair)" }}
            >
              <div className="flex justify-between items-start">
                <div
                  className={`w-10 h-10 text-white flex items-center justify-center font-bold text-[12px] transition ${
                    p.no === "02" || p.no === "06"
                      ? "bg-[#b48430]"
                      : "bg-[#002448] group-hover:bg-[#b48430]"
                  }`}
                >
                  {p.no}
                </div>
                <span className="text-[10px] tracking-widest text-[#7b8a9d]">{p.kind}</span>
              </div>
              <h4 className="mt-4 text-[16px] text-[#002448]">{p.title}</h4>
              <p className="mt-2 text-[13px] leading-6 text-[#45566c]">{p.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Reveal>
  );
}
