import React from 'react';
import { Product } from '../../data/mockData';

interface HomeScreenProps {
  onNavigateTab: (tab: string, categoryFilter?: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  featuredProducts: Product[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateTab,
  onAddToCart,
  onSelectProduct,
  wishlist,
  onToggleWishlist,
  featuredProducts,
}) => {
  const categories = [
    { id: 'balones', label: 'Balones', icon: 'sports_basketball' },
    { id: 'uniformes', label: 'Uniformes', icon: 'checkroom' },
    { id: 'tenis', label: 'Tenis', icon: 'sprint' },
    { id: 'accesorios', label: 'Accesorios', icon: 'fitness_center' },
  ];

  return (
    <div className="flex flex-col w-full pb-8">
      {/* 1. Hero Promo Banner (Cyber Sale) */}
      <div className="relative w-full rounded-2xl overflow-hidden mb-6 bg-[#292a2d] shadow-xl border border-[#292a2d]/40">
        <div className="absolute inset-0 bg-gradient-to-r from-[#121316] via-[#121316]/75 to-transparent z-10"></div>
        <div
          className="w-full min-h-[210px] sm:min-h-[230px] bg-cover bg-center flex items-center p-5 sm:p-6 relative z-20"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA8v1TQ2xcZoPpRvMViWdHwZsVEbhwTXb1frAFeIQ13EZzBMkyci6TRhsJZEBKm5AIkOV3UG2o6pY2L4krmkex6qqq350r3CYrYZlz1inPytkjrxvaPH4VmgCK2Bk1nAhAPdFssZF4Py2yfzbtiW7C8de8zyCqWndQoagP3LWiv1kNky-r3kISt62TqKXdyCAhknUc_V0LG_UN9omLyLExOM31S-kM2DsAu5LSrJ77r_fQ-Kwo8FVuH')`,
          }}
        >
          <div className="max-w-[75%] sm:max-w-[70%] flex flex-col gap-1.5">
            <span className="bg-[#b6c4ff] text-[#002780] text-[10px] sm:text-xs px-2.5 py-1 rounded-md w-fit font-bold uppercase tracking-wider shadow-sm">
              ¡Cyber Sale!
            </span>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl text-[#e3e2e6] font-bold leading-tight uppercase tracking-tight">
              HASTA 40% OFF
            </h2>
            <p className="text-xs sm:text-sm text-[#c3c5d9] leading-relaxed line-clamp-2">
              Equipamiento de alto rendimiento para llevar tu entrenamiento al siguiente nivel.
            </p>
            <button
              onClick={() => onNavigateTab('ofertas')}
              className="mt-2.5 bg-[#ffb4a2] text-[#621100] hover:brightness-105 active:scale-95 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 w-fit transition-all shadow-md"
            >
              <span>Ver Ofertas</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Categorías Rápidas */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#e3e2e6]">Categorías</h3>
          <button
            onClick={() => onNavigateTab('catalogo')}
            className="text-xs sm:text-sm text-[#b6c4ff] hover:underline font-medium cursor-pointer"
          >
            Ver todas
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigateTab('catalogo', cat.id)}
              className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#292a2d] flex items-center justify-center text-[#b6c4ff] group-hover:bg-[#0055ff] group-hover:text-white transition-all shadow-sm group-active:scale-95 border border-[#343538]/40">
                <span className="material-symbols-outlined text-[24px] sm:text-[28px]">{cat.icon}</span>
              </div>
              <span className="text-xs text-[#e3e2e6] font-medium group-hover:text-[#b6c4ff] transition-colors truncate">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Productos Destacados */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#e3e2e6]">Productos Destacados</h3>
          <button
            onClick={() => onNavigateTab('catalogo')}
            className="text-xs sm:text-sm text-[#b6c4ff] hover:underline font-medium cursor-pointer"
          >
            Explorar
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {featuredProducts.slice(0, 2).map((product) => {
            const isFav = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                className="bg-[#1f1f23] rounded-2xl p-3 flex flex-col justify-between relative shadow-md border border-[#292a2d]/70 group hover:border-[#b6c4ff]/30 transition-all"
              >
                {/* Wishlist Heart Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(product.id);
                  }}
                  aria-label="Agregar a favoritos"
                  className={`absolute top-4 right-4 z-10 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-colors shadow-sm ${
                    isFav
                      ? 'bg-[#ff562d]/20 text-[#ff562d]'
                      : 'bg-[#121316]/75 text-[#c3c5d9] hover:text-[#ffb4a2]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[18px] ${isFav ? 'material-symbols-filled' : ''}`}>
                    favorite
                  </span>
                </button>

                {/* Product Image */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="w-full h-36 sm:h-40 bg-cover bg-center rounded-xl mb-3 cursor-pointer group-hover:scale-[1.02] transition-transform overflow-hidden relative"
                  style={{ backgroundImage: `url('${product.image}')` }}
                >
                  <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors"></div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-1 mb-3 cursor-pointer" onClick={() => onSelectProduct(product)}>
                  <span className="text-[10px] sm:text-xs text-[#8d90a2] font-semibold uppercase tracking-wider">
                    {product.categoryLabel}
                  </span>
                  <h4 className="text-sm font-semibold text-[#e3e2e6] truncate">
                    {product.name}
                  </h4>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-[#b6c4ff]">
                      ${product.price.toLocaleString()} {product.currency}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-[#8d90a2] line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={() => onAddToCart(product)}
                  className="w-full bg-[#0055ff] hover:bg-[#0047d9] text-white py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-md"
                >
                  <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                  <span>Comprar</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Envío Express Gratis Banner */}
      <div 
        onClick={() => onNavigateTab('carrito')}
        className="bg-[#1b1b1f] hover:bg-[#1f1f23] rounded-2xl p-4 flex items-center justify-between border border-[#292a2d] shadow-md cursor-pointer transition-all active:scale-[0.99]"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#00782c]/20 text-[#00e55b] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">local_shipping</span>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#e3e2e6]">Envío Express Gratis</h4>
            <p className="text-xs text-[#c3c5d9]">En compras mayores a $999 MXN en todo el país</p>
          </div>
        </div>
        <span className="material-symbols-outlined text-[#8d90a2]">chevron_right</span>
      </div>

      {/* 5. Special Launch Teaser Card */}
      <div 
        onClick={() => onNavigateTab('evento')}
        className="mt-4 bg-gradient-to-r from-[#292a2d] to-[#1f1f23] rounded-2xl p-4 flex items-center justify-between border border-[#ff562d]/40 shadow-lg cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#ff562d]/20 text-[#ff562d] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">celebration</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff562d] bg-[#ff562d]/15 px-1.5 py-0.5 rounded">
                Flagship Calle 16
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#e3e2e6] mt-0.5">Gran Inauguración Tienda Richard</h4>
            <p className="text-xs text-[#c3c5d9]">Kits de bienvenida, 50% OFF y pase VIP</p>
          </div>
        </div>
        <div className="flex items-center text-xs font-bold text-[#ffb4a2] gap-1 group-hover:translate-x-1 transition-transform">
          <span>Ver</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </div>
      </div>
    </div>
  );
};
