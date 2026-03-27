import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch, FiUser, FiShoppingBag, FiX, FiMoon, FiSun, FiMenu
} from 'react-icons/fi';

/**
 * Navbar — Glassmorphism sticky header with cart badge,
 * search overlay, dark mode toggle, and mobile hamburger.
 */
const Navbar = ({ cartCount, onCartOpen, onSearchOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  // Track scroll for enhanced glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Persist dark mode preference
  const toggleDark = useCallback(() => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : '');
  }, [dark]);

  const navLinks = [
    { label: 'Shop', href: '#products' },
    { label: 'Bestsellers', href: '#bestsellers' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass ${
          scrolled ? 'shadow-md' : ''
        }`}
        role="banner"
      >
        <nav
          className="section-container flex items-center justify-between h-16 md:h-20"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group" aria-label="Mật Pet Home">
            <span
              className="heading-serif text-xl md:text-2xl text-gradient"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Mật Pet
            </span>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-medium tracking-wide relative group"
                  style={{ color: 'var(--color-charcoal)' }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 rounded-full"
                    style={{ background: 'linear-gradient(90deg, var(--color-pink), var(--color-lavender))' }}
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Icon Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Search */}
            <button
              onClick={onSearchOpen}
              aria-label="Open search"
              className="p-2 rounded-full hover:bg-pink-100 transition-colors relative"
              style={{ color: 'var(--color-charcoal)' }}
            >
              <FiSearch size={20} />
            </button>

            {/* Dark Mode */}
            <button
              onClick={toggleDark}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-full hover:bg-pink-100 transition-colors"
              style={{ color: 'var(--color-charcoal)' }}
            >
              {dark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* Account */}
            <a
              href="#contact"
              aria-label="My account"
              className="p-2 rounded-full hover:bg-pink-100 transition-colors hidden sm:flex"
              style={{ color: 'var(--color-charcoal)' }}
            >
              <FiUser size={20} />
            </a>

            {/* Cart */}
            <button
              onClick={onCartOpen}
              aria-label={`Shopping cart, ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
              className="p-2 rounded-full hover:bg-pink-100 transition-colors relative"
              style={{ color: 'var(--color-charcoal)' }}
            >
              <FiShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="badge" aria-live="polite" aria-atomic="true">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="md:hidden p-2 rounded-full hover:bg-pink-100 transition-colors"
              style={{ color: 'var(--color-charcoal)' }}
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden glass border-t overflow-hidden"
              style={{ borderColor: 'rgba(255,255,255,0.3)' }}
              role="navigation"
              aria-label="Mobile navigation"
            >
              <ul className="flex flex-col py-4 px-6 gap-4" role="list">
                {navLinks.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm font-medium block py-1"
                      style={{ color: 'var(--color-charcoal)' }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
