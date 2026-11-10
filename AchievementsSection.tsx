import React, { useState } from 'react';
import { TeacherAchievement, StudentAchievement } from '../types/portfolio';
import { Award, Trophy, Plus, Edit3, Trash2, Calendar, ZoomIn, UserCheck } from 'lucide-react';

interface AchievementsSectionProps {
  teacherAchievements: TeacherAchievement[];
  studentAchievements: StudentAchievement[];
  isEditMode: boolean;
  onAddTeacherAchievement: () => void;
  onEditTeacherAchievement: (item: TeacherAchievement) => void;
  onDeleteTeacherAchievement: (id: string) => void;
  onAddStudentAchievement: () => void;
  onEditStudentAchievement: (item: StudentAchievement) => void;
  onDeleteStudentAchievement: (id: string) => void;
  onViewImage: (url: string, title: string) => void;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  teacherAchievements,
  studentAchievements,
  isEditMode,
  onAddTeacherAchievement,
  onEditTeacherAchievement,
  onDeleteTeacherAchievement,
  onAddStudentAchievement,
  onEditStudentAchievement,
  onDeleteStudentAchievement,
  onViewImage
}) => {
  const [activeTab, setActiveTab] = useState<'teacher' | 'students'>('teacher');

  return (
    <section id="achievements" className="scroll-mt-20 py-10 border-t border-slate-200/80 dark:border-slate-800">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-emerald-700 dark:text-emerald-400">
            Ийгиликтердин далили
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            Сыйлыктар жана жетишкендиктер
          </h2>
        </div>

        {/* Tab Buttons & Add Action */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('teacher')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'teacher'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Мугалимдин сыйлыктары ({teacherAchievements.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('students')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'students'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Окуучулардын жетишкендиктери ({studentAchievements.length})
            </button>
          </div>

          {isEditMode && (
            <button
              type="button"
              onClick={activeTab === 'teacher' ? onAddTeacherAchievement : onAddStudentAchievement}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{activeTab === 'teacher' ? 'Сыйлык кошуу' : 'Окуучуну кошуу'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Tab 1: Мугалимдин сыйлыктары */}
      {activeTab === 'teacher' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teacherAchievements.map((achieve) => (
            <div 
              key={achieve.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-800 transition-colors shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                {/* Image / Certificate scan preview if exists */}
                {achieve.imageUrl && (
                  <div 
                    onClick={() => onViewImage(achieve.imageUrl!, achieve.title)}
                    className="relative w-full h-36 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 cursor-pointer group bg-slate-100 dark:bg-slate-800"
                  >
                    <img 
                      src={achieve.imageUrl} 
                      alt={achieve.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <div className="p-2 rounded-full bg-slate-900/60 backdrop-blur-xs">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Metadata Line */}
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">{achieve.level}</span>
                  <span aria-hidden="true">·</span>
                  <span>{achieve.type}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {achieve.year}-жыл
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                  {achieve.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300">
                  <strong className="text-slate-700 dark:text-slate-200">Ыйгарган орган:</strong> {achieve.issuedBy}
                </p>

                {achieve.description && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {achieve.description}
                  </p>
                )}

              </div>

              {/* Bottom Actions */}
              {isEditMode && (
                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-1.5">
                  <button
                    type="button"
                    onClick={() => onEditTeacherAchievement(achieve)}
                    className="p-1.5 text-slate-500 hover:text-emerald-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Оңдоо"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteTeacherAchievement(achieve.id)}
                    className="p-1.5 text-slate-500 hover:text-red-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Өчүрүү"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Окуучулардын жетишкендиктери */}
      {activeTab === 'students' && (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Окуучунун аты-жөнү</th>
                <th className="py-3 px-4">Классы</th>
                <th className="py-3 px-4">Олимпиада / Сынак</th>
                <th className="py-3 px-4">Деңгээли</th>
                <th className="py-3 px-4">Жыйынтыгы</th>
                <th className="py-3 px-4">Жылы</th>
                {isEditMode && <th className="py-3 px-4 text-right">Аракеттер</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {studentAchievements.map((sa) => (
                <tr key={sa.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                    {sa.studentName}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">{sa.grade}</td>
                  <td className="py-3 px-4 max-w-xs">{sa.competition}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{sa.level}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                      {sa.result}
                    </span>
                    {sa.rewardTitle && (
                      <span className="block text-[11px] text-slate-400">{sa.rewardTitle}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-mono whitespace-nowrap">{sa.year}</td>
                  {isEditMode && (
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => onEditStudentAchievement(sa)}
                          className="p-1 text-slate-500 hover:text-emerald-600 rounded transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteStudentAchievement(sa.id)}
                          className="p-1 text-slate-500 hover:text-red-600 rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </section>
  );
};
