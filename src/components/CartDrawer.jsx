import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from 'react-icons/fi';

/**
 * CartDrawer — Slide-in cart panel with quantity controls and remove.
 */
const CartDrawer = ({ cart, onClose, onUpdateQty, onRemove }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <motion.aside
        id="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="fixed right-0 top-0 h-full w-full max-w-sm z-50 flex flex-col shadow-2xl"
        style={{ background: 'var(--color-white)' }}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 280, damping: 30 }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-5 border-b"
          style={{ borderColor: 'rgba(180,160,200,0.2)' }}
        >
          <h2
            className="font-semibold flex items-center gap-2"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-charcoal)' }}
          >
            <FiShoppingBag size={18} aria-hidden="true" />
            Giỏ Hàng
            {cart.length > 0 && (
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'var(--color-orange)', color: 'var(--color-charcoal)' }}
              >
                {cart.reduce((sum, i) => sum + i.qty, 0)} sản phẩm
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="p-2 rounded-full hover:bg-pink-50 transition-colors"
            style={{ color: 'var(--color-charcoal)' }}
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto py-4 px-5">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: 'var(--color-light)' }}
              >
                <FiShoppingBag size={32} style={{ color: 'var(--color-gray)' }} aria-hidden="true" />
              </div>
              <p className="text-sm" style={{ color: 'var(--color-gray)' }}>
                Giỏ hàng của bạn đang trống.<br />Hãy chọn những món đồ tuyệt vời cho pet nhé!
              </p>
              <button
                onClick={onClose}
                className="btn btn-primary mt-2"
                style={{ padding: '0.6rem 1.5rem' }}
              >
                Mua Sắm Ngay
              </button>
            </div>
          ) : (
            <AnimatePresence>
              {cart.map(item => (
                <motion.article
                  key={item.id}
                  className="flex items-center gap-3 py-4 border-b"
                  style={{ borderColor: 'rgba(180,160,200,0.15)' }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0, paddingBlock: 0 }}
                  transition={{ duration: 0.25 }}
                  layout
                >
                  {/* Image */}
                  <div
                    className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"
                    style={{ background: 'var(--color-light)' }}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-medium text-sm truncate"
                      style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-serif)' }}
                    >
                      {item.name}
                    </p>
                    <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--color-charcoal)' }}>
                      {(item.price * item.qty).toLocaleString('vi-VN')}đ
                    </p>
                    {/* Qty controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQty(item.id, -1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                        style={{ background: 'var(--color-light)', color: 'var(--color-charcoal)' }}
                      >
                        <FiMinus size={12} />
                      </button>
                      <span
                        className="text-sm font-medium w-6 text-center"
                        aria-live="polite"
                        aria-label={`Quantity: ${item.qty}`}
                      >
                        {item.qty}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.id, 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                        style={{ background: 'var(--color-light)', color: 'var(--color-charcoal)' }}
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => onRemove(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                    className="p-2 rounded-full hover:bg-red-50 transition-colors flex-shrink-0"
                    style={{ color: '#e05575' }}
                  >
                    <FiTrash2 size={14} />
                  </button>
                </motion.article>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Footer total + checkout */}
        {cart.length > 0 && (
          <div
            className="p-5 border-t"
            style={{ borderColor: 'rgba(180,160,200,0.2)' }}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm" style={{ color: 'var(--color-gray)' }}>
                Tổng cộng
              </span>
              <span
                className="font-bold text-xl"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-charcoal)' }}
              >
                {total.toLocaleString('vi-VN')}đ
              </span>
            </div>
            <button className="btn btn-primary w-full" aria-label="Tiến hành thanh toán">
              Thanh Toán
            </button>
            <p className="text-xs text-center mt-2" style={{ color: 'var(--color-gray)' }}>
              Miễn phí vận chuyển cho đơn hàng trên 500k 🐾
            </p>
          </div>
        )}
      </motion.aside>
    </>
  );
};

export default CartDrawer;
