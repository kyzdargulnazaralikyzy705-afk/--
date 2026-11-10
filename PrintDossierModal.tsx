import React from 'react';
import { TeacherPortfolio } from '../types/portfolio';
import { Printer, X, Download, Check } from 'lucide-react';

interface PrintDossierModalProps {
  isOpen: boolean;
  portfolio: TeacherPortfolio;
  onClose: () => void;
}

export const PrintDossierModal: React.FC<PrintDossierModalProps> = ({
  isOpen,
  portfolio,
  onClose
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl my-4 sm:my-8 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Control Bar (Hidden during print) */}
        <div className="no-print px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Printer className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Мугалимдин аттестациялык папкасы (Басып чыгаруу / PDF)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Бул документ мектептин же министрликтин аттестациялык комиссиясына сунуштоого даярдалган
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Басып чыгаруу же PDF сактоо</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Preview */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-white text-slate-900 space-y-8 font-sans print:p-0 print:m-0 text-sm">
          
          {/* TITLE PAGE (Титульный лист) */}
          <div className="border-4 border-slate-900 p-8 text-center space-y-6 page-break-inside-avoid">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-slate-600 font-semibold">
                Кыргыз Республикасынын Билим берүү жана илим министрлиги
              </p>
              <p className="text-xs font-medium text-slate-700">
                {portfolio.personal.school}
              </p>
            </div>

            <div className="py-8 space-y-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide">
                МУГАЛИМДИН ЭЛЕКТРОНДУК ПОРТФОЛИОСУ
              </h1>
              <p className="text-sm font-semibold text-slate-700">
                (Педагогикалык ишмердүүлүктүн жана кесиптик өсүштүн жыйынтыктары)
              </p>
            </div>

            <div className="pt-8 text-right max-w-md ml-auto space-y-1 text-xs">
              <p><strong>Даярдаган мугалим:</strong> {portfolio.personal.fullName}</p>
              <p><strong>Предмети:</strong> {portfolio.personal.subject}</p>
              <p><strong>Квалификациялык категориясы:</strong> {portfolio.personal.category}</p>
              <p><strong>Педагогикалык стажы:</strong> {portfolio.personal.experienceYears} жыл</p>
            </div>

            <div className="pt-12 text-center text-xs text-slate-500 font-mono">
              Бишкек шаары — {currentYear}-жыл
            </div>
          </div>

          {/* SECTION 1: ЖЕКЕ МААЛЫМАТТАР */}
          <div className="page-break-inside-avoid space-y-3 pt-4">
            <h2 className="text-base font-bold uppercase tracking-wider border-b-2 border-slate-900 pb-1">
              1. Жеке маалыматтар (Визитка)
            </h2>
            <table className="w-full text-xs border border-slate-300">
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="py-2 px-3 font-semibold bg-slate-50 w-1/3">Толук аты-жөнү:</td>
                  <td className="py-2 px-3">{portfolio.personal.fullName}</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2 px-3 font-semibold bg-slate-50">Билим берүү мекемеси:</td>
                  <td className="py-2 px-3">{portfolio.personal.school}</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2 px-3 font-semibold bg-slate-50">Окуткан предмети:</td>
                  <td className="py-2 px-3">{portfolio.personal.subject}</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2 px-3 font-semibold bg-slate-50">Категориясы жана стажы:</td>
                  <td className="py-2 px-3">{portfolio.personal.category} ({portfolio.personal.experienceYears} жыл стаж)</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2 px-3 font-semibold bg-slate-50">Байланыш маалыматтары:</td>
                  <td className="py-2 px-3">{portfolio.personal.phone} | {portfolio.personal.email}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold bg-slate-50">Педагогикалык кредосу:</td>
                  <td className="py-2 px-3 italic">«{portfolio.personal.credo}»</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* SECTION 2: БИЛИМИ ЖАНА КВАЛИФИКАЦИЯ КУРСТАРЫ */}
          <div className="page-break-inside-avoid space-y-3 pt-4">
            <h2 className="text-base font-bold uppercase tracking-wider border-b-2 border-slate-900 pb-1">
              2. Билими жана квалификацияны жогорулатуу
            </h2>
            <div className="text-xs space-y-2">
              <p>
                <strong>Негизги окуу жай:</strong> {portfolio.education.university} ({portfolio.education.gradYear}-жыл).
                <br />
                <strong>Адистиги:</strong> {portfolio.education.specialty}. <strong>Даражасы:</strong> {portfolio.education.degree}.
                {portfolio.education.diplomaNumber && <> (Диплом: {portfolio.education.diplomaNumber})</>}
              </p>

              <h3 className="font-bold text-xs pt-2">Өтүлгөн квалификация курстарынын реестри:</h3>
              <table className="w-full text-xs border border-slate-300">
                <thead className="bg-slate-100 font-semibold">
                  <tr>
                    <th className="py-2 px-3 border-b text-left">Курстун темасы</th>
                    <th className="py-2 px-3 border-b text-left">Уюштурган мекеме</th>
                    <th className="py-2 px-3 border-b text-center">Жылы / Сааты</th>
                    <th className="py-2 px-3 border-b text-left">Сертификат №</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {portfolio.education.courses.map((c) => (
                    <tr key={c.id}>
                      <td className="py-2 px-3 font-medium">{c.title}</td>
                      <td className="py-2 px-3">{c.organizer}</td>
                      <td className="py-2 px-3 text-center">{c.year}-ж. ({c.hours})</td>
                      <td className="py-2 px-3 font-mono">{c.certificateNumber || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 3: МЕТОДИКАЛЫК ТЕМА */}
          <div className="page-break-inside-avoid space-y-3 pt-4">
            <h2 className="text-base font-bold uppercase tracking-wider border-b-2 border-slate-900 pb-1">
              3. Методикалык ишмердүүлүк
            </h2>
            <div className="text-xs space-y-2 bg-slate-50 p-4 border border-slate-200">
              <p><strong>Жеке усулдук темасы:</strong> «{portfolio.methodology.topic}»</p>
              <p><strong>Максаты:</strong> {portfolio.methodology.goal}</p>
              <p><strong>Колдонгон интерактивдүү усулдары:</strong> {portfolio.methodology.methods.join(', ')}</p>
              <p><strong>Санариптик билим берүү каражаттары:</strong> {portfolio.methodology.technologies.join(', ')}</p>
            </div>
          </div>

          {/* SECTION 4: САБАКТЫН ИШТЕЛМЕЛЕРИ ЖАНА АЧЫК САБАКТАР */}
          <div className="page-break-inside-avoid space-y-3 pt-4">
            <h2 className="text-base font-bold uppercase tracking-wider border-b-2 border-slate-900 pb-1">
              4. Ачык сабактар жана сабак иштелмелери
            </h2>
            <table className="w-full text-xs border border-slate-300">
              <thead className="bg-slate-100 font-semibold">
                <tr>
                  <th className="py-2 px-3 border-b text-left">Сабактын темасы</th>
                  <th className="py-2 px-3 border-b text-center">Классы</th>
                  <th className="py-2 px-3 border-b text-left">Форматы</th>
                  <th className="py-2 px-3 border-b text-left">Колдонулган методдор</th>
                  <th className="py-2 px-3 border-b text-center">Датасы</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {portfolio.lessons.map((l) => (
                  <tr key={l.id}>
                    <td className="py-2 px-3 font-medium">{l.title}</td>
                    <td className="py-2 px-3 text-center">{l.grade}</td>
                    <td className="py-2 px-3">{l.format}</td>
                    <td className="py-2 px-3">{l.technologiesUsed}</td>
                    <td className="py-2 px-3 text-center">{l.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SECTION 5: ЖЕТИШКЕНДИКТЕР */}
          <div className="page-break-inside-avoid space-y-3 pt-4">
            <h2 className="text-base font-bold uppercase tracking-wider border-b-2 border-slate-900 pb-1">
              5. Мугалимдин жана окуучулардын жетишкендиктери
            </h2>
            
            <h3 className="font-bold text-xs pt-1">Мугалимдин сыйлыктары:</h3>
            <ul className="list-disc pl-5 text-xs space-y-1">
              {portfolio.teacherAchievements.map((ta) => (
                <li key={ta.id}>
                  <strong>{ta.title}</strong> — {ta.issuedBy} ({ta.year}-ж., {ta.level} деңгээл). {ta.description}
                </li>
              ))}
            </ul>

            <h3 className="font-bold text-xs pt-2">Окуучулардын олимпиада жана сынактардагы натыйжалары:</h3>
            <table className="w-full text-xs border border-slate-300">
              <thead className="bg-slate-100 font-semibold">
                <tr>
                  <th className="py-2 px-3 border-b text-left">Окуучунун аты-жөнү</th>
                  <th className="py-2 px-3 border-b text-center">Классы</th>
                  <th className="py-2 px-3 border-b text-left">Олимпиада / Сынак</th>
                  <th className="py-2 px-3 border-b text-center">Деңгээли</th>
                  <th className="py-2 px-3 border-b text-center">Ээлеген орду</th>
                  <th className="py-2 px-3 border-b text-center">Жылы</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {portfolio.studentAchievements.map((sa) => (
                  <tr key={sa.id}>
                    <td className="py-2 px-3 font-medium">{sa.studentName}</td>
                    <td className="py-2 px-3 text-center">{sa.grade}</td>
                    <td className="py-2 px-3">{sa.competition}</td>
                    <td className="py-2 px-3 text-center">{sa.level}</td>
                    <td className="py-2 px-3 text-center font-bold text-emerald-800">{sa.result}</td>
                    <td className="py-2 px-3 text-center">{sa.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SIGNATURES BLOCK */}
          <div className="pt-12 page-break-inside-avoid space-y-6 text-xs">
            <div className="flex justify-between items-center pt-8 border-t border-slate-400">
              <div>
                <p><strong>Мугалим:</strong> ___________________ / {portfolio.personal.fullName} /</p>
              </div>
              <div>
                <p><strong>Мектептин директору:</strong> ___________________ / ___________________ /</p>
              </div>
            </div>
            <div className="text-right text-[11px] text-slate-500">
              М.О. (Мөөр орду) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Күнү: «____» _____________ {currentYear}-жыл
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
