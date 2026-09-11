import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToId, useUI } from "../store/ui";

export default function Footer() {
  const { showToast } = useUI();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");

  const goSection = (id: string) => {
    if (location.pathname === "/") {
      if (id === "home") window.scrollTo({ top: 0, behavior: "smooth" });
      else scrollToId(id);
    } else if (id === "home") {
      navigate("/");
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  const join = (e: FormEvent) => {
    e.preventDefault();
    showToast(`✓ Subscribed — ${email}. Indonesia corridor updates on the way.`);
    setEmail("");
  };

  return (
    <footer
      className="bg-[#00101f] text-white border-t"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="h-[3px] bg-gradient-to-r from-[#b48430] via-[#c9a24b] to-[#e9d9b4]" />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 grid lg:grid-cols-[1.2fr_0.8fr_0.8fr_1.2fr] gap-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white text-[#002448] flex items-center justify-center font-bold text-[13px]">
              AHA
            </div>
            <div>
              <div className="font-bold text-[13px] tracking-[0.14em]">AHA RESOURCES</div>
              <div className="text-[9px] tracking-[0.26em] text-white/50">
                INDONESIA • INTERNATIONAL
              </div>
            </div>
          </div>
          <p className="mt-4 text-[12px] leading-6 text-white/60 max-w-[320px]">
            Connecting Resources, Creating Value. Indonesia as hub, International as corridor. 11
            integrated businesses — Travel, Hospitality, Restaurants, Retail, Automotive,
            Agriculture, Fisheries, Trade, Healthcare, Legal, Training.
          </p>
          <div className="mt-6 flex gap-2">
            {["ELEGANT", "FUNCTIONAL", "INTEGRATED"].map((t) => (
              <span key={t} className="text-[10px] tracking-widest border border-white/10 px-2.5 py-1">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[11px] tracking-[0.18em] font-bold text-[#e9d9b4]">QUICK LINKS</div>
          <ul className="mt-4 space-y-2 text-[12px] text-white/70">
            {[
              ["Home", "home"],
              ["About Us", "about"],
              ["Careers", "careers"],
              ["News", "media"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <li key={label}>
                <button onClick={() => goSection(id)} className="hover:text-white transition">
                  {label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => showToast("Downloads — PDF brochure ready")}
                className="hover:text-white transition"
              >
                Downloads
              </button>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-[11px] tracking-[0.18em] font-bold text-[#e9d9b4]">LEGAL</div>
          <ul className="mt-4 space-y-2 text-[12px] text-white/70">
            {["Privacy Policy", "Terms of Service", "Refund Policy", "Cookie Policy"].map((t) => (
              <li key={t}>
                <button onClick={() => showToast(t)} className="hover:text-white transition">
                  {t}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-[11px] tracking-[0.18em] font-bold text-[#e9d9b4]">
            FUTURE EXPANSION
          </div>
          <ul className="mt-3 space-y-1 text-[11px] text-white/50">
            {[
              "Cruise Terminal Partnership",
              "Halal Tourism Certification",
              "Organic Export Platform",
              "Hospitality Academy",
              "EV + Wash Hubs",
              "Medical Tourism Wing",
              "E-commerce for MSMEs",
            ].map((t) => (
              <li key={t}>• {t}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[11px] tracking-[0.18em] font-bold text-[#e9d9b4]">
            NEWSLETTER + SOCIAL
          </div>
          <p className="mt-4 text-[12px] text-white/60">
            Get Indonesia tourism corridor updates, trade opportunities and investment openings.
          </p>
          <form onSubmit={join} className="mt-4 flex gap-2">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 min-w-0 bg-white/5 border border-white/10 px-4 py-2.5 text-[12px] text-white placeholder:text-white/40 outline-none focus:border-[#b48430]/50"
            />
            <button className="bg-[#b48430] px-4 py-2.5 text-[11px] font-bold tracking-widest hover:bg-[#9a6f28] transition">
              JOIN
            </button>
          </form>
          <div className="mt-6 flex flex-wrap gap-3 text-[11px] text-white/50">
            {["Instagram", "LinkedIn", "YouTube", "WhatsApp"].map((s, i) => (
              <span key={s} className="flex items-center gap-3">
                <button onClick={() => showToast(`${s} — connect your handle`)} className="hover:text-white">
                  {s}
                </button>
                {i < 3 && <span>•</span>}
              </span>
            ))}
          </div>
          <div className="mt-8 p-4 bg-white/5 border border-white/10">
            <div className="text-[10px] tracking-widest text-[#e9d9b4]">
              INDONESIA + INTERNATIONAL
            </div>
            <div className="mt-1 text-[11px] leading-5 text-white/60">
              Fully functional booking system with localStorage demo — ready to connect to a
              backend.
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="py-6 px-6 lg:px-10 flex flex-wrap justify-between gap-4 text-[11px] text-white/40 max-w-[1440px] mx-auto">
          <div>
            © {new Date().getFullYear()} AHA Resources. All rights reserved. Connecting Resources,
            Creating Value.
          </div>
          <div>
            Libre Franklin 700 / 400 • Navy #002448 • Gold #b48430 • Indonesia hub + International
            corridor
          </div>
        </div>
      </div>
    </footer>
  );
}
