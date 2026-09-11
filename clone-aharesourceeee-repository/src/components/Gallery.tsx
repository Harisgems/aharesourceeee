import { useState } from "react";
import { Container, Photo, Reveal } from "./common";
import { GALLERY } from "../data/images";

export default function Gallery() {
  const [showAll, setShowAll] = useState(false);
  const items = showAll ? GALLERY : GALLERY.slice(0, 18);

  return (
    <Reveal id="gallery" className="bg-white border-b" style={{ borderColor: "var(--hair)" }}>
      <Container className="py-16">
        <div className="flex justify-between items-end flex-wrap gap-4">
          <div>
            <div className="kicker">REAL MOMENTS — {GALLERY.length} PHOTOS</div>
            <h3 className="text-[24px] mt-2 text-[#002448]">
              Indonesia Through Our Lens — Click to Expand.
            </h3>
          </div>
          <div className="text-[11px] text-[#45566c] flex items-center gap-2">
            <span className="w-2 h-2 bg-[#b48430] rounded-full" />
            Lightbox enabled • Imagery used across business sections
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {items.map((g, i) => (
            <Photo key={`${g.src}-${i}`} src={g.src} alt={g.alt} className="h-[140px]" />
          ))}
        </div>

        {GALLERY.length > 18 && (
          <div className="mt-8 flex justify-center">
            <button onClick={() => setShowAll((v) => !v)} className="btn-line">
              {showAll ? "SHOW LESS" : `VIEW ALL ${GALLERY.length} PHOTOS →`}
            </button>
          </div>
        )}
      </Container>
    </Reveal>
  );
}
