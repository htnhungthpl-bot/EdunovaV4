import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Search, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ChevronRight, 
  Trophy,
  FileText,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { SPELLING_CASES } from '../../data/challengeData';
import { 
  getLocalChallengeProgress, 
  recordRoundOutcome 
} from '../../utils/challengeStorage';
import { UserProfile } from '../../types';
import confetti from 'canvas-confetti';

interface SpellingDetectiveGameProps {
  currentUser: UserProfile;
  onBack: () => void;
  onScoreUpdated: () => void;
}

export const SpellingDetectiveGame: React.FC<SpellingDetectiveGameProps> = ({
  currentUser,
  onBack,
  onScoreUpdated,
}) => {
  const [currentCaseIdx, setCurrentCaseIdx] = useState<number>(0);
  const currentCase = SPELLING_CASES[currentCaseIdx];

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [usedHint, setUsedHint] = useState<boolean>(false);
  const [showHintModal, setShowHintModal] = useState<boolean>(false);

  const [verdictResult, setVerdictResult] = useState<{
    status: 'idle' | 'solved' | 'incorrect';
    pointsEarned?: number;
    isDuplicate?: boolean;
    explanation?: string;
  }>({ status: 'idle' });

  const [progress, setProgress] = useState(() => getLocalChallengeProgress(currentUser.id));

  useEffect(() => {
    setSelectedOptionId(null);
    setUsedHint(false);
    setShowHintModal(false);
    setVerdictResult({ status: 'idle' });
  }, [currentCaseIdx, currentCase]);

  const handleSelectOption = (optId: string) => {
    if (verdictResult.status === 'solved') return;
    setSelectedOptionId(optId);
    if (verdictResult.status === 'incorrect') {
      setVerdictResult({ status: 'idle' });
    }
  };

  const handleUseHint = () => {
    setUsedHint(true);
    setShowHintModal(true);
  };

  const handleInspectVerdict = () => {
    if (!selectedOptionId) return;

    const chosenOption = currentCase.options.find(o => o.id === selectedOptionId);
    if (!chosenOption) return;

    if (chosenOption.isCorrect) {
      const outcome = recordRoundOutcome({
        userId: currentUser.id,
        gameId: 'spelling-detective',
        roundId: currentCase.id,
        isCorrect: true,
        usedHint: usedHint
      });

      setVerdictResult({
        status: 'solved',
        pointsEarned: outcome.pointsAwarded,
        isDuplicate: outcome.isDuplicate,
        explanation: currentCase.explanation
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
      setVerdictResult({
        status: 'incorrect'
      });
    }
  };

  const handleNextCase = () => {
    if (currentCaseIdx < SPELLING_CASES.length - 1) {
      setCurrentCaseIdx(currentCaseIdx + 1);
    }
  };

  const isCaseSolved = (caseId: string) => {
    return progress.games['spelling-detective'].completedRoundIds.includes(caseId);
  };

  const currentScoreForCase = progress.games['spelling-detective'].scoresByRound[currentCase.id] || 0;

  // Render passage with suspicious word highlighted nicely
  const renderPassageWithHighlight = () => {
    const parts = currentCase.passage.split(currentCase.wrongWord);
    return (
      <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-serif">
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            {part}
            {i < parts.length - 1 && (
              <span className="inline-block px-2.5 py-0.5 rounded-lg bg-rose-100 text-rose-700 font-bold border border-rose-300 underline decoration-wavy decoration-rose-400">
                {currentCase.wrongWord} ❓
              </span>
            )}
          </React.Fragment>
        ))}
      </p>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-3xl border border-sky-200/80 shadow-xs">
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
              <span className="text-xl">🔍</span>
              <h1 className="font-heading font-extrabold text-lg sm:text-xl text-slate-800">
                Thám Tử Chính Tả
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold border border-sky-300">
                Vụ án {currentCase.caseNumber}/{SPELLING_CASES.length}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Chủ điểm: Phân biệt <strong className="text-sky-700">{currentCase.topic}</strong> • {currentCase.title}
            </p>
          </div>
        </div>

        {/* Current Case Score & Global Points */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-slate-500 block font-medium">Điểm phá án</span>
            <span className="text-base font-extrabold text-sky-600">
              {progress.games['spelling-detective'].totalPoints} / 80 điểm
            </span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-sky-100 border border-sky-300 flex items-center justify-center text-sky-700 font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Case Dossiers Selector Pills */}
      <div className="bg-sky-50/60 p-2.5 sm:p-3 rounded-2xl border border-sky-200 flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-bold text-sky-900 shrink-0 ml-1">
          Hồ sơ vụ án:
        </span>
        {SPELLING_CASES.map((c, idx) => {
          const isCurrent = idx === currentCaseIdx;
          const solved = isCaseSolved(c.id);
          const score = progress.games['spelling-detective'].scoresByRound[c.id] || 0;

          return (
            <button
              key={c.id}
              onClick={() => setCurrentCaseIdx(idx)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isCurrent
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20 scale-105'
                  : solved
                  ? 'bg-sky-100 text-sky-900 hover:bg-sky-200 border border-sky-300'
                  : 'bg-white text-slate-600 hover:bg-sky-50 border border-slate-200'
              }`}
            >
              <span>Vụ án {c.caseNumber}</span>
              {solved && (
                <span className="text-[10px] font-extrabold bg-sky-700 text-sky-100 px-1 rounded">
                  {score}đ
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Case Investigation Board */}
      <div className="bg-white rounded-3xl border border-sky-200 shadow-sm p-6 sm:p-7 space-y-6">
        {/* Case Dossier Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-sky-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-2.5 py-1 rounded-md">
                Hồ sơ vụ án số {currentCase.caseNumber}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Phạm trù: {currentCase.topic}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-800 mt-2">
              Truy tìm từ viết sai chính tả và phục hồi từ đúng chuẩn Tiếng Việt
            </h2>
          </div>

          {currentScoreForCase > 0 && (
            <div className="shrink-0 bg-sky-50 border border-sky-300 px-3 py-1.5 rounded-xl text-center">
              <span className="text-[10px] font-bold text-sky-800 block">Đã phá án</span>
              <span className="text-sm font-extrabold text-sky-700">+{currentScoreForCase} điểm</span>
            </div>
          )}
        </div>

        {/* The Evidence Card (Manuscrip / Passage) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/40 border border-amber-200/80 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
            <FileText className="w-4 h-4 text-amber-700" />
            <span>Ngữ liệu chứng cứ cần giám định:</span>
          </div>
          {renderPassageWithHighlight()}
          <p className="text-xs text-slate-500 italic">
            * Nhận dạng: Từ đang gạch chân màu đỏ "<strong className="text-rose-600">{currentCase.wrongWord}</strong>" bị nghi vấn viết sai quy tắc chính tả.
          </p>
        </div>

        {/* 4 Choices for Fix */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Search className="w-4 h-4 text-sky-600" />
            <span>Thám tử nhí hãy chọn cách viết chuẩn xác nhất để sửa lỗi:</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentCase.options.map(option => {
              const isSelected = selectedOptionId === option.id;
              const isSolved = verdictResult.status === 'solved';

              let cardStyle = 'bg-white text-slate-800 border-slate-200 hover:border-sky-400 hover:bg-sky-50/40';
              if (isSelected) {
                cardStyle = 'bg-sky-50 text-sky-950 border-2 border-sky-500 shadow-sm';
              }
              if (isSolved && option.isCorrect) {
                cardStyle = 'bg-emerald-50 text-emerald-950 border-2 border-emerald-500 shadow-sm';
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  disabled={isSolved}
                  className={`p-4 rounded-2xl border text-left font-bold text-base sm:text-lg transition-all flex items-center justify-between cursor-pointer ${cardStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                      isSelected ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isSelected ? '✓' : '•'}
                    </span>
                    <span>{option.word}</span>
                  </div>
                  {isSolved && option.isCorrect && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      Đáp án chuẩn xác
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Verdict Feedback */}
        {verdictResult.status === 'solved' && (
          <div className="p-5 rounded-2xl bg-sky-50 border border-sky-300 space-y-3 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-md">
                ✓
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-base text-sky-950">
                  Phá án thành công! Từ đúng chuẩn là "{currentCase.correctWord}"!
                </h4>
                <p className="text-xs font-semibold text-sky-700">
                  {verdictResult.pointsEarned! > 0
                    ? `+${verdictResult.pointsEarned} điểm thám tử vào thành tích của em!`
                    : verdictResult.isDuplicate
                    ? 'Em đã phá án thành công vụ này từ trước!'
                    : 'Tuyệt vời!'}
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-700 leading-relaxed bg-white/80 p-3.5 rounded-xl border border-sky-200 space-y-2">
              <p className="font-bold text-sky-950">🔍 Lời giải thích của thám tử ngôn ngữ:</p>
              <p>{currentCase.explanation}</p>
              <div className="p-2.5 rounded-lg bg-sky-100/70 border border-sky-200 text-sky-900 font-medium">
                📌 <strong>Quy tắc cần nhớ:</strong> {currentCase.spellingRule}
              </div>
            </div>
          </div>
        )}

        {verdictResult.status === 'incorrect' && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 flex items-start gap-3 animate-in fade-in duration-150">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs text-rose-950 space-y-1">
              <p className="font-bold text-rose-900">Chưa chuẩn xác:</p>
              <p>Lựa chọn này chưa đúng với quy tắc ngữ âm và từ điển Tiếng Việt. Em hãy suy nghĩ thêm hoặc bấm "Kính lúp gợi ý" để được hướng dẫn nhé!</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={handleUseHint}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
              usedHint
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-white hover:bg-sky-50 text-sky-800 border-sky-300'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-sky-600" />
            <span>{usedHint ? 'Đã xem gợi ý (Tối đa 5đ)' : 'Kính lúp gợi ý'}</span>
          </button>

          <div className="flex items-center gap-2.5">
            {verdictResult.status !== 'solved' ? (
              <button
                onClick={handleInspectVerdict}
                disabled={!selectedOptionId}
                className="px-6 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Kết luận vụ án</span>
              </button>
            ) : (
              currentCaseIdx < SPELLING_CASES.length - 1 ? (
                <button
                  onClick={handleNextCase}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Qua Vụ án {currentCase.caseNumber + 1}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onBack}
                  className="px-6 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Trophy className="w-4 h-4" />
                  <span>Hoàn thành xuất sắc 8 Vụ án!</span>
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Hint Modal */}
      {showHintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-sky-200 shadow-xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-sky-700">
              <div className="w-10 h-10 rounded-2xl bg-sky-100 flex items-center justify-center text-xl">
                🔎
              </div>
              <h3 className="font-heading font-extrabold text-base text-slate-800">
                Manh mối Thám tử
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 text-xs text-slate-700 leading-relaxed space-y-2">
              <p className="font-bold text-sky-950">Mẹo kiểm tra nhanh:</p>
              <p>{currentCase.spellingRule}</p>
              <p className="text-sky-800 italic pt-1 border-t border-sky-200">
                Lưu ý: Sử dụng manh mối gợi ý sẽ nhận tối đa 5 điểm khi phá án.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowHintModal(false)}
                className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs cursor-pointer transition-colors"
              >
                Em đã có lời giải!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
