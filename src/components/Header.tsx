import React from 'react';
import { LOGO_URL } from '../data/mockData';

interface HeaderProps {
  currentTab: string;
  cartCount: number;
  onOpenProfile: () => void;
  onOpenSearch?: () => void;
  onNavigateTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  cartCount,
  onOpenProfile,
  onOpenSearch,
  onNavigateTab
}) => {
  const getTabTitle = () => {
    switch (currentTab) {
      case 'inicio':
        return 'Inicio';
      case 'catalogo':
        return 'Catálogo';
      case 'ofertas':
        return 'Ofertas';
      case 'carrito':
        return 'Carrito';
      case 'sucursales':
        return 'Sucursales';
      case 'evento':
        return 'Gran Inauguración';
      default:
        return 'Richard Athletic';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#121316]/85 backdrop-blur-xl border-b border-[#292a2d]/50">
      <div className="max-w-2xl mx-auto h-16 px-4 flex items-center justify-between gap-3">
        {/* Left: Brand Identity & Active Section Title */}
        <div 
          onClick={() => onNavigateTab('inicio')}
          className="flex items-center gap-2.5 cursor-pointer min-w-0 group"
        >
          <img
            src={LOGO_URL}
            alt="Richard Athletic Logo"
            className="h-8 w-auto object-contain shrink-0 transition-transform group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="flex items-center gap-2 truncate">
            <span className="font-['Space_Grotesk'] text-lg font-bold uppercase tracking-tight text-[#e3e2e6] truncate">
              {getTabTitle()}
            </span>
            {currentTab === 'evento' && (
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide bg-[#ff562d] text-[#560d00] font-bold shrink-0 animate-pulse">
                ¡Evento Especial!
              </span>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {onOpenSearch && currentTab === 'catalogo' && (
            <button
              onClick={onOpenSearch}
              aria-label="Buscar productos"
              className="w-8 h-8 rounded-full bg-[#292a2d] text-[#c3c5d9] hover:text-white hover:bg-[#38393c] flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
            </button>
          )}

          {currentTab !== 'carrito' && (
            <button
              onClick={() => onNavigateTab('carrito')}
              aria-label="Ver Carrito"
              className="relative w-8 h-8 rounded-full bg-[#292a2d] text-[#c3c5d9] hover:text-white hover:bg-[#38393c] flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0055ff] text-white text-[10px] font-bold flex items-center justify-center shadow-md animate-scale">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={onOpenProfile}
            aria-label="Perfil de Atleta"
            className="w-8 h-8 rounded-full bg-[#b6c4ff] text-[#002780] hover:brightness-110 flex items-center justify-center transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
