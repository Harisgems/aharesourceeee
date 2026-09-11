import { Counter, Photo } from "./common";
import { IMG } from "../data/images";
import { scrollToId } from "../store/ui";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#00101f]"
    >
      <div className="absolute inset-0">
        <img
          src={IMG.heroBg}
          alt="Jakarta — Indonesia hub"
          fetchPriority="high"
          className="img-cover scale-[1.03]"
        />
        <div className="absolute inset-0 hero-grad" />
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            background:
              "radial-gradient(700px at 18% 18%, rgba(180,132,48,.45), transparent 60%)",
          }}
        />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 w-full py-16 lg:py-20 grid lg:grid-cols-[1.05fr_.95fr] gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-3 border border-white/15 bg-white/5 backdrop-blur px-3 py-2">
            <span className="w-2 h-2 bg-[#e9d9b4] rounded-full animate-pulse" />
            <span className="text-[10px] tracking-[0.22em] text-white/80 font-bold">
              LIVE • INDONESIA + INTERNATIONAL CORRIDOR
            </span>
          </div>

          <h1 className="text-white text-[44px] lg:text-[76px] leading-[0.88] tracking-[-0.04em] mt-6 font-bold">
            Connecting
            <br />
            Resources.
            <br />
            <span className="text-[#e9d9b4] font-normal italic">Creating Value.</span>
          </h1>

          <p className="text-[#e8edf4]/85 text-[16px] lg:text-[18px] leading-[1.7] mt-6 max-w-[560px]">
            AHA Resources is a diversified platform transforming Resources into Expertise,
            Investment into Opportunities, and Markets into Value — one integrated ecosystem across
            11 verticals, bridging Indonesia and the world.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <button
              onClick={() => scrollToId("businesses")}
              className="bg-white text-[#002448] px-7 py-3.5 text-[11px] tracking-[0.18em] font-bold hover:bg-[#f6efe0] transition"
            >
              EXPLORE 11 BUSINESSES →
            </button>
            <button
              onClick={() => scrollToId("about")}
              className="border border-white/25 text-white px-7 py-3.5 text-[11px] tracking-[0.18em] font-bold hover:bg-white/10 transition"
            >
              OUR STORY
            </button>
          </div>

          <div className="mt-12 grid grid-cols-3 max-w-[520px] border-t border-white/15 pt-7">
            <div>
              <div className="flex items-baseline gap-1">
                <Counter target={11} className="text-white text-[32px] font-bold" />
                <span className="text-[#e9d9b4] text-[14px]">↗</span>
              </div>
              <div className="text-[10px] tracking-[0.18em] text-white/60 mt-1">
                INTEGRATED BUSINESSES
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <Counter target={5} className="text-white text-[32px] font-bold" />
              </div>
              <div className="text-[10px] tracking-[0.18em] text-white/60 mt-1">
                GROWTH PHASES 2020-26
              </div>
            </div>
            <div>
              <div className="text-white text-[22px] font-bold tracking-widest">IDN+</div>
              <div className="text-[10px] tracking-[0.18em] text-white/60 mt-1">
                HUB + CORRIDOR
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-[88%] h-[88%] border border-[#e9d9b4]/30" />
            <div className="grid grid-cols-12 gap-3 relative">
              <div className="col-span-7 space-y-3">
                <Photo
                  src={IMG.padar}
                  alt="Komodo, Labuan Bajo"
                  caption="KOMODO • LABUAN BAJO"
                  className="h-[240px]"
                  eager
                />
                <Photo src={IMG.clownfish} alt="Diving" className="h-[168px]" />
              </div>
              <div className="col-span-5 space-y-3 mt-8">
                <Photo src={IMG.cruise} alt="Cruise tourism" className="h-[168px]" />
                <Photo
                  src={IMG.kecak}
                  alt="Culture and tradition"
                  caption="CULTURE • TRADITION"
                  className="h-[240px]"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              <Photo src={IMG.fineDining} alt="Dining" className="h-[96px]" />
              <Photo src={IMG.seafoodFeast} alt="Cuisine" className="h-[96px]" />
              <Photo src={IMG.danceOutdoor} alt="Music" className="h-[96px]" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e9d9b4]/40 to-transparent" />
    </section>
  );
}

export function TrustBar() {
  const items = [
    "TRUSTED FOR INDONESIA TOURISM CORRIDOR",
    "HALAL TOURISM • RELIGIOUS TOURISM",
    "CRUISE • MOTORCYCLE • CULTURAL",
    "FARM-TO-TABLE • BLUE ECONOMY",
    "PT PMA • END-TO-END FACILITATION",
  ];
  return (
    <div className="bg-white border-b" style={{ borderColor: "var(--hair)" }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-[52px] flex items-center justify-between gap-6 overflow-x-auto no-scrollbar text-[10px] tracking-[0.18em] font-bold text-[#7b8a9d]">
        {items.map((t, i) => (
          <span key={t} className="contents">
            <span className="shrink-0">{t}</span>
            {i < items.length - 1 && (
              <span className="shrink-0 w-1 h-1 bg-[#b48430] rounded-full" />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
