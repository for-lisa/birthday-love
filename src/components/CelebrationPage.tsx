import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Star, Gift, PartyPopper, Crown } from 'lucide-react';

const MessageContent1 = () => (
  <>
    Ternyata, Setelah sekian musim merebak dan mereda, dari teduh embun hingga kelip senja, <mark className="bg-primary/20 text-primary px-1 rounded font-medium">yang benar-benar indah di bumi ini hanyalah engkau</mark>.
    {'\n\n'}
    Mulanya aku mengira <mark className="bg-primary/20 text-primary px-1 rounded font-medium">indah itu rona senja yang berpendar, desir angin yang mengusir sunyi, sampai bunga-bunga liar yang bermekaran di tepi kali</mark>. Namun nyatanya, semua itu hanyalah selubung dari wujudmu yang meruang dalam dadaku.
    {'\n\n'}
    Dan pada akhirnya aku mengerti, di jagat yang riuh oleh dusta dan fana, <mark className="bg-primary/20 text-primary px-1 rounded font-medium">keindahan sejati hanya menetap pada sosok sepertimu</mark>. Jika bumi menyimpan sejuta keelokan, <mark className="bg-primary/20 text-primary px-1 rounded font-medium">maka engkaulah satu-satunya yang tak pernah sanggup disandingkan</mark>.
  </>
);

const messages = [
  {
    id: 1,
    title: 'Untuk Lisa<3',
    content: <MessageContent1 />,
  },
  {
    id: 2,
    title: ' ̶H̶a̶p̶p̶y̶ ̶B̶i̶r̶t̶h̶d̶a̶y̶',
    content: `Mungkin ucapan Happy Birthday aku ganti aja yaa jadi ini;

Terima kasih sudah bertahan sejauh ini.
Selamat atas bertambahnya angka usia dan berkurangnya jatah hidup di dunia. Kamu adalah manusia yang paling dinantikan hadirnya yang tumbuh menjadi manusia kuat dan tangguh menghadapi dunia.

Didepan sana kamu tidak akan pernah tahu seperti apa, semoga kamu selalu di beri ruang ikhlas dan rasa syukur yang lapang agar dirimu.

Mungkin hidup terlalu banyak memberimu luka yang selalu mampu kamu hadapi, semoga tahun-tahun selanjutnya luka itu luruh satu persatu diganti bahagia berlipat untukmu.

Diantara banyak nya sedih bahkan sempit yang menghampirimu, semoga kamu selalu diberi alasan-alasan kecil mampu membangkitkan semangatmu untuk terus memperjuangkan mimpi baikmu.

Segala lelah, sakit, yang selalu mampu kamu hadapi. semoga kamu selalu berterimakasih kepada dirimu yang hebat itu.

Di hari-hari sebelumnya, sekarang dan selanjutnya ku doakan selalu. semoga Tuhan selalu menjagamu, semoga Tuhan selalu menuntunmu, semoga Tuhan selalu memberi izin semesta memihak hidupmu. Semoga hidupmu berteman dengan perasaan lapang untuk apapun yang belum diberi untukmu.`,
  },
];

const FloatingHeart = ({ delay, size = 'md' }: { delay: number; size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' };
  return (
    <motion.div
      className="absolute text-primary/30"
      initial={{ 
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 300),
        y: typeof window !== 'undefined' ? window.innerHeight + 50 : 800,
        scale: Math.random() * 0.5 + 0.5,
        rotate: Math.random() * 30 - 15,
      }}
      animate={{
        y: -100,
        rotate: [0, 30, -30, 0],
        x: `+=${Math.random() * 100 - 50}`,
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <Heart className={`${sizeClasses[size]} fill-current`} />
    </motion.div>
  );
};

const FloatingStar = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute text-accent/40"
    initial={{ 
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 300),
      y: typeof window !== 'undefined' ? window.innerHeight + 50 : 800,
    }}
    animate={{
      y: -100,
      rotate: [0, 180, 360],
      scale: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 10 + Math.random() * 5,
      delay,
      repeat: Infinity,
      ease: 'linear',
    }}
  >
    <Star className="w-5 h-5 fill-current" />
  </motion.div>
);

const Firework = ({ delay }: { delay: number }) => {
  const colors = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(340 70% 70%)'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${15 + Math.random() * 70}%`,
        top: `${5 + Math.random() * 25}%`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 2, 0],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 2 + Math.random() * 3,
      }}
    >
      <Star className="w-8 h-8" style={{ color }} fill={color} />
    </motion.div>
  );
};

const SparkleRing = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute"
    style={{
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 40}%`,
    }}
    initial={{ scale: 0, opacity: 0, rotate: 0 }}
    animate={{
      scale: [0, 1.5, 0],
      opacity: [0, 0.8, 0],
      rotate: [0, 180],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      repeatDelay: 4 + Math.random() * 2,
    }}
  >
    <Sparkles className="w-10 h-10 text-accent" />
  </motion.div>
);

export const CelebrationPage = () => {
  const hasLaunchedConfetti = useRef(false);

  useEffect(() => {
    if (hasLaunchedConfetti.current) return;
    hasLaunchedConfetti.current = true;

    // Initial big burst
    confetti({
      particleCount: 150,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#ec4899', '#f472b6', '#fda4af', '#fecdd3', '#fbbf24', '#fb923c'],
    });

    // Continuous confetti from sides
    const duration = 8 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ec4899', '#f472b6', '#fda4af', '#fecdd3', '#fbbf24'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ec4899', '#f472b6', '#fda4af', '#fecdd3', '#fbbf24'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Delayed bursts
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0.3, y: 0.6 },
        colors: ['#ec4899', '#f472b6', '#fda4af'],
      });
    }, 1000);

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0.7, y: 0.6 },
        colors: ['#fbbf24', '#fb923c', '#fda4af'],
      });
    }, 2000);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
        animate={{ 
          background: [
            'radial-gradient(circle at 20% 20%, hsl(var(--primary) / 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, hsl(var(--primary) / 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 20%, hsl(var(--primary) / 0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Glowing orbs */}
      <motion.div
        className="fixed top-20 left-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="fixed bottom-20 right-10 w-56 h-56 bg-accent/20 rounded-full blur-3xl"
        animate={{ scale: [1.3, 1, 1.3], opacity: [0.3, 0.15, 0.3] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <FloatingHeart key={`heart-${i}`} delay={i * 0.6} size={i % 3 === 0 ? 'lg' : i % 3 === 1 ? 'md' : 'sm'} />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <FloatingStar key={`star-${i}`} delay={i * 0.8 + 0.3} />
        ))}
      </div>

      {/* Fireworks */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <Firework key={`firework-${i}`} delay={i * 0.4} />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <SparkleRing key={`sparkle-${i}`} delay={i * 0.6 + 0.2} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-8 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="text-center mb-10"
        >
          {/* Crown decoration */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="mb-4 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Crown className="w-16 h-16 text-accent fill-accent/30" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: 'spring' }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <PartyPopper className="w-8 h-8 text-accent" />
            </motion.div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <Sparkles className="w-7 h-7 text-primary" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">
              Happy Birthday
            </h1>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <Sparkles className="w-7 h-7 text-primary" />
            </motion.div>
            <motion.div
              animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ transform: 'scaleX(-1)' }}
            >
              <PartyPopper className="w-8 h-8 text-accent" />
            </motion.div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-2xl md:text-3xl font-serif text-primary font-semibold"
          >
            Lisa Ardeliana
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex justify-center gap-2 mt-4"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.4, 1], rotate: [0, 15, -15, 0] }}
                transition={{ delay: i * 0.1, duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-5 h-5 text-primary fill-primary" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scrapbook Messages */}
        <div className="space-y-10">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 60, rotate: index % 2 === 0 ? -3 : 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.4, type: 'spring' }}
              className="relative"
            >
              {/* Decorative elements around card */}
              <motion.div
                className="absolute -top-4 -left-4 text-accent"
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              >
                <Star className="w-8 h-8 fill-current" />
              </motion.div>
              <motion.div
                className="absolute -top-3 -right-3 text-primary"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              >
                <Heart className="w-7 h-7 fill-current" />
              </motion.div>

              {/* Paper Card */}
              <motion.div
                className="relative bg-gradient-to-br from-card via-card to-secondary/20 p-6 md:p-8 rounded-2xl shadow-2xl border-2 border-primary/20 overflow-hidden"
                style={{
                  transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)`,
                }}
                whileHover={{ scale: 1.02, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Heart
                      key={i}
                      className="absolute w-10 h-10 text-primary"
                      style={{
                        left: `${(i % 4) * 30}%`,
                        top: `${Math.floor(i / 4) * 35}%`,
                        transform: `rotate(${i * 25}deg)`,
                      }}
                    />
                  ))}
                </div>

                {/* Tape Effect */}
                <motion.div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-7 bg-gradient-to-r from-accent/70 via-accent/90 to-accent/70 rounded-sm shadow-sm"
                  style={{
                    transform: `translateX(-50%) rotate(${index % 2 === 0 ? 4 : -4}deg)`,
                  }}
                  whileHover={{ scale: 1.1 }}
                />

                {/* Decorative Corner Gift */}
                <motion.div
                  className="absolute top-4 right-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Gift className="w-6 h-6 text-primary/40" />
                </motion.div>

                <div className="relative z-10">
                  <motion.h3
                    className="text-xl md:text-2xl font-serif font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6 mt-3 flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 + index * 0.4 }}
                  >
                    <Sparkles className="w-5 h-5 text-primary" />
                    {message.title}
                    <Sparkles className="w-5 h-5 text-primary" />
                  </motion.h3>
                  
                  <motion.div
                    className="font-serif text-foreground/90 leading-relaxed whitespace-pre-line text-sm md:text-base"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.7 + index * 0.4 }}
                  >
                    {message.content}
                  </motion.div>

                  {/* Bottom Decoration */}
                  <motion.div
                    className="flex items-center justify-center gap-3 mt-8 pt-6 border-t border-primary/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.9 + index * 0.4 }}
                  >
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <Heart className="w-5 h-5 text-primary fill-primary" />
                    </motion.div>
                    <span className="text-sm text-muted-foreground font-serif italic">
                      With all my love, Ejaa
                    </span>
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}>
                      <Heart className="w-5 h-5 text-primary fill-primary" />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Paper Shadow */}
              <div
                className="absolute inset-0 bg-foreground/10 rounded-2xl -z-10"
                style={{
                  transform: `rotate(${index % 2 === 0 ? -1.5 : 1.5}deg) translate(6px, 6px)`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="text-center mt-16 mb-10"
        >
          <motion.div
            className="inline-flex flex-col items-center gap-4 bg-gradient-to-r from-card via-secondary/50 to-card px-8 py-6 rounded-3xl border-2 border-primary/20 shadow-xl"
          >
            <motion.div
              className="flex items-center gap-3"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-7 h-7 text-accent" />
              </motion.div>
              <span className="font-serif text-xl md:text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold">
                I Love You So Much, Lisa
              </span>
              <motion.div
                animate={{ rotate: [0, -15, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-7 h-7 text-accent" />
              </motion.div>
            </motion.div>
            
            <div className="flex items-center gap-2">
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    y: [0, -5, 0]
                  }}
                  transition={{ 
                    delay: i * 0.1, 
                    duration: 1.2, 
                    repeat: Infinity 
                  }}
                >
                  <Heart className={`w-${4 + (i === 3 ? 2 : 0)} h-${4 + (i === 3 ? 2 : 0)} text-primary fill-primary`} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};