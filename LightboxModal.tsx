import React from 'react';
import { X, Download, ExternalLink } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  imageUrl: string | null;
  title: string | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  imageUrl,
  title,
  onClose
}) => {
  if (!isOpen || !imageUrl) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl max-h-[90vh] bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between text-white bg-slate-900/90">
          <h4 className="text-sm font-semibold truncate pr-4">
            {title || 'Документти көрүү'}
          </h4>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Content */}
        <div className="p-2 sm:p-4 overflow-auto flex items-center justify-center bg-black/40">
          <img 
            src={imageUrl} 
            alt={title || 'Документ'} 
            referrerPolicy="no-referrer"
            className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain shadow-lg"
          />
        </div>

        {/* Bottom bar */}
        <div className="px-5 py-2.5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 bg-slate-900/90">
          <span>Сүрөттү же сертификатты толук өлчөмдө көрүү</span>
          <a
            href={imageUrl}
            download={title || 'certificate.jpg'}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Жүктөп алуу</span>
          </a>
        </div>
      </div>
    </div>
  );
};
