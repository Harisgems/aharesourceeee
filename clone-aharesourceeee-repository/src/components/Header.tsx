import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { scrollToId, useUI } from "../store/ui";
import { BUSINESSES } from "../data/businesses";

const NAV = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "investments", label: "INVESTMENTS" },
  { id: "gallery", label: "GALLERY" },
  { id: "contact", label: "CONTACT" },
];

export default function Header() {
  const { openBook } = useUI();
  const navigate = useNavigate();
  const location = useLocation();
  const onHome = location.pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [mobOpen, setMobOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [mobBizOpen, setMobBizOpen] = useState(false);
  const dropTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (!onHome) return;
      let cur = "home";
      ["home", "about", "businesses", "investments", "gallery", "contact"].forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) cur = id;
      });
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  const goSection = (id: string) => {
    setMobOpen(false);
    setDropOpen(false);
    setMobBizOpen(false);
    if (onHome) {
      if (id === "home") window.scrollTo({ top: 0, behavior: "smooth" });
      else scrollToId(id);
    } else if (id === "home") {
      navigate("/");
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  const openDrop = () => {
    window.clearTimeout(dropTimer.current);
    setDropOpen(true);
  };
  const closeDrop = () => {
    dropTimer.current = window.setTimeout(() => setDropOpen(false), 140);
  };

  return (
    <header
      className={`header-bg fixed top-0 left-0 right-0 z-40 border-b transition-shadow ${
        scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,.06)]" : ""
      }`}
      style={{ borderColor: "var(--hairG)" }}
    >
      <div className="h-[3px] bg-gradient-to-r from-[#b48430] via-[#c9a24b] to-[#e9d9b4]" />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-[76px] flex items-center justify-between">
        <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-[#002448] text-white flex items-center justify-center font-bold text-[12px] tracking-[0.18em] group-hover:bg-[#00162e] transition">
            AHA
          </div>
          <div className="leading-none text-left">
            <div className="font-bold text-[13.5px] tracking-[0.14em] text-[#002448]">
              AHA RESOURCES
            </div>
            <div className="text-[8.5px] tracking-[0.26em] text-[#7b8a9d] mt-1">
              INDONESIA • INTERNATIONAL
            </div>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-6">
          <button
            onClick={() => goSection("home")}
            className="text-[10.5px] tracking-[0.18em] font-bold transition border-b-2 pb-1 hover:text-[#b48430] text-[#45566c] border-transparent"
          >
            HOME
          </button>
          <button
            onClick={() => goSection("about")}
            className="text-[10.5px] tracking-[0.18em] font-bold transition border-b-2 pb-1 hover:text-[#b48430] text-[#45566c] border-transparent"
          >
            ABOUT
          </button>

          {/* Dropdown */}
          <div className="relative" onMouseEnter={openDrop} onMouseLeave={closeDrop}>
            <button
              onClick={() => setDropOpen((v) => !v)}
              className={`flex items-center gap-1.5 text-[10.5px] tracking-[0.18em] font-bold transition border-b-2 pb-1 hover:text-[#b48430] ${
                dropOpen || active === "businesses"
                  ? "text-[#002448] border-[#b48430]"
                  : "text-[#45566c] border-transparent"
              }`}
            >
              OUR BUSINESSES
              <span className={`text-[8px] transition-transform ${dropOpen ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>

            {dropOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                <div
                  className="w-[640px] bg-white border shadow-[0_24px_60px_rgba(0,22,46,0.16)] animate-pop"
                  style={{ borderColor: "var(--hairG)" }}
                >
                  <div className="h-[3px] bg-gradient-to-r from-[#b48430] via-[#c9a24b] to-[#e9d9b4]" />
                  <div className="p-4 grid grid-cols-2 gap-1">
                    {BUSINESSES.map((b) => (
                      <Link
                        key={b.slug}
                        to={`/business/${b.slug}`}
                        onClick={() => setDropOpen(false)}
                        className="flex items-start gap-3 p-2.5 hover:bg-[#f8f6f2] transition group"
                      >
                        <span className="w-8 h-8 bg-[#002448] text-white flex items-center justify-center text-[11px] font-bold shrink-0 group-hover:bg-[#b48430] transition">
                          {b.no}
                        </span>
                        <span>
                          <span className="block text-[12.5px] font-bold text-[#002448] group-hover:text-[#b48430] transition leading-tight">
                            {b.name}
                          </span>
                          <span className="block text-[10px] tracking-widest text-[#7b8a9d] mt-0.5">
                            {b.eyebrow}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div
                    className="px-4 py-3 border-t bg-[#f8f6f2] flex items-center justify-between"
                    style={{ borderColor: "var(--hair)" }}
                  >
                    <span className="text-[11px] text-[#45566c]">
                      11 integrated verticals — one ecosystem
                    </span>
                    <button
                      onClick={() => goSection("businesses")}
                      className="text-[11px] font-bold tracking-widest text-[#b48430] hover:underline"
                    >
                      VIEW ALL →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {NAV.filter((n) => !["home", "about"].includes(n.id)).map((n) => (
            <button
              key={n.id}
              onClick={() => goSection(n.id)}
              className={`text-[10.5px] tracking-[0.18em] font-bold transition border-b-2 pb-1 hover:text-[#b48430] ${
                onHome && active === n.id
                  ? "text-[#002448] border-[#b48430]"
                  : "text-[#45566c] border-transparent"
              }`}
            >
              {n.label}
            </button>
          ))}

          <button onClick={() => openBook("General Inquiry")} className="ml-3 btn-navy py-2.5! px-5!">
            BOOK NOW
          </button>
        </nav>

        <button
          onClick={() => setMobOpen((v) => !v)}
          aria-label="Menu"
          className="xl:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5"
        >
          <span className="h-0.5 w-6 bg-[#002448]" />
          <span className="h-0.5 w-6 bg-[#002448]" />
          <span className="h-0.5 w-4 bg-[#002448] self-start ml-2" />
        </button>
      </div>

      {mobOpen && (
        <div
          className="xl:hidden border-t header-bg max-h-[80vh] overflow-auto"
          style={{ borderColor: "var(--hair)" }}
        >
          <div className="px-6 py-6 flex flex-col gap-4 items-start">
            <button
              onClick={() => goSection("home")}
              className="text-[12px] tracking-[0.18em] font-bold text-[#002448]"
            >
              HOME
            </button>
            <button
              onClick={() => goSection("about")}
              className="text-[12px] tracking-[0.18em] font-bold text-[#002448]"
            >
              ABOUT
            </button>

            <button
              onClick={() => setMobBizOpen((v) => !v)}
              className="w-full flex items-center justify-between text-[12px] tracking-[0.18em] font-bold text-[#002448]"
            >
              OUR BUSINESSES
              <span className={`text-[9px] transition-transform ${mobBizOpen ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            {mobBizOpen && (
              <div className="w-full grid gap-1 pl-1 border-l-2" style={{ borderColor: "var(--hairG)" }}>
                {BUSINESSES.map((b) => (
                  <Link
                    key={b.slug}
                    to={`/business/${b.slug}`}
                    onClick={() => setMobOpen(false)}
                    className="flex items-center gap-2.5 py-1.5 pl-3"
                  >
                    <span className="text-[10px] font-bold text-[#b48430] w-5">{b.no}</span>
                    <span className="text-[12px] font-semibold text-[#45566c]">{b.name}</span>
                  </Link>
                ))}
              </div>
            )}

            {NAV.filter((n) => !["home", "about"].includes(n.id)).map((n) => (
              <button
                key={n.id}
                onClick={() => goSection(n.id)}
                className="text-[12px] tracking-[0.18em] font-bold text-[#002448]"
              >
                {n.label}
              </button>
            ))}

            <button
              onClick={() => {
                setMobOpen(false);
                openBook("General Inquiry");
              }}
              className="w-full bg-[#002448] text-white py-3 text-[12px] tracking-[0.18em] font-bold"
            >
              BOOK NOW
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
