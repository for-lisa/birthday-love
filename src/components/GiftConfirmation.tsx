import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Clock, Sparkles, Star, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GiftConfirmationProps {
  onConfirm: () => void;
}

const FloatingElement = ({ delay, left, icon: Icon, color }: { delay: number; left: number; icon: React.ElementType; color: string }) => (
  <motion.div
    className={`absolute ${color}`}
    style={{ left: `${left}%` }}
    initial={{ y: '100vh', opacity: 0, scale: 0 }}
    animate={{ 
      y: '-10vh', 
      opacity: [0, 0.6, 0.6, 0],
      scale: [0.5, 1, 1, 0.5],
      rotate: [0, 180, 360]
    }}
    transition={{
      duration: 7 + Math.random() * 4,
      delay,
      repeat: Infinity,
      ease: 'easeOut',
    }}
  >
    <Icon className="w-5 h-5 fill-current" />
  </motion.div>
);

export const GiftConfirmation = ({ onConfirm }: GiftConfirmationProps) => {
  const [hasOpened, setHasOpened] = useState<boolean | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background via-secondary/20 to-background relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <FloatingElement key={`gift-${i}`} delay={i * 0.6} left={8 + i * 16} icon={Gift} color="text-primary/30" />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <FloatingElement key={`star-${i}`} delay={i * 0.8 + 0.4} left={12 + i * 20} icon={Star} color="text-accent/40" />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <FloatingElement key={`heart-${i}`} delay={i * 1 + 0.2} left={5 + i * 25} icon={Heart} color="text-primary/25" />
        ))}
      </div>

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-20 right-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl"
        animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-32 left-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.15, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <AnimatePresence mode="wait">
        {hasOpened === null ? (
          <motion.div
            key="question"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0, y: -30 }}
            className="w-full max-w-md flex flex-col items-center gap-8 relative z-10"
          >
            {/* Animated gift box */}
            <motion.div
              className="relative"
              animate={{ 
                y: [0, -15, 0],
              }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            >
              {/* Glow effect behind gift */}
              <motion.div
                className="absolute inset-0 bg-primary/30 rounded-full blur-2xl scale-150"
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1.3, 1.6, 1.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <motion.div
                animate={{ 
                  rotate: [0, 8, -8, 0],
                }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="relative"
              >
                <Gift className="w-28 h-28 text-primary drop-shadow-lg" />
                
                {/* Sparkles around gift */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-accent"
                    style={{
                      left: `${50 + 45 * Math.cos((angle * Math.PI) / 180)}%`,
                      top: `${50 + 45 * Math.sin((angle * Math.PI) / 180)}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={{ 
                      scale: [0, 1, 0], 
                      opacity: [0, 1, 0],
                      rotate: [0, 180]
                    }}
                    transition={{ 
                      delay: i * 0.3, 
                      duration: 1.5, 
                      repeat: Infinity,
                      repeatDelay: 0.5
                    }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <div className="text-center space-y-4">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-serif font-bold text-foreground leading-relaxed"
              >
                Apakah Kamu Sudah Membuka Kadonya
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl text-foreground"
              >
                Dari{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
                  Reza Putra Nurhudaya
                </span>
                ?
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center gap-2"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ delay: i * 0.15, duration: 1.2, repeat: Infinity }}
                  >
                    <Heart className="w-4 h-4 text-primary fill-primary" />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 w-full max-w-sm"
            >
              <motion.div className="flex-1" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  onClick={() => setHasOpened(false)}
                  variant="outline"
                  size="lg"
                  className="w-full py-6 text-lg border-2 border-primary/40 hover:bg-primary/10 hover:border-primary rounded-xl"
                >
                  <Clock className="w-5 h-5 mr-2" />
                  Belum
                </Button>
              </motion.div>
              <motion.div className="flex-1" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  onClick={onConfirm}
                  size="lg"
                  className="w-full py-6 text-lg bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 rounded-xl shadow-lg shadow-primary/30"
                >
                  <Gift className="w-5 h-5 mr-2" />
                  Sudah
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="waiting"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="w-full max-w-md flex flex-col items-center gap-8 relative z-10"
          >
            {/* Animated clock */}
            <motion.div
              className="relative"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <motion.div
                className="absolute inset-0 bg-primary/20 rounded-full blur-2xl scale-150"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="relative"
              >
                <Clock className="w-24 h-24 text-primary drop-shadow-lg" />
              </motion.div>
              
              {/* Pulsing rings */}
              {[1, 2, 3].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border-2 border-primary/30 rounded-full"
                  animate={{ 
                    scale: [1, 1.5 + i * 0.3], 
                    opacity: [0.5, 0] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: i * 0.5,
                    ease: 'easeOut'
                  }}
                />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-card via-card to-secondary/30 rounded-3xl p-6 md:p-8 shadow-xl border-2 border-primary/20 text-center space-y-4"
            >
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl font-serif text-foreground leading-relaxed"
              >
                Baiklah, Aku Tunggu yaa disini..
              </motion.p>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-muted-foreground"
              >
                Kalau Sudah Membuka Kadonya, Tekan Tombol yang dibawah yaa..
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center gap-3 pt-2"
              >
                {[0.3, 0, 0.3].map((delay, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [1, 1.4, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5,
                      delay: delay + i * 0.15
                    }}
                  >
                    <Heart className={`w-${6 - i} h-${6 - i} text-primary fill-primary`} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onConfirm}
                size="lg"
                className="px-8 py-6 text-lg bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 rounded-xl shadow-lg shadow-primary/30"
              >
                <PartyPopper className="w-5 h-5 mr-2" />
                Sekarang Sudah
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>

            {/* Extra floating decorations for waiting state */}
            <motion.div
              className="absolute bottom-10 left-10"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 15, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Gift className="w-12 h-12 text-primary/30" />
            </motion.div>
            <motion.div
              className="absolute top-20 right-10"
              animate={{ 
                y: [0, 15, 0],
                rotate: [0, -15, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Star className="w-10 h-10 text-accent/40 fill-current" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};