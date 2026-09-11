import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type Booking = {
  type: string;
  date: string;
  guests: string;
  name: string;
  contact: string;
  note?: string;
  at: string;
};

export type Inquiry = {
  name: string;
  email: string;
  interest: string;
  msg: string;
  at: string;
};

const BOOK_KEY = "aha_bookings";
const INQ_KEY = "aha_inquiries";

function read<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]") as T[];
  } catch {
    return [];
  }
}

type UIContextValue = {
  toast: string | null;
  showToast: (msg: string) => void;
  lightbox: string | null;
  openLight: (src: string) => void;
  closeLight: () => void;
  bookType: string | null;
  openBook: (type: string) => void;
  closeBook: () => void;
  bookings: Booking[];
  saveBooking: (b: Booking) => void;
  inquiries: Inquiry[];
  saveInquiry: (i: Inquiry) => void;
};

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [bookType, setBookType] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    setBookings(read<Booking>(BOOK_KEY));
    setInquiries(read<Inquiry>(INQ_KEY));
  }, []);

  const toastTimer = useRef<number | undefined>(undefined);
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3400);
  }, []);

  const openLight = useCallback((src: string) => setLightbox(src), []);
  const closeLight = useCallback(() => setLightbox(null), []);
  const openBook = useCallback((type: string) => setBookType(type), []);
  const closeBook = useCallback(() => setBookType(null), []);

  const saveBooking = useCallback((b: Booking) => {
    setBookings((prev) => {
      const next = [b, ...prev].slice(0, 20);
      localStorage.setItem(BOOK_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const saveInquiry = useCallback((i: Inquiry) => {
    setInquiries((prev) => {
      const next = [i, ...prev].slice(0, 20);
      localStorage.setItem(INQ_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  // Lock body scroll while an overlay is open
  useEffect(() => {
    const open = Boolean(lightbox || bookType);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox, bookType]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightbox(null);
        setBookType(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(
    () => ({
      toast,
      showToast,
      lightbox,
      openLight,
      closeLight,
      bookType,
      openBook,
      closeBook,
      bookings,
      saveBooking,
      inquiries,
      saveInquiry,
    }),
    [
      toast,
      showToast,
      lightbox,
      openLight,
      closeLight,
      bookType,
      openBook,
      closeBook,
      bookings,
      saveBooking,
      inquiries,
      saveInquiry,
    ],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
