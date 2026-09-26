import React, { useState } from 'react';
import { CartItem } from '../../data/mockData';

interface CartScreenProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onNavigateTab: (tab: string) => void;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => void;
  onOpenCheckout: () => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigateTab,
  appliedCoupon,
  onApplyCoupon,
  onOpenCheckout,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  // Calculations
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountRate = appliedCoupon === 'CLUBRICHARD20' ? 0.2 : appliedCoupon ? 0.15 : 0;
  const discountAmount = subtotal * discountRate;
  const shippingCost = 0; // Free express shipping
  const total = Math.max(0, subtotal - discountAmount + shippingCost);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'RICHARDPRO25' || code === 'CLUBRICHARD20' || code === 'INAUGURACION50') {
      onApplyCoupon(code);
      setCouponInput('');
    } else {
      setCouponError('Cupón inválido. Prueba RICHARDPRO25 o CLUBRICHARD20');
    }
  };

  return (
    <div className="flex flex-col w-full gap-5 pb-16">
      {/* 1. Free Shipping Celebration Banner */}
      <div className="flex items-center justify-between bg-[#1b1b1f] p-4 rounded-2xl border border-[#292a2d] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#0055ff]/20 flex items-center justify-center text-[#b6c4ff] shrink-0">
            <span className="material-symbols-outlined text-[24px] material-symbols-filled">
              local_shipping
            </span>
          </div>
          <div>
            <h2 className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-[#e3e2e6]">
              ¡Envío Gratis Activado!
            </h2>
            <p className="text-xs text-[#c3c5d9]">Has desbloqueado entrega express 24h.</p>
          </div>
        </div>
        <span className="material-symbols-outlined text-[#00e55b] material-symbols-filled">
          check_circle
        </span>
      </div>

      {/* 2. Cart Items Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#e3e2e6] flex items-center gap-1.5">
            Tu Carrito{' '}
            <span className="text-[#b6c4ff] text-sm font-normal">
              ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </span>
          </h3>
          {cart.length > 0 && (
            <button
              onClick={onClearCart}
              className="text-xs font-semibold text-[#ffb4ab] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">delete_sweep</span> Vaciar
            </button>
          )}
        </div>

        {/* Cart Item Cards */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-[#1f1f23] rounded-2xl border border-[#292a2d] text-center">
            <div className="w-16 h-16 rounded-full bg-[#292a2d] flex items-center justify-center text-[#8d90a2] mb-3">
              <span className="material-symbols-outlined text-[32px]">production_quantity_limits</span>
            </div>
            <h4 className="font-['Space_Grotesk'] text-lg font-bold text-[#e3e2e6]">Tu carrito está vacío</h4>
            <p className="text-xs text-[#c3c5d9] mt-1 max-w-xs">
              Explora nuestro catálogo con equipamiento de alto rendimiento y aprovecha las ofertas.
            </p>
            <button
              onClick={() => onNavigateTab('catalogo')}
              className="mt-4 px-5 py-2.5 rounded-xl bg-[#0055ff] hover:bg-[#0047d9] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-lg active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">storefront</span>
              Explorar Catálogo
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-[#1f1f23] p-3.5 sm:p-4 rounded-2xl flex gap-3.5 items-center shadow-md border border-[#292a2d] relative overflow-hidden group hover:border-[#343538] transition-all"
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-20 bg-[#1b1b1f] rounded-xl overflow-hidden shrink-0 border border-[#292a2d]">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Info & Quantity controls */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-[10px] text-[#b6c4ff] uppercase tracking-wider font-semibold">
                      {item.product.categoryLabel}
                    </span>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-[#8d90a2] hover:text-[#ffb4ab] transition-colors p-1 -mr-1"
                      aria-label="Eliminar producto"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>

                  <h4 className="font-['Space_Grotesk'] text-sm sm:text-base font-semibold text-[#e3e2e6] truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-[#8d90a2] truncate mt-0.5">
                    Talla: {item.selectedSize || 'Estándar'} | Color: {item.selectedColor || 'Original'}
                  </p>

                  <div className="flex items-center justify-between mt-2.5">
                    <span className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-[#e3e2e6]">
                      ${(item.product.price * item.quantity).toLocaleString()} {item.product.currency}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 bg-[#292a2d] px-2 py-1 rounded-xl border border-[#343538]/50">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        aria-label="Disminuir cantidad"
                        className="w-6 h-6 flex items-center justify-center text-[#c3c5d9] hover:text-white active:scale-90 transition-all"
                      >
                        <span className="material-symbols-outlined text-[16px]">remove</span>
                      </button>
                      <span className="text-xs font-bold px-1.5 min-w-[18px] text-center text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        aria-label="Aumentar cantidad"
                        className="w-6 h-6 flex items-center justify-center text-[#c3c5d9] hover:text-white active:scale-90 transition-all"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Coupon Section */}
      <div className="bg-[#1f1f23] p-4 rounded-2xl flex flex-col gap-2.5 shadow-sm border border-[#292a2d]">
        <label className="text-xs sm:text-sm font-semibold text-[#e3e2e6] flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-[#b6c4ff]">local_offer</span>
          ¿Tienes un cupón de descuento?
        </label>
        <form onSubmit={handleApplyCoupon} className="flex gap-2">
          <input
            type="text"
            value={couponInput}
            onChange={(e) => {
              setCouponInput(e.target.value);
              setCouponError('');
            }}
            placeholder="Ej. RICHARDPRO25"
            className="flex-1 bg-[#1b1b1f] text-[#e3e2e6] placeholder:text-[#8d90a2] px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-[#292a2d] outline-none focus:border-[#0055ff] transition-all uppercase"
          />
          <button
            type="submit"
            className="bg-[#292a2d] hover:bg-[#38393c] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
          >
            Aplicar
          </button>
        </form>

        {couponError && (
          <p className="text-xs text-[#ffb4ab] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">error</span>
            {couponError}
          </p>
        )}

        {appliedCoupon && (
          <div className="flex items-center justify-between text-[#00e55b] text-xs mt-1 bg-[#00782c]/15 p-2 rounded-lg border border-[#00e55b]/20">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>
                ¡Cupón <strong>{appliedCoupon}</strong> aplicado (-{Math.round(discountRate * 100)}%)!
              </span>
            </div>
            <button
              onClick={() => onApplyCoupon('')}
              className="text-[#8d90a2] hover:text-[#ffb4ab] text-[11px] underline"
            >
              Remover
            </button>
          </div>
        )}
      </div>

      {/* 4. Order Summary */}
      {cart.length > 0 && (
        <div className="bg-[#1f1f23] p-5 rounded-2xl flex flex-col gap-3 shadow-md border border-[#292a2d]">
          <h3 className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-[#e3e2e6]">
            Resumen de Compra
          </h3>

          <div className="flex justify-between text-xs sm:text-sm text-[#c3c5d9]">
            <span>Subtotal ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</span>
            <span className="text-[#e3e2e6] font-semibold">${subtotal.toLocaleString()} MXN</span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between text-xs sm:text-sm text-[#00e55b]">
              <span>Descuento de Promoción ({Math.round(discountRate * 100)}%)</span>
              <span className="font-semibold">-${discountAmount.toFixed(2)} MXN</span>
            </div>
          )}

          <div className="flex justify-between text-xs sm:text-sm text-[#c3c5d9]">
            <span>Envío Express 24h</span>
            <span className="text-[#00e55b] font-bold uppercase text-[10px] bg-[#00782c]/20 px-2 py-0.5 rounded border border-[#00e55b]/30">
              Gratis
            </span>
          </div>

          <div className="h-[1px] bg-[#292a2d] my-1"></div>

          <div className="flex justify-between items-center">
            <span className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-[#e3e2e6]">
              Total a Pagar
            </span>
            <span className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-[#b6c4ff]">
              ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN
            </span>
          </div>
        </div>
      )}

      {/* 5. Payment Action Area */}
      {cart.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <button
            onClick={onOpenCheckout}
            className="w-full bg-[#0055ff] hover:bg-[#0047d9] text-white py-4 rounded-2xl font-['Space_Grotesk'] text-base font-bold flex items-center justify-center gap-2 shadow-xl hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">lock</span>
            <span>Proceder al Pago Seguro</span>
          </button>

          <div className="flex items-center justify-center gap-3 text-[#8d90a2] text-[11px] sm:text-xs py-1 text-center flex-wrap">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#b6c4ff]">security</span>
              Compra Protegida
            </span>
            <span>•</span>
            <span>Meses Sin Intereses</span>
            <span>•</span>
            <span>Garantía Richard</span>
          </div>
        </div>
      )}
    </div>
  );
};
