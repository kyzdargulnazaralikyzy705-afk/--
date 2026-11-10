import React from 'react';
import { ExtracurricularItem } from '../types/portfolio';
import { Users, Plus, Edit3, Trash2, Calendar, ZoomIn } from 'lucide-react';

interface ExtracurricularSectionProps {
  extracurricular: ExtracurricularItem[];
  isEditMode: boolean;
  onAddExtracurricular: () => void;
  onEditExtracurricular: (item: ExtracurricularItem) => void;
  onDeleteExtracurricular: (id: string) => void;
  onViewImage: (url: string, title: string) => void;
}

export const ExtracurricularSection: React.FC<ExtracurricularSectionProps> = ({
  extracurricular,
  isEditMode,
  onAddExtracurricular,
  onEditExtracurricular,
  onDeleteExtracurricular,
  onViewImage
}) => {
  return (
    <section id="extracurricular" className="scroll-mt-20 py-10 border-t border-slate-200/80 dark:border-slate-800">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-emerald-700 dark:text-emerald-400">
            Тарбиялык жана социалдык иштер
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            Класстан тышкаркы иш-чаралар жана ийримдер
          </h2>
        </div>
        {isEditMode && (
          <button
            type="button"
            onClick={onAddExtracurricular}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Жаңы иш-чара кошуу</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {extracurricular.map((item) => (
          <div 
            key={item.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-800 transition-colors shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-3">
              
              {/* Photo preview if exists */}
              {item.photos && item.photos.length > 0 && (
                <div 
                  onClick={() => onViewImage(item.photos![0], item.title)}
                  className="relative w-full h-40 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer group"
                >
                  <img 
                    src={item.photos[0]} 
                    alt={item.title}
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

              {/* Metadata */}
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">{item.type}</span>
                <span aria-hidden="true">·</span>
                <span>{item.grade}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.description}
              </p>

            </div>

            {/* Actions */}
            {isEditMode && (
              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-1.5">
                <button
                  type="button"
                  onClick={() => onEditExtracurricular(item)}
                  className="p-1.5 text-slate-500 hover:text-emerald-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Оңдоо"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteExtracurricular(item.id)}
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

    </section>
  );
};
