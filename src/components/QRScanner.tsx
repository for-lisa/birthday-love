import { useEffect, useRef, useState, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Heart, Sparkles, Star, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QRScannerProps {
  onSuccess: () => void;
}

const VALID_CODE = 'I-LOVE-U_LISA-ARDELIANA';

const FloatingSparkle = ({ delay, left }: { delay: number; left: number }) => (
  <motion.div
    className="absolute text-primary"
    style={{ left: `${left}%` }}
    initial={{ y: '100vh', opacity: 0, scale: 0 }}
    animate={{ 
      y: '-20vh', 
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1, 0],
      rotate: [0, 180, 360]
    }}
    transition={{
      duration: 4 + Math.random() * 2,
      delay,
      repeat: Infinity,
      ease: 'easeOut',
    }}
  >
    <Sparkles className="w-4 h-4" />
  </motion.div>
);

const FloatingHeart = ({ delay, left }: { delay: number; left: number }) => (
  <motion.div
    className="absolute text-primary/40"
    style={{ left: `${left}%` }}
    initial={{ y: '100vh', opacity: 0, scale: 0 }}
    animate={{ 
      y: '-10vh', 
      opacity: [0, 0.6, 0.6, 0],
      scale: [0.5, 1, 1, 0.5],
      x: [0, 20, -20, 0]
    }}
    transition={{
      duration: 6 + Math.random() * 3,
      delay,
      repeat: Infinity,
      ease: 'easeOut',
    }}
  >
    <Heart className="w-6 h-6 fill-current" />
  </motion.div>
);

export const QRScanner = ({ onSuccess }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isScanningRef = useRef(false);

  const stopScanner = useCallback(async () => {
    if (scannerRef.current && isScanningRef.current) {
      try {
        await scannerRef.current.stop();
      } catch {
        // Scanner already stopped, ignore error
      }
      isScanningRef.current = false;
    }
    scannerRef.current = null;
    setIsScanning(false);
  }, []);

  const startScanner = async () => {
    setError(null);
    setIsScanning(true);

    try {
      const html5QrCode = new Html5Qrcode('qr-reader');
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        async (decodedText) => {
          if (decodedText === VALID_CODE) {
            isScanningRef.current = false;
            try {
              await html5QrCode.stop();
            } catch {
              // Ignore stop errors
            }
            setShowSuccess(true);
            setTimeout(() => {
              onSuccess();
            }, 2000);
          } else {
            setError('Kode tidak valid. Coba lagi!');
          }
        },
        () => {}
      );
      isScanningRef.current = true;
    } catch {
      setError('Tidak bisa mengakses kamera. Pastikan izin kamera diaktifkan.');
      setIsScanning(false);
      isScanningRef.current = false;
    }
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current && isScanningRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background via-secondary/30 to-background relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <FloatingSparkle key={`sparkle-${i}`} delay={i * 0.5} left={10 + i * 12} />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <FloatingHeart key={`heart-${i}`} delay={i * 0.8 + 0.3} left={5 + i * 18} />
        ))}
      </div>

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 bg-accent/30 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <AnimatePresence mode="wait">
        {showSuccess ? (
          <motion.div
            key="success"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            className="flex flex-col items-center gap-6 relative z-10"
          >
            {/* Celebration burst */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 2, 3], opacity: [1, 0.5, 0] }}
              transition={{ duration: 1 }}
            >
              <div className="w-20 h-20 bg-primary/30 rounded-full" />
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="relative"
            >
              <Heart className="w-28 h-28 text-primary fill-primary drop-shadow-lg" />
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-8 h-8 text-accent" />
              </motion.div>
            </motion.div>

            <div className="text-center space-y-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-2"
              >
                <PartyPopper className="w-6 h-6 text-accent" />
                <p className="text-3xl font-serif font-bold text-foreground">Barcode nya Valid nih!</p>
                <PartyPopper className="w-6 h-6 text-accent" style={{ transform: 'scaleX(-1)' }} />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-muted-foreground"
              >
                Aku Siapin dulu yaa...
              </motion.p>
            </div>

            {/* Floating stars around */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-accent"
                style={{
                  left: `${50 + 40 * Math.cos((i * Math.PI) / 4)}%`,
                  top: `${50 + 40 * Math.sin((i * Math.PI) / 4)}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                transition={{ delay: 0.2 + i * 0.1, duration: 1, repeat: Infinity, repeatDelay: 1 }}
              >
                <Star className="w-4 h-4 fill-current" />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="scanner"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full max-w-md flex flex-col items-center gap-6 relative z-10"
          >
            <div className="text-center space-y-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="flex items-center justify-center gap-3"
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-8 h-8 text-primary" />
                </motion.div>
                <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  AKSES PIN GEMBOK
                </h1>
                <motion.div
                  animate={{ rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-8 h-8 text-primary" />
                </motion.div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground text-lg"
              >
                Scan QR Code yang sudaa ejaa kasii yaaw..!
              </motion.p>
              <motion.div
                className="flex justify-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ delay: i * 0.2, duration: 1.5, repeat: Infinity }}
                  >
                    <Heart className="w-4 h-4 text-primary fill-primary" />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="relative w-full aspect-square max-w-[300px]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Decorative border */}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl opacity-50 blur-sm"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <div
                id="qr-reader"
                className="relative w-full h-full rounded-2xl overflow-hidden bg-card border-2 border-primary/30"
              />
              
              {!isScanning && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/90 backdrop-blur-sm rounded-2xl gap-4">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Camera className="w-20 h-20 text-primary" />
                  </motion.div>
                  <p className="text-muted-foreground text-sm">Tekan tombol untuk mulai</p>
                </div>
              )}

              {isScanning && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-[250px] h-[250px] border-4 border-primary rounded-lg relative"
                      animate={{
                        boxShadow: [
                          '0 0 0 0 hsl(var(--primary) / 0.4)',
                          '0 0 0 20px hsl(var(--primary) / 0)',
                        ],
                      }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      {/* Corner decorations */}
                      <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-accent rounded-tl-lg" />
                      <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-accent rounded-tr-lg" />
                      <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-accent rounded-bl-lg" />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-accent rounded-br-lg" />
                    </motion.div>
                  </div>
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-[240px] h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                    animate={{ top: ['20%', '80%', '20%'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  />
                </motion.div>
              )}
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="bg-destructive/10 text-destructive px-4 py-2 rounded-lg text-center text-sm border border-destructive/30"
              >
                {error}
              </motion.div>
            )}

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={isScanning ? stopScanner : startScanner}
                size="lg"
                className="px-8 py-6 text-lg bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/30"
              >
                <Camera className="w-5 h-5 mr-2" />
                {isScanning ? 'Stop Scanner' : 'Mulai Scan'}
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-muted-foreground text-center max-w-[280px] flex items-center gap-2"
            >
              <Star className="w-4 h-4 text-accent" />
              Arahin kamera ke Barcode QR yang sudaa eja kasih di amplop^.^
              <Star className="w-4 h-4 text-accent" />
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};