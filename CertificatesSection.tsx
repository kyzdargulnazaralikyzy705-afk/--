import React from 'react';
import { CertificateItem } from '../types/portfolio';
import { Award, Plus, Edit3, Trash2, Calendar, Clock, ZoomIn } from 'lucide-react';

interface CertificatesSectionProps {
  certificates: CertificateItem[];
  isEditMode: boolean;
  onAddCertificate: () => void;
  onEditCertificate: (item: CertificateItem) => void;
  onDeleteCertificate: (id: string) => void;
  onViewImage: (url: string, title: string) => void;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  certificates,
  isEditMode,
  onAddCertificate,
  onEditCertificate,
  onDeleteCertificate,
  onViewImage
}) => {
  return (
    <section id="certificates" className="scroll-mt-20 py-10 border-t border-slate-200/80 dark:border-slate-800">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-emerald-700 dark:text-emerald-400">
            Күбөлүктөр жана дипломдор
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            Сертификаттар галереясы
          </h2>
        </div>
        {isEditMode && (
          <button
            type="button"
            onClick={onAddCertificate}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Сертификат жүктөө</span>
          </button>
        )}
      </div>

      {/* Grid of Certificates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div 
            key={cert.id}
            className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-800 transition-all shadow-xs overflow-hidden flex flex-col justify-between group"
          >
            {/* Image Preview Container */}
            <div 
              onClick={() => onViewImage(cert.imageUrl, cert.title)}
              className="relative w-full h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden cursor-pointer"
            >
              <img 
                src={cert.imageUrl} 
                alt={cert.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <div className="p-2.5 rounded-full bg-slate-900/70 backdrop-blur-xs flex items-center gap-1.5 text-xs font-medium">
                  <ZoomIn className="w-4 h-4" />
                  <span>Толук көрүү</span>
                </div>
              </div>
            </div>

            {/* Info Body */}
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">{cert.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{cert.date}</span>
                  {cert.hours && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {cert.hours}
                      </span>
                    </>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                  {cert.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {cert.issuer}
                </p>
              </div>

              {/* Actions */}
              {isEditMode && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-1.5">
                  <button
                    type="button"
                    onClick={() => onEditCertificate(cert)}
                    className="p-1.5 text-slate-500 hover:text-emerald-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Оңдоо"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteCertificate(cert.id)}
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
