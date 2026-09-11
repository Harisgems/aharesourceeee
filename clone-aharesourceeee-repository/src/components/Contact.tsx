import { useState, type FormEvent } from "react";
import { Container, Photo, Reveal } from "./common";
import { IMG } from "../data/images";
import { useUI } from "../store/ui";

const TYPES = [
  "Travel & Tourism — Tour Package",
  "Hospitality — Stay",
  "Restaurants — Table",
  "Retail — Visit Store",
  "Automotive Service",
  "Agriculture — Farm Visit",
  "Fisheries — Seafood Supply",
  "International Trade",
  "Healthcare Services",
  "Legal — PT PMA",
  "Training Enrollment",
];

export function MediaCareersCsr() {
  const { showToast } = useUI();
  return (
    <Reveal className="bg-[#f8f6f2] border-t" style={{ borderColor: "var(--hair)" }}>
      <Container className="py-16 grid lg:grid-cols-3 gap-6">
        <div
          id="media"
          className="bg-white p-7 card scroll-mt-[90px]"
          style={{ borderColor: "var(--hair)" }}
        >
          <div className="kicker">MEDIA</div>
          <h4 className="mt-3 text-[18px] text-[#002448]">News & Updates</h4>
          <p className="mt-2 text-[13px] leading-6 text-[#45566c]">
            Komodo National Park reopens new eco-resort. AHA Hospitality signs 5 villa management
            contracts in Bali. Agriculture Farm House exports first organic harvest to Singapore.
            Cruise partnership Astoria Grande expands Indonesia routes.
          </p>
          <button
            onClick={() => showToast("News section — connect to a CMS for dynamic updates")}
            className="mt-4 text-[11px] tracking-widest font-bold text-[#b48430] hover:underline"
          >
            VIEW ALL NEWS →
          </button>
        </div>

        <div
          id="careers"
          className="bg-white p-7 card scroll-mt-[90px]"
          style={{ borderColor: "var(--hair)" }}
        >
          <div className="kicker">CAREERS</div>
          <h4 className="mt-3 text-[18px] text-[#002448]">Join Our Ecosystem</h4>
          <p className="mt-2 text-[13px] leading-6 text-[#45566c]">
            Guides, hospitality staff, farm managers, traders, legal consultants, trainers. Train →
            Intern → Employ model. Based in Indonesia, opportunities international. Profitability
            with Purpose.
          </p>
          <button
            onClick={() =>
              showToast("Careers — 12 openings: Guide, Chef, Farm Manager, Legal Associate")
            }
            className="mt-4 text-[11px] tracking-widest font-bold text-[#b48430] hover:underline"
          >
            SEE OPENINGS →
          </button>
        </div>

        <div id="csr" className="bg-[#002448] p-7 card text-white scroll-mt-[90px]">
          <div className="kicker text-[#e9d9b4]">CSR — PROFITABILITY WITH PURPOSE</div>
          <h4 className="mt-3 text-[18px]">Community • Environment • Education</h4>
          <p className="mt-2 text-[13px] leading-6 text-white/70">
            Local hiring, cultural preservation, sustainable fishing & farming, skills academy,
            health camps, disaster relief. Every business must be profitable AND purposeful.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-[10px]">
            {["COMMUNITY", "ENVIRONMENT", "EDUCATION"].map((t) => (
              <span key={t} className="border border-white/15 px-2 py-1 text-center">
                {t}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </Reveal>
  );
}

export function Contact() {
  const { bookings, saveBooking, showToast } = useUI();
  const [form, setForm] = useState({
    date: "",
    guests: "",
    type: "",
    name: "",
    contact: "",
    note: "",
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    saveBooking({ ...form, at: new Date().toISOString() });
    showToast(`✓ Booking confirmed — ${form.type}. Our team replies within 6 hours.`);
    setForm({ date: "", guests: "", type: "", name: "", contact: "", note: "" });
  };

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <Reveal
      id="contact"
      className="bg-white border-t scroll-mt-[90px]"
      style={{ borderColor: "var(--hair)" }}
    >
      <Container className="py-16 grid lg:grid-cols-2 gap-12">
        <div>
          <div className="kicker">CONTACT</div>
          <h3 className="text-[28px] leading-[1.1] mt-3 text-[#002448]">
            Indonesia Hub.
            <br />
            International Corridor.
          </h3>
          <div className="mt-6 space-y-3 text-[13px] leading-6 text-[#45566c]">
            <div>
              <strong className="text-[#002448]">Head Office:</strong> Indonesia — Jakarta / Bali /
              Labuan Bajo (Tourism Corridor)
            </div>
            <div>
              <strong className="text-[#002448]">International:</strong> Facilitation for GCC,
              Europe and ASEAN partners
            </div>
            <div>
              <strong className="text-[#002448]">Email:</strong>{" "}
              <a href="mailto:info@aharesources.com" className="text-[#b48430] hover:underline">
                info@aharesources.com
              </a>{" "}
              •{" "}
              <a href="mailto:invest@aharesources.com" className="text-[#b48430] hover:underline">
                invest@aharesources.com
              </a>
            </div>
            <div>
              <strong className="text-[#002448]">Phone:</strong> +62 (Indonesia) • + International
              line
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <Photo src={IMG.jakartaNight} alt="Jakarta at night" className="h-[120px]" />
            <Photo src={IMG.danceParade} alt="Cultural parade" className="h-[120px]" />
          </div>

          <div
            className="mt-6 p-4 bg-[#f8f6f2] border text-[11px] leading-5 text-[#45566c]"
            style={{ borderColor: "var(--hair)" }}
          >
            <strong className="text-[#002448]">Indonesia + International:</strong> Our focus is
            Indonesia as hub and international markets as corridor — Halal tourism, cruise tourism,
            motorcycle tourism, trade and investment facilitation.
          </div>
        </div>

        <div
          id="book"
          className="bg-[#f8f6f2] p-7 border card card-flat scroll-mt-[90px]"
          style={{ borderColor: "var(--hair)" }}
        >
          <h4 className="text-[14px] tracking-[0.16em] font-bold text-[#002448]">
            BOOK NOW — CENTRAL BOOKING
          </h4>
          <p className="mt-2 text-[12px] leading-5 text-[#45566c]">
            This central form routes to the respective vertical and is fully functional with
            localStorage — ready to connect to a backend.
          </p>
          <form onSubmit={submit} className="mt-5 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                required
                value={form.date}
                onChange={set("date")}
                placeholder="Check-in / Date"
                className="input"
              />
              <input
                required
                value={form.guests}
                onChange={set("guests")}
                placeholder="Guests / Qty"
                className="input"
              />
            </div>
            <select required value={form.type} onChange={set("type")} className="input">
              <option value="">Select Business Vertical</option>
              {TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <input
              required
              value={form.name}
              onChange={set("name")}
              placeholder="Full Name"
              className="input"
            />
            <input
              required
              value={form.contact}
              onChange={set("contact")}
              placeholder="Email / WhatsApp"
              className="input"
            />
            <textarea
              rows={3}
              value={form.note}
              onChange={set("note")}
              placeholder="Details — e.g., Labuan Bajo 3N, 2 pax, halal meals"
              className="input"
            />
            <button className="btn-navy w-full py-3.5">CONFIRM BOOKING →</button>
          </form>

          {bookings.length > 0 && (
            <div className="mt-6 border-t pt-4" style={{ borderColor: "var(--hair)" }}>
              <div className="text-[11px] tracking-widest font-bold">YOUR RECENT BOOKINGS</div>
              <div className="mt-3 space-y-2">
                {bookings.slice(0, 5).map((b, i) => (
                  <div
                    key={i}
                    className="p-2.5 bg-white border text-[11px] leading-4"
                    style={{ borderColor: "var(--hair)" }}
                  >
                    <div className="font-bold text-[#002448]">
                      {b.type} • {b.date}
                    </div>
                    <div className="text-[#45566c]">
                      {b.name} — {b.contact} • {b.guests}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </Reveal>
  );
}
