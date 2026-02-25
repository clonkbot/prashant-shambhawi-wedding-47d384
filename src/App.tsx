import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Floating petals component
const FloatingPetals = () => {
  const petals = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 6,
    size: 12 + Math.random() * 16,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{ left: `${petal.left}%`, top: -30 }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.sin(petal.id) * 50, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="none"
          >
            <ellipse
              cx="12"
              cy="12"
              rx="8"
              ry="12"
              fill="url(#petalGrad)"
              opacity="0.8"
            />
            <defs>
              <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="100%" stopColor="#F7931E" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

// Mandala SVG component
const Mandala = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D4AF37" />
        <stop offset="50%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
    </defs>
    {[...Array(12)].map((_, i) => (
      <g key={i} transform={`rotate(${i * 30} 100 100)`}>
        <path
          d="M100 20 Q110 50 100 80 Q90 50 100 20"
          fill="none"
          stroke="url(#goldGrad)"
          strokeWidth="1"
          opacity="0.6"
        />
        <circle cx="100" cy="25" r="3" fill="url(#goldGrad)" opacity="0.8" />
      </g>
    ))}
    {[...Array(8)].map((_, i) => (
      <g key={i} transform={`rotate(${i * 45} 100 100)`}>
        <path
          d="M100 35 Q115 60 100 85 Q85 60 100 35"
          fill="none"
          stroke="url(#goldGrad)"
          strokeWidth="0.8"
          opacity="0.5"
        />
      </g>
    ))}
    <circle cx="100" cy="100" r="15" fill="none" stroke="url(#goldGrad)" strokeWidth="1" />
    <circle cx="100" cy="100" r="5" fill="url(#goldGrad)" />
  </svg>
);

// Countdown component
const Countdown = () => {
  const weddingDate = new Date('2026-04-20T00:00:00');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = weddingDate.getTime() - now.getTime();

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-amber-600/20 blur-xl" />
        <motion.div
          key={value}
          initial={{ rotateX: -90 }}
          animate={{ rotateX: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-[#1a0a0a] to-[#2d1515] rounded-lg border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-900/20"
        >
          <span className="font-cormorant text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500">
            {value.toString().padStart(2, '0')}
          </span>
        </motion.div>
      </div>
      <span className="mt-2 text-xs sm:text-sm text-amber-400/80 font-light tracking-widest uppercase">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex gap-3 sm:gap-6 justify-center">
      <TimeBox value={timeLeft.days} label="Days" />
      <TimeBox value={timeLeft.hours} label="Hours" />
      <TimeBox value={timeLeft.minutes} label="Mins" />
      <TimeBox value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

// RSVP Form component
const RSVPForm = () => {
  const [formData, setFormData] = useState({ name: '', attending: '', guests: '1', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence mode="wait">
      {!submitted ? (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-6 max-w-md mx-auto"
        >
          <div className="space-y-2">
            <label className="block text-amber-300/90 text-sm tracking-wider uppercase">Your Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-[#1a0a0a]/80 border border-amber-500/30 rounded-lg text-amber-100 placeholder-amber-700/50 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-amber-300/90 text-sm tracking-wider uppercase">Will you attend?</label>
            <div className="flex gap-4">
              {['Joyfully Accept', 'Regretfully Decline'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: option })}
                  className={`flex-1 py-3 px-4 rounded-lg border transition-all text-sm sm:text-base ${
                    formData.attending === option
                      ? 'bg-gradient-to-r from-amber-600 to-amber-500 border-amber-400 text-[#1a0505]'
                      : 'bg-[#1a0a0a]/80 border-amber-500/30 text-amber-300 hover:border-amber-400/50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {formData.attending === 'Joyfully Accept' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2"
            >
              <label className="block text-amber-300/90 text-sm tracking-wider uppercase">Number of Guests</label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className="w-full px-4 py-3 bg-[#1a0a0a]/80 border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-400 transition-all"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="block text-amber-300/90 text-sm tracking-wider uppercase">Wishes for the Couple</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-[#1a0a0a]/80 border border-amber-500/30 rounded-lg text-amber-100 placeholder-amber-700/50 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all resize-none"
              placeholder="Share your blessings..."
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-[#1a0505] font-semibold rounded-lg shadow-lg shadow-amber-600/30 hover:shadow-amber-500/40 transition-shadow tracking-wider uppercase"
          >
            Send RSVP
          </motion.button>
        </motion.form>
      ) : (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center"
          >
            <svg className="w-10 h-10 text-[#1a0505]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h3 className="font-cormorant text-2xl sm:text-3xl text-amber-300 mb-2">Thank You!</h3>
          <p className="text-amber-400/70">Your response has been recorded. We look forward to celebrating with you!</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main App
export default function App() {
  return (
    <div className="min-h-screen bg-[#0d0505] text-amber-100 overflow-x-hidden">
      {/* Gradient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#1a0808] via-[#0d0505] to-[#1a0a0a]" />

      {/* Pattern overlay */}
      <div
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <FloatingPetals />

      {/* Main content */}
      <div className="relative z-20">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
          {/* Top mandala */}
          <motion.div
            initial={{ opacity: 0, rotate: -180, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            <Mandala className="w-24 h-24 sm:w-32 sm:h-32 mb-4 sm:mb-6" />
          </motion.div>

          {/* Wedding text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-amber-400/80 tracking-[0.3em] sm:tracking-[0.4em] uppercase text-xs sm:text-sm mb-4"
          >
            You are cordially invited to
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="font-cormorant text-lg sm:text-2xl text-amber-300/90 tracking-wider mb-6 sm:mb-8"
          >
            The Wedding Celebration of
          </motion.h2>

          {/* Names */}
          <div className="text-center mb-6 sm:mb-8">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="font-great-vibes text-5xl sm:text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500"
            >
              Prashant
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              className="my-3 sm:my-4 flex items-center justify-center gap-4"
            >
              <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-amber-500/50" />
              <span className="font-cormorant text-xl sm:text-2xl text-amber-400 italic">&</span>
              <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-amber-500/50" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="font-great-vibes text-5xl sm:text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500"
            >
              Shambhawi
            </motion.h1>
          </div>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="w-32 sm:w-48 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-8 sm:mb-10"
          />

          {/* Date */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="text-center"
          >
            <p className="text-amber-400/80 tracking-[0.2em] uppercase text-xs sm:text-sm mb-2">Save the Date</p>
            <div className="flex items-center justify-center gap-3 sm:gap-6">
              <div className="text-right">
                <p className="font-cormorant text-3xl sm:text-5xl font-light text-amber-200">20</p>
                <p className="text-amber-400/70 text-xs sm:text-sm tracking-wider">APRIL</p>
              </div>
              <div className="w-px h-12 sm:h-16 bg-amber-500/40" />
              <div className="text-left">
                <p className="font-cormorant text-3xl sm:text-5xl font-light text-amber-200">2026</p>
                <p className="text-amber-400/70 text-xs sm:text-sm tracking-wider">MONDAY</p>
              </div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-amber-500/50"
            >
              <span className="text-xs tracking-widest uppercase">Scroll</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </section>

        {/* Countdown Section */}
        <section className="py-16 sm:py-24 px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="font-cormorant text-2xl sm:text-3xl text-amber-300 mb-2">Counting Down to Forever</h2>
            <p className="text-amber-500/70 mb-8 sm:mb-12 text-sm sm:text-base">The celebration begins in</p>
            <Countdown />
          </motion.div>
        </section>

        {/* Quote Section */}
        <section className="py-12 sm:py-16 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <Mandala className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-6 opacity-60" />
            <blockquote className="font-cormorant text-xl sm:text-2xl md:text-3xl text-amber-200/90 italic leading-relaxed px-4">
              "Two souls with but a single thought, two hearts that beat as one."
            </blockquote>
            <p className="mt-4 text-amber-500/60 text-sm">— John Keats</p>
          </motion.div>
        </section>

        {/* RSVP Section */}
        <section className="py-16 sm:py-24 px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto"
          >
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="font-cormorant text-3xl sm:text-4xl text-amber-300 mb-2">RSVP</h2>
              <p className="text-amber-500/70 text-sm sm:text-base">We would be honored by your presence</p>
            </div>

            <div className="relative">
              {/* Decorative corners */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-amber-500/40" />
              <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-amber-500/40" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-amber-500/40" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-amber-500/40" />

              <div className="bg-gradient-to-br from-[#1a0a0a]/90 to-[#0d0505]/90 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6 sm:p-8">
                <RSVPForm />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-12 sm:py-16 px-4 border-t border-amber-500/10">
          <div className="max-w-4xl mx-auto text-center">
            <Mandala className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 opacity-40" />
            <p className="font-great-vibes text-2xl sm:text-3xl text-amber-400/80 mb-2">Prashant & Shambhawi</p>
            <p className="text-amber-500/50 text-sm">April 20, 2026</p>

            <div className="mt-8 pt-8 border-t border-amber-500/10">
              <p className="text-amber-600/40 text-xs tracking-wider">
                Requested by @Nishant293 · Built by @clonkbot
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
