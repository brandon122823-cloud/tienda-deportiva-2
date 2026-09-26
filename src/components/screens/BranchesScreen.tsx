import React, { useState } from 'react';

interface BranchesScreenProps {
  onShowToast: (message: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const BranchesScreen: React.FC<BranchesScreenProps> = ({
  onShowToast,
  onNavigateTab,
}) => {
  const [mapMode, setMapMode] = useState<'vector' | 'satellite'>('vector');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [joinedClub, setJoinedClub] = useState(false);
  const [activeGalleryImage, setActiveGalleryImage] = useState<string | null>(null);

  const galleryImages = [
    {
      title: 'Fachada Flagship',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_KoVthjHjIM44xzeZmxYdhvsiW-Symy77mSy8e__1YWKK2TV3_5Xy6K2PJJln5J3Y8L0UcJVIlkQEUeRU_WU9iynCfpTT3-I4A4JRCoU62BWDGHdyZ6al7mtQAv-4J6e9IjTl8XV00ofraue58j5JUwUByDBqVt7eSkA4eppWgIUmJMIGlu3ThtawTPpFRF4tbtZBN25hRWuxOpOkpnUxkA9De2Lfa88R930PW3kBk1btFXMm_Mxd',
      desc: 'Acceso principal de doble altura con iluminación LED azul cobalto y pantallas interactivas.',
    },
    {
      title: 'Pista de Prueba',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXGP0U2RYlnDMQFXx3GmvOsiJZELRp8podohFuFmMRSECV2z6Plryd3tOjRgT0HZhnHl1hy1SpFZbIPJy_3WILC6Uoc2j9BFosGJHQLJ3oEO0fAlx5hNc1BX_0bRiMQqyX5EU46O2rFtRBr5HDV31DK1jeMVv774v2Szk2mgg_YQkCTZkPdlfrEZjK6jIwp9m3q7Zu9D74McstReFpR3iamAI9XK5pSMKO1tz6R5mraBufxqrmZ4y3',
      desc: 'Pista indoor de 30m con tartán profesional y sensores de pisada biomecánicos.',
    },
    {
      title: 'Balones & Training',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrz5NWTHm_B5XV8Ee0lyxfCG3eXb_P9AN1-k6IX5GJIPAmuIiHmPYU8Hys7h25ajlm6PYQAFV_v9pVObl7TjuBOFrOQPQAts6fTTUMLjlto4MFFsm353uycQz5nJDLJrmoux4WC7FYGSUZFtnCbjpl4u6aPXd3WM392IPVjhOAqAcewJUa4sk8xkCg7pmCroLS12FIIIhynt25GVuoIQk0A2drXnw1reBPLE8ldbj-LCdnqjxtkDne',
      desc: 'Paredes geométricas de exhibición técnica para balones FIFA Match-Day y accesorios de fuerza.',
    },
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Richard Athletic - Sede Flagship Calle 16',
          text: 'Conoce la tienda deportiva más avanzada en Calle 16, Bogotá.',
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      onShowToast('¡Enlace de ubicación copiado!');
    }
  };

  return (
    <div className="flex flex-col w-full gap-5 pb-16">
      {/* 1. Header Card: Store Identity & Quick Actions */}
      <div className="flex flex-col bg-[#1f1f23] rounded-2xl p-4 sm:p-5 gap-4 shadow-xl border border-[#292a2d] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#0055ff]/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#292a2d] border border-[#343538]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e55b] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e55b]"></span>
              </span>
              <span className="text-[10px] text-[#00e55b] uppercase font-bold tracking-wider">
                Abierto Ahora
              </span>
            </div>
            <div className="flex items-center gap-1 text-[#c3c5d9] text-xs font-semibold">
              <span className="material-symbols-outlined text-[16px] text-[#b6c4ff]">verified</span>
              <span>Sede Flagship Oficial</span>
            </div>
          </div>

          <h1 className="font-['Space_Grotesk'] text-xl sm:text-2xl text-[#e3e2e6] font-bold uppercase tracking-tight mt-1">
            Tienda Richard • Calle 16
          </h1>
          <div className="flex items-center gap-1.5 text-[#c3c5d9] text-xs">
            <span className="material-symbols-outlined text-[18px] text-[#ff562d]">pin_drop</span>
            <span>Av. Calle 16 # 84-25, Zona Deportiva, Bogotá</span>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <a
            href="https://maps.google.com/?q=Av.+Calle+16+%23+84-25+Bogota"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#0055ff] text-white shadow-md hover:bg-[#0047d9] active:scale-95 transition-all gap-1 group"
          >
            <span className="material-symbols-outlined text-[20px] transition-transform group-hover:-translate-y-0.5">
              navigation
            </span>
            <span className="text-[11px] uppercase font-bold tracking-wide">Cómo llegar</span>
          </a>

          <a
            href="tel:+571800091234"
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#292a2d] text-[#e3e2e6] hover:text-[#b6c4ff] hover:bg-[#343538] active:scale-95 transition-all gap-1 border border-[#343538]/50"
          >
            <span className="material-symbols-outlined text-[20px]">call</span>
            <span className="text-[11px] font-semibold">Llamar</span>
          </a>

          <button
            onClick={handleShare}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#292a2d] text-[#e3e2e6] hover:text-[#b6c4ff] hover:bg-[#343538] active:scale-95 transition-all gap-1 border border-[#343538]/50 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
            <span className="text-[11px] font-semibold">Compartir</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Map Simulation */}
      <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-[#0d0e11] shadow-2xl flex flex-col justify-between p-4 border border-[#292a2d]">
        {/* Stylized Vector / Satellite SVG Map Backdrop */}
        <div
          className="absolute inset-0 transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {mapMode === 'vector' ? (
            <svg
              className="w-full h-full object-cover opacity-90"
              preserveAspectRatio="none"
              viewBox="0 0 400 320"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect fill="#0d0e11" height="320" width="400" />
              {/* Urban Blocks */}
              <path d="M 10 20 L 110 20 L 110 90 L 10 90 Z" fill="#1b1b1f" />
              <path d="M 130 15 L 260 15 L 260 85 L 130 85 Z" fill="#1b1b1f" />
              <path d="M 280 20 L 390 20 L 390 100 L 280 100 Z" fill="#1b1b1f" />
              <path d="M 15 110 L 95 110 L 95 210 L 15 210 Z" fill="#1b1b1f" />
              <path d="M 115 105 L 220 105 L 220 195 L 115 195 Z" fill="#1f1f23" />
              <path d="M 240 120 L 385 120 L 385 200 L 240 200 Z" fill="#1b1b1f" />
              <path d="M 20 230 L 130 230 L 130 305 L 20 305 Z" fill="#1b1b1f" />
              <path d="M 150 215 L 270 215 L 270 305 L 150 305 Z" fill="#1b1b1f" />
              <path d="M 290 220 L 390 220 L 390 305 L 290 305 Z" fill="#1f1f23" />
              {/* Secondary Street Grid */}
              <line stroke="#292a2d" strokeWidth="6" x1="0" x2="400" y1="98" y2="98" />
              <line stroke="#292a2d" strokeWidth="8" x1="0" x2="400" y1="208" y2="208" />
              <line stroke="#292a2d" strokeWidth="6" x1="122" x2="122" y1="0" y2="320" />
              <line stroke="#292a2d" strokeWidth="6" x1="272" x2="272" y1="0" y2="320" />
              {/* Primary Arteries: Calle 16 Highlight */}
              <line stroke="#343538" strokeWidth="18" x1="0" x2="400" y1="160" y2="160" />
              <line opacity="0.7" stroke="#ff562d" strokeDasharray="6,4" strokeWidth="3" x1="0" x2="400" y1="160" y2="160" />
              {/* Carrera 84 Cross Avenue */}
              <line stroke="#343538" strokeWidth="16" x1="200" x2="200" y1="0" y2="320" />
              <line opacity="0.6" stroke="#0055ff" strokeWidth="2.5" x1="200" x2="200" y1="0" y2="320" />
              {/* Street Label Typography */}
              <text fill="#c3c5d9" fontFamily="Lexend" fontSize="10" fontWeight="600" letterSpacing="1" x="24" y="155">
                AV. CALLE 16 (EJE DEPORTIVO)
              </text>
              <text fill="#8d90a2" fontFamily="Lexend" fontSize="9" transform="rotate(90 206,45)" x="206" y="45">
                CRA 84
              </text>
            </svg>
          ) : (
            <div className="w-full h-full bg-[#1b1b1f] relative overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKxDsUHWdWVAPtyjPR7y4zfl0tsWVGwqn6Yf1_5py0LgRqmtAYDxfmy7wdmmjpHJCeQ7tPahLZB1gfH6hYOkqCkslTFUF_NcWVrbyGfdB_AOXRp3jR_SPB0tjeJ4Z5NBSQL1yoMGQ0cokKUB33jcOPWAS8z1DM8_NY67EE7gj1XtrXfm1u_E-_ZdClX8dapXe4QSIXHcHAh5rmQmV5Zb8Mr1nNC3B1ndpYKKJa-T1Rqz2KYe-Y181I"
                alt="Vista Satelital"
                className="w-full h-full object-cover filter brightness-75 contrast-125"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[#0055ff]/10"></div>
            </div>
          )}
        </div>

        {/* Map Top Overlay: Proximity & Mode Switch */}
        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="flex items-center gap-1.5 bg-[#121316]/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-[#292a2d]">
            <span className="material-symbols-outlined text-[16px] text-[#00e55b]">near_me</span>
            <span className="text-xs text-[#e3e2e6] font-semibold">A 12 min de ti • 4.2 km</span>
          </div>

          <div className="flex bg-[#292a2d]/90 backdrop-blur-md p-0.5 rounded-xl shadow border border-[#343538]">
            <button
              onClick={() => setMapMode('vector')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                mapMode === 'vector'
                  ? 'bg-[#b6c4ff] text-[#002780]'
                  : 'text-[#c3c5d9] hover:text-white'
              }`}
            >
              Vector
            </button>
            <button
              onClick={() => setMapMode('satellite')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                mapMode === 'satellite'
                  ? 'bg-[#b6c4ff] text-[#002780]'
                  : 'text-[#c3c5d9] hover:text-white'
              }`}
            >
              Satélite
            </button>
          </div>
        </div>

        {/* Center Stage Pin: Richard Athletic Custom Marker */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none">
          {/* Radar Pulsing Rings */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-20 h-20 rounded-full bg-[#0055ff]/25 animate-ping"></div>
            <div className="absolute w-12 h-12 rounded-full bg-[#0055ff]/40"></div>
            {/* Athletic Brand Pin Container */}
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-tr from-[#0055ff] to-[#ff562d] p-0.5 shadow-2xl flex items-center justify-center rotate-45">
              <div className="w-full h-full bg-[#0d0e11] rounded-[10px] flex items-center justify-center -rotate-45">
                <span className="font-['Space_Grotesk'] text-base font-bold text-white tracking-tighter">
                  <span className="text-[#b6c4ff]">R</span>
                  <span className="text-[#ff562d]">16</span>
                </span>
              </div>
            </div>
          </div>
          {/* Tooltip Tag */}
          <div className="mt-2 px-2.5 py-1 rounded-md bg-[#343538]/95 backdrop-blur-sm shadow-md flex items-center gap-1.5 border border-[#434656]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e55b]"></span>
            <span className="text-[11px] text-[#e3e2e6] font-semibold tracking-wide">
              Richard Calle 16
            </span>
          </div>
        </div>

        {/* Map Bottom Overlay: Location Center & Zoom Controls */}
        <div className="relative z-10 flex items-end justify-between w-full">
          <div className="bg-[#121316]/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[#c3c5d9] text-xs border border-[#292a2d]">
            Tráfico fluido en Calle 16
          </div>
          <div className="flex flex-col gap-1 shadow-lg">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.0))}
              aria-label="Aumentar zoom"
              className="w-8 h-8 rounded-lg bg-[#292a2d]/90 text-white flex items-center justify-center hover:bg-[#38393c] active:scale-95 transition-all border border-[#343538]"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
              aria-label="Disminuir zoom"
              className="w-8 h-8 rounded-lg bg-[#292a2d]/90 text-white flex items-center justify-center hover:bg-[#38393c] active:scale-95 transition-all border border-[#343538]"
            >
              <span className="material-symbols-outlined text-[18px]">remove</span>
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              aria-label="Centrar ubicación"
              className="w-8 h-8 rounded-lg bg-[#292a2d]/90 text-[#b6c4ff] flex items-center justify-center hover:bg-[#38393c] active:scale-95 transition-all border border-[#343538]"
            >
              <span className="material-symbols-outlined text-[18px]">my_location</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Operational Dynamics: Hours & Live Capacity Barometer */}
      <div className="grid grid-cols-1 gap-3">
        {/* Hours Breakdown */}
        <div className="flex flex-col bg-[#1f1f23] rounded-2xl p-4 sm:p-5 gap-3 border border-[#292a2d] shadow-sm">
          <div className="flex items-center gap-2 text-[#b6c4ff]">
            <span className="material-symbols-outlined text-[20px]">schedule</span>
            <h2 className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-[#e3e2e6] tracking-tight uppercase">
              Horarios de Atención
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <div className="flex items-center justify-between p-2.5 bg-[#1b1b1f] rounded-xl px-3 border border-[#292a2d]">
              <span className="text-xs text-[#c3c5d9]">Lunes a Sábado</span>
              <span className="text-xs font-bold text-[#e3e2e6]">8:00 AM – 9:00 PM</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-[#1b1b1f] rounded-xl px-3 border border-[#292a2d]">
              <span className="text-xs text-[#c3c5d9]">Domingos y Festivos</span>
              <span className="text-xs font-bold text-[#e3e2e6]">9:00 AM – 7:00 PM</span>
            </div>
          </div>
        </div>

        {/* Live Footfall Occupancy Visualizer */}
        <div className="flex flex-col bg-[#1f1f23] rounded-2xl p-4 sm:p-5 gap-3 border border-[#292a2d] shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#00e55b]">analytics</span>
              <h2 className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-[#e3e2e6] tracking-tight uppercase">
                Afluencia en Vivo
              </h2>
            </div>
            <div className="flex items-center gap-1.5 bg-[#00782c]/25 px-2.5 py-0.5 rounded-full border border-[#00e55b]/30">
              <span className="w-2 h-2 rounded-full bg-[#00e55b]"></span>
              <span className="text-[10px] text-[#8fff99] font-bold">Poco concurrido</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#c3c5d9]">
            <span>Capacidad actual estimada</span>
            <span className="font-bold text-[#e3e2e6]">35% de aforo</span>
          </div>

          {/* Histogram Chart */}
          <div className="w-full flex flex-col gap-1 pt-1">
            <div className="flex items-end justify-between h-14 gap-1.5 px-2 bg-[#1b1b1f] rounded-xl py-2 border border-[#292a2d]">
              <div className="flex-1 bg-[#343538] rounded-t h-[20%]"></div>
              <div className="flex-1 bg-[#343538] rounded-t h-[35%]"></div>
              <div className="flex-1 bg-[#343538] rounded-t h-[50%]"></div>
              <div className="flex-1 bg-[#343538] rounded-t h-[65%]"></div>
              <div className="flex-1 bg-[#343538] rounded-t h-[75%]"></div>
              <div className="flex-1 bg-[#00e55b] rounded-t h-[35%] relative group">
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] text-[#00e55b] font-bold">
                  Ahora
                </span>
              </div>
              <div className="flex-1 bg-[#343538] rounded-t h-[55%]"></div>
              <div className="flex-1 bg-[#343538] rounded-t h-[80%]"></div>
              <div className="flex-1 bg-[#343538] rounded-t h-[90%]"></div>
              <div className="flex-1 bg-[#343538] rounded-t h-[70%]"></div>
              <div className="flex-1 bg-[#343538] rounded-t h-[40%]"></div>
              <div className="flex-1 bg-[#343538] rounded-t h-[15%]"></div>
            </div>
            <div className="flex justify-between px-2 text-[10px] text-[#8d90a2] font-semibold">
              <span>8 AM</span>
              <span>12 PM</span>
              <span>4 PM</span>
              <span>9 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Specialized Store Services Bento */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-[#e3e2e6] uppercase tracking-tight">
            Servicios en Calle 16
          </h2>
          <span className="text-xs text-[#8d90a2]">Experiencia Richard Pro</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Running Test Track */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#1f1f23] border border-[#292a2d] hover:border-[#b6c4ff]/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#0055ff]/20 text-[#b6c4ff] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">sprint</span>
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="text-xs sm:text-sm text-[#e3e2e6] font-bold">Pista Indoor de Prueba</h3>
              <p className="text-[11px] sm:text-xs text-[#c3c5d9] mt-0.5 leading-snug">
                Prueba calzado técnico sobre tartán profesional antes de decidir tu compra.
              </p>
            </div>
          </div>

          {/* Jersey Customization */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#1f1f23] border border-[#292a2d] hover:border-[#ff562d]/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#ff562d]/20 text-[#ff562d] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">apparel</span>
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="text-xs sm:text-sm text-[#e3e2e6] font-bold">Estampado Oficial Flash</h3>
              <p className="text-[11px] sm:text-xs text-[#c3c5d9] mt-0.5 leading-snug">
                Nombre, dorsal y parches térmicos profesionales listos en solo 15 minutos.
              </p>
            </div>
          </div>

          {/* Click & Collect */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#1f1f23] border border-[#292a2d] hover:border-[#00e55b]/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#00782c]/20 text-[#00e55b] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">shopping_bag_speed</span>
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="text-xs sm:text-sm text-[#e3e2e6] font-bold">Click & Collect en 1h</h3>
              <p className="text-[11px] sm:text-xs text-[#c3c5d9] mt-0.5 leading-snug">
                Compra en la app y retira en taquilla express sin hacer filas.
              </p>
            </div>
          </div>

          {/* Biomechanical Gait Analysis */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#1f1f23] border border-[#292a2d] hover:border-[#b6c4ff]/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#b6c4ff]/20 text-[#b6c4ff] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">footprint</span>
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="text-xs sm:text-sm text-[#e3e2e6] font-bold">Asesoría Biomecánica</h3>
              <p className="text-[11px] sm:text-xs text-[#c3c5d9] mt-0.5 leading-snug">
                Análisis de pisada computarizado sin costo guiado por atletas expertos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Community Activity Spotlight: Running Club */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#292a2d] via-[#1f1f23] to-[#1b1b1f] p-4 sm:p-5 flex flex-col gap-3 shadow-xl border border-[#292a2d]">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#ff562d]/15 rounded-full blur-xl pointer-events-none"></div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-[#ff562d] text-[#560d00] text-[10px] font-bold uppercase tracking-wider">
            Comunidad Richard
          </span>
          <span className="text-[#8d90a2] text-xs font-medium">• Actividad Gratuita</span>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-[#e3e2e6] uppercase tracking-tight">
            Club de Running Calle 16
          </h3>
          <p className="text-xs text-[#c3c5d9] leading-relaxed">
            Salidas grupales guiadas por coaches oficiales. Rutas de 5K y 10K con hidratación y guardarropa gratuito en tienda.
          </p>
        </div>

        <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-[#e3e2e6] text-xs font-semibold">
            <span className="material-symbols-outlined text-[#ff562d] text-[18px]">calendar_today</span>
            <span>Martes y Jueves • 6:30 PM</span>
          </div>

          <button
            onClick={() => {
              setJoinedClub(true);
              onShowToast('¡Te has registrado al Club de Running Calle 16!');
            }}
            disabled={joinedClub}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer ${
              joinedClub
                ? 'bg-[#00e55b] text-[#003911]'
                : 'bg-[#38393c] text-white hover:bg-[#0055ff] active:scale-95'
            }`}
          >
            {joinedClub ? '¡Cupo Confirmado!' : 'Inscribirme al grupo'}
          </button>
        </div>
      </div>

      {/* 6. Store Atmosphere Gallery */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-[#e3e2e6] uppercase tracking-tight">
            Espacios de Calle 16
          </h2>
          <span className="text-xs text-[#8d90a2]">3 Áreas</span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveGalleryImage(img.url)}
              className="flex flex-col gap-1.5 group cursor-pointer"
            >
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#292a2d] border border-[#343538]/60">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <span className="text-[11px] text-[#e3e2e6] font-semibold text-center truncate group-hover:text-[#b6c4ff]">
                {img.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox for Gallery */}
      {activeGalleryImage && (
        <div
          onClick={() => setActiveGalleryImage(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full bg-[#1f1f23] rounded-2xl overflow-hidden border border-[#292a2d] shadow-2xl p-3"
          >
            <button
              onClick={() => setActiveGalleryImage(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
            <img
              src={activeGalleryImage}
              alt="Detalle de tienda"
              className="w-full h-auto max-h-[70vh] object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </div>
  );
};
