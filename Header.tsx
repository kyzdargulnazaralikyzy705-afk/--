import React from 'react';
import { Sparkles, Printer, Download, Upload, Eye, Edit3, Moon, Sun, RotateCcw } from 'lucide-react';

interface HeaderProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onOpenWizard: () => void;
  onOpenPrint: () => void;
  onExportJson: () => void;
  onImportJson: () => void;
  onResetData: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isEditMode,
  onToggleEditMode,
  onOpenWizard,
  onOpenPrint,
  onExportJson,
  onImportJson,
  onResetData,
  isDark,
  onToggleTheme,
}) => {
  return (
    <>
      {/* 3-Zone Top Navigation Contract */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-16">
            
            {/* Zone 1: Single text element wordmark */}
            <a 
              href="#" 
              className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
            >
              Мугалимдин Портфолиосу
            </a>

            {/* Zone 2: 4-5 concise single-line nav links */}
            <nav className="hidden md:flex items-center gap-6 text-xs lg:text-sm font-medium text-slate-600 dark:text-slate-400">
              <a href="#personal" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
                Визитка
              </a>
              <a href="#education" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
                Билими
              </a>
              <a href="#methodology" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
                Методика
              </a>
              <a href="#lessons" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
                Иштелмелер
              </a>
              <a href="#achievements" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
                Жетишкендиктер
              </a>
              <a href="#certificates" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
                Сертификаттар
              </a>
            </nav>

            {/* Zone 3: 1 primary action */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenWizard}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Анкета (Сурамжылоо)</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Educator Control Toolbar: Free Working Space (Эркин иш алып баруу тилкеси) */}
      <div className="no-print bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 py-2.5 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Left: Mode switcher (Көрүү / Оңдоо) */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
              Иштөө режими:
            </span>
            <div className="inline-flex items-center p-0.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
              <button
                type="button"
                onClick={() => isEditMode && onToggleEditMode()}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                  !isEditMode
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Көрүү (Презентация)</span>
              </button>
              <button
                type="button"
                onClick={() => !isEditMode && onToggleEditMode()}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                  isEditMode
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Эркин оңдоо (Башкаруу)</span>
              </button>
            </div>
            {isEditMode && (
              <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                Оңдоо жигердүү: каалаган элементти өзгөртө аласыз
              </span>
            )}
          </div>

          {/* Right: Portfolio Actions (Басып чыгаруу, Экспорт, Импорт, Тема) */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <button
              type="button"
              onClick={onOpenPrint}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 font-medium transition-colors"
              title="Аттестацияга басып чыгаруу / PDF сактоо"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Басып чыгаруу / PDF</span>
            </button>

            <button
              type="button"
              onClick={onExportJson}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 font-medium transition-colors"
              title="Маалыматтарды компьютерге сактоо (JSON)"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Сактоо (JSON)</span>
            </button>

            <button
              type="button"
              onClick={onImportJson}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 font-medium transition-colors"
              title="JSON файлдан калыбына келтирүү"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Жүктөө</span>
            </button>

            <button
              type="button"
              onClick={onResetData}
              className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors"
              title="Баштапкы үлгүгө кайтаруу"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              className="p-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors"
              title={isDark ? "Жарык режим" : "Караңгы режим"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>

        </div>
      </div>
    </>
  );
};
