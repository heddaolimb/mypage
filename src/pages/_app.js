import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Stjernehimmel */}
      <div className="stars">
        {Array.from({ length: 50 }).map((_, i) => (
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
        <svg viewBox="0 0 1440 600" className="w-full h-full">
          <path
            fill="#6366f1"
            fillOpacity="0.3"
            d="
                M0,300 
                C360,150,1080,450,1440,300 
                L1440,600 L0,600Z
              "
          >
            <animate
              attributeName="d"
              dur="22s"
              repeatCount="indefinite"
              values="
                  M0,300 C360,120,1080,480,1440,300 L1440,600 L0,600Z;
                  M0,350 C360,200,1080,400,1440,350 L1440,600 L0,600Z;
                  M0,280 C360,100,1080,500,1440,280 L1440,600 L0,600Z;
                  M0,300 C360,120,1080,480,1440,300 L1440,600 L0,600Z
                "
            />
          </path>
        </svg>
      </div>

      <Component {...pageProps} />
    </>
  );
}
