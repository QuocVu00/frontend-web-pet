import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Products from './components/Products';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchOverlay from './components/SearchOverlay';

/**
 * App — Root component. Manages global state:
 * - Cart (add, update qty, remove)
 * - Cart drawer visibility
 * - Search overlay visibility
 * - Scroll progress bar
 * - Back-to-top button
 * - Toast notifications
 */
function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // ── Scroll progress & back-to-top ───────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrolled = window.scrollY;
      const total = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0);
      setShowBackToTop(scrolled > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Toast helper ─────────────────────────────────────────
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  }, []);

  // ── Add to Cart ──────────────────────────────────────────
  const handleAddToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.id === product.id
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`✓ ${product.name} đã được thêm vào giỏ hàng`);
  }, [showToast]);

  // ── Update Quantity ──────────────────────────────────────
  const handleUpdateQty = useCallback((id, delta) => {
    setCart(prev => {
      const updated = prev.map(i =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
      );
      return updated;
    });
  }, []);

  // ── Remove Item ──────────────────────────────────────────
  const handleRemove = useCallback((id) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id);
      if (item) showToast(`Đã xóa "${item.name}" khỏi giỏ hàng`);
      return prev.filter(i => i.id !== id);
    });
  }, [showToast]);

  // Lock body scroll when cart or search is open
  useEffect(() => {
    document.body.style.overflow = (cartOpen || searchOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [cartOpen, searchOpen]);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="progress-bar"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />

      {/* Sticky Navbar */}
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
      />

      {/* Main Content */}
      <main id="main-content">
        <Hero />
        <Features />
        <Products onAddToCart={handleAddToCart} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer (portal-like) */}
      <AnimatePresence>
        {cartOpen && (
          <CartDrawer
            cart={cart}
            onClose={() => setCartOpen(false)}
            onUpdateQty={handleUpdateQty}
            onRemove={handleRemove}
          />
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <SearchOverlay onClose={() => setSearchOpen(false)} />
        )}
      </AnimatePresence>

      {/* Toast notification */}
      <div
        className={`toast ${toastVisible ? 'show' : ''}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <span aria-hidden="true">🛍</span>
        {toastMessage}
      </div>

      {/* Back-to-top button */}
      <button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll back to top"
      >
        <FiArrowUp size={18} style={{ color: 'var(--color-charcoal)' }} aria-hidden="true" />
      </button>
    </>
  );
}

export default App;
