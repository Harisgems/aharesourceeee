import { useMemo, useRef, useState, type FormEvent } from "react";
import type { Business, Offering } from "../data/businesses";
import { useUI } from "../store/ui";

const TAX_RATE = 0.11; // Indonesia PPN 11%

function todayISO(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

function nightsBetween(a: string, b: string) {
  if (!a || !b) return 1;
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.max(1, Math.round(ms / 86400000));
}

function ratingWord(r: number) {
  if (r >= 9.3) return "Exceptional";
  if (r >= 9) return "Superb";
  if (r >= 8.5) return "Fabulous";
  if (r >= 8) return "Very Good";
  return "Good";
}

function money(n: number) {
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

type Step = "browse" | "details" | "confirmed";
type Sort = "recommended" | "price" | "rating";

export default function BookingEngine({ business }: { business: Business }) {
  const { saveBooking, showToast } = useUI();
  const isRange = business.bookingMode === "range";

  const [checkIn, setCheckIn] = useState(todayISO(3));
  const [checkOut, setCheckOut] = useState(todayISO(6));
  const [date, setDate] = useState(todayISO(3));
  const [time, setTime] = useState("19:00");
  const [qty, setQty] = useState(2);
  const [sort, setSort] = useState<Sort>("recommended");

  const [step, setStep] = useState<Step>("browse");
  const [selected, setSelected] = useState<Offering | null>(null);
  const [guest, setGuest] = useState({ name: "", email: "", phone: "", notes: "" });
  const [ref, setRef] = useState("");

  const sectionRef = useRef<HTMLDivElement | null>(null);

  const nights = isRange ? nightsBetween(checkIn, checkOut) : 0;

  const offerings = useMemo(() => {
    const arr = [...business.offerings];
    if (sort === "price") arr.sort((a, b) => a.price - b.price);
    else if (sort === "rating") arr.sort((a, b) => b.rating - a.rating);
    return arr;
  }, [business.offerings, sort]);

  function priceParts(o: Offering) {
    const timeMult = o.unit === "night" ? nights : 1;
    const subtotal = o.price * timeMult * qty;
    const tax = Math.round(subtotal * TAX_RATE);
    return { timeMult, subtotal, tax, total: subtotal + tax };
  }

  function reserve(o: Offering) {
    setSelected(o);
    setStep("details");
    setTimeout(
      () => sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      40,
    );
  }

  function confirm(e: FormEvent) {
    e.preventDefault();
    if (!selected) return;
    const reference = "AHA-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setRef(reference);
    const { total } = priceParts(selected);
    saveBooking({
      type: `${business.name} — ${selected.name}`,
      date: isRange ? `${checkIn} → ${checkOut}` : `${date} ${time}`,
      guests: `${qty} ${business.guestLabel.toLowerCase()}`,
      name: guest.name,
      contact: guest.email || guest.phone,
      note: `${guest.notes} | Total ${money(total)} | Ref ${reference}`,
      at: new Date().toISOString(),
    });
    showToast(`✓ Booking confirmed — ${selected.name}. Ref ${reference}`);
    setStep("confirmed");
    setTimeout(
      () => sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      40,
    );
  }

  function restart() {
    setStep("browse");
    setSelected(null);
    setGuest({ name: "", email: "", phone: "", notes: "" });
    setRef("");
  }

  return (
    <div ref={sectionRef} id="book" className="scroll-mt-[92px]">
      {/* ---------- Search bar ---------- */}
      <div className="bg-[#002448] text-white">
        <div className="p-5 lg:p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#e9d9b4] animate-pulse" />
            <span className="text-[11px] tracking-[0.16em] font-bold text-[#e9d9b4]">
              {business.bookingTitle.toUpperCase()}
            </span>
          </div>

          <div className="grid gap-2 md:grid-cols-[1fr_auto] items-end">
            <div
              className={`grid gap-2 ${isRange ? "sm:grid-cols-3" : "sm:grid-cols-3"} bg-white p-2 rounded-sm`}
            >
              {isRange ? (
                <>
                  <SearchField label="Check-in">
                    <input
                      type="date"
                      min={todayISO()}
                      value={checkIn}
                      onChange={(e) => {
                        setCheckIn(e.target.value);
                        if (e.target.value >= checkOut) {
                          const d = new Date(e.target.value);
                          d.setDate(d.getDate() + 1);
                          setCheckOut(d.toISOString().slice(0, 10));
                        }
                      }}
                      className="search-input"
                    />
                  </SearchField>
                  <SearchField label="Check-out">
                    <input
                      type="date"
                      min={checkIn}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="search-input"
                    />
                  </SearchField>
                </>
              ) : (
                <>
                  <SearchField label="Date">
                    <input
                      type="date"
                      min={todayISO()}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="search-input"
                    />
                  </SearchField>
                  <SearchField label="Time">
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="search-input"
                    />
                  </SearchField>
                </>
              )}
              <SearchField label={business.guestLabel}>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 border border-[#002448]/25 text-[#002448] font-bold hover:bg-[#f6efe0] transition shrink-0"
                    aria-label="Decrease"
                  >
                    −
                  </button>
                  <span className="text-[14px] font-bold text-[#002448] tabular-nums">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(20, q + 1))}
                    className="w-7 h-7 border border-[#002448]/25 text-[#002448] font-bold hover:bg-[#f6efe0] transition shrink-0"
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>
              </SearchField>
            </div>

            <button
              onClick={() => {
                setStep("browse");
                showToast(
                  isRange
                    ? `Showing availability for ${nights} night${nights > 1 ? "s" : ""}, ${qty} ${business.guestLabel.toLowerCase()}`
                    : `Showing availability for ${qty} ${business.guestLabel.toLowerCase()}`,
                );
              }}
              className="h-[54px] px-8 bg-[#b48430] hover:bg-[#9a6f28] transition text-white font-bold text-[12px] tracking-[0.16em]"
            >
              SEARCH
            </button>
          </div>

          <p className="mt-3 text-[11px] text-white/60">{business.bookingSubtitle}</p>
        </div>
      </div>

      {/* ---------- Body ---------- */}
      <div className="bg-white border border-t-0" style={{ borderColor: "var(--hair)" }}>
        {step === "browse" && (
          <div className="p-5 lg:p-6">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <h3 className="text-[16px] font-bold text-[#002448]">
                {business.offeringsLabel}{" "}
                <span className="text-[#7b8a9d] font-normal text-[13px]">
                  ({offerings.length} options
                  {isRange ? ` · ${nights} night${nights > 1 ? "s" : ""}` : ""})
                </span>
              </h3>
              <label className="text-[12px] text-[#45566c] flex items-center gap-2">
                Sort by
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="border px-2 py-1.5 text-[12px] outline-none focus:border-[#b48430]"
                  style={{ borderColor: "var(--hair)" }}
                >
                  <option value="recommended">Our top picks</option>
                  <option value="price">Price (lowest first)</option>
                  <option value="rating">Guest rating</option>
                </select>
              </label>
            </div>

            <div className="space-y-4">
              {offerings.map((o) => {
                const { subtotal, timeMult } = priceParts(o);
                return (
                  <div
                    key={o.id}
                    className="grid sm:grid-cols-[220px_1fr] border card card-flat overflow-hidden"
                    style={{ borderColor: "var(--hair)" }}
                  >
                    <div className="relative h-[180px] sm:h-full min-h-[180px] overflow-hidden">
                      <img src={o.img} alt={o.name} loading="lazy" className="img-cover" />
                      {o.badge && (
                        <span className="absolute top-3 left-3 bg-[#b48430] text-white text-[10px] font-bold tracking-widest px-2.5 py-1">
                          {o.badge}
                        </span>
                      )}
                    </div>

                    <div className="p-5 grid md:grid-cols-[1fr_auto] gap-4">
                      <div>
                        <h4 className="text-[17px] font-bold text-[#002448] leading-tight">
                          {o.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="bg-[#002448] text-white text-[12px] font-bold px-2 py-1 rounded-sm">
                            {o.rating.toFixed(1)}
                          </span>
                          <span className="text-[12px] font-bold text-[#002448]">
                            {ratingWord(o.rating)}
                          </span>
                          <span className="text-[11px] text-[#7b8a9d]">· {o.reviews} reviews</span>
                        </div>
                        <p className="mt-2 text-[13px] leading-6 text-[#45566c]">{o.desc}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {o.features.map((f) => (
                            <span
                              key={f}
                              className="text-[10.5px] tracking-wide text-[#45566c] border px-2 py-1 bg-[#f8f6f2]"
                              style={{ borderColor: "var(--hair)" }}
                            >
                              ✓ {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="md:text-right md:min-w-[170px] flex flex-col justify-end border-t md:border-t-0 md:border-l pt-3 md:pt-0 md:pl-5" style={{ borderColor: "var(--hair)" }}>
                        <div className="text-[10px] tracking-widest text-[#7b8a9d] uppercase">
                          {o.unit === "night"
                            ? `${qty} ${business.guestLabel.toLowerCase()} · ${timeMult} night${timeMult > 1 ? "s" : ""}`
                            : `${qty} × ${business.currency}`}
                        </div>
                        {o.oldPrice && (
                          <div className="text-[13px] text-[#c0392b] line-through">
                            {money(o.oldPrice * timeMult * qty)}
                          </div>
                        )}
                        <div className="text-[24px] font-bold text-[#002448] leading-none mt-0.5">
                          {money(subtotal)}
                        </div>
                        <div className="text-[10px] text-[#7b8a9d] mt-1">
                          +{Math.round(TAX_RATE * 100)}% taxes & fees
                        </div>
                        <button
                          onClick={() => reserve(o)}
                          className="mt-3 btn-navy w-full md:w-auto"
                        >
                          RESERVE →
                        </button>
                        <div className="text-[10px] text-[#2e7d32] mt-2 font-semibold">
                          ✓ Free cancellation
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === "details" && selected && (
          <DetailsStep
            business={business}
            offering={selected}
            isRange={isRange}
            checkIn={checkIn}
            checkOut={checkOut}
            date={date}
            time={time}
            qty={qty}
            guest={guest}
            setGuest={setGuest}
            onBack={() => setStep("browse")}
            onSubmit={confirm}
            priceParts={priceParts}
          />
        )}

        {step === "confirmed" && selected && (
          <ConfirmedStep
            business={business}
            offering={selected}
            reference={ref}
            isRange={isRange}
            checkIn={checkIn}
            checkOut={checkOut}
            date={date}
            time={time}
            qty={qty}
            guest={guest}
            total={priceParts(selected).total}
            onDone={restart}
          />
        )}
      </div>

      <style>{`
        .search-input{width:100%;border:none;outline:none;font-size:14px;font-weight:600;color:#002448;background:transparent}
        .search-input::-webkit-calendar-picker-indicator{cursor:pointer;opacity:.6}
      `}</style>
    </div>
  );
}

function SearchField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border border-[#002448]/15 px-3 py-2 hover:border-[#b48430] transition">
      <div className="text-[9px] tracking-[0.14em] font-bold text-[#7b8a9d] uppercase mb-0.5">
        {label}
      </div>
      {children}
    </div>
  );
}

/* ---------------- Step 2: guest details ---------------- */
function DetailsStep(props: {
  business: Business;
  offering: Offering;
  isRange: boolean;
  checkIn: string;
  checkOut: string;
  date: string;
  time: string;
  qty: number;
  guest: { name: string; email: string; phone: string; notes: string };
  setGuest: (g: { name: string; email: string; phone: string; notes: string }) => void;
  onBack: () => void;
  onSubmit: (e: FormEvent) => void;
  priceParts: (o: Offering) => { timeMult: number; subtotal: number; tax: number; total: number };
}) {
  const {
    business,
    offering,
    isRange,
    checkIn,
    checkOut,
    date,
    time,
    qty,
    guest,
    setGuest,
    onBack,
    onSubmit,
    priceParts,
  } = props;
  const { subtotal, tax, total, timeMult } = priceParts(offering);
  const set = (k: keyof typeof guest) => (e: { target: { value: string } }) =>
    setGuest({ ...guest, [k]: e.target.value });

  return (
    <div className="p-5 lg:p-6">
      <button
        onClick={onBack}
        className="text-[12px] font-bold text-[#b48430] hover:underline mb-4"
      >
        ← Back to options
      </button>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        {/* Guest form */}
        <form onSubmit={onSubmit} className="order-2 lg:order-1">
          <h3 className="text-[18px] font-bold text-[#002448]">Enter your details</h3>
          <p className="text-[12px] text-[#7b8a9d] mt-1">
            Almost done! Just fill in the required info.
          </p>

          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <input
              required
              value={guest.name}
              onChange={set("name")}
              placeholder="Full name *"
              className="input"
            />
            <input
              required
              type="email"
              value={guest.email}
              onChange={set("email")}
              placeholder="Email *"
              className="input"
            />
            <input
              required
              value={guest.phone}
              onChange={set("phone")}
              placeholder="Phone / WhatsApp *"
              className="input"
            />
            <input
              value=""
              readOnly
              placeholder={`${qty} ${business.guestLabel}`}
              className="input bg-[#f8f6f2] cursor-default"
            />
            <textarea
              rows={3}
              value={guest.notes}
              onChange={set("notes")}
              placeholder="Special requests (optional) — e.g., halal meals, airport pickup, dietary needs"
              className="input sm:col-span-2"
            />
          </div>

          <div
            className="mt-4 p-3 bg-[#f8f6f2] border text-[11px] leading-5 text-[#45566c]"
            style={{ borderColor: "var(--hair)" }}
          >
            <strong className="text-[#2e7d32]">No payment needed today.</strong> You'll pay at the
            destination. Free cancellation up to 48 hours before. Your booking is stored securely and
            our team confirms within 6 hours.
          </div>

          <button className="mt-4 btn-gold w-full py-4 text-[13px]">
            CONFIRM BOOKING — {money(total)} →
          </button>
        </form>

        {/* Summary card */}
        <aside className="order-1 lg:order-2">
          <div className="border card card-flat overflow-hidden" style={{ borderColor: "var(--hair)" }}>
            <div className="h-[140px] overflow-hidden">
              <img src={offering.img} alt={offering.name} className="img-cover" />
            </div>
            <div className="p-4">
              <div className="text-[10px] tracking-widest text-[#b48430] font-bold uppercase">
                {business.name}
              </div>
              <h4 className="text-[15px] font-bold text-[#002448] mt-1 leading-tight">
                {offering.name}
              </h4>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-[#002448] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm">
                  {offering.rating.toFixed(1)}
                </span>
                <span className="text-[11px] text-[#7b8a9d]">{offering.reviews} reviews</span>
              </div>

              <div className="mt-3 border-t pt-3 space-y-1.5 text-[12px]" style={{ borderColor: "var(--hair)" }}>
                {isRange ? (
                  <>
                    <Row label="Check-in" value={checkIn} />
                    <Row label="Check-out" value={checkOut} />
                  </>
                ) : (
                  <Row label="Date" value={`${date} · ${time}`} />
                )}
                <Row label={business.guestLabel} value={String(qty)} />
              </div>

              <div className="mt-3 border-t pt-3 space-y-1.5 text-[12px]" style={{ borderColor: "var(--hair)" }}>
                <Row
                  label={
                    offering.unit === "night"
                      ? `${money(offering.price)} × ${timeMult} night${timeMult > 1 ? "s" : ""} × ${qty}`
                      : `${money(offering.price)} × ${qty} ${offering.unit}${qty > 1 ? "s" : ""}`
                  }
                  value={money(subtotal)}
                />
                <Row label={`Taxes & fees (11%)`} value={money(tax)} />
              </div>

              <div className="mt-3 border-t pt-3 flex justify-between items-baseline" style={{ borderColor: "var(--hair)" }}>
                <span className="text-[13px] font-bold text-[#002448]">Total</span>
                <span className="text-[22px] font-bold text-[#002448]">{money(total)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ---------------- Step 3: confirmation ---------------- */
function ConfirmedStep(props: {
  business: Business;
  offering: Offering;
  reference: string;
  isRange: boolean;
  checkIn: string;
  checkOut: string;
  date: string;
  time: string;
  qty: number;
  guest: { name: string; email: string; phone: string; notes: string };
  total: number;
  onDone: () => void;
}) {
  const { business, offering, reference, isRange, checkIn, checkOut, date, time, qty, guest, total, onDone } =
    props;
  return (
    <div className="p-6 lg:p-10 text-center">
      <div className="mx-auto w-16 h-16 rounded-full bg-[#2e7d32] text-white flex items-center justify-center text-[30px]">
        ✓
      </div>
      <h3 className="text-[24px] font-bold text-[#002448] mt-4">Booking Confirmed!</h3>
      <p className="text-[13px] text-[#45566c] mt-2 max-w-[480px] mx-auto">
        Thank you {guest.name || "traveller"} — your reservation is secured. A confirmation has been
        sent to {guest.email || "your email"}. Our team will reach out within 6 hours.
      </p>

      <div
        className="mt-6 max-w-[460px] mx-auto text-left border card card-flat p-5"
        style={{ borderColor: "var(--hair)" }}
      >
        <div className="flex justify-between items-center">
          <span className="text-[10px] tracking-widest text-[#7b8a9d] uppercase">
            Booking reference
          </span>
          <span className="text-[14px] font-bold text-[#b48430] tracking-widest">{reference}</span>
        </div>
        <div className="mt-3 border-t pt-3 space-y-1.5 text-[12px]" style={{ borderColor: "var(--hair)" }}>
          <Row label="Business" value={business.name} />
          <Row label="Booked" value={offering.name} />
          {isRange ? (
            <Row label="Dates" value={`${checkIn} → ${checkOut}`} />
          ) : (
            <Row label="Date" value={`${date} · ${time}`} />
          )}
          <Row label={business.guestLabel} value={String(qty)} />
          <Row label="Total (pay at destination)" value={money(total)} />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <button onClick={onDone} className="btn-navy">
          MAKE ANOTHER BOOKING
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-[#7b8a9d]">{label}</span>
      <span className="text-[#122238] font-semibold text-right">{value}</span>
    </div>
  );
}
