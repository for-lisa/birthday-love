import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Question {
  id: number;
  question: string;
  hint: string;
  answer: string;
}

const defaultQuestions: Question[] = [
  {
    id: 1,
    question: 'Bulan apa kita jadian?',
    hint: 'Bulan ke berapa dalam setahun?',
    answer: '1',
  },
  {
    id: 2,
    question: 'Tanggal berapa kita jadian?',
    hint: 'Tanggal spesial kita...',
    answer: '4',
  },
  {
    id: 3,
    question: 'Tahun berapa kita jadian? (2 digit terakhir)',
    hint: 'Tahun 20XX...',
    answer: '24',
  },
];

const QuizSettings = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem('quiz-questions');
    return saved ? JSON.parse(saved) : defaultQuestions;
  });
  const [correctPin, setCorrectPin] = useState(() => {
    return localStorage.getItem('quiz-pin') || '142';
  });
  const [saved, setSaved] = useState(false);

  const updateQuestion = (id: number, field: keyof Question, value: string) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const addQuestion = () => {
    const newId = Math.max(...questions.map((q) => q.id)) + 1;
    setQuestions([
      ...questions,
      { id: newId, question: '', hint: '', answer: '' },
    ]);
  };

  const removeQuestion = (id: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const handleSave = () => {
    localStorage.setItem('quiz-questions', JSON.stringify(questions));
    localStorage.setItem('quiz-pin', correctPin);
    setSaved(true);
    toast.success('Pengaturan berhasil disimpan!');
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background p-4 md:p-8"
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-serif font-bold text-foreground">
            Pengaturan Quiz
          </h1>
        </div>

        <div className="space-y-6">
          {/* PIN Setting */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <Label className="text-foreground font-medium">PIN yang Benar</Label>
            <Input
              value={correctPin}
              onChange={(e) => setCorrectPin(e.target.value)}
              placeholder="Masukkan PIN"
              className="mt-2 bg-background border-border"
            />
            <p className="text-xs text-muted-foreground mt-2">
              PIN gembok fisik yang akan ditampilkan setelah quiz selesai (bebas diatur, tidak harus sama dengan jawaban)
            </p>
          </div>

          {/* Questions */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Pertanyaan</h2>
            
            {questions.map((q, index) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card p-6 rounded-lg border border-border space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">
                    Pertanyaan #{index + 1}
                  </span>
                  {questions.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeQuestion(q.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <Label className="text-foreground text-sm">Pertanyaan</Label>
                    <Input
                      value={q.question}
                      onChange={(e) =>
                        updateQuestion(q.id, 'question', e.target.value)
                      }
                      placeholder="Tulis pertanyaan..."
                      className="mt-1 bg-background border-border"
                    />
                  </div>

                  <div>
                    <Label className="text-foreground text-sm">Petunjuk</Label>
                    <Input
                      value={q.hint}
                      onChange={(e) =>
                        updateQuestion(q.id, 'hint', e.target.value)
                      }
                      placeholder="Tulis petunjuk..."
                      className="mt-1 bg-background border-border"
                    />
                  </div>

                  <div>
                    <Label className="text-foreground text-sm">Jawaban</Label>
                    <Input
                      value={q.answer}
                      onChange={(e) =>
                        updateQuestion(q.id, 'answer', e.target.value)
                      }
                      placeholder="Jawaban yang benar..."
                      className="mt-1 bg-background border-border"
                    />
                  </div>
                </div>
              </motion.div>
            ))}

            <Button
              variant="outline"
              onClick={addQuestion}
              className="w-full border-dashed border-border hover:bg-secondary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Pertanyaan
            </Button>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Save className="w-4 h-4 mr-2" />
            {saved ? 'Tersimpan!' : 'Simpan Pengaturan'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuizSettings;
