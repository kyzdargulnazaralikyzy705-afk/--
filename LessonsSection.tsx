import React, { useState } from 'react';
import { LessonPlan } from '../types/portfolio';
import { FileText, Plus, Edit3, Trash2, Calendar, Layers, ExternalLink } from 'lucide-react';

interface LessonsSectionProps {
  lessons: LessonPlan[];
  isEditMode: boolean;
  onAddLesson: () => void;
  onEditLesson: (lesson: LessonPlan) => void;
  onDeleteLesson: (lessonId: string) => void;
}

export const LessonsSection: React.FC<LessonsSectionProps> = ({
  lessons,
  isEditMode,
  onAddLesson,
  onEditLesson,
  onDeleteLesson
}) => {
  const [filter, setFilter] = useState<string>('all');

  const filteredLessons = filter === 'all' 
    ? lessons 
    : lessons.filter(l => l.format === filter);

  const formats = ['all', 'Ачык сабак', 'Интеграцияланган сабак', 'Мастер-класс'];

  return (
    <section id="lessons" className="scroll-mt-20 py-10 border-t border-slate-200/80 dark:border-slate-800">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-emerald-700 dark:text-emerald-400">
            Практикалык педагогикалык ишмердүүлүк
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            Сабактын иштелмелери жана ачык сабактар
          </h2>
        </div>
        {isEditMode && (
          <button
            type="button"
            onClick={onAddLesson}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Жаңы сабак кошуу</span>
          </button>
        )}
      </div>

      {/* Filter Tabs (Functional segmented controls §1.A) */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl max-w-fit mb-6">
        {formats.map((fmt) => (
          <button
            key={fmt}
            type="button"
            onClick={() => setFilter(fmt)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filter === fmt
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {fmt === 'all' ? 'Баардык иштелмелер' : fmt}
          </button>
        ))}
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <div 
            key={lesson.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-800/80 transition-all shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-3">
              
              {/* Clean unboxed metadata separator */}
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">{lesson.format}</span>
                <span aria-hidden="true">·</span>
                <span>{lesson.grade}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {lesson.date}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {lesson.title}
              </h3>

              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <p>
                  <strong className="text-slate-800 dark:text-slate-200">Максаты:</strong> {lesson.goal}
                </p>
                {lesson.technologiesUsed && (
                  <p>
                    <strong className="text-slate-800 dark:text-slate-200">Методдор:</strong> {lesson.technologiesUsed}
                  </p>
                )}
                {lesson.notes && (
                  <p className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 italic">
                    «{lesson.notes}»
                  </p>
                )}
              </div>

            </div>

            {/* Bottom Row */}
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium text-[11px]">
                {lesson.subject}
              </span>

              {isEditMode ? (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onEditLesson(lesson)}
                    className="p-1.5 text-slate-500 hover:text-emerald-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Оңдоо"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteLesson(lesson.id)}
                    className="p-1.5 text-slate-500 hover:text-red-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Өчүрүү"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  Иштелме даяр
                </span>
              )}
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
