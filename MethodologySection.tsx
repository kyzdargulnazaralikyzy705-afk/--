import React, { useState } from 'react';
import { MethodologyData } from '../types/portfolio';
import { BookOpen, Target, Cpu, CheckCircle2, Edit3, Save, X } from 'lucide-react';

interface MethodologySectionProps {
  methodology: MethodologyData;
  isEditMode: boolean;
  onUpdate: (updated: MethodologyData) => void;
}

export const MethodologySection: React.FC<MethodologySectionProps> = ({
  methodology,
  isEditMode,
  onUpdate
}) => {
  const [isInlineEditing, setIsInlineEditing] = useState(false);
  const [formData, setFormData] = useState(methodology);

  const handleSave = () => {
    onUpdate(formData);
    setIsInlineEditing(false);
  };

  return (
    <section id="methodology" className="scroll-mt-20 py-10 border-t border-slate-200/80 dark:border-slate-800">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-emerald-700 dark:text-emerald-400">
            Илимий-педагогикалык концепция
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            Методикалык тема жана инновациялык усулдар
          </h2>
        </div>
        {isEditMode && (
          <div>
            {!isInlineEditing ? (
              <button
                type="button"
                onClick={() => {
                  setFormData(methodology);
                  setIsInlineEditing(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Бөлүмдү оңдоо</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsInlineEditing(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900"
                >
                  Жокко чыгаруу
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Сактоо</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {isInlineEditing ? (
        /* Edit Mode Form */
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 shadow-md space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Методикалык темаңыз *
            </label>
            <textarea
              rows={2}
              value={formData.topic}
              onChange={e => setFormData({ ...formData, topic: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Негизги максаты *
            </label>
            <textarea
              rows={2}
              value={formData.goal}
              onChange={e => setFormData({ ...formData, goal: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Интерактивдүү методдор (ар бир сапта бирден)
              </label>
              <textarea
                rows={4}
                value={formData.methods.join('\n')}
                onChange={e => setFormData({ ...formData, methods: e.target.value.split('\n').filter(Boolean) })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Технологиялар жана платформалар (ар бир сапта бирден)
              </label>
              <textarea
                rows={4}
                value={formData.technologies.join('\n')}
                onChange={e => setFormData({ ...formData, technologies: e.target.value.split('\n').filter(Boolean) })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-xs"
              />
            </div>
          </div>
        </div>
      ) : (
        /* Presentation Layout */
        <div className="space-y-6">
          
          {/* Main Topic Banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-md relative overflow-hidden">
            <div className="relative z-10 max-w-3xl space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                Жеке методикалык тема
              </span>
              <h3 className="text-xl sm:text-2xl font-bold leading-snug">
                «{methodology.topic}»
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed pt-1">
                <strong className="text-white">Башкы максат:</strong> {methodology.goal}
              </p>
            </div>
          </div>

          {/* Bento Grid: Methods, Technologies, Principles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1: Interactive Methods */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Интерактивдүү усулдар</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {methodology.methods.map((method, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">·</span>
                    <span className="leading-relaxed">{method}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Box 2: Technologies */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                <Cpu className="w-4 h-4" />
                <span>Санариптик технологиялар</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {methodology.technologies.map((tech, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">·</span>
                    <span className="leading-relaxed">{tech}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Box 3: Pedagogical Principles */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Педагогикалык принциптер</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {methodology.principles.map((pr, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">·</span>
                    <span className="leading-relaxed">{pr}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      )}

    </section>
  );
};
