import { useState, type FormEvent } from "react";
import { Container, Reveal } from "./common";
import { useUI } from "../store/ui";

const INTERESTS = [
  "Travel & Tourism",
  "Hospitality Investment",
  "Restaurants",
  "Retail & Export",
  "Agriculture / Fisheries",
  "Import-Export Trade",
  "Legal PT PMA",
  "Training",
  "Investment / JV",
];

export default function Partnerships() {
  const { saveInquiry, inquiries, showToast } = useUI();
  const [form, setForm] = useState({ name: "", email: "", interest: "", msg: "" });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    saveInquiry({ ...form, at: new Date().toISOString() });
    showToast(`✓ Thank you ${form.name} — partnership inquiry received. Reply within 24 hours.`);
    setForm({ name: "", email: "", interest: "", msg: "" });
  };

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <Reveal className="bg-[#002448] text-white">
      <Container className="py-20 lg:py-28 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <div className="kicker text-[#e9d9b4]">CALL FOR PARTNERSHIPS</div>
          <h2 className="text-[36px] lg:text-[52px] leading-[0.9] mt-4">
            We Are Looking For Partners Who Believe in Indonesia.
          </h2>
          <p className="mt-5 text-[15px] leading-7 text-white/70 max-w-[560px]">
            We invite investors, tour operators, hospitality groups, traders, farmers, fishermen,
            MSMEs and professionals who share our vision of Indonesia as hub and international
            markets as corridor.
          </p>
          <div className="mt-8 grid md:grid-cols-2 gap-3 text-[13px]">
            {[
              ["Investors:", "JV for hotels, restaurants, farms, fisheries, retail"],
              ["Tour Operators:", "Send tourists to Indonesia corridor"],
              ["Traders:", "Buy Indonesian products, supply equipment"],
              ["Professionals:", "Legal, training, hospitality experts"],
            ].map(([t, d]) => (
              <div
                key={t}
                className="p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                <strong className="text-[#e9d9b4]">{t}</strong> {d}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white text-[#122238] p-8 card card-flat">
          <h4 className="text-[14px] tracking-[0.16em] font-bold text-[#002448]">
            PARTNER WITH AHA RESOURCES
          </h4>
          <p className="mt-2 text-[12px] leading-5 text-[#45566c]">
            Fully functional — saves locally, shows confirmation, ready to connect to your backend.
          </p>
          <form onSubmit={submit} className="mt-6 space-y-3">
            <input
              required
              value={form.name}
              onChange={set("name")}
              placeholder="Name / Company"
              className="input"
            />
            <input
              required
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="Email"
              className="input"
            />
            <select required value={form.interest} onChange={set("interest")} className="input">
              <option value="">Interest Area</option>
              {INTERESTS.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
            <textarea
              required
              rows={4}
              value={form.msg}
              onChange={set("msg")}
              placeholder="Message — How do you want to partner?"
              className="input"
            />
            <button className="btn-navy w-full py-3.5">SEND PARTNERSHIP INQUIRY →</button>
          </form>
          <p className="mt-3 text-[11px] text-[#7b8a9d]">
            Response within 24 hours • Indonesia + International team • Stored locally for demo
          </p>

          {inquiries.length > 0 && (
            <div className="mt-6 border-t pt-4" style={{ borderColor: "var(--hair)" }}>
              <div className="text-[11px] tracking-widest font-bold">RECENT INQUIRIES (LOCAL)</div>
              <div className="mt-2 space-y-2 text-[12px]">
                {inquiries.slice(0, 4).map((q, i) => (
                  <div
                    key={i}
                    className="p-2.5 bg-[#f8f6f2] border text-[11px] leading-4"
                    style={{ borderColor: "var(--hair)" }}
                  >
                    <div className="font-bold text-[#002448]">
                      {q.name} • {q.interest}
                    </div>
                    <div className="text-[#45566c]">{q.email}</div>
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
