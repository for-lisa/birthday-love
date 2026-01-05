import { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Copy, Check, Settings, Sparkles, Star } from 'lucide-react';

const SECRET_CODE = "I-LOVE-U_LISA-ARDELIANA";

const FloatingElement = ({ delay, children, className }: { delay: number; children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ 
      opacity: [0.3, 0.7, 0.3],
      y: [0, -15, 0],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const QRGeneratorPage = () => {
  const [customCode, setCustomCode] = useState(SECRET_CODE);
  const [copied, setCopied] = useState(false);
  
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(customCode)}&bgcolor=FDF2F4&color=831843`;

  const handleCopy = () => {
    navigator.clipboard.writeText(customCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'birthday-invitation-qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-background via-secondary to-background flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatingElement delay={0} className="absolute top-[10%] left-[15%]">
          <Star className="w-6 h-6 text-primary/30" fill="currentColor" />
        </FloatingElement>
        <FloatingElement delay={1} className="absolute top-[20%] right-[20%]">
          <Sparkles className="w-8 h-8 text-primary/25" />
        </FloatingElement>
        <FloatingElement delay={2} className="absolute bottom-[30%] left-[10%]">
          <Star className="w-5 h-5 text-primary/20" fill="currentColor" />
        </FloatingElement>
        <FloatingElement delay={1.5} className="absolute bottom-[20%] right-[15%]">
          <Sparkles className="w-6 h-6 text-primary/30" />
        </FloatingElement>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
            className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-secondary to-primary/20 flex items-center justify-center shadow-lg"
          >
            <Settings className="w-8 h-8 text-primary" />
          </motion.div>
          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
            QR Generator
          </h1>
          <p className="text-muted-foreground text-sm">
            Admin page - Generate invitation QR codes
          </p>
        </div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-border/50"
        >
          {/* QR Code Display */}
          <div className="bg-background rounded-2xl p-6 mb-6 flex items-center justify-center shadow-inner">
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              src={qrCodeUrl} 
              alt="QR Code"
              className="w-48 h-48 md:w-64 md:h-64 rounded-lg"
            />
          </div>

          {/* Secret Code Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Secret Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                placeholder="Enter secret code"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className="px-4 py-3 rounded-xl bg-muted text-muted-foreground hover:bg-secondary transition-colors"
              >
                {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>

          {/* Info */}
          <div className="bg-muted/50 rounded-xl p-4 mb-6">
            <p className="text-xs text-muted-foreground">
              <strong>Note:</strong> The QR code above encodes the secret code "{customCode}". 
              Share this QR code with your guests. They will need to scan it to access the birthday celebration page.
            </p>
          </div>

          {/* Download Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownload}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <QrCode className="w-5 h-5" />
            Download QR Code
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6 text-xs text-muted-foreground"
        >
          This is an admin-only page. Keep this URL private.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default QRGeneratorPage;
