import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';

const SUGGESTIONS = [
  'Thức ăn mèo', 'Xương gặm', 'Sữa tắm pet',
  'Cát vệ sinh', 'Vòng cổ', 'Nệm thú cưng', 'Đồ chơi cho chó', 'Pate mèo',
];

/**
 * SearchOverlay — Modal search with trending suggestions.
 */
const SearchOverlay = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // Auto-focus when opened
  useEffect(() => {
    inputRef.current?.focus();
    // Close on Escape
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const filtered = query.length >= 1
    ? SUGGESTIONS.filter(s => s.toLowerCase().includes(query.toLowerCase()))
    : SUGGESTIONS;

  return (
    <div
      className="search-overlay open"
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        className="search-box"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="flex items-center gap-3 pb-3 border-b"
          style={{ borderColor: 'rgba(180,160,200,0.3)' }}
        >
          <FiSearch size={20} style={{ color: 'var(--color-gray)' }} aria-hidden="true" />
          <label htmlFor="search-input" className="sr-only">Search products</label>
          <input
            id="search-input"
            ref={inputRef}
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Tìm kiếm sản phẩm…"
            className="flex-1 text-base outline-none bg-transparent"
            style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-sans)' }}
            aria-autocomplete="list"
            aria-controls="search-suggestions"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1 rounded-full hover:bg-pink-50 transition-colors"
            style={{ color: 'var(--color-gray)' }}
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="mt-4">
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: 'var(--color-gray)', fontSize: '0.68rem' }}
          >
            {query ? 'Kết quả' : 'Tìm kiếm phổ biến'}
          </p>
          <ul
            id="search-suggestions"
            role="listbox"
            aria-label="Search suggestions"
            className="flex flex-wrap gap-2"
          >
            {filtered.length > 0 ? filtered.map(s => (
              <li key={s} role="option" aria-selected="false">
                <button
                  className="chip"
                  style={{
                    background: 'var(--color-light)',
                    color: 'var(--color-charcoal)',
                    border: '1px solid rgba(180,160,200,0.2)',
                    padding: '0.3rem 0.9rem',
                  }}
                  onClick={() => {
                    setQuery(s);
                    inputRef.current?.focus();
                  }}
                >
                  {s}
                </button>
              </li>
            )) : (
              <li>
                <p className="text-sm" style={{ color: 'var(--color-gray)' }}>
                  Không tìm thấy kết quả cho "<em>{query}</em>"
                </p>
              </li>
            )}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default SearchOverlay;
