import React from 'react';
import { PersonalInfo } from '../types/portfolio';
import { Mail, Phone, MapPin, Award, Edit3, Briefcase, Calendar, Sparkles } from 'lucide-react';

interface PersonalInfoSectionProps {
  personal: PersonalInfo;
  isEditMode: boolean;
  onEdit: () => void;
  onOpenWizard: () => void;
  stats: {
    experience: number;
    achievementsCount: number;
    lessonsCount: number;
    certificatesCount: number;
  };
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  personal,
  isEditMode,
  onEdit,
  onOpenWizard,
  stats
}) => {
  return (
    <section id="personal" className="scroll-mt-20 pt-6 pb-12">
      {/* Onboarding Callout Banner (Prompting user to fill data or freely edit) */}
      <div className="no-print mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50/50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/60 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-xs shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
              Мугалимдин портфолиосун түзүү жана эркин башкаруу
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
              Сайттан маалыматтарыңызды сурамжылоо аркылуу кадам сайын толтуруңуз же «Эркин оңдоо» режимин күйгүзүп, бардык маалыматтарды өзүңүз каалагандай өзгөртүңүз.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
          <button
            type="button"
            onClick={onOpenWizard}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-lg shadow-sm transition-all whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Суроолорго жооп берүү</span>
          </button>
        </div>
      </div>

      {/* Hero Split Layout (§2.B of Portfolio Constitution) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        
        {/* Left Column: Typographic Hierarchy */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Clean Unboxed Metadata Kicker (Anti-Pill Rule §1.A) */}
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 dark:text-emerald-400">
              <span>{personal.category}</span>
              <span aria-hidden="true">·</span>
              <span>{personal.experienceYears} жыл педагогикалык стаж</span>
              <span aria-hidden="true">·</span>
              <span>{personal.subject}</span>
            </div>

            {/* Headline: Full Name */}
            <div className="flex items-baseline justify-between gap-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 text-balance">
                {personal.fullName}
              </h1>
              {isEditMode && (
                <button
                  type="button"
                  onClick={onEdit}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors shrink-0"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Визитканы оңдоо</span>
                </button>
              )}
            </div>

            {/* School / Institution */}
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-medium">
              {personal.school}
            </p>

            {/* Pedagogical Credo in Editorial Typography */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1.5">
                Педагогикалык кредо (девиз)
              </span>
              <blockquote className="font-serif-title italic text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
                «{personal.credo}»
              </blockquote>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <a href={`mailto:${personal.email}`} className="hover:text-slate-900 dark:hover:text-slate-100 truncate">
                  {personal.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <a href={`tel:${personal.phone}`} className="hover:text-slate-900 dark:hover:text-slate-100">
                  {personal.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{personal.address}</span>
              </div>
              {personal.birthDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Туулган күнү: {personal.birthDate}</span>
                </div>
              )}
            </div>

          </div>

          {/* Teacher Honor Badges / Titles */}
          {personal.pedagogicalAwards && personal.pedagogicalAwards.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
                Сыйлыктар жана ардактуу наамдар:
              </span>
              <div className="space-y-1.5">
                {personal.pedagogicalAwards.map((award, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{award}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: High-Resolution Teacher Portrait */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md group">
            <img
              src={personal.avatarUrl}
              alt={personal.fullName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
            
            {/* Scrim overlay with category badge */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent flex items-center justify-between text-white">
              <div>
                <p className="text-xs font-semibold">{personal.category}</p>
                <p className="text-[11px] text-slate-300">{personal.subject}</p>
              </div>
              {isEditMode && (
                <button
                  type="button"
                  onClick={onEdit}
                  className="px-2.5 py-1 text-xs bg-white/20 hover:bg-white/30 backdrop-blur-md rounded text-white font-medium transition-colors"
                >
                  Сүрөттү алмаштыруу
                </button>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Full-Width Key Metrics Strip (Below Hero Split as mandated by guidelines) */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="space-y-1">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Педагогикалык стаж</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tabular-nums">
            {stats.experience} <span className="text-sm font-medium text-slate-500">жыл</span>
          </p>
          <span className="text-[11px] text-slate-400 dark:text-slate-500">Үзгүлтүксүз эмгек</span>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Ачык сабактар жана иштелмелер</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tabular-nums">
            {stats.lessonsCount}
          </p>
          <span className="text-[11px] text-slate-400 dark:text-slate-500">Даярдалган усулдар</span>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Сыйлыктар жана жетишкендиктер</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tabular-nums">
            {stats.achievementsCount}
          </p>
          <span className="text-[11px] text-slate-400 dark:text-slate-500">Мугалим жана окуучулар</span>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Сертификаттар жана курстар</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tabular-nums">
            {stats.certificatesCount}
          </p>
          <span className="text-[11px] text-slate-400 dark:text-slate-500">Квалификация курстары</span>
        </div>
      </div>
    </section>
  );
};
