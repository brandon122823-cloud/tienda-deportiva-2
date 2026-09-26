import React, { useState } from 'react';
import { CartItem } from '../../data/mockData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  appliedCoupon: string | null;
  onOrderSuccess: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  appliedCoupon,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [deliveryMethod, setDeliveryMethod] = useState<'express' | 'store'>('express');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mercadopago' | 'cash'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('Brandon');
  const [email, setEmail] = useState('brandon122823@gmail.com');
  const [address, setAddress] = useState('Calle Deportiva #16-84');
  const [city, setCity] = useState('Bogotá D.C.');

  // Calculation
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountRate = appliedCoupon === 'CLUBRICHARD20' ? 0.2 : appliedCoupon ? 0.15 : 0;
  const discountAmount = subtotal * discountRate;
  const total = Math.max(0, subtotal - discountAmount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const generatedOrderId = `RCH-${Math.floor(100000 + Math.random() * 900000)}`;
      setIsProcessing(false);
      setOrderComplete(generatedOrderId);
      onOrderSuccess(generatedOrderId);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full sm:max-w-lg bg-[#1f1f23] border border-[#292a2d] rounded-t-3xl sm:rounded-2xl max-h-[92vh] overflow-y-auto shadow-2xl p-5 sm:p-6 flex flex-col gap-4 animate-slideUp">
        {orderComplete ? (
          <div className="flex flex-col items-center justify-center py-6 text-center gap-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#00782c]/20 text-[#00e55b] flex items-center justify-center border border-[#00e55b]/30">
              <span className="material-symbols-outlined text-[36px] material-symbols-filled">
                check_circle
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase font-bold text-[#b6c4ff] tracking-wider">
                ¡Pedido Confirmado!
              </span>
              <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#e3e2e6]">
                Gracias por tu compra, {name}
              </h3>
              <p className="text-xs text-[#c3c5d9] max-w-sm mt-1">
                Hemos enviado la confirmación y guía de rastreo express 24h a <strong className="text-white">{email}</strong>.
              </p>
            </div>

            <div className="bg-[#1b1b1f] p-4 rounded-xl w-full border border-[#292a2d] flex flex-col gap-2 text-left">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8d90a2]">Número de Orden:</span>
                <span className="font-mono font-bold text-[#b6c4ff]">{orderComplete}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8d90a2]">Entrega:</span>
                <span className="text-[#e3e2e6] font-medium">
                  {deliveryMethod === 'express' ? 'Envío Express 24h a Domicilio' : 'Click & Collect en Calle 16 Flagship'}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8d90a2]">Total Pagado:</span>
                <span className="font-bold text-[#00e55b]">${total.toLocaleString()} MXN</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 bg-[#0055ff] hover:bg-[#0047d9] text-white font-['Space_Grotesk'] font-bold rounded-xl text-sm transition-all"
            >
              Volver a la Tienda
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#292a2d]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0055ff]">lock</span>
                <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#e3e2e6]">
                  Pago Seguro Richard Pro
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#292a2d] text-[#c3c5d9] flex items-center justify-center hover:text-white"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Delivery method selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#e3e2e6]">Método de Entrega</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('express')}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                      deliveryMethod === 'express'
                        ? 'bg-[#b6c4ff] text-[#002780] border-[#b6c4ff]'
                        : 'bg-[#1b1b1f] text-[#c3c5d9] border-[#292a2d]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                    <div className="text-left">
                      <div className="font-bold">Envío Express</div>
                      <div className="text-[10px] opacity-80">Gratis (24 hrs)</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('store')}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                      deliveryMethod === 'store'
                        ? 'bg-[#b6c4ff] text-[#002780] border-[#b6c4ff]'
                        : 'bg-[#1b1b1f] text-[#c3c5d9] border-[#292a2d]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">storefront</span>
                    <div className="text-left">
                      <div className="font-bold">Retiro en Tienda</div>
                      <div className="text-[10px] opacity-80">Calle 16 (1 hr)</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Shipping info */}
              <div className="flex flex-col gap-2 bg-[#1b1b1f] p-3 rounded-xl border border-[#292a2d]">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] text-[#8d90a2]">Nombre</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-[#292a2d] text-[#e3e2e6] text-xs p-2 rounded-lg outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] text-[#8d90a2]">Correo</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-[#292a2d] text-[#e3e2e6] text-xs p-2 rounded-lg outline-none"
                    />
                  </div>
                </div>

                {deliveryMethod === 'express' && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] text-[#8d90a2]">Dirección</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="bg-[#292a2d] text-[#e3e2e6] text-xs p-2 rounded-lg outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] text-[#8d90a2]">Ciudad</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="bg-[#292a2d] text-[#e3e2e6] text-xs p-2 rounded-lg outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Method Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#e3e2e6]">Método de Pago</label>
                <div className="flex flex-col gap-2">
                  {[
                    { id: 'card', label: 'Tarjeta de Crédito / Débito', desc: 'Hasta 12 MSI sin intereses', icon: 'credit_card' },
                    { id: 'mercadopago', label: 'Mercado Pago / PSE', desc: 'Transferencia instantánea protegida', icon: 'account_balance_wallet' },
                    { id: 'cash', label: 'Pago en Tienda / Efectivo', desc: 'Paga al retirar en Flagship Calle 16', icon: 'payments' },
                  ].map((pm) => {
                    const isSelected = paymentMethod === pm.id;
                    return (
                      <button
                        type="button"
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id as any)}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-[#292a2d] border-[#0055ff] text-white shadow-sm'
                            : 'bg-[#1b1b1f] border-[#292a2d] text-[#c3c5d9]'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-[20px] ${isSelected ? 'text-[#b6c4ff]' : 'text-[#8d90a2]'}`}>
                          {pm.icon}
                        </span>
                        <div className="flex-1">
                          <div className="text-xs font-bold text-[#e3e2e6]">{pm.label}</div>
                          <div className="text-[10px] text-[#8d90a2]">{pm.desc}</div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#0055ff] bg-[#0055ff]' : 'border-[#434656]'}`}>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Order quick summary */}
              <div className="bg-[#1b1b1f] p-3 rounded-xl border border-[#292a2d] flex justify-between items-center text-xs">
                <span className="text-[#8d90a2]">Total ({cart.length} artículos):</span>
                <span className="font-['Space_Grotesk'] text-base font-bold text-[#b6c4ff]">
                  ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN
                </span>
              </div>

              {/* Confirm Submit */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-xl bg-[#0055ff] hover:bg-[#0047d9] text-white font-['Space_Grotesk'] text-sm sm:text-base font-bold flex items-center justify-center gap-2 shadow-xl active:scale-[0.99] transition-all cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Procesando Pago Seguro...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">verified_user</span>
                    <span>Confirmar y Pagar ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN</span>
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
