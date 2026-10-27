import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Crown, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ChevronRight, 
  Trophy,
  Clock,
  Volume2,
  Eye,
  Info
} from 'lucide-react';
import { VIVID_WORD_CHALLENGES } from '../../data/challengeData';
import { 
  getLocalChallengeProgress, 
  recordRoundOutcome 
} from '../../utils/challengeStorage';
import { UserProfile } from '../../types';
import confetti from 'canvas-confetti';

interface VividWordsGameProps {
  currentUser: UserProfile;
  onBack: () => void;
  onScoreUpdated: () => void;
}

export const VividWordsGame: React.FC<VividWordsGameProps> = ({
  currentUser,
  onBack,
  onScoreUpdated,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const challenge = VIVID_WORD_CHALLENGES[currentIdx];

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [usedHint, setUsedHint] = useState<boolean>(false);
  const [showHintModal, setShowHintModal] = useState<boolean>(false);

  // Optional Timer feature (off by default or user toggleable, zero stress)
  const [timerEnabled, setTimerEnabled] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);

  const [evaluationResult, setEvaluationResult] = useState<{
    status: 'idle' | 'success' | 'incorrect';
    pointsEarned?: number;
    isDuplicate?: boolean;
  }>({ status: 'idle' });

  const [progress, setProgress] = useState(() => getLocalChallengeProgress(currentUser.id));

  // Reset per challenge
  useEffect(() => {
    setSelectedOptionId(null);
    setUsedHint(false);
    setShowHintModal(false);
    setEvaluationResult({ status: 'idle' });
    setTimeLeft(30);
  }, [currentIdx, challenge]);

  // Optional countdown effect (only ticks if enabled and not solved)
  useEffect(() => {
    if (!timerEnabled || evaluationResult.status === 'success' || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [timerEnabled, evaluationResult.status, timeLeft]);

  const handleSelectOption = (optId: string) => {
    if (evaluationResult.status === 'success') return;
    setSelectedOptionId(optId);
    if (evaluationResult.status === 'incorrect') {
      setEvaluationResult({ status: 'idle' });
    }
  };

  const handleUseHint = () => {
    setUsedHint(true);
    setShowHintModal(true);
  };

  const handleSubmitChoice = () => {
    if (!selectedOptionId) return;

    const chosenOption = challenge.options.find(o => o.id === selectedOptionId);
    if (!chosenOption) return;

    if (chosenOption.isBest) {
      const outcome = recordRoundOutcome({
        userId: currentUser.id,
        gameId: 'vivid-words',
        roundId: challenge.id,
        isCorrect: true,
        usedHint: usedHint
      });

      setEvaluationResult({
        status: 'success',
        pointsEarned: outcome.pointsAwarded,
        isDuplicate: outcome.isDuplicate
      });

      setProgress(outcome.progress);
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
        status: 'incorrect'
      });
    }
  };

  const handleNextChallenge = () => {
    if (currentIdx < VIVID_WORD_CHALLENGES.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const isChallengeDone = (id: string) => {
    return progress.games['vivid-words'].completedRoundIds.includes(id);
  };

  const currentScore = progress.games['vivid-words'].scoresByRound[challenge.id] || 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-3xl border border-amber-200/80 shadow-xs">
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
              <span className="text-xl">👑</span>
              <h1 className="font-heading font-extrabold text-lg sm:text-xl text-slate-800">
                Vua Từ Láy & Từ Gợi Cảm
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-300">
                Thách đấu {challenge.challengeNumber}/{VIVID_WORD_CHALLENGES.length}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Chủ đề: <strong className="text-amber-700">{challenge.category}</strong> • {challenge.title}
            </p>
          </div>
        </div>

        {/* Global Points & Optional Timer Toggle */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-2xl border border-amber-200">
            <button
              onClick={() => setTimerEnabled(!timerEnabled)}
              className="text-xs font-semibold text-slate-700 hover:text-amber-700 flex items-center gap-1.5 cursor-pointer"
              title="Bật/Tắt đồng hồ thử thách thư giãn"
            >
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>{timerEnabled ? `${timeLeft}s` : 'Bật đếm giờ'}</span>
            </button>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-500 block font-medium">Điểm vương miện</span>
            <span className="text-base font-extrabold text-amber-600">
              {progress.games['vivid-words'].totalPoints} / 60 điểm
            </span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 font-bold">
            <Crown className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Challenges Selector Pills */}
      <div className="bg-amber-50/60 p-2.5 sm:p-3 rounded-2xl border border-amber-200 flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-bold text-amber-900 shrink-0 ml-1">
          Các thách đấu:
        </span>
        {VIVID_WORD_CHALLENGES.map((ch, idx) => {
          const isCurrent = idx === currentIdx;
          const completed = isChallengeDone(ch.id);
          const score = progress.games['vivid-words'].scoresByRound[ch.id] || 0;

          return (
            <button
              key={ch.id}
              onClick={() => setCurrentIdx(idx)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isCurrent
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25 scale-105'
                  : completed
                  ? 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
                  : 'bg-white text-slate-600 hover:bg-amber-50 border border-slate-200'
              }`}
            >
              <span>Thách đấu {ch.challengeNumber}</span>
              {completed && (
                <span className="text-[10px] font-extrabold bg-amber-700 text-amber-100 px-1 rounded">
                  {score}đ
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Challenge Arena */}
      <div className="bg-white rounded-3xl border border-amber-200 shadow-sm p-6 sm:p-7 space-y-6">
        {/* Prompt Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-amber-100">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded-md">
              Thách đấu #{challenge.challengeNumber} • Miêu tả {challenge.category}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-800 mt-2">
              {challenge.prompt}
            </h2>
          </div>

          {currentScore > 0 && (
            <div className="shrink-0 bg-amber-50 border border-amber-300 px-3 py-1.5 rounded-xl text-center">
              <span className="text-[10px] font-bold text-amber-800 block">Đã ghi điểm</span>
              <span className="text-sm font-extrabold text-amber-700">+{currentScore} điểm</span>
            </div>
          )}
        </div>

        {/* Sentence Context with Gap */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-50/70 via-orange-50/50 to-amber-50/70 border-2 border-amber-300/80 shadow-2xs space-y-2">
          <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Ngữ cảnh câu văn cần điền từ:</span>
          </div>

          <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-serif">
            {challenge.sentenceContext.split('[...]')[0]}
            <span className="inline-block px-3 py-1 rounded-xl bg-white border-2 border-dashed border-amber-400 text-amber-900 font-bold mx-1 shadow-inner">
              {selectedOptionId 
                ? challenge.options.find(o => o.id === selectedOptionId)?.word 
                : '... ? ...'}
            </span>
            {challenge.sentenceContext.split('[...]')[1]}
          </p>
        </div>

        {/* 4 Choices Grid */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-700">
            Chọn từ ngữ đắt giá nhất trong 4 phương án sau:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {challenge.options.map((option, idx) => {
              const isSelected = selectedOptionId === option.id;
              const isSuccess = evaluationResult.status === 'success';

              let cardStyle = 'bg-white text-slate-800 border-slate-200 hover:border-amber-400 hover:bg-amber-50/40';
              if (isSelected) {
                cardStyle = 'bg-amber-50 text-amber-950 border-2 border-amber-500 shadow-sm';
              }
              if (isSuccess && option.isBest) {
                cardStyle = 'bg-emerald-50 text-emerald-950 border-2 border-emerald-500 shadow-sm';
              }

              const letters = ['A', 'B', 'C', 'D'];

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  disabled={isSuccess}
                  className={`p-4 rounded-2xl border text-left font-bold transition-all flex flex-col justify-between cursor-pointer space-y-2 ${cardStyle}`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                        isSelected ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {letters[idx]}
                      </span>
                      <span className="text-base sm:text-lg">{option.word}</span>
                    </div>

                    {isSuccess && option.isBest && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        Từ đắt giá nhất
                      </span>
                    )}
                  </div>

                  {/* Nuance preview on solved */}
                  {isSuccess && (
                    <p className="text-[11px] text-slate-600 font-normal leading-relaxed border-t border-slate-200/60 pt-1.5">
                      {option.nuance}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Feedback & Semantic Nuance on Success */}
        {evaluationResult.status === 'success' && (
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 space-y-3 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-md">
                👑
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-base text-amber-950">
                  Xứng danh Vua Từ Ngữ! Lựa chọn hoàn hảo!
                </h4>
                <p className="text-xs font-semibold text-amber-700">
                  {evaluationResult.pointsEarned! > 0
                    ? `+${evaluationResult.pointsEarned} điểm tích lũy vào kho báu!`
                    : evaluationResult.isDuplicate
                    ? 'Em đã vượt qua thách đấu này từ trước!'
                    : 'Tuyệt vời!'}
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-700 leading-relaxed bg-white/90 p-4 rounded-xl border border-amber-200 space-y-2">
              <p className="font-bold text-amber-950 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-600" />
                <span>Nét đẹp văn học & Sắc thái biểu cảm của từ:</span>
              </p>
              <p>{challenge.explanation}</p>
              {challenge.openObservationTip && (
                <div className="p-2.5 rounded-lg bg-amber-100/70 border border-amber-200 text-amber-900 font-medium">
                  🌾 <strong>Mở rộng góc quan sát:</strong> {challenge.openObservationTip}
                </div>
              )}
            </div>
          </div>
        )}

        {evaluationResult.status === 'incorrect' && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 flex items-start gap-3 animate-in fade-in duration-150">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs text-rose-950 space-y-1">
              <p className="font-bold text-rose-900">Chưa phải từ đắt giá nhất cho ngữ cảnh này:</p>
              <p>Mỗi từ ngữ trong Tiếng Việt đều mang một sắc thái riêng. Em hãy thử đọc lại câu văn và chọn từ ngữ giúp người đọc hình dung rõ nét nhất nhé!</p>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={handleUseHint}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
              usedHint
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-white hover:bg-amber-50 text-amber-800 border-amber-300'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>{usedHint ? 'Đã xem gợi ý (Tối đa 5đ)' : 'Gợi ý sắc thái từ'}</span>
          </button>

          <div className="flex items-center gap-2.5">
            {evaluationResult.status !== 'success' ? (
              <button
                onClick={handleSubmitChoice}
                disabled={!selectedOptionId}
                className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Khẳng định lựa chọn</span>
              </button>
            ) : (
              currentIdx < VIVID_WORD_CHALLENGES.length - 1 ? (
                <button
                  onClick={handleNextChallenge}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Qua Thách đấu {challenge.challengeNumber + 1}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onBack}
                  className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Trophy className="w-4 h-4" />
                  <span>Hoàn thành xuất sắc 6 Thách đấu!</span>
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
                👑
              </div>
              <h3 className="font-heading font-extrabold text-base text-slate-800">
                Gợi ý Sắc thái Từ ngữ
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-slate-700 leading-relaxed space-y-2">
              <p className="font-bold text-amber-950">Mẹo tư duy từ vựng:</p>
              <p>
                Em hãy chú ý: {challenge.category === 'Âm thanh' ? 'Mưa to hay mưa nhỏ? Mưa xối xả thì âm thanh phải vang và dồn dập.' : challenge.category === 'Màu sắc' ? 'Cánh đồng ngày mùa là màu của no ấm, được mùa bội thu.' : 'Hãy nhắm mắt lại và tưởng tượng hình ảnh chân thật nhất trong đầu em.'}
              </p>
              <p className="text-amber-800 italic pt-1 border-t border-amber-200">
                Lưu ý: Sử dụng gợi ý sẽ nhận tối đa 5 điểm cho thách đấu này.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowHintModal(false)}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs cursor-pointer transition-colors"
              >
                Em đã rõ, để em chọn!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
