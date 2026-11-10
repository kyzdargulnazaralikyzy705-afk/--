import React from 'react';
import { EducationData, Course } from '../types/portfolio';
import { GraduationCap, Award, Plus, Edit3, Trash2, Calendar, Clock, BookCheck } from 'lucide-react';

interface EducationSectionProps {
  education: EducationData;
  isEditMode: boolean;
  onEditEducation: () => void;
  onAddCourse: () => void;
  onEditCourse: (course: Course) => void;
  onDeleteCourse: (courseId: string) => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  isEditMode,
  onEditEducation,
  onAddCourse,
  onEditCourse,
  onDeleteCourse
}) => {
  return (
    <section id="education" className="scroll-mt-20 py-10 border-t border-slate-200/80 dark:border-slate-800">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-emerald-700 dark:text-emerald-400">
            Квалификация жана академиялык база
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            Билими жана квалификацияны жогорулатуу
          </h2>
        </div>
        {isEditMode && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onEditEducation}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Окуу жайды оңдоо</span>
            </button>
            <button
              type="button"
              onClick={onAddCourse}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Курс кошуу</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Higher Education Card */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Базалык жогорку билим
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug mt-0.5">
                {education.university}
              </h3>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 dark:text-slate-500 block">Адистиги:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{education.specialty}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-slate-400 dark:text-slate-500 block">Академиялык даражасы:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{education.degree}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500 block">Аяктаган жылы:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{education.gradYear}-жыл</span>
              </div>
            </div>

            {education.diplomaNumber && (
              <div className="pt-1">
                <span className="text-slate-400 dark:text-slate-500 block">Дипломдун номери:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{education.diplomaNumber}</span>
              </div>
            )}
          </div>
        </div>

        {/* Qualification Courses List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <BookCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Квалификацияны жогорулатуу курстары жана тренингдер</span>
            </h4>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Жалпы: {education.courses.length} курс
            </span>
          </div>

          <div className="space-y-3">
            {education.courses.map((course) => (
              <div 
                key={course.id}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-800 transition-colors shadow-xs"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                      {course.title}
                    </h5>
                    
                    {/* Unboxed metadata line */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-medium text-slate-700 dark:text-slate-300">{course.organizer}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {course.year}-жыл
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.hours}
                      </span>
                      {course.certificateNumber && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono text-[11px]">{course.certificateNumber}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {isEditMode && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => onEditCourse(course)}
                        className="p-1.5 text-slate-500 hover:text-emerald-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Оңдоо"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteCourse(course.id)}
                        className="p-1.5 text-slate-500 hover:text-red-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Өчүрүү"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};
