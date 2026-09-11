import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useUI } from "../store/ui";

/* ---------------- Reveal on scroll ---------------- */
export function Reveal({
  children,
  className = "",
  as: Tag = "section",
  id,
  style,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
  id?: string;
  style?: CSSProperties;
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    // Safety net: never leave content hidden
    const t = window.setTimeout(() => setShown(true), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  const props = {
    ref: ref as never,
    id,
    className: `reveal ${shown ? "in" : ""} ${className}`,
    style: { transitionDelay: `${delay}s`, ...style },
  };

  return Tag === "div" ? <div {...props}>{children}</div> : <section {...props}>{children}</section>;
}

/* ---------------- Clickable photo tile ---------------- */
export function Photo({
  src,
  alt = "",
  className = "",
  imgClass = "",
  caption,
  eager = false,
}: {
  src: string;
  alt?: string;
  className?: string;
  imgClass?: string;
  caption?: string;
  eager?: boolean;
}) {
  const { openLight } = useUI();
  return (
    <button
      type="button"
      onClick={() => openLight(src)}
      aria-label={alt || "Open image"}
      className={`relative block w-full overflow-hidden card group cursor-pointer text-left ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        className={`img-cover transition duration-700 group-hover:scale-[1.06] ${imgClass}`}
      />
      {caption && (
        <span className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
          <span className="text-[10px] tracking-widest text-white font-bold">{caption}</span>
        </span>
      )}
    </button>
  );
}

/* ---------------- Animated counter ---------------- */
export function Counter({ target, className = "" }: { target: number; className?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      let cur = 0;
      const inc = target / 30;
      const timer = window.setInterval(() => {
        cur += inc;
        if (cur >= target) {
          setVal(target);
          window.clearInterval(timer);
        } else setVal(Math.floor(cur));
      }, 40);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <span ref={ref} className={className}>
      {val}
    </span>
  );
}

/* ---------------- Section wrapper ---------------- */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`max-w-[1440px] mx-auto px-6 lg:px-10 ${className}`}>{children}</div>;
}
