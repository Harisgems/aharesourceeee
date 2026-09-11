import { useEffect, useState, type FormEvent } from "react";
import { useUI } from "../store/ui";

/* ---------------- Scroll progress bar ---------------- */
export function ScrollProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const denom = h.scrollHeight - h.clientHeight;
      setW(denom > 0 ? (h.scrollTop / denom) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="progress" style={{ width: `${w}%` }} />;
}

/* ---------------- Toast ---------------- */
export function Toast() {
  const { toast } = useUI();
  return (
    <div className={`toast card-gold ${toast ? "show" : ""}`} role="status" aria-live="polite">
      {toast}
    </div>
  );
}

/* ---------------- Lightbox ---------------- */
export function Lightbox() {
  const { lightbox, closeLight } = useUI();
  if (!lightbox) return null;
  return (
    <div className="lightbox animate-fade" onClick={closeLight}>
      <img
        src={lightbox}
        alt="Expanded view"
        className="max-w-[92vw] max-h-[92vh] object-contain animate-pop"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="absolute top-6 right-6 text-white/70 text-[11px] tracking-widest cursor-pointer">
        CLOSE ✕
      </div>
    </div>
  );
}

/* ---------------- Booking modal ---------------- */
export function BookingModal() {
  const { bookType, closeBook, bookings, saveBooking, showToast } = useUI();
  const [form, setForm] = useState({
    date: "",
    guests: "",
    name: "",
    contact: "",
    note: "",
  });

  useEffect(() => {
    if (bookType) setForm({ date: "", guests: "", name: "", contact: "", note: "" });
  }, [bookType]);

  if (!bookType) return null;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    saveBooking({ ...form, type: bookType, at: new Date().toISOString() });
    showToast(`✓ Booking received — ${bookType}. Our team replies within 6 hours.`);
    setForm({ date: "", guests: "", name: "", contact: "", note: "" });
    closeBook();
  };

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="modal animate-fade" onClick={closeBook}>
      <div
        className="bg-white w-full max-w-[520px] card card-flat max-h-[92vh] overflow-auto animate-pop"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="p-7 border-b flex justify-between items-center gap-4"
          style={{ borderColor: "var(--hair)" }}
        >
          <div>
            <div className="kicker">BOOKING</div>
            <div className="text-[18px] font-bold text-[#002448] mt-1">{bookType}</div>
          </div>
          <button
            onClick={closeBook}
            className="w-9 h-9 border flex items-center justify-center hover:border-[#b48430] transition shrink-0"
            style={{ borderColor: "var(--hair)" }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-7">
          <form onSubmit={submit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                required
                value={form.date}
                onChange={set("date")}
                placeholder="Date / Check-in"
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
              placeholder="Details — e.g., Labuan Bajo 3N, 2 pax, vegetarian"
              className="input"
            />
            <button className="btn-navy w-full py-3.5">CONFIRM BOOKING →</button>
            <p className="text-[11px] text-[#7b8a9d] leading-4">
              Booking is stored locally and sent to our team. We respond within 6 hours. No payment
              required now — Indonesia + International support.
            </p>
          </form>

          {bookings.length > 0 && (
            <div className="mt-6 border-t pt-5" style={{ borderColor: "var(--hair)" }}>
              <div className="text-[11px] tracking-widest font-bold">YOUR RECENT BOOKINGS</div>
              <div className="mt-3 space-y-2">
                {bookings.slice(0, 5).map((b, i) => (
                  <div
                    key={i}
                    className="p-2.5 bg-[#f8f6f2] border text-[11px] leading-4"
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
      </div>
    </div>
  );
}

/* ---------------- Back to top ---------------- */
export function ToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 left-6 w-10 h-10 bg-white border shadow-lg flex items-center justify-center text-[12px] font-bold hover:bg-[#002448] hover:text-white transition z-30 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ borderColor: "var(--hair)" }}
    >
      ↑
    </button>
  );
}
