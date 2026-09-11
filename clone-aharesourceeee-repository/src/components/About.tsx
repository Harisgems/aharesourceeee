import { Container, Photo, Reveal } from "./common";
import { IMG } from "../data/images";

const VALUES = [
  ["Integrity", "We do what we say — transparent with partners, communities and regulators."],
  ["Excellence", "Service standards benchmarked internationally, delivered locally."],
  ["Sustainability", "Community-based, environmentally conscious operations in every vertical."],
  ["Collaboration", "Joint ventures, cooperatives and partnerships over pure ownership."],
  ["Innovation", "Cloud kitchens, EV + wash hubs, digital export platform for MSMEs."],
  ["Respect", "Cultural sensitivity, Halal awareness, and local customs at the core."],
];

export default function About() {
  return (
    <Reveal id="about" className="bg-[#f7f5f0] border-b" style={{ borderColor: "var(--hair)" }}>
      <Container className="py-20 lg:py-28">
        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-14 items-start">
          <div className="lg:sticky lg:top-[110px]">
            <div className="tag">ABOUT US</div>
            <h2 className="text-[40px] lg:text-[54px] leading-[0.9] mt-4 text-[#002448]">
              Company Overview,
              <br />
              Chairman, Values,
              <br />
              Journey & Purpose.
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Photo src={IMG.ceremony} alt="Indonesian culture" className="h-[180px]" />
              <Photo src={IMG.jakartaSkyline} alt="Indonesia hub" className="h-[180px]" />
            </div>

            <div className="mt-6 p-6 bg-white border card" style={{ borderColor: "var(--hair)" }}>
              <div className="text-[11px] tracking-[0.18em] font-bold text-[#b48430]">
                CHAIRMAN'S MESSAGE
              </div>
              <p className="mt-3 text-[14px] leading-6 text-[#45566c] italic">
                “We started AHA Resources with a simple belief — Indonesia's richness deserves a
                professional bridge to the world. From one island to 17,000 islands, from one
                business to eleven, our purpose remains: profitability with purpose, growth with
                integrity.”
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#002448] rounded-full" />
                <div>
                  <div className="text-[12px] font-bold text-[#002448]">CHAIRMAN</div>
                  <div className="text-[11px] text-[#7b8a9d]">AHA Resources</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="text-[22px] text-[#002448]">Company Overview</h3>
              <p className="mt-3 text-[14px] leading-7 text-[#45566c]">
                AHA Resources is an Indonesia-centric diversified group operating across 11
                verticals. We facilitate tourism, trade, and investment between Indonesia and
                international markets. Our businesses are designed to be interlinked — a tourist
                uses our Travel service, stays in our Hospitality network, eats at our Restaurants,
                shops at our Retail, and the products they buy come from our Agriculture, Fisheries
                and Import-Export arms. The legal and training arms support investors who want to
                replicate this model.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-6 card" style={{ borderColor: "var(--hair)" }}>
                <h4 className="text-[12px] tracking-[0.16em] font-bold text-[#002448]">
                  VISION & MISSION
                </h4>
                <p className="mt-2 text-[13px] leading-6 text-[#45566c]">
                  Vision: trusted, diversified, internationally connected group creating sustainable
                  value. Mission: Connect, Develop, Facilitate, Grow and Create Value — across
                  sectors, borders and communities.
                </p>
              </div>
              <div className="bg-white p-6 card" style={{ borderColor: "var(--hair)" }}>
                <h4 className="text-[12px] tracking-[0.16em] font-bold text-[#002448]">
                  WHY INDONESIA
                </h4>
                <p className="mt-2 text-[13px] leading-6 text-[#45566c]">
                  17,000 islands, 270M+ people, 5 super-priority destinations, world-class marine
                  and agricultural resources, and a fast-opening investment environment via PT PMA.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-[22px] text-[#002448]">Core Values</h3>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {VALUES.map(([t, d], i) => (
                  <div
                    key={t}
                    className={`p-4 border card ${i % 2 === 0 ? "bg-white" : "bg-[#f8f6f2]"}`}
                    style={{ borderColor: "var(--hair)" }}
                  >
                    <div className="text-[12px] font-bold text-[#002448] tracking-[0.08em]">
                      {t}
                    </div>
                    <div className="mt-1 text-[12px] leading-5 text-[#45566c]">{d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[22px] text-[#002448]">Our Journey</h3>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  ["2020", "Legal & Corporate foundation"],
                  ["2022", "Tourism corridor launched"],
                  ["2023", "7 Kitchens + Retail shelf"],
                  ["2025", "Full ecosystem integration"],
                ].map(([y, d]) => (
                  <div
                    key={y}
                    className="p-4 bg-white border card"
                    style={{ borderColor: "var(--hair)" }}
                  >
                    <div className="text-[20px] font-bold text-[#b48430]">{y}</div>
                    <div className="mt-1 text-[11px] leading-4 text-[#45566c]">{d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Photo src={IMG.komodoBay} alt="Komodo National Park" className="h-[150px]" />
              <Photo src={IMG.farmCouple} alt="Farmers" className="h-[150px]" />
              <Photo src={IMG.meeting} alt="Corporate facilitation" className="h-[150px]" />
            </div>

            <div className="p-6 bg-[#002448] text-white card">
              <h4 className="text-[11px] tracking-[0.18em] font-bold text-[#e9d9b4]">OUR PURPOSE</h4>
              <p className="mt-3 text-[13px] leading-6 text-white/80">
                Every business we run must be profitable AND purposeful. Local hiring, cultural
                preservation, sustainable fishing and farming, skills academies and health camps are
                not add-ons — they are how the ecosystem stays healthy for decades.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Reveal>
  );
}
