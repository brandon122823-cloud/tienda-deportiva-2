import React, { useState, useEffect } from 'react';
import { Product } from '../../data/mockData';

interface OffersScreenProps {
  onAddToCart: (product: Product) => void;
  onNavigateTab: (tab: string, categoryFilter?: string) => void;
  onApplyCoupon: (couponCode: string) => void;
  products: Product[];
}

export const OffersScreen: React.FC<OffersScreenProps> = ({
  onAddToCart,
  onNavigateTab,
  onApplyCoupon,
  products,
}) => {
  // Live ticking countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 32,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Club Richard Form
  const [email, setEmail] = useState('');
  const [selectedSport, setSelectedSport] = useState('futbol');
  const [clubSubmitted, setClubSubmitted] = useState(false);

  // Quick Survey state
  const [surveyVoted, setSurveyVoted] = useState(false);
  const [surveyChoice, setSurveyChoice] = useState<string | null>(null);

  const sports = [
    { id: 'futbol', label: 'Fútbol', icon: 'sports_soccer' },
    { id: 'running', label: 'Running', icon: 'directions_run' },
    { id: 'basketball', label: 'Basketball', icon: 'sports_basketball' },
    { id: 'training', label: 'Training', icon: 'fitness_center' },
  ];

  const handleClubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setClubSubmitted(true);
    onApplyCoupon('CLUBRICHARD20');
  };

  const handleVoteSurvey = (choice: string) => {
    setSurveyChoice(choice);
    setSurveyVoted(true);
  };

  // Find promo products
  const packPro = products.find((p) => p.id === 'prod-9') || products[0];
  const stormChaqueta = products.find((p) => p.id === 'prod-10') || products[2];

  return (
    <div className="flex flex-col w-full gap-5 pb-12">
      {/* 1. Top Hero Banner (Flash Drop) */}
      <div className="relative w-full rounded-2xl overflow-hidden p-5 sm:p-6 bg-[#1f1f23] flex flex-col justify-end min-h-[220px] shadow-xl border border-[#292a2d]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDOZEDZYNFSSnW7gD4bGm7PgEdr_FBQqcoGWGPCSc8aDg6khltm3ZuPLO1tcFFiZlxBNidnTDN-z58vQhhvqZI6QG7P7ythQ6uibQhQLcovi7JM6sDbjNkFQNkcF169xPYRIUaLQGldu0cR6QZeRwNol8d-ev1TsqL5NZL7ozCi_AFSUd9BIz9dzWy-cgk8Ftu-Bg1AAJT-NBS0w769SyBxw5bpWnIznJbbFh7n6l-HQiYMmHkn6LHT')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/65 to-transparent"></div>

        <div className="relative z-10 flex flex-col gap-1.5">
          <div className="self-start px-2.5 py-1 rounded-full bg-[#ff562d] text-[#560d00] text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
            <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
            <span>Flash Drop</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#e3e2e6] uppercase tracking-tight leading-none mt-1">
            Potencia Tu Rendimiento
          </h1>
          <p className="text-xs sm:text-sm text-[#c3c5d9] max-w-[300px]">
            Ofertas exclusivas por tiempo limitado para atletas imparables.
          </p>
        </div>
      </div>

      {/* 2. Countdown Timer Banner */}
      <div className="w-full rounded-2xl bg-[#292a2d] p-4 flex items-center justify-between shadow-md border border-[#343538]/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#ff562d] text-[#560d00] flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[20px]">timer</span>
          </div>
          <div>
            <h2 className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-[#e3e2e6]">
              Termina en
            </h2>
            <p className="text-xs text-[#c3c5d9]">La promo relámpago vuela</p>
          </div>
        </div>

        {/* Ticking Digit Boxes */}
        <div className="flex items-center gap-1.5 text-[#e3e2e6]">
          <div className="bg-[#0d0e11] px-2.5 py-1.5 rounded-xl text-center min-w-[36px]">
            <span className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-[#b6c4ff]">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="block text-[9px] font-bold text-[#8d90a2]">HRS</span>
          </div>
          <span className="font-['Space_Grotesk'] text-lg font-bold text-[#8d90a2]">:</span>
          <div className="bg-[#0d0e11] px-2.5 py-1.5 rounded-xl text-center min-w-[36px]">
            <span className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-[#b6c4ff]">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="block text-[9px] font-bold text-[#8d90a2]">MIN</span>
          </div>
          <span className="font-['Space_Grotesk'] text-lg font-bold text-[#8d90a2]">:</span>
          <div className="bg-[#0d0e11] px-2.5 py-1.5 rounded-xl text-center min-w-[36px]">
            <span className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-[#ff562d]">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="block text-[9px] font-bold text-[#ffb4a2]">SEG</span>
          </div>
        </div>
      </div>

      {/* 3. Subscription & Propaganda Form: Club Richard */}
      <div className="w-full rounded-2xl bg-[#1f1f23] p-5 sm:p-6 flex flex-col gap-4 shadow-xl border border-[#292a2d] relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#0055ff]/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[#b6c4ff]">
            <span className="material-symbols-outlined text-[20px] material-symbols-filled">bolt</span>
            <span className="text-[11px] font-bold uppercase tracking-wider">Club Richard Exclusive</span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-[#e3e2e6] leading-snug">
            ¡Únete al Club y obtén 20% de descuento!
          </h2>
          <p className="text-xs sm:text-sm text-[#c3c5d9]">
            Recibe accesos anticipados, lanzamientos secretos y promos directas a tu correo.
          </p>
        </div>

        {clubSubmitted ? (
          <div className="bg-[#00782c]/20 border border-[#00e55b]/40 rounded-xl p-4 flex flex-col gap-2 animate-fadeIn">
            <div className="flex items-center gap-2 text-[#00e55b]">
              <span className="material-symbols-outlined text-[24px]">verified</span>
              <span className="font-bold text-sm">¡Bienvenido al Club Richard!</span>
            </div>
            <p className="text-xs text-[#c3c5d9]">
              Hemos aplicado el cupón <strong className="text-white">CLUBRICHARD20</strong> (-20%) automáticamente a tu carrito.
            </p>
            <div className="flex items-center justify-between bg-[#121316] p-2.5 rounded-lg mt-1">
              <span className="text-xs font-mono font-bold text-[#b6c4ff]">CLUBRICHARD20</span>
              <button
                onClick={() => onNavigateTab('carrito')}
                className="text-xs font-bold text-[#ff562d] hover:underline flex items-center gap-1"
              >
                <span>Ir al Carrito</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleClubSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#e3e2e6]">Tu Correo Electrónico</label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 material-symbols-outlined text-[#8d90a2] text-[20px]">
                  mail
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="atleta@richardathletic.com"
                  required
                  className="w-full bg-[#1b1b1f] text-[#e3e2e6] placeholder:text-[#8d90a2] text-sm py-3 pl-11 pr-4 rounded-xl border border-[#292a2d] outline-none focus:border-[#0055ff] transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#e3e2e6]">Selecciona tu deporte favorito</label>
              <div className="grid grid-cols-2 gap-2">
                {sports.map((sport) => {
                  const isChecked = selectedSport === sport.id;
                  return (
                    <button
                      type="button"
                      key={sport.id}
                      onClick={() => setSelectedSport(sport.id)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all text-left ${
                        isChecked
                          ? 'bg-[#b6c4ff] text-[#002780] border-[#b6c4ff] font-bold shadow-sm'
                          : 'bg-[#1b1b1f] text-[#e3e2e6] border-[#292a2d] hover:bg-[#292a2d]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">{sport.icon}</span>
                      <span className="text-xs font-medium">{sport.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#b6c4ff] text-[#002780] font-['Space_Grotesk'] text-sm sm:text-base font-bold uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Canjear Mi 20% OFF</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>
        )}
      </div>

      {/* 4. Quick Survey Section */}
      <div className="w-full rounded-2xl bg-[#1f1f23] p-5 sm:p-6 flex flex-col gap-4 shadow-md border border-[#292a2d]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-[#e3e2e6]">
              Encuesta Rápida
            </h3>
            <p className="text-xs text-[#c3c5d9]">Ayúdanos a elegir la siguiente colección</p>
          </div>
          <span className="text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full bg-[#292a2d] text-[#b6c4ff] border border-[#343538]">
            +50 Pts Club
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="text-xs sm:text-sm font-medium text-[#e3e2e6]">
            ¿Qué tipo de suela prefieres para tus zapatillas de running?
          </p>

          {surveyVoted ? (
            <div className="flex flex-col items-center justify-center py-4 gap-2 text-center bg-[#1b1b1f] rounded-xl p-4 border border-[#00e55b]/30 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-[#00782c]/20 text-[#00e55b] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px] material-symbols-filled">
                  check_circle
                </span>
              </div>
              <h4 className="font-['Space_Grotesk'] text-base font-bold text-[#e3e2e6]">
                ¡Gracias por participar!
              </h4>
              <p className="text-xs text-[#c3c5d9]">
                Has sumado 50 puntos a tu cuenta de Club Richard. Tu preferencia ({surveyChoice}) fue registrada.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {[
                { id: 'Carbon-Fiber Plate (Máxima Propulsión)', pct: '42%' },
                { id: 'Max-Foam Cushion (Ultra Amortiguación)', pct: '48%' },
                { id: 'Minimalista / Natural Feel', pct: '10%' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleVoteSurvey(opt.id)}
                  className="w-full p-3 rounded-xl bg-[#1b1b1f] hover:bg-[#292a2d] border border-[#292a2d] text-left text-xs sm:text-sm text-[#e3e2e6] transition-all flex items-center justify-between group active:scale-[0.99]"
                >
                  <span className="font-medium group-hover:text-[#b6c4ff]">{opt.id}</span>
                  <span className="text-[#8d90a2] text-xs font-semibold">{opt.pct}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 5. Limited Time Promo Banners (Ofertas Destacadas) */}
      <div className="flex flex-col gap-3.5">
        <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#e3e2e6] uppercase tracking-tight">
          Ofertas Destacadas
        </h3>

        {/* Promo Card 1: Pack Pro Training Gear */}
        <div className="relative w-full rounded-2xl overflow-hidden p-5 bg-[#1f1f23] flex flex-col justify-end min-h-[190px] shadow-lg border border-[#292a2d]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-45"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAbRCoxQG4DGMb4CK4Z1WZSzVp5o8sIhavZtylQ0ciRBCB8TR8SP4KDkRB0qJPAhvFYNDiuxgc4nRJhpFVTRpJVLkPQQJAHP3HR1jOejMU9h1HtW0UEJdHwAW5iosJHBtNaWmXKpUbtctZ51KiccSFZSodYVidECnVJ1yxLOszUinQH_cmkuZH5fUfN1WP53WL7q-KyhDfAlPCwiMVPYpGJzUzu24tCBjGZDk5gHFtvqvWHXU_2pPV5')`,
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f23] via-[#1f1f23]/60 to-transparent"></div>

          <div className="relative z-10 flex flex-col gap-1">
            <span className="text-[10px] font-bold text-[#ffb4a2] uppercase tracking-wider">
              2x1 en Accesorios
            </span>
            <h4 className="font-['Space_Grotesk'] text-lg font-bold text-[#e3e2e6]">
              Pack Pro Training Gear
            </h4>
            <p className="text-xs text-[#c3c5d9] max-w-sm">
              Lleva guantes, botellas térmicas y bandas de resistencia combinadas.
            </p>
            <div className="mt-2.5 flex items-center justify-between">
              <span className="font-['Space_Grotesk'] text-lg font-bold text-[#b6c4ff]">
                $49.99 USD <span className="text-xs line-through text-[#8d90a2]">$99.98</span>
              </span>
              <button
                onClick={() => onAddToCart(packPro)}
                className="px-4 py-2 rounded-xl bg-[#b6c4ff] text-[#002780] text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer"
              >
                Aprovechar
              </button>
            </div>
          </div>
        </div>

        {/* Promo Card 2: Colección Storm Resistant */}
        <div className="relative w-full rounded-2xl overflow-hidden p-5 bg-[#1f1f23] flex flex-col justify-end min-h-[190px] shadow-lg border border-[#292a2d]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-45"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDZmq9UKrbMJpzu1EQcl94IXs1--hoct7UrPWpJ1-p8Boulovss1uHUnb6BkL47UL-42tc5lvwiUy13jhhAemmV-NYJ8SOOakBPJCpE3b7G-sYAuhu-essxhmlj0au8Atwua4vCgC5-cC3GW9EZN9ZjtDJd_XUEn5wStFueJnLQutW5H4Slxn1-YqXSE0GGhSJYqxpdC4gQZK479KKAkWv1YCNg2GmzV6oqjgi13XsspgjtK46nJGnD')`,
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f23] via-[#1f1f23]/60 to-transparent"></div>

          <div className="relative z-10 flex flex-col gap-1">
            <span className="text-[10px] font-bold text-[#00e55b] uppercase tracking-wider">
              Envío Gratis Global
            </span>
            <h4 className="font-['Space_Grotesk'] text-lg font-bold text-[#e3e2e6]">
              Colección Storm Resistant
            </h4>
            <p className="text-xs text-[#c3c5d9] max-w-sm">
              Prepárate para entrenar bajo cualquier clima sin perder ligereza.
            </p>
            <div className="mt-2.5 flex items-center justify-between">
              <span className="font-['Space_Grotesk'] text-lg font-bold text-[#b6c4ff]">
                35% OFF
              </span>
              <button
                onClick={() => onAddToCart(stormChaqueta)}
                className="px-4 py-2 rounded-xl bg-[#b6c4ff] text-[#002780] text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer"
              >
                Ver Colección
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
