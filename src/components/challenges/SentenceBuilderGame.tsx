import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  RotateCcw, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ChevronRight, 
  Trophy,
  Layers,
  BookOpen
} from 'lucide-react';
import { SENTENCE_BUILDER_ROUNDS } from '../../data/challengeData';
import { 
  getLocalChallengeProgress, 
  recordRoundOutcome 
} from '../../utils/challengeStorage';
import { UserProfile } from '../../types';
import confetti from 'canvas-confetti';

interface SentenceBuilderGameProps {
  currentUser: UserProfile;
  onBack: () => void;
  onScoreUpdated: () => void;
}

export const SentenceBuilderGame: React.FC<SentenceBuilderGameProps> = ({
  currentUser,
  onBack,
  onScoreUpdated,
}) => {
  const [currentRoundIdx, setCurrentRoundIdx] = useState<number>(0);
  const round = SENTENCE_BUILDER_ROUNDS[currentRoundIdx];

  // Selected pieces in order placed by student
  const [placedPieces, setPlacedPieces] = useState<string[]>([]);
  // Remaining pool pieces
  const [availablePieces, setAvailablePieces] = useState<string[]>([]);

  // States
  const [usedHint, setUsedHint] = useState<boolean>(false);
  const [showHintModal, setShowHintModal] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    status: 'idle' | 'success' | 'incorrect';
    message?: string;
    pointsEarned?: number;
    isDuplicate?: boolean;
  }>({ status: 'idle' });

  // Load progress
  const [progress, setProgress] = useState(() => getLocalChallengeProgress(currentUser.id));

  // Initialize round pieces
  useEffect(() => {
    // Shuffle pieces for fair play
    const shuffled = [...round.pieces].sort(() => Math.random() - 0.5);
    setAvailablePieces(shuffled);
    setPlacedPieces([]);
    setUsedHint(false);
    setShowHintModal(false);
    setEvaluationResult({ status: 'idle' });
  }, [currentRoundIdx, round]);

  const handlePlacePiece = (piece: string, indexInAvailable: number) => {
    if (evaluationResult.status === 'success') return;
    const newAvailable = [...availablePieces];
    newAvailable.splice(indexInAvailable, 1);
    setAvailablePieces(newAvailable);
    setPlacedPieces([...placedPieces, piece]);
    if (evaluationResult.status === 'incorrect') {
      setEvaluationResult({ status: 'idle' });
    }
  };

  const handleReturnPiece = (piece: string, indexInPlaced: number) => {
    if (evaluationResult.status === 'success') return;
    const newPlaced = [...placedPieces];
    newPlaced.splice(indexInPlaced, 1);
    setPlacedPieces(newPlaced);
    setAvailablePieces([...availablePieces, piece]);
    if (evaluationResult.status === 'incorrect') {
      setEvaluationResult({ status: 'idle' });
    }
  };

  const handleResetPieces = () => {
    const shuffled = [...round.pieces].sort(() => Math.random() - 0.5);
    setAvailablePieces(shuffled);
    setPlacedPieces([]);
    setEvaluationResult({ status: 'idle' });
  };

  const handleUseHint = () => {
    setUsedHint(true);
    setShowHintModal(true);
  };

  const handleCheckSentence = () => {
    if (placedPieces.length === 0) return;

    const assembledString = placedPieces.join(' ').replace(/\s+([,.:!?])/g, '$1').trim();
    
    // Normalization check against valid patterns
    const normalize = (s: string) => s.toLowerCase().replace(/[,.:!?]/g, '').replace(/\s+/g, ' ').trim();
    const assembledNormalized = normalize(assembledString);

    const isMatch = round.validSentences.some(valid => {
      return normalize(valid) === assembledNormalized;
    });

    if (isMatch) {
      // Record score
      const result = recordRoundOutcome({
        userId: currentUser.id,
        gameId: 'sentence-builder',
        roundId: round.id,
        isCorrect: true,
        usedHint: usedHint
      });

      setEvaluationResult({
        status: 'success',
        pointsEarned: result.pointsAwarded,
        isDuplicate: result.isDuplicate,
        message: round.explanation
      });

      // Update state
      setProgress(result.progress);
      onScoreUpdated();

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // safe
      }
    } else {
      setEvaluationResult({
        status: 'incorrect',
        message: 'Trật tự các mảnh câu chưa thật hợp lý hoặc chưa rõ nghĩa. Em hãy thử suy nghĩ lại hoặc bấm nút "Gợi ý" để nhận trợ giúp nhé!'
      });
    }
  };

  const handleNextRound = () => {
    if (currentRoundIdx < SENTENCE_BUILDER_ROUNDS.length - 1) {
      setCurrentRoundIdx(currentRoundIdx + 1);
    }
  };

  const isCompletedRound = (roundId: string) => {
    return progress.games['sentence-builder'].completedRoundIds.includes(roundId);
  };

  const currentScoreForRound = progress.games['sentence-builder'].scoresByRound[round.id] || 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-3xl border border-emerald-200/80 shadow-xs">
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
              <span className="text-xl">🌉</span>
              <h1 className="font-heading font-extrabold text-lg sm:text-xl text-slate-800">
                Xây Câu Thần Tốc
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                Vòng {round.roundNumber}/{SENTENCE_BUILDER_ROUNDS.length}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Chủ đề: {round.theme} • {round.title}
            </p>
          </div>
        </div>

        {/* Current Round Score & Global Points */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-slate-500 block font-medium">Điểm trò chơi</span>
            <span className="text-base font-extrabold text-emerald-600">
              {progress.games['sentence-builder'].totalPoints} / 60 điểm
            </span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 font-bold">
            <Trophy className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Rounds Selector Pills */}
      <div className="bg-emerald-50/60 p-2.5 sm:p-3 rounded-2xl border border-emerald-200 flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-bold text-emerald-900 shrink-0 ml-1">
          Chọn vòng:
        </span>
        {SENTENCE_BUILDER_ROUNDS.map((r, idx) => {
          const isCurrent = idx === currentRoundIdx;
          const completed = isCompletedRound(r.id);
          const score = progress.games['sentence-builder'].scoresByRound[r.id] || 0;

          return (
            <button
              key={r.id}
              onClick={() => setCurrentRoundIdx(idx)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isCurrent
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20 scale-105'
                  : completed
                  ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200 border border-emerald-300'
                  : 'bg-white text-slate-600 hover:bg-emerald-50 border border-slate-200'
              }`}
            >
              <span>Vòng {r.roundNumber}</span>
              {completed && (
                <span className="text-[10px] font-extrabold bg-emerald-700 text-emerald-100 px-1 rounded">
                  {score}đ
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Mission Card */}
      <div className="bg-white rounded-3xl border border-emerald-200 shadow-sm p-6 sm:p-7 space-y-6">
        {/* Mission Briefing */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-emerald-100">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md">
              Nhiệm vụ vòng {round.roundNumber}
            </span>
            <h2 className="text-lg font-bold text-slate-800 mt-2">
              Hãy ghép các mảnh từ bên dưới thành một câu văn hoàn chỉnh, giàu hình ảnh!
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Nhấn vào mảnh từ để đưa lên cầu hoặc nhấn lại vào mảnh trên cầu để đưa về giỏ.
            </p>
          </div>

          {currentScoreForRound > 0 && (
            <div className="shrink-0 bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-xl text-center">
              <span className="text-[10px] font-bold text-emerald-800 block">Đã đạt vòng này</span>
              <span className="text-sm font-extrabold text-emerald-700">+{currentScoreForRound} điểm</span>
            </div>
          )}
        </div>

        {/* The Construction Zone (The Bridge) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5 text-emerald-800">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Cầu nối câu văn của em:</span>
            </span>
            {placedPieces.length > 0 && evaluationResult.status !== 'success' && (
              <button
                onClick={handleResetPieces}
                className="text-slate-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer transition-colors"
                title="Làm lại từ đầu vòng này"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm lại</span>
              </button>
            )}
          </div>

          <div className="min-h-[110px] p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50/50 via-teal-50/40 to-emerald-50/50 border-2 border-dashed border-emerald-300 flex flex-wrap items-center gap-2.5 transition-all">
            {placedPieces.length === 0 ? (
              <div className="w-full text-center py-4 text-slate-400 text-xs italic">
                Chạm vào các mảnh từ vựng bên dưới để xếp lên nhịp cầu này nhé...
              </div>
            ) : (
              placedPieces.map((piece, idx) => (
                <button
                  key={`placed-${idx}`}
                  onClick={() => handleReturnPiece(piece, idx)}
                  disabled={evaluationResult.status === 'success'}
                  className="px-4 py-2.5 rounded-xl bg-white text-emerald-950 font-bold text-sm sm:text-base border-2 border-emerald-400 shadow-sm hover:border-rose-400 hover:bg-rose-50 transition-all cursor-pointer flex items-center gap-1.5 group animate-in zoom-in-95 duration-150"
                  title="Nhấn để gỡ mảnh này"
                >
                  <span>{piece}</span>
                  <span className="text-slate-300 group-hover:text-rose-500 text-xs font-normal">
                    ✕
                  </span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Word Bank / Pieces Pool */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-700">
            <span>Các mảnh từ ngữ có sẵn:</span>
          </div>

          <div className="min-h-[80px] p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center gap-2.5">
            {availablePieces.length === 0 ? (
              <div className="w-full text-center py-2 text-emerald-700 font-semibold text-xs flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Em đã đưa hết tất cả mảnh lên cầu! Hãy bấm "Kiểm tra câu" nhé.</span>
              </div>
            ) : (
              availablePieces.map((piece, idx) => (
                <button
                  key={`available-${idx}`}
                  onClick={() => handlePlacePiece(piece, idx)}
                  disabled={evaluationResult.status === 'success'}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-500 hover:text-white text-slate-800 font-bold text-sm sm:text-base border border-slate-300 hover:border-emerald-600 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  {piece}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Evaluation Banner (Success or Retry) */}
        {evaluationResult.status === 'success' && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-3 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-md">
                ✓
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-base text-emerald-900">
                  Chúc mừng em! Câu văn chuẩn xác và rất giàu cảm xúc!
                </h4>
                <p className="text-xs font-semibold text-emerald-700">
                  {evaluationResult.pointsEarned! > 0
                    ? `+${evaluationResult.pointsEarned} điểm tích lũy vào kho báu!`
                    : evaluationResult.isDuplicate
                    ? 'Em đã hoàn thành xuất sắc vòng này trước đó!'
                    : 'Tuyệt vời!'}
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-700 leading-relaxed bg-white/80 p-3.5 rounded-xl border border-emerald-200">
              <p className="font-semibold text-emerald-950 mb-1">💡 Vì sao câu văn này đúng và hay:</p>
              <p>{round.explanation}</p>
              <p className="mt-1.5 text-emerald-800 font-medium italic">
                {round.grammaticalTip}
              </p>
            </div>
          </div>
        )}

        {evaluationResult.status === 'incorrect' && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-3 animate-in fade-in duration-150">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-950 space-y-1">
              <p className="font-bold text-amber-900">Chưa đúng trật tự câu:</p>
              <p>{evaluationResult.message}</p>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleUseHint}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                usedHint
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-white hover:bg-amber-50 text-amber-800 border-amber-300'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>{usedHint ? 'Đã xem gợi ý (Tối đa 5đ)' : 'Gợi ý cô giáo'}</span>
            </button>

            <button
              onClick={handleResetPieces}
              disabled={evaluationResult.status === 'success'}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 disabled:opacity-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xếp lại</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            {evaluationResult.status !== 'success' ? (
              <button
                onClick={handleCheckSentence}
                disabled={placedPieces.length === 0}
                className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Kiểm tra câu</span>
              </button>
            ) : (
              currentRoundIdx < SENTENCE_BUILDER_ROUNDS.length - 1 ? (
                <button
                  onClick={handleNextRound}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Qua Vòng {round.roundNumber + 1}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onBack}
                  className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Trophy className="w-4 h-4" />
                  <span>Hoàn thành xuất sắc 6 Vòng!</span>
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Hint Modal */}
      {showHintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-amber-200 shadow-xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-amber-700">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-xl">
                💡
              </div>
              <h3 className="font-heading font-extrabold text-base text-slate-800">
                Gợi ý của Cô giáo
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-slate-700 leading-relaxed space-y-2">
              <p className="font-bold text-amber-900">Mẹo sắp xếp:</p>
              <p>{round.hint}</p>
              <p className="text-amber-800 italic pt-1 border-t border-amber-200">
                Lưu ý: Khi sử dụng gợi ý, điểm tối đa cho vòng chơi này là 5 điểm.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowHintModal(false)}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs cursor-pointer transition-colors"
              >
                Đã hiểu, em thử lại!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
