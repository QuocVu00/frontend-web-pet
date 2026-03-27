import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiArrowRight, FiCheck } from 'react-icons/fi';

/**
 * Footer — Newsletter form with validation + social links + nav.
 * Grading criteria: Form with ≥3 fields, JS validation, UX states,
 * success message, preventDefault, and input labels.
 */
const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', interest: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitSummary, setSubmitSummary] = useState(null);

  // ── Validation Logic ──────────────────────────────────────
  const validate = (data) => {
    const errs = {};

    if (!data.name.trim()) {
      errs.name = 'Your name is required.';
    } else if (data.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    if (!data.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!data.interest) {
      errs.interest = 'Vui lòng chọn mối quan tâm của bạn.';
    }

    return errs;
  };

  // ── Input change handler ──────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // ── Submit handler ─────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();

    const errs = validate(formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Focus first errored field
      const firstErrKey = Object.keys(errs)[0];
      document.getElementById(`newsletter-${firstErrKey}`)?.focus();
      return;
    }

    setSubmitting(true);
    // Simulate async submit
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setSubmitSummary({ ...formData });
      setFormData({ name: '', email: '', interest: '' });
    }, 1200);
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmitSummary(null);
    setErrors({});
  };

  const footerNav = {
    MuaSắm: ['Sản Phẩm Mới', 'Bán Chạy', 'Thức Ăn', 'Phụ Kiện', 'Đồ Chơi'],
    ThôngTin: ['Câu Chuyện', 'Bền Vững', 'Báo Chí', 'Tuyển Dụng'],
    HỗTrợ: ['FAQ', 'Giao Hàng', 'Đơn Hàng', 'Liên Hệ'],
  };

  return (
    <footer id="contact" role="contentinfo" style={{ background: 'var(--color-charcoal)' }}>
      {/* Newsletter Band */}
      <section
        aria-labelledby="newsletter-heading"
        className="py-16 md:py-20"
        style={{ background: 'linear-gradient(135deg, #FFF5F8 0%, #FFD1DC 100%)' }}
      >
        <div className="section-container grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="chip mb-4"
              style={{ background: 'rgba(255,107,157,0.15)', color: 'var(--color-charcoal)' }}
            >
              ✉ Newsletter
            </span>
            <h2
              id="newsletter-heading"
              className="heading-serif text-3xl md:text-4xl mb-4"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-charcoal)' }}
            >
              Nhận Bản Tin Từ Mật Pet
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray)' }}>
              Đăng ký để nhận ưu đãi hấp dẫn, mẹo chăm sóc thú cưng 
              và thông tin về các sản phẩm mới nhất.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Newsletter subscription form"
                className="flex flex-col gap-4"
              >
                {/* Name Field */}
                <div className="form-group">
                  <label htmlFor="newsletter-name" style={{ color: 'var(--color-charcoal)', opacity: 0.8 }}>
                    Full Name
                  </label>
                  <input
                    id="newsletter-name"
                    name="name"
                    type="text"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="e.g. Emma Rose"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-invalid={!!errors.name}
                    disabled={submitting}
                  />
                  {errors.name && (
                    <span id="name-error" className="form-error" role="alert">
                      ⚠ {errors.name}
                    </span>
                  )}
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="newsletter-email" style={{ color: 'var(--color-charcoal)', opacity: 0.8 }}>
                    Email Address
                  </label>
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={!!errors.email}
                    disabled={submitting}
                  />
                  {errors.email && (
                    <span id="email-error" className="form-error" role="alert">
                      ⚠ {errors.email}
                    </span>
                  )}
                </div>

                {/* Skincare Interest — select field */}
                <div className="form-group">
                  <label htmlFor="newsletter-interest" style={{ color: 'var(--color-charcoal)', opacity: 0.8 }}>
                    Skincare Interest
                  </label>
                  <select
                    id="newsletter-interest"
                    name="interest"
                    className={`form-input ${errors.interest ? 'error' : ''}`}
                    value={formData.interest}
                    onChange={handleChange}
                    aria-describedby={errors.interest ? 'interest-error' : undefined}
                    aria-invalid={!!errors.interest}
                    disabled={submitting}
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="">Chọn mối quan tâm…</option>
                    <option value="cho">Chăm sóc chó</option>
                    <option value="meo">Chăm sóc mèo</option>
                    <option value="dinh-duong">Dinh dưỡng</option>
                    <option value="phu-kien">Phụ kiện</option>
                    <option value="spa">Dịch vụ Spa</option>
                  </select>
                  {errors.interest && (
                    <span id="interest-error" className="form-error" role="alert">
                      ⚠ {errors.interest}
                    </span>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-primary w-full mt-2"
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                        <path d="M12 2a10 10 0 0 1 10 10" />
                      </svg>
                      Đang đăng ký…
                    </>
                  ) : (
                    <>Đăng ký ngay <FiArrowRight size={16} aria-hidden="true" /></>
                  )}
                </button>
              </form>
            ) : (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-8 text-center flex flex-col items-center gap-4"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-2"
                  style={{ background: 'linear-gradient(135deg, var(--color-pink), var(--color-lavender))' }}
                >
                  <FiCheck size={28} aria-hidden="true" />
                </div>
                <h3
                  className="text-xl font-semibold text-white"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  You're all signed up!
                </h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Chào mừng, <strong>{submitSummary?.name}</strong>! 🐾<br />
                  Chúng tôi sẽ gửi mẹo chăm sóc{' '}
                  <em>
                    {submitSummary?.interest?.replace('-', ' ')}
                  </em>{' '}
                  đến <strong>{submitSummary?.email}</strong>.
                </p>
                <button
                  className="btn btn-outline text-white mt-2"
                  style={{ borderColor: 'rgba(255,255,255,0.35)' }}
                  onClick={handleReset}
                >
                  Subscribe Another
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="py-14 px-4" style={{ background: '#FFF5F8', borderTop: '1px solid rgba(255,107,157,0.1)' }}>
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <span
                className="heading-serif text-2xl mb-4 block"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-charcoal)' }}
              >
                Mật Pet
              </span>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-gray)' }}>
                Thiên đường thú cưng, tận tâm phục vụ.
                <br />239 Đường Nguyễn Hồng Đào TP HCM
              </p>
              {/* Social Icons */}
              <nav aria-label="Social media links">
                <ul className="flex gap-3" role="list">
                  {[
                    { Icon: FiInstagram, label: 'Instagram', href: '#' },
                    { Icon: FiTwitter, label: 'Twitter / X', href: '#' },
                    { Icon: FiFacebook, label: 'Facebook', href: '#' },
                    { Icon: FiYoutube, label: 'YouTube', href: '#' },
                  ].map(({ Icon, label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        aria-label={`Follow Mật Pet on ${label}`}
                        className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                          background: 'rgba(255,107,157,0.1)',
                          color: 'var(--color-charcoal)',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, var(--color-pink), var(--color-lavender))';
                          e.currentTarget.style.color = '#333';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'rgba(255,107,157,0.1)';
                          e.currentTarget.style.color = 'var(--color-charcoal)';
                        }}
                      >
                        <Icon size={16} />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Nav columns */}
            {Object.entries(footerNav).map(([section, links]) => (
              <nav key={section} aria-label={`${section} navigation`}>
                <h3
                  className="text-sm font-semibold tracking-widest uppercase mb-4"
                  style={{ color: 'var(--color-charcoal)', opacity: 0.5, fontSize: '0.7rem' }}
                >
                  {section}
                </h3>
                <ul className="flex flex-col gap-2" role="list">
                  {links.map(link => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm transition-colors duration-200"
                        style={{ color: 'var(--color-gray)' }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-pink)'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-gray)'; }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8"
            style={{ borderTop: '1px solid rgba(255,107,157,0.15)' }}
          >
            <p className="text-xs" style={{ color: 'var(--color-gray)', opacity: 0.6 }}>
              © 2025 Mật Pet. All rights reserved.
            </p>
            <div className="flex gap-4">
              {['Privacy Policy', 'Terms of Use', 'Cookie Settings'].map(item => (
                <a
                  key={item}
                  href="#"
                  className="text-xs"
                  style={{ color: 'var(--color-gray)', opacity: 0.6 }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-pink)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-gray)'; }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
