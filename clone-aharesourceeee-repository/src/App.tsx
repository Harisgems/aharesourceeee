import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BusinessPage from "./pages/BusinessPage";
import {
  BookingModal,
  Lightbox,
  ScrollProgress,
  Toast,
  ToTop,
} from "./components/Overlays";
import { UIProvider } from "./store/ui";

export default function App() {
  return (
    <HashRouter>
      <UIProvider>
        <ScrollProgress />
        <Toast />
        <Lightbox />
        <BookingModal />
        <Header />

        <main className="pt-[79px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/business/:slug" element={<BusinessPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
        <ToTop />
      </UIProvider>
    </HashRouter>
  );
}
