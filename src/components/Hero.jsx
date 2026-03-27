import React from 'react';
import { motion } from 'framer-motion';

/**
 * Hero — Split layout with large typography, CTA button,
 * and a product image surrounded by floating pastel shapes.
 */
const Hero = ({ onShopNow }) => {
  return (
    <section
      id="hero"
      aria-label="Hero banner"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ background: 'linear-gradient(135deg, #fff9fb 0%, #f5f0ff 50%, #fff8f0 100%)' }}
    >
      {/* Decorative background blobs */}
      <div
        aria-hidden="true"
        className="absolute top-10 left-10 w-80 h-80 rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FFD1DC, transparent)' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-10 w-72 h-72 rounded-full opacity-35 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #E6E6FA, transparent)' }}
      />

      <div className="section-container w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 py-16 md:py-0">

          {/* ── Left: Text Content ── */}
          <div className="flex-1 text-center md:text-left max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span
                className="chip mb-4"
                style={{ background: 'var(--color-orange)', color: 'var(--color-charcoal)' }}
              >
                🐾 Thiên Đường Thú Cưng 2025
              </span>
            </motion.div>

            <motion.h1
              className="heading-serif text-5xl md:text-6xl lg:text-7xl mb-6"
              style={{ fontFamily: 'var(--font-serif)' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Yêu Thương{' '}
              <em className="text-gradient not-italic">Thú Cưng</em>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg mb-8 leading-relaxed max-w-md mx-auto md:mx-0"
              style={{ color: 'var(--color-gray)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              Cung cấp thức ăn, phụ kiện và dịch vụ spa chuyên nghiệp cho thú cưng của bạn. 
              Tận tâm, chu đáo và tràn đầy yêu thương tại Mật Pet.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <a href="#products" className="btn btn-primary">
                Mua Sắm Ngay
              </a>
              <a href="#about" className="btn btn-outline">
                Về Chúng Tôi
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="flex gap-8 mt-10 justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
            >
              {[
                { value: '5000+', label: 'Khách Hàng' },
                { value: '100%', label: 'Tận Tâm' },
                { value: '5.0★', label: 'Đánh Giá' },
              ].map(stat => (
                <div key={stat.label} className="text-center md:text-left">
                  <p
                    className="text-xl font-bold"
                    style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-charcoal)' }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-gray)' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Product Visual ── */}
          <motion.div
            className="flex-1 relative flex items-center justify-center"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            {/* Floating shapes around image */}
            <div
              aria-hidden="true"
              className="float-shape w-16 h-16 absolute top-6 right-16"
              style={{
                background: 'var(--color-orange)',
                opacity: 0.7,
                animationDelay: '0s',
              }}
            />
            <div
              aria-hidden="true"
              className="float-shape w-10 h-10 absolute top-24 left-8"
              style={{
                background: 'var(--color-blue)',
                opacity: 0.65,
                animationDelay: '1.5s',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              }}
            />
            <div
              aria-hidden="true"
              className="float-shape w-8 h-8 absolute bottom-16 right-8"
              style={{
                background: 'var(--color-yellow)',
                opacity: 0.7,
                animationDelay: '0.8s',
              }}
            />
            <div
              aria-hidden="true"
              className="float-shape w-20 h-20 absolute bottom-8 left-12"
              style={{
                background: 'var(--color-blue)',
                opacity: 0.5,
                animationDelay: '2.2s',
              }}
            />
            <div
              aria-hidden="true"
              className="float-shape w-5 h-5 absolute top-1/2 right-2"
              style={{
                background: 'var(--color-yellow)',
                opacity: 0.8,
                animationDelay: '1s',
              }}
            />

            {/* Product image container */}
            <div
              className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
              style={{
                background: 'linear-gradient(145deg, var(--color-orange) 0%, var(--color-blue) 100%)',
                padding: '2rem',
                maxWidth: '400px',
                width: '100%',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80"
                alt="Mật Pet — Cửa hàng thú cưng uy tín"
                className="w-full rounded-2xl shadow-lg"
                style={{ aspectRatio: '1/1', objectFit: 'cover' }}
              />
            </div>

          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--color-gray)', fontSize: '0.65rem' }}>
          Scroll
        </span>
        <div
          className="w-px h-8 rounded-full"
          style={{ background: 'linear-gradient(to bottom, var(--color-gray), transparent)' }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
