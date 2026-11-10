import React from 'react';
import { PublicationItem } from '../types/portfolio';
import { BookOpen, Plus, Edit3, Trash2, Calendar, FileText, ExternalLink } from 'lucide-react';

interface PublicationsSectionProps {
  publications: PublicationItem[];
  isEditMode: boolean;
  onAddPublication: () => void;
  onEditPublication: (item: PublicationItem) => void;
  onDeletePublication: (id: string) => void;
}

export const PublicationsSection: React.FC<PublicationsSectionProps> = ({
  publications,
  isEditMode,
  onAddPublication,
  onEditPublication,
  onDeletePublication
}) => {
  return (
    <section id="publications" className="scroll-mt-20 py-10 border-t border-slate-200/80 dark:border-slate-800">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-emerald-700 dark:text-emerald-400">
            Илимий-методикалык иштер
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            Макалалар жана усулдук колдонмолор
          </h2>
        </div>
        {isEditMode && (
          <button
            type="button"
            onClick={onAddPublication}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Жаңы макала/эмгек кошуу</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {publications.map((pub) => (
          <div 
            key={pub.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-800 transition-colors shadow-xs"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">{pub.type}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {pub.year}-жыл
                  </span>
                  {pub.pages && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{pub.pages}</span>
                    </>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                  {pub.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300">
                  <strong className="text-slate-800 dark:text-slate-200">Басылма:</strong> {pub.journal}
                </p>

                {pub.description && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                    {pub.description}
                  </p>
                )}

              </div>

              {isEditMode && (
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => onEditPublication(pub)}
                    className="p-1.5 text-slate-500 hover:text-emerald-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Оңдоо"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeletePublication(pub.id)}
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

    </section>
  );
};
