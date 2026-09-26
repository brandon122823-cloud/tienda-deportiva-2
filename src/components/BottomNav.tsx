import React from 'react';

interface BottomNavProps {
  currentTab: string;
  cartCount: number;
  onSelectTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  cartCount,
  onSelectTab,
}) => {
  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: 'home' },
    { id: 'catalogo', label: 'Catálogo', icon: 'storefront' },
    { id: 'ofertas', label: 'Ofertas', icon: 'local_offer' },
    { id: 'carrito', label: 'Carrito', icon: 'shopping_cart', badge: cartCount },
    { id: 'sucursales', label: 'Sucursales', icon: 'location_on' },
    { id: 'evento', label: 'Evento', icon: 'celebration', pulse: true },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-[#121316]/95 backdrop-blur-xl border-t border-[#292a2d]/60 pb-[env(safe-area-inset-bottom,0px)] shadow-2xl">
      <div className="max-w-2xl mx-auto flex items-center justify-around h-16 sm:h-20 px-1">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`relative flex flex-col items-center justify-center gap-1 w-14 sm:w-16 h-14 rounded-xl transition-all select-none ${
                isActive
                  ? 'text-[#b6c4ff] bg-[#292a2d] shadow-sm font-semibold'
                  : item.id === 'evento'
                  ? 'text-[#ffb4a2] hover:text-white'
                  : 'text-[#8d90a2] hover:text-[#e3e2e6] hover:bg-[#1b1b1f]'
              }`}
            >
              {/* Optional glowing ping badge for Event */}
              {item.pulse && (
                <span className="absolute 1 top-1.5 right-2 sm:right-3 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff562d] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff562d]"></span>
                </span>
              )}

              {/* Cart item count badge */}
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute 1 top-1.5 right-2 sm:right-3 px-1.5 min-w-[16px] h-4 rounded-full bg-[#0055ff] text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                  {item.badge}
                </span>
              )}

              <span className={`material-symbols-outlined text-[20px] sm:text-[22px] ${isActive ? 'text-[#b6c4ff]' : ''}`}>
                {item.icon}
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-tight font-medium truncate max-w-full">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
