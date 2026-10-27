import React from 'react';
import { Award, Star, Flame, BookCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';
import { SAMPLE_BADGES } from '../data/mockData';

interface ProgressViewProps {
  currentUser: UserProfile;
  onNavigateToWriting: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ currentUser, onNavigateToWriting }) => {
  return (
    <div className="space-y-8 pb-16">
      {/* Student Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 text-slate-900 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-18 h-18 rounded-3xl bg-white/90 shadow-md flex items-center justify-center text-4xl border border-white">
            {currentUser.avatar}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="font-heading text-2xl font-bold text-slate-900">
                {currentUser.name}
              </h2>
              <span className="bg-white/30 text-amber-950 font-bold text-xs px-2.5 py-0.5 rounded-full">
                {currentUser.className}
              </span>
            </div>
            <p className="text-xs text-amber-950 font-medium">
              {currentUser.school}
            </p>
            <div className="text-xs font-bold text-amber-900">
              Danh hiệu: <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">Cây bút triển vọng - Cấp độ 3</span>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-3 bg-white/30 backdrop-blur-md p-3.5 rounded-2xl border border-white/40 text-center">
          <div>
            <div className="font-heading text-xl sm:text-2xl font-black text-amber-950">
              {currentUser.starsCount || 42}
            </div>
            <div className="text-[11px] font-semibold text-amber-900 flex items-center justify-center gap-0.5">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>Sao thưởng</span>
            </div>
          </div>

          <div className="border-x border-amber-900/10 px-2">
            <div className="font-heading text-xl sm:text-2xl font-black text-amber-950">
              {currentUser.streakDays || 4}
            </div>
            <div className="text-[11px] font-semibold text-amber-900 flex items-center justify-center gap-0.5">
              <Flame className="w-3 h-3 text-orange-600 fill-orange-600" />
              <span>Ngày chuỗi</span>
            </div>
          </div>

          <div>
            <div className="font-heading text-xl sm:text-2xl font-black text-amber-950">
              {currentUser.completedEssays || 6}
            </div>
            <div className="text-[11px] font-semibold text-amber-900 flex items-center justify-center gap-0.5">
              <BookCheck className="w-3 h-3 text-emerald-700" />
              <span>Bài hoàn thành</span>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Collection */}
      <div className="bg-white p-6 rounded-3xl border border-amber-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-800">
              Bộ sưu tập huy hiệu tập làm văn
            </h3>
            <p className="text-xs text-slate-500">
              Chinh phục các thử thách ngôn từ lớp 4 để mở khóa thêm huy hiệu
            </p>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
            3 / 6 đã mở
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {SAMPLE_BADGES.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                badge.isUnlocked
                  ? 'bg-amber-50/50 border-amber-300'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-amber-200 flex items-center justify-center text-2xl shrink-0">
                {badge.icon}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-slate-800">{badge.title}</h4>
                  {badge.isUnlocked && (
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-bold">
                      Đạt
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {badge.description}
                </p>
                {badge.unlockedAt && (
                  <div className="text-[10px] text-slate-400">
                    Mở khóa ngày: {badge.unlockedAt}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA to practice */}
      <div className="p-6 rounded-3xl bg-amber-100/80 border border-amber-300 flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="font-bold text-slate-800 text-sm">Em muốn tiếp tục rèn luyện kỹ năng viết?</div>
          <p className="text-xs text-slate-600 mt-0.5">
            Chọn một bài học mới trong kho dữ liệu SGK Kết nối tri thức để tiếp tục tích lũy sao nhé!
          </p>
        </div>
        <button
          onClick={onNavigateToWriting}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Đến phòng luyện viết</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
