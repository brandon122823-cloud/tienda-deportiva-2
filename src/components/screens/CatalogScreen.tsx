import React, { useState, useMemo } from 'react';
import { Product } from '../../data/mockData';

interface CatalogScreenProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onSelectProduct,
  wishlist,
  onToggleWishlist,
  searchQuery,
  onSearchChange,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const categories = [
    { id: 'all', label: 'Todos', icon: 'grid_view' },
    { id: 'balones', label: 'Balones', icon: 'sports_soccer' },
    { id: 'uniformes', label: 'Uniformes', icon: 'checkroom' },
    { id: 'tenis', label: 'Tenis', icon: 'bolt' },
    { id: 'accesorios', label: 'Accesorios', icon: 'sports_kabaddi' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesSearch =
          searchQuery === '' ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Header Info & Filter Trigger */}
      <div className="flex flex-col gap-3 mb-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-['Space_Grotesk'] text-2xl font-bold text-[#e3e2e6]">
              Catálogo Elite
            </h1>
            <p className="text-xs text-[#c3c5d9]">
              Equipamiento de alto rendimiento para atletas implacables.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              aria-label="Buscar"
              className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all shadow-sm ${
                showSearchInput || searchQuery
                  ? 'bg-[#0055ff] text-white'
                  : 'bg-[#292a2d] text-[#e3e2e6] hover:bg-[#343538]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
            <button
              onClick={() => setShowFiltersModal(true)}
              aria-label="Filtros y orden"
              className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all shadow-sm ${
                sortBy !== 'featured'
                  ? 'bg-[#0055ff] text-white'
                  : 'bg-[#292a2d] text-[#e3e2e6] hover:bg-[#0055ff] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </button>
          </div>
        </div>

        {/* Collapsible Search Input */}
        {showSearchInput && (
          <div className="relative flex items-center mt-1 animate-fadeIn">
            <span className="absolute left-3 material-symbols-outlined text-[#8d90a2] text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por calzado, balones, camisetas..."
              className="w-full bg-[#1f1f23] border border-[#292a2d] text-[#e3e2e6] placeholder:text-[#8d90a2] pl-10 pr-10 py-2.5 rounded-xl text-sm outline-none focus:border-[#0055ff] transition-all"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-[#8d90a2] hover:text-white"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
        )}

        {/* Category Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar pt-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#b6c4ff] text-[#002780] shadow-sm font-bold'
                    : 'bg-[#292a2d] text-[#e3e2e6] hover:bg-[#0055ff] hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Current Filter Banner */}
      <div className="flex items-center justify-between mb-4 px-1">
        <span className="text-xs text-[#8d90a2]">
          Mostrando <strong className="text-[#e3e2e6]">{filteredProducts.length}</strong> productos
        </span>
        {searchQuery && (
          <span className="text-xs text-[#b6c4ff]">
            Filtro: "{searchQuery}"
          </span>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-[#1f1f23] rounded-2xl p-6 border border-[#292a2d]">
          <span className="material-symbols-outlined text-[#8d90a2] text-[48px] mb-2">search_off</span>
          <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#e3e2e6]">No encontramos productos</h3>
          <p className="text-xs text-[#c3c5d9] mt-1 max-w-xs">
            Intenta con otra palabra clave o limpia el filtro de categoría.
          </p>
          <button
            onClick={() => {
              onSelectCategory('all');
              onSearchChange('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-[#0055ff] text-white text-xs font-bold"
          >
            Ver todos los productos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {filteredProducts.map((product) => {
            const isFav = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                className="flex flex-col bg-[#1f1f23] rounded-2xl overflow-hidden shadow-md border border-[#292a2d] group relative hover:border-[#b6c4ff]/40 transition-all"
              >
                {/* Product Image Stage */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="relative w-full h-40 sm:h-44 bg-[#1b1b1f] overflow-hidden cursor-pointer"
                >
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${product.image}')` }}
                  ></div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    aria-label="Agregar a favoritos"
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-colors shadow-sm ${
                      isFav
                        ? 'bg-[#ff562d]/25 text-[#ff562d]'
                        : 'bg-[#121316]/80 text-[#e3e2e6] hover:text-[#ffb4a2]'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[18px] ${isFav ? 'material-symbols-filled' : ''}`}>
                      favorite
                    </span>
                  </button>

                  {/* Promotional Badges */}
                  {product.badge && (
                    <span
                      className={`absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                        product.badge.includes('%') || product.badge.includes('2x1')
                          ? 'bg-[#ff562d] text-[#560d00]'
                          : product.badge === 'Más Vendido'
                          ? 'bg-[#00782c] text-[#8fff99]'
                          : 'bg-[#0055ff] text-white'
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="flex flex-col p-3 flex-1 justify-between gap-2.5">
                  <div className="cursor-pointer" onClick={() => onSelectProduct(product)}>
                    <span className="text-[10px] text-[#8d90a2] uppercase tracking-wider font-semibold">
                      {product.categoryLabel}
                    </span>
                    <h3 className="font-['Space_Grotesk'] text-[15px] font-semibold text-[#e3e2e6] leading-snug mt-0.5 truncate">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-[#ffb4a2] text-[14px] material-symbols-filled">
                        star
                      </span>
                      <span className="text-xs text-[#c3c5d9] font-medium">
                        {product.rating}{' '}
                        <span className="text-[#8d90a2] font-normal">({product.reviewsCount})</span>
                      </span>
                    </div>
                  </div>

                  {/* Pricing and Cart Button */}
                  <div className="flex items-center justify-between mt-1 pt-2 border-t border-[#292a2d]/50">
                    <div className="flex flex-col">
                      <span className="font-['Space_Grotesk'] font-bold text-sm sm:text-base text-[#e3e2e6]">
                        ${product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[10px] text-[#8d90a2] line-through">
                          ${product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => onAddToCart(product)}
                      aria-label={`Añadir ${product.name} al carrito`}
                      className="w-9 h-9 rounded-xl bg-[#b6c4ff] text-[#002780] hover:bg-[#0055ff] hover:text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Sort & Filter Drawer Modal */}
      {showFiltersModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full sm:max-w-md bg-[#1f1f23] border border-[#292a2d] rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl animate-slideUp">
            <div className="flex items-center justify-between pb-3 border-b border-[#292a2d]">
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#e3e2e6] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b6c4ff]">tune</span>
                Ordenar Catálogo
              </h3>
              <button
                onClick={() => setShowFiltersModal(false)}
                className="w-8 h-8 rounded-full bg-[#292a2d] text-[#c3c5d9] flex items-center justify-center hover:text-white"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="py-4 flex flex-col gap-2">
              <span className="text-xs font-semibold text-[#8d90a2] uppercase tracking-wider">Criterio de orden</span>
              {[
                { id: 'featured', label: 'Destacados Richard' },
                { id: 'price-asc', label: 'Precio: Menor a Mayor' },
                { id: 'price-desc', label: 'Precio: Mayor a Menor' },
                { id: 'rating', label: 'Mejor Calificados (Reviews)' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSortBy(opt.id as any);
                    setShowFiltersModal(false);
                  }}
                  className={`w-full p-3 rounded-xl text-left text-sm font-medium flex items-center justify-between transition-colors ${
                    sortBy === opt.id
                      ? 'bg-[#0055ff] text-white font-bold'
                      : 'bg-[#292a2d] text-[#e3e2e6] hover:bg-[#343538]'
                  }`}
                >
                  <span>{opt.label}</span>
                  {sortBy === opt.id && (
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  )}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowFiltersModal(false)}
                className="w-full py-3 rounded-xl bg-[#b6c4ff] text-[#002780] font-bold text-sm"
              >
                Listo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
