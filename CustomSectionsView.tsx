import React, { useState } from 'react';
import { CustomSection, CustomSectionItem } from '../types/portfolio';
import { FolderPlus, Plus, Edit3, Trash2, Calendar, Layers } from 'lucide-react';

interface CustomSectionsViewProps {
  sections: CustomSection[];
  isEditMode: boolean;
  onAddSection: (name: string, description: string) => void;
  onDeleteSection: (sectionId: string) => void;
  onAddItem: (sectionId: string) => void;
  onEditItem: (sectionId: string, item: CustomSectionItem) => void;
  onDeleteItem: (sectionId: string, itemId: string) => void;
}

export const CustomSectionsView: React.FC<CustomSectionsViewProps> = ({
  sections,
  isEditMode,
  onAddSection,
  onDeleteSection,
  onAddItem,
  onEditItem,
  onDeleteItem
}) => {
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [newSectionDesc, setNewSectionDesc] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSectionName.trim()) {
      onAddSection(newSectionName.trim(), newSectionDesc.trim());
      setNewSectionName('');
      setNewSectionDesc('');
      setIsAddingSection(false);
    }
  };

  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <section 
          key={section.id} 
          className="scroll-mt-20 py-10 border-t border-slate-200/80 dark:border-slate-800"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-700 dark:text-emerald-400">
                Кошумча жеке бөлүм
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                {section.name}
              </h2>
              {section.description && (
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {section.description}
                </p>
              )}
            </div>

            {isEditMode && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onAddItem(section.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Жазуу кошуу</span>
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteSection(section.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-red-600 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
                  title="Бөлүмдү өчүрүү"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Бөлүмдү өчүрүү</span>
                </button>
              </div>
            )}
          </div>

          {/* Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {section.items.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-800 transition-colors shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    {item.date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                    )}
                    {item.subtitle && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-medium text-emerald-700 dark:text-emerald-400">{item.subtitle}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {item.content}
                  </p>
                </div>

                {isEditMode && (
                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => onEditItem(section.id, item)}
                      className="p-1.5 text-slate-500 hover:text-emerald-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Оңдоо"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteItem(section.id, item.id)}
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
      ))}

      {/* Button to add a new custom section in edit mode */}
      {isEditMode && (
        <div className="py-6 border-t border-dashed border-slate-300 dark:border-slate-800 text-center">
          {!isAddingSection ? (
            <button
              type="button"
              onClick={() => setIsAddingSection(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/40 hover:bg-emerald-100 rounded-xl border border-emerald-300 dark:border-emerald-800 transition-colors"
            >
              <FolderPlus className="w-4 h-4" />
              <span>+ Портфолиого жаңы жеке бөлүм кошуу</span>
            </button>
          ) : (
            <form onSubmit={handleCreate} className="max-w-md mx-auto p-5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 shadow-md text-left space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Жаңы бөлүм түзүү
              </h4>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Бөлүмдүн аталышы *
                </label>
                <input
                  type="text"
                  required
                  value={newSectionName}
                  onChange={e => setNewSectionName(e.target.value)}
                  placeholder="Мисалы: Ата-энелер менен кызматташуу"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Кыскача баяндама
                </label>
                <input
                  type="text"
                  value={newSectionDesc}
                  onChange={e => setNewSectionDesc(e.target.value)}
                  placeholder="Мисалы: Ата-энелер жыйындары жана биргелешкен долбоорлор"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingSection(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400"
                >
                  Жокко чыгаруу
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
                >
                  Түзүү
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
