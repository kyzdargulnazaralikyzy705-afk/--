import React, { useState, useEffect, useRef } from 'react';
import { 
  TeacherPortfolio, 
  LessonPlan, 
  TeacherAchievement, 
  StudentAchievement, 
  CertificateItem, 
  Course, 
  PublicationItem, 
  ExtracurricularItem, 
  CustomSection, 
  CustomSectionItem 
} from './types/portfolio';
import { DEFAULT_PORTFOLIO } from './data/defaultPortfolio';
import { Header } from './components/Header';
import { WizardModal } from './components/WizardModal';
import { EditItemModal, EditModalType } from './components/EditItemModal';
import { LightboxModal } from './components/LightboxModal';
import { PrintDossierModal } from './components/PrintDossierModal';
import { PersonalInfoSection } from './components/PersonalInfoSection';
import { EducationSection } from './components/EducationSection';
import { MethodologySection } from './components/MethodologySection';
import { LessonsSection } from './components/LessonsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { CertificatesSection } from './components/CertificatesSection';
import { PublicationsSection } from './components/PublicationsSection';
import { ExtracurricularSection } from './components/ExtracurricularSection';
import { CustomSectionsView } from './components/CustomSectionsView';
import { 
  CheckCircle, 
  HelpCircle, 
  Sparkles, 
  FileText, 
  Award, 
  FolderPlus, 
  Share2, 
  Check, 
  AlertCircle 
} from 'lucide-react';

const STORAGE_KEY = 'kyrgyz_teacher_portfolio_v1';
const THEME_KEY = 'teacher_portfolio_theme';

export default function App() {
  // Load initial portfolio data
  const [portfolio, setPortfolio] = useState<TeacherPortfolio>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading portfolio from storage', e);
    }
    return DEFAULT_PORTFOLIO;
  });

  // Dark mode state
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved !== null) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Free work & edit mode toggle
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // Modals state
  const [isWizardOpen, setIsWizardOpen] = useState<boolean>(false);
  const [isPrintOpen, setIsPrintOpen] = useState<boolean>(false);
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: '',
    title: ''
  });

  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    type: EditModalType | null;
    initialData?: any;
    targetId?: string;
  }>({
    isOpen: false,
    type: null
  });

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync dark class on document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(THEME_KEY, 'light');
    }
  }, [isDark]);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
    } catch (e) {
      console.error('Error saving portfolio', e);
    }
  }, [portfolio]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Portfolio Completeness Calculation
  const calculateCompleteness = () => {
    let score = 0;
    if (portfolio.personal.fullName) score += 15;
    if (portfolio.personal.credo) score += 10;
    if (portfolio.education.university) score += 15;
    if (portfolio.education.courses.length > 0) score += 15;
    if (portfolio.methodology.topic) score += 15;
    if (portfolio.lessons.length > 0) score += 15;
    if (portfolio.teacherAchievements.length > 0 || portfolio.studentAchievements.length > 0) score += 15;
    return Math.min(100, score);
  };

  const completeness = calculateCompleteness();

  // Export to JSON file
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolio, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    const sanitizedName = portfolio.personal.fullName.replace(/\s+/g, '_') || 'mugalim';
    downloadAnchor.setAttribute("download", `portfolio_${sanitizedName}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Портфолио JSON файл катары сакталды!');
  };

  // Trigger JSON file input
  const handleImportJson = () => {
    fileInputRef.current?.click();
  };

  // Read JSON file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.personal && parsed.education && parsed.methodology) {
          setPortfolio(parsed);
          showToast('Портфолио файлдан ийгиликтүү жүктөлдү!');
        } else {
          showToast('Ката: Файл туура эмес форматта!');
        }
      } catch (err) {
        showToast('Файлды окууда ката кетти!');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Reset to default sample
  const handleResetData = () => {
    if (window.confirm('Портфолиону баштапкы үлгү маалыматтарына кайтарууну каалайсызбы?')) {
      setPortfolio(DEFAULT_PORTFOLIO);
      showToast('Баштапкы үлгү маалыматтары коюлду.');
    }
  };

  // Save from EditItemModal
  const handleSaveModalData = (data: any) => {
    const type = editModal.type;

    if (type === 'personal') {
      setPortfolio({ ...portfolio, personal: { ...portfolio.personal, ...data } });
      showToast('Жеке маалыматтар сакталды.');
    } 
    else if (type === 'lesson') {
      if (data.id) {
        setPortfolio({
          ...portfolio,
          lessons: portfolio.lessons.map(l => l.id === data.id ? data : l)
        });
      } else {
        const newLesson: LessonPlan = {
          ...data,
          id: `lesson-${Date.now()}`
        };
        setPortfolio({
          ...portfolio,
          lessons: [newLesson, ...portfolio.lessons]
        });
      }
      showToast('Сабактын иштелмеси сакталды.');
    }
    else if (type === 'teacherAchievement') {
      if (data.id) {
        setPortfolio({
          ...portfolio,
          teacherAchievements: portfolio.teacherAchievements.map(a => a.id === data.id ? data : a)
        });
      } else {
        const newAchieve: TeacherAchievement = {
          ...data,
          id: `teach-achieve-${Date.now()}`
        };
        setPortfolio({
          ...portfolio,
          teacherAchievements: [newAchieve, ...portfolio.teacherAchievements]
        });
      }
      showToast('Мугалимдин сыйлыгы сакталды.');
    }
    else if (type === 'studentAchievement') {
      if (data.id) {
        setPortfolio({
          ...portfolio,
          studentAchievements: portfolio.studentAchievements.map(a => a.id === data.id ? data : a)
        });
      } else {
        const newStudentAchieve: StudentAchievement = {
          ...data,
          id: `stud-achieve-${Date.now()}`
        };
        setPortfolio({
          ...portfolio,
          studentAchievements: [newStudentAchieve, ...portfolio.studentAchievements]
        });
      }
      showToast('Окуучунун жетишкендиги сакталды.');
    }
    else if (type === 'certificate') {
      if (data.id) {
        setPortfolio({
          ...portfolio,
          certificates: portfolio.certificates.map(c => c.id === data.id ? data : c)
        });
      } else {
        const newCert: CertificateItem = {
          ...data,
          id: `cert-${Date.now()}`
        };
        setPortfolio({
          ...portfolio,
          certificates: [newCert, ...portfolio.certificates]
        });
      }
      showToast('Сертификат сакталды.');
    }
    else if (type === 'course') {
      if (data.id) {
        setPortfolio({
          ...portfolio,
          education: {
            ...portfolio.education,
            courses: portfolio.education.courses.map(c => c.id === data.id ? data : c)
          }
        });
      } else {
        const newCourse: Course = {
          ...data,
          id: `course-${Date.now()}`
        };
        setPortfolio({
          ...portfolio,
          education: {
            ...portfolio.education,
            courses: [newCourse, ...portfolio.education.courses]
          }
        });
      }
      showToast('Квалификация курсу сакталды.');
    }
    else if (type === 'publication') {
      if (data.id) {
        setPortfolio({
          ...portfolio,
          publications: portfolio.publications.map(p => p.id === data.id ? data : p)
        });
      } else {
        const newPub: PublicationItem = {
          ...data,
          id: `pub-${Date.now()}`
        };
        setPortfolio({
          ...portfolio,
          publications: [newPub, ...portfolio.publications]
        });
      }
      showToast('Макала/эмгек сакталды.');
    }
    else if (type === 'extracurricular') {
      if (data.id) {
        setPortfolio({
          ...portfolio,
          extracurricular: portfolio.extracurricular.map(e => e.id === data.id ? data : e)
        });
      } else {
        const newExtra: ExtracurricularItem = {
          ...data,
          id: `extra-${Date.now()}`
        };
        setPortfolio({
          ...portfolio,
          extracurricular: [newExtra, ...portfolio.extracurricular]
        });
      }
      showToast('Тарбиялык иш-чара сакталды.');
    }
    else if (type === 'customSection' && editModal.targetId) {
      const sectionId = editModal.targetId;
      setPortfolio({
        ...portfolio,
        customSections: portfolio.customSections.map(sec => {
          if (sec.id !== sectionId) return sec;
          if (data.id) {
            return {
              ...sec,
              items: sec.items.map(item => item.id === data.id ? data : item)
            };
          } else {
            const newItem: CustomSectionItem = {
              ...data,
              id: `item-${Date.now()}`
            };
            return {
              ...sec,
              items: [newItem, ...sec.items]
            };
          }
        })
      });
      showToast('Бөлүмдүн жазуусу сакталды.');
    }
  };

  // Custom section actions
  const handleAddCustomSection = (name: string, description: string) => {
    const newSec: CustomSection = {
      id: `sec-${Date.now()}`,
      name,
      description,
      items: []
    };
    setPortfolio({
      ...portfolio,
      customSections: [...portfolio.customSections, newSec]
    });
    showToast(`«${name}» бөлүмү түзүлдү.`);
  };

  const handleDeleteCustomSection = (secId: string) => {
    if (window.confirm('Бул бөлүмдү өчүрүүгө ишенесизби?')) {
      setPortfolio({
        ...portfolio,
        customSections: portfolio.customSections.filter(s => s.id !== secId)
      });
      showToast('Бөлүм өчүрүлдү.');
    }
  };

  const handleDeleteCustomItem = (secId: string, itemId: string) => {
    setPortfolio({
      ...portfolio,
      customSections: portfolio.customSections.map(s => {
        if (s.id !== secId) return s;
        return {
          ...s,
          items: s.items.filter(i => i.id !== itemId)
        };
      })
    });
    showToast('Жазуу өчүрүлдү.');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Hidden file input for JSON import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold">
          <CheckCircle className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation & Workspace Control Strip */}
      <Header
        isEditMode={isEditMode}
        onToggleEditMode={() => setIsEditMode(!isEditMode)}
        onOpenWizard={() => setIsWizardOpen(true)}
        onOpenPrint={() => setIsPrintOpen(true)}
        onExportJson={handleExportJson}
        onImportJson={handleImportJson}
        onResetData={handleResetData}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Interactive Assistant Progress & Quick Guidance Bar (No-Print) */}
        <div className="no-print pt-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="w-10 h-10 rounded-xl bg-emerald-700/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0">
                {completeness}%
              </div>
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-800 dark:text-slate-200">
                    Портфолионун толукталышы: {completeness}%
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    {completeness === 100 ? 'Аттестацияга даяр!' : 'Толуктоо сунушталат'}
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-600 dark:bg-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${completeness}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs flex-wrap">
              <span className="text-slate-500 dark:text-slate-400 hidden lg:inline">
                Тез суроо-жооп:
              </span>
              <button
                type="button"
                onClick={() => setEditModal({ isOpen: true, type: 'lesson' })}
                className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300 font-medium transition-colors"
              >
                + Ачык сабак кошуу
              </button>
              <button
                type="button"
                onClick={() => setEditModal({ isOpen: true, type: 'teacherAchievement' })}
                className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300 font-medium transition-colors"
              >
                + Сыйлык кошуу
              </button>
              <button
                type="button"
                onClick={() => setEditModal({ isOpen: true, type: 'certificate' })}
                className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300 font-medium transition-colors"
              >
                + Сертификат жүктөө
              </button>
            </div>
          </div>
        </div>

        {/* 1. PERSONAL INFO SECTION */}
        <PersonalInfoSection
          personal={portfolio.personal}
          isEditMode={isEditMode}
          onEdit={() => setEditModal({ isOpen: true, type: 'personal', initialData: portfolio.personal })}
          onOpenWizard={() => setIsWizardOpen(true)}
          stats={{
            experience: portfolio.personal.experienceYears,
            achievementsCount: portfolio.teacherAchievements.length + portfolio.studentAchievements.length,
            lessonsCount: portfolio.lessons.length,
            certificatesCount: portfolio.certificates.length + portfolio.education.courses.length
          }}
        />

        {/* 2. EDUCATION & COURSES SECTION */}
        <EducationSection
          education={portfolio.education}
          isEditMode={isEditMode}
          onEditEducation={() => {
            // Edit basic education
            const univ = prompt('Жогорку окуу жайы:', portfolio.education.university);
            const spec = prompt('Адистиги:', portfolio.education.specialty);
            const deg = prompt('Академиялык даражасы:', portfolio.education.degree);
            const yr = prompt('Бүтүргөн жылы:', portfolio.education.gradYear);
            if (univ && spec) {
              setPortfolio({
                ...portfolio,
                education: {
                  ...portfolio.education,
                  university: univ,
                  specialty: spec,
                  degree: deg || portfolio.education.degree,
                  gradYear: yr || portfolio.education.gradYear
                }
              });
              showToast('Билим маалыматы жаңыртылды.');
            }
          }}
          onAddCourse={() => setEditModal({ isOpen: true, type: 'course' })}
          onEditCourse={(course) => setEditModal({ isOpen: true, type: 'course', initialData: course })}
          onDeleteCourse={(courseId) => {
            setPortfolio({
              ...portfolio,
              education: {
                ...portfolio.education,
                courses: portfolio.education.courses.filter(c => c.id !== courseId)
              }
            });
            showToast('Курс өчүрүлдү.');
          }}
        />

        {/* 3. METHODOLOGY SECTION */}
        <MethodologySection
          methodology={portfolio.methodology}
          isEditMode={isEditMode}
          onUpdate={(updated) => {
            setPortfolio({ ...portfolio, methodology: updated });
            showToast('Методикалык тема сакталды.');
          }}
        />

        {/* 4. LESSON PLANS & OPEN LESSONS */}
        <LessonsSection
          lessons={portfolio.lessons}
          isEditMode={isEditMode}
          onAddLesson={() => setEditModal({ isOpen: true, type: 'lesson' })}
          onEditLesson={(lesson) => setEditModal({ isOpen: true, type: 'lesson', initialData: lesson })}
          onDeleteLesson={(lessonId) => {
            setPortfolio({
              ...portfolio,
              lessons: portfolio.lessons.filter(l => l.id !== lessonId)
            });
            showToast('Сабак иштелмеси өчүрүлдү.');
          }}
        />

        {/* 5. ACHIEVEMENTS & AWARDS (TEACHER & STUDENTS) */}
        <AchievementsSection
          teacherAchievements={portfolio.teacherAchievements}
          studentAchievements={portfolio.studentAchievements}
          isEditMode={isEditMode}
          onAddTeacherAchievement={() => setEditModal({ isOpen: true, type: 'teacherAchievement' })}
          onEditTeacherAchievement={(item) => setEditModal({ isOpen: true, type: 'teacherAchievement', initialData: item })}
          onDeleteTeacherAchievement={(id) => {
            setPortfolio({
              ...portfolio,
              teacherAchievements: portfolio.teacherAchievements.filter(a => a.id !== id)
            });
            showToast('Сыйлык өчүрүлдү.');
          }}
          onAddStudentAchievement={() => setEditModal({ isOpen: true, type: 'studentAchievement' })}
          onEditStudentAchievement={(item) => setEditModal({ isOpen: true, type: 'studentAchievement', initialData: item })}
          onDeleteStudentAchievement={(id) => {
            setPortfolio({
              ...portfolio,
              studentAchievements: portfolio.studentAchievements.filter(a => a.id !== id)
            });
            showToast('Окуучунун жетишкендиги өчүрүлдү.');
          }}
          onViewImage={(url, title) => setLightbox({ isOpen: true, url, title })}
        />

        {/* 6. CERTIFICATES GALLERY */}
        <CertificatesSection
          certificates={portfolio.certificates}
          isEditMode={isEditMode}
          onAddCertificate={() => setEditModal({ isOpen: true, type: 'certificate' })}
          onEditCertificate={(item) => setEditModal({ isOpen: true, type: 'certificate', initialData: item })}
          onDeleteCertificate={(id) => {
            setPortfolio({
              ...portfolio,
              certificates: portfolio.certificates.filter(c => c.id !== id)
            });
            showToast('Сертификат өчүрүлдү.');
          }}
          onViewImage={(url, title) => setLightbox({ isOpen: true, url, title })}
        />

        {/* 7. PUBLICATIONS & METHODOLOGICAL ARTICLES */}
        <PublicationsSection
          publications={portfolio.publications}
          isEditMode={isEditMode}
          onAddPublication={() => setEditModal({ isOpen: true, type: 'publication' })}
          onEditPublication={(item) => setEditModal({ isOpen: true, type: 'publication', initialData: item })}
          onDeletePublication={(id) => {
            setPortfolio({
              ...portfolio,
              publications: portfolio.publications.filter(p => p.id !== id)
            });
            showToast('Макала өчүрүлдү.');
          }}
        />

        {/* 8. EXTRACURRICULAR ACTIVITIES & CLUBS */}
        <ExtracurricularSection
          extracurricular={portfolio.extracurricular}
          isEditMode={isEditMode}
          onAddExtracurricular={() => setEditModal({ isOpen: true, type: 'extracurricular' })}
          onEditExtracurricular={(item) => setEditModal({ isOpen: true, type: 'extracurricular', initialData: item })}
          onDeleteExtracurricular={(id) => {
            setPortfolio({
              ...portfolio,
              extracurricular: portfolio.extracurricular.filter(e => e.id !== id)
            });
            showToast('Иш-чара өчүрүлдү.');
          }}
          onViewImage={(url, title) => setLightbox({ isOpen: true, url, title })}
        />

        {/* 9. CUSTOM USER SECTIONS */}
        <CustomSectionsView
          sections={portfolio.customSections}
          isEditMode={isEditMode}
          onAddSection={handleAddCustomSection}
          onDeleteSection={handleDeleteCustomSection}
          onAddItem={(secId) => setEditModal({ isOpen: true, type: 'customSection', targetId: secId })}
          onEditItem={(secId, item) => setEditModal({ isOpen: true, type: 'customSection', targetId: secId, initialData: item })}
          onDeleteItem={handleDeleteCustomItem}
        />

      </main>

      {/* Footer */}
      <footer className="no-print mt-20 border-t border-slate-200 dark:border-slate-800 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-700 dark:text-slate-300">
            {portfolio.personal.fullName} — Электрондук педагогикалык портфолио
          </p>
          <p className="text-[11px]">
            {portfolio.personal.school} · {portfolio.personal.category} · Бардык укуктар корголгон
          </p>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. Step-by-Step Questionnaire Wizard */}
      <WizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        portfolio={portfolio}
        onUpdatePortfolio={(updated) => {
          setPortfolio(updated);
          showToast('Анкета боюнча маалыматтар ийгиликтүү жаңыртылды!');
        }}
      />

      {/* 2. Universal Item Edit Modal */}
      <EditItemModal
        isOpen={editModal.isOpen}
        type={editModal.type}
        initialData={editModal.initialData}
        onClose={() => setEditModal({ isOpen: false, type: null })}
        onSave={handleSaveModalData}
      />

      {/* 3. Image Lightbox */}
      <LightboxModal
        isOpen={lightbox.isOpen}
        imageUrl={lightbox.url}
        title={lightbox.title}
        onClose={() => setLightbox({ isOpen: false, url: '', title: '' })}
      />

      {/* 4. Print Dossier Modal (Official Attestation View) */}
      <PrintDossierModal
        isOpen={isPrintOpen}
        portfolio={portfolio}
        onClose={() => setIsPrintOpen(false)}
      />

    </div>
  );
}
