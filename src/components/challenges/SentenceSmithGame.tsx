import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Hammer, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ChevronRight, 
  Trophy,
  Flame,
  BookOpen,
  Send,
  Lightbulb
} from 'lucide-react';
import { SENTENCE_SMITH_LEVELS } from '../../data/challengeData';
import { 
  getLocalChallengeProgress, 
  recordRoundOutcome,
  evaluateSentenceSmith,
  SentenceSmithEvaluation
} from '../../utils/challengeStorage';
import { UserProfile } from '../../types';
import confetti from 'canvas-confetti';

interface SentenceSmithGameProps {
  currentUser: UserProfile;
  onBack: () => void;
  onScoreUpdated: () => void;
}

export const SentenceSmithGame: React.FC<SentenceSmithGameProps> = ({
  currentUser,
  onBack,
  onScoreUpdated,
}) => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(0);
  const level = SENTENCE_SMITH_LEVELS[currentLevelIdx];

  const [inputSentence, setInputSentence] = useState<string>('');
  const [usedHint, setUsedHint] = useState<boolean>(false);
  const [showHintModal, setShowHintModal] = useState<boolean>(false);

  const [evalResult, setEvalResult] = useState<SentenceSmithEvaluation | null>(null);
  const [pointsAwarded, setPointsAwarded] = useState<number>(0);
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);

  const [progress, setProgress] = useState(() => getLocalChallengeProgress(currentUser.id));

  useEffect(() => {
    setInputSentence('');
    setUsedHint(false);
    setShowHintModal(false);
    setEvalResult(null);
    setPointsAwarded(0);
    setIsDuplicate(false);
  }, [currentLevelIdx, level]);

  const handleInsertKeyword = (word: string) => {
    if (evalResult?.passed) return;
    if (!inputSentence) {
      setInputSentence(word);
    } else {
      setInputSentence(prev => prev.trim() + ' ' + word);
    }
  };

  const handleForgeSentence = () => {
    if (!inputSentence.trim()) return;

    const evaluation = evaluateSentenceSmith(level.levelNumber, inputSentence);
    setEvalResult(evaluation);

    if (evaluation.passed) {
      const outcome = recordRoundOutcome({
        userId: currentUser.id,
        gameId: 'sentence-smith',
        roundId: level.id,
        isCorrect: true,
        usedHint: usedHint || evaluation.score < 10
      });

      setPointsAwarded(outcome.pointsAwarded);
      setIsDuplicate(outcome.isDuplicate);
      setProgress(outcome.progress);
      onScoreUpdated();

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // safe
      }
    }
  };

  const handleNextLevel = () => {
    if (currentLevelIdx < SENTENCE_SMITH_LEVELS.length - 1) {
      setCurrentLevelIdx(currentLevelIdx + 1);
    }
  };

  const isLevelCompleted = (id: string) => {
    return progress.games['sentence-smith'].completedRoundIds.includes(id);
  };

  const currentScore = progress.games['sentence-smith'].scoresByRound[level.id] || 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-3xl border border-rose-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Thử thách</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">⚒️</span>
              <h1 className="font-heading font-extrabold text-lg sm:text-xl text-slate-800">
                Thợ Rèn Câu Văn
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold border border-rose-300">
                Cấp độ {level.levelNumber}/{SENTENCE_SMITH_LEVELS.length}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Chủ điểm: <strong className="text-rose-700">{level.levelName}</strong>
            </p>
          </div>
        </div>

        {/* Global Points */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-slate-500 block font-medium">Điểm nghệ nhân</span>
            <span className="text-base font-extrabold text-rose-600">
              {progress.games['sentence-smith'].totalPoints} / 40 điểm
            </span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-700 font-bold">
            <Hammer className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Levels Selector Pills */}
      <div className="bg-rose-50/60 p-2.5 sm:p-3 rounded-2xl border border-rose-200 flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-bold text-rose-900 shrink-0 ml-1">
          Các cấp độ rèn câu:
        </span>
        {SENTENCE_SMITH_LEVELS.map((lvl, idx) => {
          const isCurrent = idx === currentLevelIdx;
          const completed = isLevelCompleted(lvl.id);
          const score = progress.games['sentence-smith'].scoresByRound[lvl.id] || 0;

          return (
            <button
              key={lvl.id}
              onClick={() => setCurrentLevelIdx(idx)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isCurrent
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-500/25 scale-105'
                  : completed
                  ? 'bg-rose-100 text-rose-900 hover:bg-rose-200 border border-rose-300'
                  : 'bg-white text-slate-600 hover:bg-rose-50 border border-slate-200'
              }`}
            >
              <span>Cấp {lvl.levelNumber}</span>
              {completed && (
                <span className="text-[10px] font-extrabold bg-rose-700 text-rose-100 px-1 rounded">
                  {score}đ
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* The Blacksmith Forge Arena */}
      <div className="bg-white rounded-3xl border border-rose-200 shadow-sm p-6 sm:p-7 space-y-6">
        {/* Level Objective */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-rose-100">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2.5 py-1 rounded-md">
              {level.title}
            </span>
            <h2 className="text-lg font-bold text-slate-800 mt-2">
              {level.levelName}
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Mục tiêu: {level.targetFocus}
            </p>
          </div>

          {currentScore > 0 && (
            <div className="shrink-0 bg-rose-50 border border-rose-300 px-3 py-1.5 rounded-xl text-center">
              <span className="text-[10px] font-bold text-rose-800 block">Đã tôi luyện</span>
              <span className="text-sm font-extrabold text-rose-700">+{currentScore} điểm</span>
            </div>
          )}
        </div>

        {/* The Raw Iron Block (Original Sentence) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-rose-50/60 via-amber-50/40 to-rose-50/60 border-2 border-rose-300/80 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-900">
            <Flame className="w-4 h-4 text-rose-600" />
            <span>Mảnh câu phôi ban đầu (cần tôi luyện):</span>
          </div>

          <div className="text-xl font-bold text-slate-800 font-serif italic bg-white/80 p-3.5 rounded-xl border border-rose-200">
            "{level.originalSentence}"
          </div>

          <div className="text-xs text-rose-950 font-medium leading-relaxed bg-rose-100/60 p-3 rounded-xl border border-rose-200 flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
            <div>
              <strong>Thầy cô gợi mở tư duy:</strong> {level.guidingQuestion}
            </div>
          </div>
        </div>

        {/* Suggested Vocab Inspiration Chips */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>Nguyên liệu từ vựng gợi cảm (Chạm để mượn ý tưởng hoặc chèn vào câu):</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {level.suggestedVocab.map((w, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleInsertKeyword(w)}
                className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 text-xs font-semibold cursor-pointer transition-colors"
                title="Chạm để thêm vào bài viết"
              >
                + {w}
              </button>
            ))}
          </div>
        </div>

        {/* The Student Writing Anvil */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Câu văn mới do em rèn giũa:</span>
            <span className="text-[11px] text-slate-400 font-normal">
              {inputSentence.trim() ? `${inputSentence.trim().split(/\s+/).length} từ` : '0 từ'}
            </span>
          </div>

          <textarea
            value={inputSentence}
            onChange={(e) => {
              setInputSentence(e.target.value);
              if (evalResult && !evalResult.passed) {
                setEvalResult(null);
              }
            }}
            rows={3}
            placeholder="Gõ câu văn hoàn chỉnh, giàu hình ảnh của em vào đây (nhớ viết hoa đầu câu và có dấu chấm cuối câu nhé)..."
            className="w-full p-4 rounded-2xl border-2 border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-hidden font-medium text-slate-800 text-base sm:text-lg leading-relaxed placeholder:text-slate-400 bg-white"
          />
        </div>

        {/* Evaluation Rubric Feedback */}
        {evalResult && (
          <div className={`p-5 rounded-2xl border space-y-4 animate-in fade-in zoom-in-95 duration-200 ${
            evalResult.passed
              ? 'bg-rose-50 border-rose-300 text-rose-950'
              : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl shrink-0 shadow-md ${
                evalResult.passed ? 'bg-rose-600 text-white' : 'bg-amber-500 text-white'
              }`}>
                {evalResult.passed ? '⚒️' : '✏️'}
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-base">
                  {evalResult.passed ? 'Tôi luyện thành công tuyệt tác câu văn!' : 'Cần trau chuốt thêm một chút nữa nhé!'}
                </h4>
                <p className="text-xs font-semibold">
                  {evalResult.passed ? (
                    pointsAwarded > 0 
                      ? `+${pointsAwarded} điểm nghệ nhân câu văn!` 
                      : isDuplicate 
                      ? 'Em đã hoàn thành cấp độ này từ trước!' 
                      : 'Tuyệt vời!'
                  ) : 'Em hãy đọc các gợi ý bên dưới để hoàn thiện nhé.'}
                </p>
              </div>
            </div>

            {/* Praise and Improvements */}
            <div className="bg-white/90 p-4 rounded-xl border border-rose-200/80 text-xs text-slate-700 space-y-2 leading-relaxed">
              <p className="font-bold text-rose-950">🌟 Nhận xét sư phạm chuẩn chương trình GDPT lớp 4:</p>
              <p>{evalResult.feedbackPraise}</p>

              {evalResult.feedbackImprovements.length > 0 && (
                <div className="pt-2 border-t border-slate-200 space-y-1">
                  <p className="font-semibold text-amber-900">💡 Gợi ý hoàn thiện thêm:</p>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                    {evalResult.feedbackImprovements.map((imp, idx) => (
                      <li key={idx}>{imp}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Exemplar Model Sentences for learning */}
            {evalResult.passed && (
              <div className="p-3.5 rounded-xl bg-white/90 border border-rose-200 text-xs text-slate-700 space-y-1.5">
                <p className="font-bold text-rose-900 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Một số cách diễn đạt hay cùng chủ đề để em mở rộng vốn câu:</span>
                </p>
                <ul className="space-y-1 italic text-slate-600">
                  {level.modelResponses.map((sample, idx) => (
                    <li key={idx} className="bg-rose-50/50 p-2 rounded-lg border border-rose-100">
                      • "{sample}"
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={() => {
              setUsedHint(true);
              setShowHintModal(true);
            }}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
              usedHint
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-white hover:bg-rose-50 text-rose-800 border-rose-300'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-rose-600" />
            <span>{usedHint ? 'Đã xem gợi ý mẫu' : 'Xem câu văn mẫu'}</span>
          </button>

          <div className="flex items-center gap-2.5">
            {!evalResult?.passed ? (
              <button
                onClick={handleForgeSentence}
                disabled={!inputSentence.trim()}
                className="px-6 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 disabled:bg-slate-300 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <Hammer className="w-4 h-4" />
                <span>Rèn câu</span>
              </button>
            ) : (
              currentLevelIdx < SENTENCE_SMITH_LEVELS.length - 1 ? (
                <button
                  onClick={handleNextLevel}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Lên Cấp {level.levelNumber + 1}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onBack}
                  className="px-6 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Trophy className="w-4 h-4" />
                  <span>Hoàn thành xuất sắc 4 Cấp độ!</span>
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Hint Modal with Exemplars */}
      {showHintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-rose-200 shadow-xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-700">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center text-xl">
                ⚒️
              </div>
              <h3 className="font-heading font-extrabold text-base text-slate-800">
                Gợi ý & Câu văn mẫu lớp 4
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs text-slate-700 leading-relaxed space-y-3">
              <p className="font-bold text-rose-950">Gợi ý cách rèn câu:</p>
              <p>{level.guidingQuestion}</p>

              <div className="space-y-1.5 pt-2 border-t border-rose-200">
                <span className="font-bold text-rose-900 block">Ví dụ câu đã rèn giũa hay:</span>
                {level.modelResponses.map((res, i) => (
                  <div key={i} className="p-2 rounded-lg bg-white border border-rose-200 text-slate-700 italic">
                    • "{res}"
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowHintModal(false)}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer transition-colors"
              >
                Em đã hiểu, để em viết!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
