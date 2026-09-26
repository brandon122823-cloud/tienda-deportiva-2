import React, { useState } from 'react';
import { Product } from '../../data/mockData';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes ? product.sizes[0] : '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors ? product.colors[0] : '');
  const [quantity, setQuantity] = useState(1);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-lg bg-[#1f1f23] border border-[#292a2d] rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp flex flex-col"
      >
        {/* Top Image Stage */}
        <div className="relative w-full h-64 sm:h-72 bg-[#1b1b1f] overflow-hidden shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f23] via-transparent to-black/40"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          {/* Wishlist button */}
          <button
            onClick={() => onToggleWishlist(product.id)}
            aria-label="Favorito"
            className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-colors shadow-md ${
              isWishlisted
                ? 'bg-[#ff562d]/25 text-[#ff562d]'
                : 'bg-black/60 text-white hover:text-[#ffb4a2]'
            }`}
          >
            <span className={`material-symbols-outlined text-[20px] ${isWishlisted ? 'material-symbols-filled' : ''}`}>
              favorite
            </span>
          </button>

          {/* Badge */}
          {product.badge && (
            <span className="absolute bottom-3 left-4 px-2.5 py-1 rounded-md bg-[#0055ff] text-white text-xs font-bold uppercase tracking-wider shadow-md">
              {product.badge}
            </span>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-5 flex flex-col gap-4">
          <div>
            <span className="text-xs text-[#b6c4ff] uppercase tracking-wider font-semibold">
              {product.categoryLabel}
            </span>
            <h2 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-[#e3e2e6] mt-0.5">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[#ffb4a2] text-[16px] material-symbols-filled">
                  star
                </span>
                <span className="text-xs font-bold text-[#e3e2e6]">{product.rating}</span>
              </div>
              <span className="text-xs text-[#8d90a2]">({product.reviewsCount} opiniones de atletas)</span>
              <span className="text-[#8d90a2]">•</span>
              <span className="text-xs text-[#00e55b] font-semibold">En Stock</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#e3e2e6]">
              ${product.price.toLocaleString()} {product.currency}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-[#8d90a2] line-through">
                ${product.originalPrice.toLocaleString()} {product.currency}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-[#c3c5d9] leading-relaxed">
            {product.description}
          </p>

          {/* Highlights / Features */}
          {product.features && (
            <div className="bg-[#1b1b1f] p-3 rounded-xl border border-[#292a2d] flex flex-col gap-1.5">
              <span className="text-xs font-bold text-[#e3e2e6]">Especificaciones Técnicas:</span>
              <ul className="text-xs text-[#c3c5d9] flex flex-col gap-1">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#00e55b] text-[16px]">check</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-[#e3e2e6]">Talla:</span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                      selectedSize === size
                        ? 'bg-[#b6c4ff] text-[#002780] border-[#b6c4ff]'
                        : 'bg-[#292a2d] text-[#c3c5d9] border-[#343538] hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-[#e3e2e6]">Color:</span>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                      selectedColor === color
                        ? 'bg-[#b6c4ff] text-[#002780] border-[#b6c4ff]'
                        : 'bg-[#292a2d] text-[#c3c5d9] border-[#343538] hover:text-white'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Add CTA */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center gap-2 bg-[#292a2d] px-3 py-2 rounded-xl border border-[#343538]">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-[#c3c5d9] hover:text-white"
              >
                <span className="material-symbols-outlined text-[18px]">remove</span>
              </button>
              <span className="text-sm font-bold min-w-[20px] text-center text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-[#c3c5d9] hover:text-white"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>

            <button
              onClick={() => {
                onAddToCart(product, quantity, selectedSize, selectedColor);
                onClose();
              }}
              className="flex-1 py-3.5 bg-[#0055ff] hover:bg-[#0047d9] text-white rounded-xl font-['Space_Grotesk'] text-sm font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
              <span>Añadir al Carrito (${(product.price * quantity).toLocaleString()} MXN)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
