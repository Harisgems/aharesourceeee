import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BIZ_BY_SLUG, BUSINESSES } from "../data/businesses";
import { Container, Photo, Reveal } from "../components/common";
import BookingEngine from "../components/BookingEngine";
import { scrollToId } from "../store/ui";

export default function BusinessPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const biz = slug ? BIZ_BY_SLUG[slug] : undefined;
  const goBusinesses = () => navigate("/", { state: { scrollTo: "businesses" } });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!biz) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <div className="kicker">404</div>
        <h1 className="text-[32px] font-bold text-[#002448] mt-2">Business not found</h1>
        <Link to="/" className="btn-navy mt-6">
          BACK TO HOME
        </Link>
      </div>
    );
  }

  const others = BUSINESSES.filter((b) => b.slug !== biz.slug).slice(0, 4);
  const avgRating = (
    biz.offerings.reduce((s, o) => s + o.rating, 0) / biz.offerings.length
  ).toFixed(1);
  const totalReviews = biz.offerings.reduce((s, o) => s + o.reviews, 0);
  const fromPrice = Math.min(...biz.offerings.map((o) => o.price));

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[62vh] flex items-end overflow-hidden bg-[#00101f]">
        <div className="absolute inset-0">
          <img src={biz.hero} alt={biz.name} className="img-cover scale-[1.03]" />
          <div className="absolute inset-0 hero-grad" />
        </div>
        <Container className="relative w-full pb-12 pt-28">
          <nav className="text-[11px] tracking-widest text-white/60 font-bold">
            <Link to="/" className="hover:text-white">
              HOME
            </Link>{" "}
            <span className="mx-1">/</span>{" "}
            <button onClick={goBusinesses} className="hover:text-white">
              OUR BUSINESSES
            </button>{" "}
            <span className="mx-1">/</span>{" "}
            <span className="text-[#e9d9b4]">{biz.short.toUpperCase()}</span>
          </nav>

          <div className="inline-flex items-center gap-3 border border-white/15 bg-white/5 backdrop-blur px-3 py-2 mt-5">
            <span className="text-[10px] tracking-[0.22em] text-white/80 font-bold">
              {biz.no} — {biz.eyebrow}
            </span>
          </div>

          <h1 className="text-white text-[38px] lg:text-[62px] leading-[0.92] tracking-[-0.03em] mt-4 font-bold max-w-[900px]">
            {biz.name}
          </h1>
          <p className="text-[#e8edf4]/85 text-[15px] lg:text-[18px] mt-3 max-w-[640px] leading-relaxed">
            {biz.tagline}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="bg-[#b48430] text-white text-[13px] font-bold px-2 py-1 rounded-sm">
                {avgRating}
              </span>
              <span className="text-white text-[12px] font-semibold">
                {totalReviews.toLocaleString()} verified reviews
              </span>
            </div>
            <span className="text-white/50">•</span>
            <span className="text-white/80 text-[12px]">📍 {biz.location}</span>
            <span className="text-white/50">•</span>
            <span className="text-white/80 text-[12px]">
              From <strong className="text-[#e9d9b4]">${fromPrice}</strong>
            </span>
            <button onClick={() => scrollToId("book")} className="btn-gold ml-auto">
              BOOK NOW →
            </button>
          </div>
        </Container>
      </section>

      {/* INTRO + HIGHLIGHTS */}
      <Reveal className="bg-white border-b" style={{ borderColor: "var(--hair)" }}>
        <Container className="py-14 lg:py-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-12">
          <div>
            <div className="tag">OVERVIEW</div>
            <h2 className="text-[28px] lg:text-[38px] leading-[1.05] mt-4 text-[#002448]">
              {biz.tagline}
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-[#45566c]">{biz.intro}</p>

            <div className="mt-7 grid sm:grid-cols-2 gap-3">
              {biz.highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-center gap-3 p-3.5 bg-[#f8f6f2] border"
                  style={{ borderColor: "var(--hair)" }}
                >
                  <span className="w-7 h-7 bg-[#002448] text-white flex items-center justify-center text-[12px] shrink-0">
                    ★
                  </span>
                  <span className="text-[13px] font-semibold text-[#122238]">{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Photo src={biz.gallery[0]} alt={biz.name} className="h-[220px]" />
            <Photo src={biz.gallery[1]} alt={biz.name} className="h-[150px]" />
            <Photo src={biz.gallery[2]} alt={biz.name} className="h-[150px]" />
            <Photo src={biz.gallery[3]} alt={biz.name} className="h-[220px]" />
          </div>
        </Container>
      </Reveal>

      {/* SERVICES + OPPORTUNITY */}
      <Reveal className="bg-[#f8f6f2] border-b" style={{ borderColor: "var(--hair)" }}>
        <Container className="py-14 lg:py-20 grid lg:grid-cols-2 gap-10">
          <div>
            <div className="kicker">{biz.services.title.toUpperCase()}</div>
            <ul className="mt-5 space-y-2.5">
              {biz.services.items.map((s) => (
                <li
                  key={s}
                  className="flex gap-3 text-[14px] leading-6 text-[#45566c] bg-white p-3.5 border"
                  style={{ borderColor: "var(--hair)" }}
                >
                  <span className="text-[#b48430] font-bold">→</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="p-7 bg-[#002448] text-white card card-flat">
              <div className="kicker text-[#e9d9b4]">{biz.opportunity.title.toUpperCase()}</div>
              <p className="mt-4 text-[15px] leading-7 text-white/80">{biz.opportunity.body}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="p-4 bg-white/5 border border-white/10">
                  <div className="text-[22px] font-bold text-[#e9d9b4]">{avgRating}</div>
                  <div className="text-[10px] tracking-widest text-white/60 mt-1">AVG RATING</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10">
                  <div className="text-[22px] font-bold text-[#e9d9b4]">${fromPrice}</div>
                  <div className="text-[10px] tracking-widest text-white/60 mt-1">
                    STARTING FROM
                  </div>
                </div>
              </div>
              <button onClick={() => scrollToId("book")} className="btn-gold w-full mt-6">
                CHECK AVAILABILITY →
              </button>
            </div>
          </div>
        </Container>
      </Reveal>

      {/* BOOKING ENGINE */}
      <Reveal className="bg-[#f7f5f0] border-b" style={{ borderColor: "var(--hair)" }}>
        <Container className="py-14 lg:py-20">
          <div className="text-center max-w-[640px] mx-auto mb-8">
            <div className="kicker">RESERVE ONLINE</div>
            <h2 className="text-[28px] lg:text-[40px] leading-[1.02] mt-3 text-[#002448]">
              {biz.bookingTitle}
            </h2>
            <p className="mt-3 text-[14px] text-[#45566c]">{biz.bookingSubtitle}</p>
          </div>
          <div className="max-w-[1000px] mx-auto shadow-[0_20px_60px_rgba(0,22,46,0.10)]">
            <BookingEngine business={biz} />
          </div>
        </Container>
      </Reveal>

      {/* GALLERY */}
      <Reveal className="bg-white border-b" style={{ borderColor: "var(--hair)" }}>
        <Container className="py-14">
          <div className="kicker">GALLERY</div>
          <h3 className="text-[24px] mt-2 text-[#002448]">A closer look</h3>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {biz.gallery.map((g, i) => (
              <Photo key={`${g}-${i}`} src={g} alt={biz.name} className="h-[140px]" />
            ))}
          </div>
        </Container>
      </Reveal>

      {/* OTHER BUSINESSES */}
      <Reveal className="bg-[#f8f6f2]" style={{ borderColor: "var(--hair)" }}>
        <Container className="py-14 lg:py-20">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="kicker">EXPLORE MORE</div>
              <h3 className="text-[26px] lg:text-[34px] mt-2 text-[#002448]">
                Other Businesses in the Ecosystem
              </h3>
            </div>
            <button onClick={goBusinesses} className="btn-line">
              VIEW ALL 11 →
            </button>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={`/business/${o.slug}`}
                className="group border card bg-white overflow-hidden"
                style={{ borderColor: "var(--hair)" }}
              >
                <div className="h-[150px] overflow-hidden">
                  <img
                    src={o.hero}
                    alt={o.name}
                    loading="lazy"
                    className="img-cover group-hover:scale-105 transition duration-700"
                  />
                </div>
                <div className="p-4">
                  <span className="tag">{o.no}</span>
                  <h4 className="mt-3 text-[16px] text-[#002448] group-hover:text-[#b48430] transition">
                    {o.name}
                  </h4>
                  <p className="mt-1 text-[12px] leading-5 text-[#45566c] line-clamp-2">
                    {o.tagline}
                  </p>
                  <div className="mt-3 text-[11px] font-bold tracking-widest text-[#b48430]">
                    EXPLORE & BOOK →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Reveal>
    </div>
  );
}
