import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Stjernehimmel */}
      <div className="stars">
        {Array.from({ length: 100 }).map((_, i) => (
          <span
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          ></span>
        ))}
      </div>

      {/* Wave-bakgrunn */}
      <div className="wave-bg">
        <svg
          viewBox="0 0 2880 600"
          className="wave-scroll"
          preserveAspectRatio="none"
        >
          {/* Bølge nr 1 */}
          <path
            fill="#000000ff"
            fillOpacity="0.4"
            d="
        M0,450 
        C240,220, 480,420, 720,320
        C960,220, 1200,420, 1440,320
        C1680,220, 1920,420, 2160,320
        C2400,220, 2640,420, 2880,320
        L2880,600 L0,600Z
      "
          />
          {/* Bølge nr 2 (kopi, flyttet til høyre) */}
          <path
            fill="#040407ff"
            fillOpacity="0.3"
            d="
        M2880,450 
        C3120,220, 3360,420, 3600,320
        C3840,220, 4080,420, 4320,320
        C4560,220, 4800,420, 5040,320
        C5280,220, 5520,420, 5760,320
        L5760,600 L2880,600Z
      "
          />
        </svg>
      </div>

      <Component {...pageProps} />
    </>
  );
}
