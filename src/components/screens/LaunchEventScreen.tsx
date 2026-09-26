import React, { useState, useEffect } from 'react';

interface LaunchEventScreenProps {
  onShowToast: (message: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const LaunchEventScreen: React.FC<LaunchEventScreenProps> = ({
  onShowToast,
  onNavigateTab,
}) => {
  // Countdown timer for opening day
  const [countdown, setCountdown] = useState({
    days: 3,
    hours: 14,
    minutes: 25,
    seconds: 48,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // VIP Form State
  const [vipName, setVipName] = useState('');
  const [vipEmail, setVipEmail] = useState('');
  const [selectedSport, setSelectedSport] = useState('futbol');
  const [vipModalOpen, setVipModalOpen] = useState(false);

  const handleVipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vipName || !vipEmail) return;
    setVipModalOpen(true);
    onShowToast('¡Pase VIP y Bono de $50 USD generado con éxito!');
  };

  const sports = [
    { id: 'futbol', label: 'Fútbol', icon: 'sports_soccer' },
    { id: 'running', label: 'Running', icon: 'directions_run' },
    { id: 'ciclismo', label: 'Ciclismo / Moto', icon: 'two_wheeler' },
    { id: 'basketball', label: 'Basketball', icon: 'sports_basketball' },
  ];

  return (
    <div className="flex flex-col w-full gap-5 pb-16 text-[#e3e2e6]">
      {/* 1. Cinematic Hero Banner */}
      <section className="relative w-full rounded-2xl overflow-hidden bg-[#1f1f23] shadow-2xl border border-[#292a2d]">
        <div className="relative w-full min-h-[340px] sm:min-h-[380px] overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwPrnHKm2QB0d2d1BhQlgD_oCgkf4I-Eg7IjXj3PYECClntFCAQllNvZAAG3YLtbmZsI-ProAm4lMKctOgDaDDW1LahdEGvY6AwAfOukY8phf2KCuiVXI99fx16NOJu9YmABLKUhkEOEvVh0L-gvQpPVvmdjeQCr9Uu-iwybqNeA9BakDuajul2litwHF9nMbguFQqHVK3EY2KxkfnoF2FHDAKnznHdkpHQHLO9bYDXvGgUF9jxtyQ"
            alt="Gran Inauguración Richard Athletic"
            className="w-full h-full object-cover object-center absolute inset-0"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/60 to-transparent"></div>

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ff562d] text-[#560d00] font-['Space_Grotesk'] text-xs font-bold tracking-wider shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#560d00] animate-ping"></span>
              🔥 APERTURA OFICIAL • CALLE 16
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#343538]/90 text-[#b6c4ff] text-[10px] font-semibold tracking-wider backdrop-blur-md border border-[#434656]">
              BOGOTÁ D.C.
            </span>
          </div>

          {/* Hero Copy */}
          <div className="absolute bottom-4 inset-x-4 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#ffb4a2] text-[20px] material-symbols-filled">
                celebration
              </span>
              <span className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#ffb4a2]">
                Edición Especial
              </span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl uppercase font-bold text-[#e3e2e6] tracking-tight leading-tight drop-shadow-md">
              GRAN INAUGURACIÓN TIENDA RICHARD
            </h2>
            <p className="text-xs sm:text-sm text-[#c3c5d9] font-normal max-w-sm leading-relaxed drop-shadow">
              El nuevo epicentro del deporte de alto rendimiento abre sus puertas. ¡Vive una experiencia deportiva sin precedentes!
            </p>
          </div>
        </div>
      </section>

      {/* 2. Opening Countdown Timer */}
      <section className="flex flex-col gap-3 p-4 sm:p-5 bg-[#1f1f23] rounded-2xl shadow-xl border border-[#292a2d]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#b6c4ff] text-[22px]">timer</span>
            <span className="font-['Space_Grotesk'] text-sm sm:text-base text-[#e3e2e6] uppercase font-bold tracking-wide">
              Faltan solo:
            </span>
          </div>
          <span className="text-[10px] font-bold text-[#8fff99] bg-[#00782c]/30 px-2.5 py-1 rounded-full border border-[#00e55b]/30">
            CUPO LIMITADO
          </span>
        </div>

        {/* Time Digits Grid */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="flex flex-col items-center justify-center p-2.5 sm:p-3 bg-[#292a2d] rounded-xl border border-[#343538]/50">
            <span className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#b6c4ff]">
              {String(countdown.days).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[10px] text-[#c3c5d9] uppercase font-semibold mt-0.5">
              Días
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-2.5 sm:p-3 bg-[#292a2d] rounded-xl border border-[#343538]/50">
            <span className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#ffb4a2]">
              {String(countdown.hours).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[10px] text-[#c3c5d9] uppercase font-semibold mt-0.5">
              Horas
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-2.5 sm:p-3 bg-[#292a2d] rounded-xl border border-[#343538]/50">
            <span className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#00e55b]">
              {String(countdown.minutes).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[10px] text-[#c3c5d9] uppercase font-semibold mt-0.5">
              Mins
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-2.5 sm:p-3 bg-[#292a2d] rounded-xl border border-[#343538]/50">
            <span className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white">
              {String(countdown.seconds).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[10px] text-[#c3c5d9] uppercase font-semibold mt-0.5">
              Segs
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 pt-1 text-[#c3c5d9] text-xs">
          <span className="material-symbols-outlined text-[18px] text-[#ff562d]">event</span>
          <span className="font-medium text-[#e3e2e6]">
            Sábado 24 de Mayo • 9:00 AM • Calle 16 # 84-25
          </span>
        </div>
      </section>

      {/* 3. Opening Day Benefits Bento */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-['Space_Grotesk'] text-base sm:text-lg uppercase font-bold text-[#e3e2e6]">
              Beneficios de Apertura
            </span>
            <span className="text-xs text-[#8d90a2]">Exclusivo únicamente durante el día de lanzamiento</span>
          </div>
          <span className="material-symbols-outlined text-[#ff562d] text-[24px]">verified</span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {/* Card 1: 100 Kits */}
          <div className="flex items-center gap-3.5 p-3.5 bg-[#1f1f23] rounded-2xl border border-[#292a2d]">
            <div className="w-18 h-18 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden bg-[#292a2d] flex items-center justify-center border border-[#343538]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZCMSiy0pmMvjpredyNL3DaPjTJjGqSBlo0CG0SpgpPiwYpECpQK30xmjXWVdygtQb8jW_y0EQ3lMEiVB48i8ljMlG1CkcyCJjHzRonXgAPQlGoqpH9Pm4HDTQJEbE9Mn4bA4Chju-849649u8hcm_o7-viMl241wz5nsiIKMMTti6BygzxaE00TtVUaXKLxw3HBcMzzuO_4fZQaYU85RjBInn5z3GdBeMSNH4ZuNNyiNSmHXyVnOymE1RawnvRtMTvw"
                alt="Balón Forza Oficial"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="px-2 py-0.5 rounded-full bg-[#0055ff] text-white text-[10px] font-bold">
                  100 Kits
                </span>
              </div>
              <h3 className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-[#e3e2e6] truncate">
                Primeros 100 Asistentes
              </h3>
              <p className="text-xs text-[#c3c5d9] line-clamp-2 mt-0.5">
                Kit de bienvenida Richard Pro: Balón oficial Forza, termo térmico y camiseta conmemorativa gratis.
              </p>
            </div>
          </div>

          {/* Card 2: 50% OFF */}
          <div className="flex items-center gap-3.5 p-3.5 bg-[#1f1f23] rounded-2xl border border-[#292a2d]">
            <div className="w-18 h-18 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden bg-[#292a2d] flex items-center justify-center p-2 border border-[#343538]">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1UjthKpPTG5fxNzjY68aFNQ6sVdvOi_NAMuTok77kivWLCV5aWnb1oaoHbKMXo4Pwj5VTuK83JowXZVAv9Y4MYELBN0gokD-olS5lAjZvwEEnDcDqU-jJqqRd0l-3CIXl5UOnpztk2kdDB1s4l9JzTT1nMWgcNeyCWg4I5QqRhghQlL3BCV4IubutwEt9SN6bWxmGusArH4w-1fT83aIrIxpeB1Wl67nPXK98qy5-Ahy-qmKXXBouqgK_c"
                alt="Pelota de tenis Richard Pro"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="px-2 py-0.5 rounded-full bg-[#ff562d] text-[#560d00] text-[10px] font-bold">
                  Descuento Real
                </span>
              </div>
              <h3 className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-[#e3e2e6] truncate">
                Hasta 50% OFF en Tienda
              </h3>
              <p className="text-xs text-[#c3c5d9] line-clamp-2 mt-0.5">
                Descuentos directos en balones, botines, raquetas y uniformes deportivos de edición limitada.
              </p>
            </div>
          </div>

          {/* Card 3: Atletas Invitados */}
          <div className="flex items-center gap-3.5 p-3.5 bg-[#1f1f23] rounded-2xl border border-[#292a2d]">
            <div className="w-18 h-18 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden bg-[#292a2d] flex items-center justify-center text-[#b6c4ff] border border-[#343538]">
              <span className="material-symbols-outlined text-[36px] material-symbols-filled">
                groups
              </span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="px-2 py-0.5 rounded-full bg-[#38393c] text-white text-[10px] font-bold">
                  En Vivo
                </span>
              </div>
              <h3 className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-[#e3e2e6] truncate">
                Conoce a Atletas Invitados
              </h3>
              <p className="text-xs text-[#c3c5d9] line-clamp-2 mt-0.5">
                Firma de autógrafos, meet & greet y sesiones de fotos con estrellas y referentes del deporte.
              </p>
            </div>
          </div>

          {/* Card 4: Gran Sorteo */}
          <div className="flex items-center gap-3.5 p-3.5 bg-[#1f1f23] rounded-2xl border border-[#292a2d]">
            <div className="w-18 h-18 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden bg-[#292a2d] flex items-center justify-center border border-[#343538]">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1WaIfViLjCe2mcwsXNZy_QyGIybLqO26osvN755UZKYg-RxdfNTA8IV0hEHB-4vMm9sQvIB5TLzVp2tyhoQCmpr-Uv0duxaMGtzkVseBvDnwBEGAGVXcCAu2yycwKLDHmC0M_V5NamTXlUAZf-TRwQ-_hK5gjoJMZvpJYBEsaAgQtWrwO1gtEFPTfZr-nPVz51G17yh1GBKIsSSwkIjG_kTgRk5ssQVQU8EXOzMCRC-ny6z2-9yoJEEVyE"
                alt="Equipamiento Pro Richard"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="px-2 py-0.5 rounded-full bg-[#00782c] text-[#8fff99] text-[10px] font-bold">
                  $1,000,000 COP
                </span>
              </div>
              <h3 className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-[#e3e2e6] truncate">
                Sorteo de Apertura
              </h3>
              <p className="text-xs text-[#c3c5d9] line-clamp-2 mt-0.5">
                Participa por una orden de compra millonaria y equipamiento completo de alta competencia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VIP Registration Form */}
      <section className="relative p-5 sm:p-6 bg-[#1b1b1f] rounded-2xl flex flex-col gap-4 overflow-hidden shadow-2xl border border-[#292a2d]">
        <div className="absolute -right-12 -top-12 w-40 h-40 bg-[#0055ff]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-[#ff562d]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col gap-1 z-10">
          <div className="flex items-center gap-1.5 text-[#ffb4a2] text-xs uppercase font-bold">
            <span className="material-symbols-outlined text-[18px]">card_membership</span>
            Pase Oficial de Invitado
          </div>
          <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold uppercase text-[#e3e2e6] tracking-tight leading-snug">
            Asegura tu Acceso VIP & Bono de $50 USD
          </h3>
          <p className="text-xs text-[#c3c5d9]">
            Regístrate gratis para recibir entrada prioritaria, regalos exclusivos y bono para compras en tienda.
          </p>
        </div>

        <form onSubmit={handleVipSubmit} className="flex flex-col gap-3.5 z-10">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#e3e2e6]">Nombre Completo</label>
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-[#292a2d] rounded-xl border border-[#343538]">
              <span className="material-symbols-outlined text-[#8d90a2] text-[20px]">person</span>
              <input
                type="text"
                value={vipName}
                onChange={(e) => setVipName(e.target.value)}
                placeholder="Ej. Carlos Mendoza"
                required
                className="w-full bg-transparent text-[#e3e2e6] placeholder:text-[#8d90a2] text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#e3e2e6]">Correo Electrónico</label>
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-[#292a2d] rounded-xl border border-[#343538]">
              <span className="material-symbols-outlined text-[#8d90a2] text-[20px]">mail</span>
              <input
                type="email"
                value={vipEmail}
                onChange={(e) => setVipEmail(e.target.value)}
                placeholder="carlos@correo.com"
                required
                className="w-full bg-transparent text-[#e3e2e6] placeholder:text-[#8d90a2] text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Sport Selector */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[#e3e2e6]">Tu deporte principal</span>
            <div className="grid grid-cols-2 gap-2">
              {sports.map((sp) => {
                const isActive = selectedSport === sp.id;
                return (
                  <button
                    type="button"
                    key={sp.id}
                    onClick={() => setSelectedSport(sp.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold justify-center transition-all ${
                      isActive
                        ? 'bg-[#b6c4ff] text-[#002780] shadow-sm font-bold'
                        : 'bg-[#292a2d] text-[#c3c5d9] hover:text-white border border-[#343538]/50'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{sp.icon}</span>
                    <span>{sp.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CTA Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-[#ff562d] hover:brightness-110 active:scale-[0.98] text-[#560d00] font-['Space_Grotesk'] text-sm sm:text-base uppercase tracking-wider font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-transform cursor-pointer mt-1"
          >
            <span>OBTENER MI PASE VIP Y REGALO</span>
            <span className="material-symbols-outlined text-[20px]">confirmation_number</span>
          </button>

          <div className="flex items-center gap-1.5 text-[#8d90a2] justify-center text-center text-xs">
            <span className="material-symbols-outlined text-[#00e55b] text-[16px]">check_circle</span>
            <span>Acceso preferencial garantizado sin filas + 15% adicional acumulable</span>
          </div>
        </form>

        {/* Modal Confirmación Pase VIP */}
        {vipModalOpen && (
          <div className="absolute inset-0 z-30 bg-[#121316]/95 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center gap-3.5 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#00782c]/20 text-[#00e55b] flex items-center justify-center shadow-lg animate-bounce border border-[#00e55b]/30">
              <span className="material-symbols-outlined text-[36px]">qr_code_2</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-['Space_Grotesk'] text-xl font-bold text-white uppercase">
                ¡Pase VIP Generado!
              </span>
              <p className="text-xs text-[#c3c5d9]">
                Hola <strong className="text-white">{vipName}</strong>, hemos enviado tu entrada con el bono de $50 USD a <strong className="text-[#b6c4ff]">{vipEmail}</strong>.
              </p>
            </div>
            <div className="p-3 bg-[#292a2d] rounded-xl w-full flex items-center justify-between border border-[#343538]">
              <span className="text-xs text-[#8d90a2] uppercase font-semibold">Código Exclusivo:</span>
              <span className="font-['Space_Grotesk'] text-base font-bold text-[#b6c4ff] tracking-widest">
                RCH-VIP-2025
              </span>
            </div>
            <button
              type="button"
              onClick={() => setVipModalOpen(false)}
              className="w-full py-3 bg-[#b6c4ff] text-[#002780] font-['Space_Grotesk'] text-xs uppercase font-bold rounded-xl active:scale-95 transition-transform"
            >
              Cerrar y Guardar
            </button>
          </div>
        )}
      </section>

      {/* 5. Schedule of Events */}
      <section className="flex flex-col gap-4 p-4 sm:p-5 bg-[#1f1f23] rounded-2xl shadow-md border border-[#292a2d]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-['Space_Grotesk'] text-base sm:text-lg uppercase font-bold text-[#e3e2e6]">
              Cronograma de Eventos
            </span>
            <span className="text-xs text-[#8d90a2]">Sábado de apertura sin pausas</span>
          </div>
          <span className="material-symbols-outlined text-[#b6c4ff] text-[24px]">schedule</span>
        </div>

        <div className="flex flex-col gap-4">
          {/* Item 1 */}
          <div className="flex items-start gap-3.5">
            <div className="flex flex-col items-center shrink-0">
              <span className="px-2.5 py-1 rounded-lg bg-[#0055ff] text-white font-['Space_Grotesk'] text-xs font-bold tracking-tight">
                09:00 AM
              </span>
              <div className="w-0.5 h-10 bg-[#292a2d] mt-1"></div>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <h4 className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-[#e3e2e6]">
                Corte de Cinta Oficial & DJ en Vivo
              </h4>
              <p className="text-xs text-[#c3c5d9] mt-0.5">
                Inauguración con directivos, ambientación sonora en vivo y entrega de los primeros 100 kits VIP.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-3.5">
            <div className="flex flex-col items-center shrink-0">
              <span className="px-2.5 py-1 rounded-lg bg-[#292a2d] text-[#e3e2e6] font-['Space_Grotesk'] text-xs font-bold tracking-tight border border-[#343538]">
                11:00 AM
              </span>
              <div className="w-0.5 h-10 bg-[#292a2d] mt-1"></div>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <h4 className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-[#e3e2e6]">
                Reto de Tiros al Arco y Pista Indoor
              </h4>
              <p className="text-xs text-[#c3c5d9] mt-0.5">
                Desafíos interactivos con balones oficiales. Premios al instante por cada anotación en pista.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-start gap-3.5">
            <div className="flex flex-col items-center shrink-0">
              <span className="px-2.5 py-1 rounded-lg bg-[#ff562d] text-[#560d00] font-['Space_Grotesk'] text-xs font-bold tracking-tight">
                02:00 PM
              </span>
              <div className="w-0.5 h-10 bg-[#292a2d] mt-1"></div>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <h4 className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-[#e3e2e6]">
                Masterclass & Sesión de Autógrafos
              </h4>
              <p className="text-xs text-[#c3c5d9] mt-0.5">
                Charlas sobre alto rendimiento con figuras destacadas y firma de equipamiento Richard.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex items-start gap-3.5">
            <div className="flex flex-col items-center shrink-0">
              <span className="px-2.5 py-1 rounded-lg bg-[#00782c] text-[#8fff99] font-['Space_Grotesk'] text-xs font-bold tracking-tight">
                05:00 PM
              </span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <h4 className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-[#e3e2e6]">
                Gran Rifa de Apertura & Cierre Épico
              </h4>
              <p className="text-xs text-[#c3c5d9] mt-0.5">
                Sorteo del bono de $1,000,000 COP y entrega de premios especiales a compradores del día.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Location & Access Point */}
      <section className="flex flex-col gap-3 p-4 sm:p-5 bg-[#1f1f23] rounded-2xl shadow-xl border border-[#292a2d]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-['Space_Grotesk'] text-base sm:text-lg uppercase font-bold text-[#e3e2e6]">
              Punto de Encuentro
            </span>
            <span className="text-xs text-[#8d90a2]">Tienda Richard Athletic Flagship</span>
          </div>
          <span className="material-symbols-outlined text-[#ff562d] text-[24px]">location_on</span>
        </div>

        {/* Map Snapshot */}
        <div
          className="w-full h-44 bg-cover bg-center rounded-xl relative overflow-hidden flex items-end p-3 shadow-inner border border-[#343538]"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDKxDsUHWdWVAPtyjPR7y4zfl0tsWVGwqn6Yf1_5py0LgRqmtAYDxfmy7wdmmjpHJCeQ7tPahLZB1gfH6hYOkqCkslTFUF_NcWVrbyGfdB_AOXRp3jR_SPB0tjeJ4Z5NBSQL1yoMGQ0cokKUB33jcOPWAS8z1DM8_NY67EE7gj1XtrXfm1u_E-_ZdClX8dapXe4QSIXHcHAh5rmQmV5Zb8Mr1nNC3B1ndpYKKJa-T1Rqz2KYe-Y181I')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#121316]/95 via-[#121316]/40 to-transparent"></div>
          <div className="relative z-10 flex items-center justify-between w-full">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#ff562d] text-[20px] material-symbols-filled">
                storefront
              </span>
              <span className="font-['Space_Grotesk'] text-xs sm:text-sm font-semibold text-white">
                Av. Calle 16 # 84-25, Bogotá
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#38393c] text-white text-[10px] font-medium border border-[#434656]">
              Estacionamiento Propio
            </span>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab('sucursales')}
          className="w-full py-3 px-4 bg-[#b6c4ff] hover:brightness-110 active:scale-[0.98] text-[#002780] font-['Space_Grotesk'] text-xs sm:text-sm uppercase tracking-wider font-bold rounded-xl flex items-center justify-center gap-2 shadow transition-transform cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">directions</span>
          <span>Ver Detalles de Sucursal & Mapa Interactivo</span>
        </button>
      </section>
    </div>
  );
};
