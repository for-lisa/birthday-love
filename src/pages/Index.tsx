import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { QRScanner } from '@/components/QRScanner';
import { QuizPage } from '@/components/QuizPage';
import { GiftConfirmation } from '@/components/GiftConfirmation';
import { CelebrationPage } from '@/components/CelebrationPage';

type PageState = 'scanner' | 'quiz' | 'confirmation' | 'celebration';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<PageState>('scanner');

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {currentPage === 'scanner' && (
          <QRScanner
            key="scanner"
            onSuccess={() => setCurrentPage('quiz')}
          />
        )}
        {currentPage === 'quiz' && (
          <QuizPage
            key="quiz"
            onSuccess={() => setCurrentPage('confirmation')}
          />
        )}
        {currentPage === 'confirmation' && (
          <GiftConfirmation
            key="confirmation"
            onConfirm={() => setCurrentPage('celebration')}
          />
        )}
        {currentPage === 'celebration' && (
          <CelebrationPage key="celebration" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
