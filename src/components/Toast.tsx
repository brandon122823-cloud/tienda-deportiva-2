import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 bg-[#292a2d] text-[#e3e2e6] px-4 py-2.5 rounded-2xl shadow-2xl border border-[#b6c4ff]/30 flex items-center gap-2.5 z-50 animate-slideUp">
      <span className="material-symbols-outlined text-[#00e55b] text-[20px] material-symbols-filled">
        check_circle
      </span>
      <span className="text-xs sm:text-sm font-semibold">{message}</span>
    </div>
  );
};
