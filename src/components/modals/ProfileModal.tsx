import React from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistCount: number;
  onNavigateTab: (tab: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  wishlistCount,
  onNavigateTab,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md bg-[#1f1f23] border border-[#292a2d] rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-5 sm:p-6 flex flex-col gap-4 animate-slideUp"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#292a2d]">
          <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#e3e2e6] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b6c4ff]">person</span>
            Perfil de Atleta
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#292a2d] text-[#c3c5d9] flex items-center justify-center hover:text-white"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-3.5 bg-[#1b1b1f] p-4 rounded-2xl border border-[#292a2d]">
          <div className="w-14 h-14 rounded-full bg-[#b6c4ff] text-[#002780] flex items-center justify-center text-xl font-bold font-['Space_Grotesk'] shadow-md">
            B
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="font-['Space_Grotesk'] text-base font-bold text-[#e3e2e6] truncate">
                Brandon
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-[#ff562d] text-[#560d00] text-[9px] font-bold uppercase tracking-wider">
                Elite Gold
              </span>
            </div>
            <p className="text-xs text-[#8d90a2] truncate">brandon122823@gmail.com</p>
            <p className="text-xs text-[#00e55b] font-semibold mt-1">250 Puntos Club Richard</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-[#292a2d] p-3 rounded-xl border border-[#343538]/50">
            <span className="font-['Space_Grotesk'] text-lg font-bold text-[#b6c4ff]">3</span>
            <span className="block text-[10px] text-[#8d90a2]">Pedidos</span>
          </div>
          <div className="bg-[#292a2d] p-3 rounded-xl border border-[#343538]/50">
            <span className="font-['Space_Grotesk'] text-lg font-bold text-[#ffb4a2]">{wishlistCount}</span>
            <span className="block text-[10px] text-[#8d90a2]">Favoritos</span>
          </div>
          <div className="bg-[#292a2d] p-3 rounded-xl border border-[#343538]/50">
            <span className="font-['Space_Grotesk'] text-lg font-bold text-[#00e55b]">20%</span>
            <span className="block text-[10px] text-[#8d90a2]">Descuento Activo</span>
          </div>
        </div>

        {/* Navigation shortcuts */}
        <div className="flex flex-col gap-1 bg-[#1b1b1f] rounded-xl border border-[#292a2d] overflow-hidden">
          <button
            onClick={() => {
              onClose();
              onNavigateTab('evento');
            }}
            className="flex items-center justify-between p-3 hover:bg-[#292a2d] text-left transition-colors text-xs text-[#e3e2e6] font-medium"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#ff562d] text-[20px]">celebration</span>
              <span>Pase VIP Gran Inauguración</span>
            </div>
            <span className="material-symbols-outlined text-[#8d90a2] text-[18px]">chevron_right</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onNavigateTab('sucursales');
            }}
            className="flex items-center justify-between p-3 hover:bg-[#292a2d] text-left transition-colors text-xs text-[#e3e2e6] font-medium border-t border-[#292a2d]"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#b6c4ff] text-[20px]">store</span>
              <span>Sede Flagship Calle 16</span>
            </div>
            <span className="material-symbols-outlined text-[#8d90a2] text-[18px]">chevron_right</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onNavigateTab('ofertas');
            }}
            className="flex items-center justify-between p-3 hover:bg-[#292a2d] text-left transition-colors text-xs text-[#e3e2e6] font-medium border-t border-[#292a2d]"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#00e55b] text-[20px]">local_offer</span>
              <span>Club Richard & Promos Relámpago</span>
            </div>
            <span className="material-symbols-outlined text-[#8d90a2] text-[18px]">chevron_right</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-[#292a2d] text-[#e3e2e6] hover:bg-[#343538] text-xs font-bold transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
