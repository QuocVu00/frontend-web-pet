import React from 'react';
import { motion } from 'framer-motion';

/**
 * Features — Bento-box style layout for brand values.
 * Layout is hardcoded (not dynamic class strings) so Tailwind v4
 * can correctly scan and include col-span-2 utilities.
 */

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.11 },
  }),
};

/* Shared card wrapper */
const BentoCard = ({ icon, title, desc, bg, index, wide }) => (
  <motion.article
    className={wide ? 'col-span-2' : 'col-span-1'}
    style={{
      background: bg,
      borderRadius: '1rem',
      padding: '1.75rem',
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.6rem',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    }}
    custom={index}
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
    whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
  >
    <span className="text-4xl mb-1" role="img" aria-label={title}>
      {icon}
    </span>
    <h3
      className="font-semibold text-lg"
      style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-charcoal)' }}
    >
      {title}
    </h3>
    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray)' }}>
      {desc}
    </p>
  </motion.article>
);

const Features = () => {
  return (
    <section
      id="about"
      aria-labelledby="features-heading"
      className="py-20 md:py-28"
      style={{ background: 'var(--color-light)' }}
    >
      <div className="section-container">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65 }}
        >
          <div className="section-divider" aria-hidden="true" />
          <h2
            id="features-heading"
            className="heading-serif text-3xl md:text-4xl lg:text-5xl mt-4"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Cam Kết Của Mật Pet
          </h2>
          <p
            className="mt-3 max-w-md mx-auto text-sm md:text-base"
            style={{ color: 'var(--color-gray)' }}
          >
            Mỗi dịch vụ và sản phẩm tại Mật Pet đều vì sức khỏe và sự hạnh phúc của thú cưng.
          </p>
        </motion.div>

        {/* ── Bento Grid ── */}
        <div className="bento-grid">
          {/* Row 1 */}
          <BentoCard
            index={0}
            wide={true}
            icon="✂️"
            title="Dịch Vụ Spa"
            desc="Tắm, tỉa lông và chăm sóc sắc đẹp chuyên nghiệp cho thú cưng của bạn."
            bg="rgba(255,107,157,0.12)"
          />
          <BentoCard
            index={1}
            wide={false}
            icon="🥩"
            title="Thức Ăn Sạch"
            desc="Nguồn dinh dưỡng tối ưu, đảm bảo sức khỏe và sự phát triển toàn diện."
            bg="rgba(224,187,228,0.15)"
          />

          {/* Row 2 */}
          <BentoCard
            index={2}
            wide={false}
            icon="🩺"
            title="Tư Vấn Sức Khỏe"
            desc="Đội ngũ giàu kinh nghiệm sẵn sàng hỗ trợ bạn chăm sóc pet tốt nhất."
            bg="rgba(255,182,193,0.15)"
          />
          <BentoCard
            index={3}
            wide={true}
            icon="🧸"
            title="Phụ Kiện Cao Cấp"
            desc="Đồ chơi, vòng cổ, nệm ngủ êm ái được tuyển chọn kỹ lưỡng."
            bg="rgba(162,210,255,0.15)"
          />

          {/* Row 3 */}
          <BentoCard
            index={4}
            wide={true}
            icon="📞"
            title="Hỗ Trợ 24/7"
            desc="Luôn lắng nghe và giải đáp mọi thắc mắc của bạn về thú cưng mọi lúc."
            bg="rgba(255,159,67,0.12)"
          />
          <BentoCard
            index={5}
            wide={false}
            icon="🚚"
            title="Giao Hàng Tận Nơi"
            desc="Giao hàng nhanh chóng và tiện lợi đến tận cửa nhà bạn."
            bg="rgba(255,219,88,0.2)"
          />
        </div>

      </div>
    </section>
  );
};

export default Features;
