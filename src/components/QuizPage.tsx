import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Unlock, Sparkles, ChevronRight, Key, Star, PartyPopper, Gift, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import confetti from 'canvas-confetti';

interface QuizPageProps {
  onSuccess: () => void;
}

interface Question {
  id: number;
  question: string;
  hint: string;
  answer: string;
  pinDigit: string;
}

// Default questions (fallback if no localStorage data)
const defaultQuestions: Question[] = [
  {
    id: 1,
    question: 'Bulan apa kita jadian?',
    hint: 'Bulan ke berapa dalam setahun?',
    answer: '1',
    pinDigit: '1',
  },
  {
    id: 2,
    question: 'Tanggal berapa kita jadian?',
    hint: 'Tanggal spesial kita...',
    answer: '4',
    pinDigit: '4',
  },
  {
    id: 3,
    question: 'Tahun berapa kita jadian? (2 digit terakhir)',
    hint: 'Tahun 20XX...',
    answer: '24',
    pinDigit: '2',
  },
];

// Get questions and PIN from localStorage or use defaults
const getQuestions = (): Question[] => {
  const saved = localStorage.getItem('quiz-questions');
  if (saved) {
    const parsed = JSON.parse(saved);
    return parsed.map((q: any, idx: number) => ({
      ...q,
      pinDigit: q.answer.charAt(0) || String(idx + 1),
    }));
  }
  return defaultQuestions;
};

const getPadlockPin = (): string => {
  return localStorage.getItem('quiz-pin') || '142';
};

const FloatingElement = ({ delay, left, icon: Icon }: { delay: number; left: number; icon: React.ElementType }) => (
  <motion.div
    className="absolute text-primary/30"
    style={{ left: `${left}%` }}
    initial={{ y: '100vh', opacity: 0, scale: 0 }}
    animate={{ 
      y: '-10vh', 
      opacity: [0, 0.5, 0.5, 0],
      scale: [0.5, 1, 1, 0.5],
    }}
    transition={{
      duration: 8 + Math.random() * 4,
      delay,
      repeat: Infinity,
      ease: 'easeOut',
    }}
  >
    <Icon className="w-6 h-6 fill-current" />
  </motion.div>
);

export const QuizPage = ({ onSuccess }: QuizPageProps) => {
  const [questions] = useState<Question[]>(getQuestions);
  const [padlockPin] = useState<string>(getPadlockPin);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [showCorrect, setShowCorrect] = useState(false);

  const handleAnswerSubmit = () => {
    const question = questions[currentQuestion];
    if (currentAnswer.toLowerCase().trim() === question.answer.toLowerCase()) {
      setShowCorrect(true);
      setCurrentAnswer('');
      setError('');

      setTimeout(() => {
        setShowCorrect(false);
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          // Semua quiz selesai, tampilkan PIN gembok
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#ec4899', '#f472b6', '#fda4af', '#fecdd3', '#fbbf24'],
          });
          setShowPin(true);
        }
      }, 800);
    } else {
      setError('Jawaban salah, coba lagi!');
    }
  };

  const handleContinue = () => {
    onSuccess();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background via-secondary/20 to-background relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <FloatingElement key={`star-${i}`} delay={i * 0.7} left={5 + i * 18} icon={Star} />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <FloatingElement key={`heart-${i}`} delay={i * 0.9 + 0.3} left={10 + i * 20} icon={Heart} />
        ))}
      </div>

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-32 left-5 w-24 h-24 bg-primary/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-32 right-5 w-32 h-32 bg-accent/20 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.15, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <AnimatePresence mode="wait">
        {showCorrect && (
          <motion.div
            key="correct-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
              >
                <Star className="w-20 h-20 text-accent fill-accent" />
              </motion.div>
              <p className="text-2xl font-serif font-bold text-foreground">Benar!</p>
            </motion.div>
          </motion.div>
        )}

        {showPin ? (
          <motion.div
            key="pin-reveal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md flex flex-col items-center gap-6 text-center relative z-10"
          >
            <motion.div
              initial={{ rotate: -20, scale: 0 }}
              animate={{ rotate: [0, 15, -15, 0], scale: 1 }}
              transition={{ rotate: { repeat: 3, duration: 0.5 }, scale: { type: 'spring' } }}
              className="relative"
            >
              <Unlock className="w-20 h-20 text-primary drop-shadow-lg" />
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Sparkles className="w-8 h-8 text-accent" />
              </motion.div>
            </motion.div>

            <div className="space-y-2">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-2"
              >
                <PartyPopper className="w-6 h-6 text-accent" />
                <h2 className="text-3xl font-serif font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  YEAYYYYYYYY!
                </h2>
                <PartyPopper className="w-6 h-6 text-accent" style={{ transform: 'scaleX(-1)' }} />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground"
              >
                Yeyeayyyyy, Kamu sudaa menjawab semua teka-teki nya!
              </motion.p>
            </div>

            <motion.div
              initial={{ scale: 0, rotateY: 90 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="bg-gradient-to-br from-card via-card to-secondary/30 rounded-3xl p-8 shadow-2xl border-2 border-primary/30 w-full relative overflow-hidden"
            >
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-5">
                {Array.from({ length: 20 }).map((_, i) => (
                  <Heart
                    key={i}
                    className="absolute w-8 h-8 text-primary"
                    style={{
                      left: `${(i % 5) * 25}%`,
                      top: `${Math.floor(i / 5) * 30}%`,
                      transform: `rotate(${i * 15}deg)`,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <motion.div
                  className="flex items-center justify-center gap-2 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Lock className="w-5 h-5 text-primary" />
                  <Key className="w-6 h-6 text-primary" />
                  <span className="text-base font-semibold text-foreground">
                    PIN Gembok
                  </span>
                  <Key className="w-6 h-6 text-primary" style={{ transform: 'scaleX(-1)' }} />
                  <Lock className="w-5 h-5 text-primary" />
                </motion.div>

                <div className="flex justify-center gap-4">
                  {padlockPin.split('').map((digit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30, rotateX: 90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ delay: 0.7 + index * 0.25, type: 'spring' }}
                      className="relative"
                    >
                      <motion.div
                        className="w-20 h-24 bg-gradient-to-b from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center border-3 border-primary shadow-lg shadow-primary/20"
                        animate={{ boxShadow: ['0 0 20px hsl(var(--primary) / 0.2)', '0 0 40px hsl(var(--primary) / 0.4)', '0 0 20px hsl(var(--primary) / 0.2)'] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      >
                        <span className="text-5xl font-bold text-primary drop-shadow-sm">
                          {digit}
                        </span>
                      </motion.div>
                      <motion.div
                        className="absolute -top-1 -right-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.2 + index * 0.2 }}
                      >
                        <Star className="w-5 h-5 text-accent fill-accent" />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="flex items-center justify-center gap-2 mt-6 text-muted-foreground"
                >
                  <Gift className="w-5 h-5 text-primary" />
                  <p className="text-sm">
                    Pake PIN ini buat buka gembok yang ada di tas yaa!
                  </p>
                  <Gift className="w-5 h-5 text-primary" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleContinue}
                size="lg"
                className="px-8 py-6 text-lg bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/30"
              >
                <Heart className="w-5 h-5 mr-2 fill-current" />
                Tekan akuuuuuuu^_^
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-md flex flex-col items-center gap-6 relative z-10"
          >
            {/* Progress indicator */}
            <motion.div
              className="flex items-center gap-3 bg-card/50 backdrop-blur-sm px-6 py-3 rounded-full border border-border"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {questions.map((_, idx) => (
                <motion.div
                  key={idx}
                  className="relative"
                  animate={idx === currentQuestion ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      idx < currentQuestion
                        ? 'bg-primary text-primary-foreground'
                        : idx === currentQuestion
                        ? 'bg-primary/30 text-primary border-2 border-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {idx < currentQuestion ? (
                      <Star className="w-5 h-5 fill-current" />
                    ) : (
                      idx + 1
                    )}
                  </div>
                  {idx < questions.length - 1 && (
                    <div
                      className={`absolute top-1/2 left-full w-3 h-0.5 -translate-y-1/2 ${
                        idx < currentQuestion ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="w-full bg-gradient-to-br from-card via-card to-secondary/20 rounded-3xl p-6 md:p-8 shadow-xl border-2 border-primary/20 relative overflow-hidden"
              initial={{ y: 20, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              whileHover={{ scale: 1.01 }}
            >
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <motion.div
                    className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sparkles className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div className="flex-1">
                    <h2 className="text-lg font-serif font-bold text-primary mb-1">
                      Teka-teki #{currentQuestion + 1}
                    </h2>
                    <p className="text-xl font-serif font-semibold text-foreground leading-relaxed">
                      {questions[currentQuestion].question}
                    </p>
                  </div>
                </div>

                <motion.div
                  className="flex items-center gap-2 text-muted-foreground text-sm mb-6 bg-secondary/50 px-4 py-3 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Star className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>Petunjuk: {questions[currentQuestion].hint}</span>
                </motion.div>

                <div className="space-y-4">
                  <Input
                    type="text"
                    value={currentAnswer}
                    onChange={(e) => {
                      setCurrentAnswer(e.target.value);
                      setError('');
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleAnswerSubmit()}
                    placeholder="Tulis jawabanmu disini..."
                    className="text-lg py-6 bg-background/80 border-2 border-primary/30 focus:border-primary rounded-xl placeholder:text-muted-foreground/60"
                  />

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 px-4 py-3 rounded-xl border border-destructive/30"
                      >
                        <Heart className="w-4 h-4" />
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={handleAnswerSubmit}
                      className="w-full py-6 text-lg bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 rounded-xl shadow-lg shadow-primary/20"
                    >
                      Jawab
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-muted-foreground text-center flex items-center gap-2"
            >
              <Key className="w-4 h-4 text-primary" />
              Jawab semua teka-teki untuk mendapatkan PIN gembok
              <Key className="w-4 h-4 text-primary" />
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};