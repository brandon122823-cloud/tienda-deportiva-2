import React, { useState } from 'react';
import {
  INITIAL_PRODUCTS,
  INITIAL_CART,
  Product,
  CartItem,
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/screens/HomeScreen';
import { CatalogScreen } from './components/screens/CatalogScreen';
import { OffersScreen } from './components/screens/OffersScreen';
import { CartScreen } from './components/screens/CartScreen';
import { BranchesScreen } from './components/screens/BranchesScreen';
import { LaunchEventScreen } from './components/screens/LaunchEventScreen';
import { ProductDetailModal } from './components/modals/ProductDetailModal';
import { CheckoutModal } from './components/modals/CheckoutModal';
import { ProfileModal } from './components/modals/ProfileModal';
import { Toast } from './components/Toast';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('inicio');
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [wishlist, setWishlist] = useState<string[]>(['prod-1', 'prod-4']);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('RICHARDPRO25');

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (
    product: Product,
    quantity = 1,
    size?: string,
    color?: string
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedSize: size || (product.sizes ? product.sizes[0] : 'Estándar'),
          selectedColor: color || (product.colors ? product.colors[0] : 'Original'),
        },
      ];
    });
    showToast(`¡${product.name} añadido al carrito!`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Producto eliminado del carrito');
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Carrito vaciado');
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removido de favoritos');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Guardado en favoritos');
        return [...prev, productId];
      }
    });
  };

  const handleApplyCoupon = (code: string) => {
    if (!code) {
      setAppliedCoupon(null);
      showToast('Cupón removido');
    } else {
      setAppliedCoupon(code);
      showToast(`¡Cupón ${code} aplicado!`);
    }
  };

  const handleNavigateTab = (tab: string, categoryFilter?: string) => {
    setCurrentTab(tab);
    if (categoryFilter) {
      setSelectedCategory(categoryFilter);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0d0e11] flex justify-center text-[#e3e2e6]">
      {/* Centered Mobile App Shell (simulating native responsive mobile viewport with full desktop elegance) */}
      <div className="w-full max-w-md min-h-screen bg-[#121316] relative flex flex-col shadow-2xl border-x border-[#292a2d]/40">
        {/* Top Header */}
        <Header
          currentTab={currentTab}
          cartCount={cartTotalItems}
          onOpenProfile={() => setProfileModalOpen(true)}
          onOpenSearch={() => {
            if (currentTab !== 'catalogo') {
              setCurrentTab('catalogo');
            }
          }}
          onNavigateTab={handleNavigateTab}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full px-4 pt-20 pb-24">
          {currentTab === 'inicio' && (
            <HomeScreen
              onNavigateTab={handleNavigateTab}
              onAddToCart={handleAddToCart}
              onSelectProduct={setSelectedProduct}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              featuredProducts={products}
            />
          )}

          {currentTab === 'catalogo' && (
            <CatalogScreen
              products={products}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onAddToCart={handleAddToCart}
              onSelectProduct={setSelectedProduct}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          )}

          {currentTab === 'ofertas' && (
            <OffersScreen
              products={products}
              onAddToCart={handleAddToCart}
              onNavigateTab={handleNavigateTab}
              onApplyCoupon={handleApplyCoupon}
            />
          )}

          {currentTab === 'carrito' && (
            <CartScreen
              cart={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveFromCart}
              onClearCart={handleClearCart}
              onNavigateTab={handleNavigateTab}
              appliedCoupon={appliedCoupon}
              onApplyCoupon={handleApplyCoupon}
              onOpenCheckout={() => setCheckoutModalOpen(true)}
            />
          )}

          {currentTab === 'sucursales' && (
            <BranchesScreen
              onShowToast={showToast}
              onNavigateTab={handleNavigateTab}
            />
          )}

          {currentTab === 'evento' && (
            <LaunchEventScreen
              onShowToast={showToast}
              onNavigateTab={handleNavigateTab}
            />
          )}
        </main>

        {/* Bottom Navigation */}
        <BottomNav
          currentTab={currentTab}
          cartCount={cartTotalItems}
          onSelectTab={handleNavigateTab}
        />

        {/* Modals & Overlays */}
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
          onToggleWishlist={handleToggleWishlist}
        />

        <CheckoutModal
          isOpen={checkoutModalOpen}
          onClose={() => setCheckoutModalOpen(false)}
          cart={cart}
          appliedCoupon={appliedCoupon}
          onOrderSuccess={(orderId) => {
            showToast(`¡Pedido ${orderId} completado con éxito!`);
            setCart([]);
          }}
        />

        <ProfileModal
          isOpen={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
          wishlistCount={wishlist.length}
          onNavigateTab={handleNavigateTab}
        />

        {/* Toast Notification */}
        <Toast message={toastMessage} />
      </div>
    </div>
  );
}
