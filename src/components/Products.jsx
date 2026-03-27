import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiHeart, FiStar } from 'react-icons/fi';

/**
 * Products — Bestsellers section with filter tabs,
 * product grid cards, and cart interaction.
 */

const ALL_PRODUCTS = [
  {
    id: 1,
    name: 'Thức Ăn Mèo Royal Canin',
    price: 350000,
    originalPrice: 420000,
    rating: 4.9,
    reviews: 512,
    category: 'Thức Ăn',
    badge: 'Bán Chạy',
    bg: 'linear-gradient(145deg, #FF6B9D15, #fff)',
    img: 'https://images.unsplash.com/photo-1589924691106-073b19f56582?w=400&auto=format&fit=crop&q=80',
    imgAlt: 'Thức ăn cho mèo cao cấp',
  },
  {
    id: 2,
    name: 'Xương Gặm Cho Chó',
    price: 85000,
    originalPrice: null,
    rating: 4.8,
    reviews: 215,
    category: 'Đồ Chơi',
    badge: 'Mới',
    bg: 'linear-gradient(145deg, #E0BBE415, #fff)',
    img: 'https://images.unsplash.com/photo-1623945037554-e4359990848a?w=400&auto=format&fit=crop&q=80',
    imgAlt: 'Xương gặm cho chó sạch răng',
  },
  {
    id: 3,
    name: 'Sữa Tắm SOS Cho Pet',
    price: 120000,
    originalPrice: 150000,
    rating: 4.7,
    reviews: 320,
    category: 'Vệ Sinh',
    badge: null,
    bg: 'linear-gradient(145deg, #FFB6C115, #fff)',
    img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&auto=format&fit=crop&q=80',
    imgAlt: 'Sữa tắm thú cưng thơm lâu',
  },
  {
    id: 4,
    name: 'Cát Vệ Sinh Đậu Nành',
    price: 145000,
    originalPrice: null,
    rating: 4.9,
    reviews: 840,
    category: 'Vệ Sinh',
    badge: 'Đánh Giá Cao',
    bg: 'linear-gradient(145deg, #E0BBE415, #FFB6C108)',
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&auto=format&fit=crop&q=80',
    imgAlt: 'Cát vệ sinh cho mèo khử mùi',
  },
  {
    id: 5,
    name: 'Vòng Cổ Thời Trang',
    price: 65000,
    originalPrice: 80000,
    rating: 4.6,
    reviews: 150,
    category: 'Phụ Kiện',
    badge: null,
    bg: 'linear-gradient(145deg, #FFDB5822, #fff)',
    img: 'https://images.unsplash.com/photo-1591768575198-88dac53fbd0a?w=400&auto=format&fit=crop&q=80',
    imgAlt: 'Vòng cổ chuông cho mèo chó',
  },
  {
    id: 6,
    name: 'Nệm Ngủ Êm Ái',
    price: 280000,
    originalPrice: null,
    rating: 4.8,
    reviews: 198,
    category: 'Phụ Kiện',
    badge: 'Yêu Thích',
    bg: 'linear-gradient(145deg, #FF6B9D12, #FFB6C108)',
    img: 'https://images.unsplash.com/photo-1591769225440-811ad7d63caf?w=400&auto=format&fit=crop&q=80',
    imgAlt: 'Nệm ngủ cao cấp cho thú cưng',
  },
];

const CATEGORIES = ['Tất Cả', 'Thức Ăn', 'Đồ Chơi', 'Vệ Sinh', 'Phụ Kiện'];

const Products = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('Tất Cả');
  const [wishlist, setWishlist] = useState(new Set());
  const [addedIds, setAddedIds] = useState(new Set());

  const filtered = activeCategory === 'Tất Cả'
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter(p => p.category === activeCategory);


  const toggleWishlist = (id) => {
    setWishlist(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleAddToCart = (product) => {
    onAddToCart(product);
    setAddedIds(prev => new Set([...prev, product.id]));
    setTimeout(() => {
      setAddedIds(prev => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1500);
  };

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="py-20 md:py-28"
      style={{ background: 'var(--color-white)' }}
    >
      <div className="section-container">
        {/* Section header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-divider" aria-hidden="true" />
          <h2
            id="products-heading"
            className="heading-serif text-3xl md:text-4xl lg:text-5xl mt-4"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Sản Phẩm Bán Chạy
          </h2>
          <p className="mt-3 text-sm md:text-base" style={{ color: 'var(--color-gray)' }}>
            Những sản phẩm tốt nhất dành cho người bạn bốn chân của bạn.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          role="tablist"
          aria-label="Filter products by category"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className="chip transition-all duration-300"
              style={{
                background: activeCategory === cat
                  ? 'linear-gradient(135deg, var(--color-pink), var(--color-lavender))'
                  : 'var(--color-light)',
                color: 'var(--color-charcoal)',
                border: activeCategory === cat ? 'none' : '1px solid rgba(180,160,200,0.2)',
                padding: '0.4rem 1.1rem',
                fontWeight: activeCategory === cat ? '600' : '400',
                transform: activeCategory === cat ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          role="list"
          aria-label="Products list"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.article
                key={product.id}
                role="listitem"
                className="product-card"
                style={{ background: product.bg }}
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: -10 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                layout
              >
                {/* Badge */}
                {product.badge && (
                  <span
                    className="absolute top-3 left-3 z-10 chip text-white"
                    style={{
                      background: 'linear-gradient(135deg, #FF6B9D, #FFB6C1)',
                      fontSize: '0.68rem',
                      padding: '0.2rem 0.7rem',
                    }}
                    aria-label={`Product badge: ${product.badge}`}
                  >
                    {product.badge}
                  </span>
                )}

                {/* Wishlist button */}
                <button
                  className="absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300"
                  style={{
                    background: wishlist.has(product.id)
                      ? 'var(--color-pink)'
                      : 'rgba(255,255,255,0.85)',
                    color: wishlist.has(product.id) ? 'var(--color-white)' : 'var(--color-gray)',
                  }}
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={`${wishlist.has(product.id) ? 'Remove from' : 'Add to'} wishlist: ${product.name}`}
                  aria-pressed={wishlist.has(product.id)}
                >
                  <FiHeart
                    size={16}
                    fill={wishlist.has(product.id) ? 'var(--color-pink)' : 'none'}
                  />
                </button>

                {/* Image */}
                <div className="product-img-wrap">
                  <img
                    src={product.img}
                    alt={product.imgAlt}
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="p-5 pt-0 flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <FiStar
                        key={idx}
                        size={12}
                        fill={idx < Math.round(product.rating) ? 'var(--color-pink)' : 'none'}
                        stroke="var(--color-pink)"
                      />
                    ))}
                    <span className="text-xs ml-1" style={{ color: 'var(--color-gray)' }}>
                      ({product.reviews})
                    </span>
                  </div>

                  <h3
                    className="font-semibold text-base"
                    style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-charcoal)' }}
                  >
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg" style={{ color: 'var(--color-charcoal)' }}>
                      {product.price.toLocaleString('vi-VN')}đ
                    </span>
                    {product.originalPrice && (
                      <span
                        className="text-sm line-through"
                        style={{ color: 'var(--color-gray)' }}
                        aria-label={`Giá gốc ${product.originalPrice.toLocaleString('vi-VN')}đ`}
                      >
                        {product.originalPrice.toLocaleString('vi-VN')}đ
                      </span>
                    )}
                  </div>

                  {/* Cart button */}
                  <button
                    className="btn-cart flex items-center gap-2 mt-2 w-full justify-center"
                    onClick={() => handleAddToCart(product)}
                    disabled={addedIds.has(product.id)}
                    aria-label={`Add ${product.name} to cart`}
                    style={{
                      opacity: addedIds.has(product.id) ? 1 : undefined,
                      transform: addedIds.has(product.id) ? 'translateY(0)' : undefined,
                      background: addedIds.has(product.id)
                        ? 'linear-gradient(135deg, #a0d8a0, #60b060)'
                        : undefined,
                    }}
                  >
                    <FiShoppingBag size={14} />
                    {addedIds.has(product.id) ? 'Đã thêm! ✓' : 'Thêm vào giỏ'}
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* View All CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <a href="#" className="btn btn-outline">
            Xem Tất Cả Sản Phẩm
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
