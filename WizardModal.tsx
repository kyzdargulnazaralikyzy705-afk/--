import React, { useState } from 'react';
import { TeacherPortfolio, QualificationCategory } from '../types/portfolio';
import { X, Check, ArrowRight, ArrowLeft, Sparkles, BookOpen, Award, GraduationCap, Compass, FileText, User } from 'lucide-react';

interface WizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: TeacherPortfolio;
  onUpdatePortfolio: (updated: TeacherPortfolio) => void;
}

const CATEGORIES: QualificationCategory[] = [
  'Жогорку категория',
  '1-квалификациялык категория',
  '2-квалификациялык категория',
  'Категориясы жок (Жаш адис)',
  'Мугалим-эксперт',
  'Мугалим-методист'
];

const COMMON_SUBJECTS = [
  'Кыргыз тили жана адабияты',
  'Математика',
  'Башталгыч класс',
  'Англис тили',
  'Орус тили жана адабияты',
  'Информатика жана СТЕМ',
  'Тарых жана адам жана коом',
  'Физика',
  'Химия',
  'Биология',
  'География',
  'Көркөм өнөр жана музыка'
];

const CREDO_SUGGESTIONS = [
  "Ар бир бала – кайталангыс аалам. Мугалимдин милдети – анын катылган шыгын ачуу.",
  "Окуучуну жазалоо менен эмес, кызыктыруу жана сүйүү менен гана билимге үндөөгө болот.",
  "Үйрөтүп жатып өзүм да үйрөнөм. Заманбап мугалим – ар дайым изденүүдөгү инсан.",
  "Билим – бул курал, тарбия – бул максат. Экөө бирге гана күчтүү инсанды жаратат.",
  "Келечек бүгүнкү класстык бөлмөдөн башталат. Ар бир сабак – турмуштун кичинекей үлгүсү."
];

export const WizardModal: React.FC<WizardModalProps> = ({
  isOpen,
  onClose,
  portfolio,
  onUpdatePortfolio
}) => {
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  // Local state initialized from portfolio
  const [personal, setPersonal] = useState(portfolio.personal);
  const [education, setEducation] = useState(portfolio.education);
  const [methodology, setMethodology] = useState(portfolio.methodology);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonGrade, setNewLessonGrade] = useState('8-класс');
  const [newLessonGoal, setNewLessonGoal] = useState('');
  const [newAchievementTitle, setNewAchievementTitle] = useState('');
  const [newAchievementLevel, setNewAchievementLevel] = useState<'Мектептик' | 'Райондук' | 'Шаардык / Облустук' | 'Республикалык' | 'Эл аралык'>('Республикалык');
  const [newAchievementYear, setNewAchievementYear] = useState('2024');

  if (!isOpen) return null;

  const handleApplyChanges = () => {
    let updatedLessons = [...portfolio.lessons];
    if (newLessonTitle.trim()) {
      updatedLessons.unshift({
        id: `lesson-${Date.now()}`,
        title: newLessonTitle.trim(),
        grade: newLessonGrade,
        subject: personal.subject || 'Кыргыз тили',
        date: new Date().toLocaleDateString('ky-KG'),
        format: 'Ачык сабак',
        goal: newLessonGoal || 'Окуучулардын активдүүлүгүн жана сынчыл ой жүгүртүүсүн өстүрүү.',
        technologiesUsed: 'Интерактивдүү методдор, мультимедиа'
      });
    }

    let updatedAchievements = [...portfolio.teacherAchievements];
    if (newAchievementTitle.trim()) {
      updatedAchievements.unshift({
        id: `achieve-${Date.now()}`,
        title: newAchievementTitle.trim(),
        issuedBy: 'Билим берүү органы',
        year: newAchievementYear,
        level: newAchievementLevel,
        type: 'Ардак грамота',
        imageUrl: '/src/assets/images/teacher_award_diploma_1794339111337.jpg',
        description: 'Педагогикалык чеберчилиги жана үзүрлүү эмгеги үчүн.'
      });
    }

    const updatedPortfolio: TeacherPortfolio = {
      ...portfolio,
      personal,
      education,
      methodology,
      lessons: updatedLessons,
      teacherAchievements: updatedAchievements,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    onUpdatePortfolio(updatedPortfolio);
  };

  const handleNext = () => {
    handleApplyChanges();
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl my-8 overflow-hidden transition-all">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center font-bold">
              {step}/{totalSteps}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                Мугалимдин портфолиосун толтуруу анкетасы
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Суроолорго жооп берип, маалыматтарыңызды оңой жана толук киргизиңиз
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Жабуу"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5">
          <div 
            className="bg-emerald-600 dark:bg-emerald-500 h-1.5 transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Form Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* STEP 1: Жеке маалыматтар (Визитка) */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold text-sm">
                <User className="w-4 h-4" />
                <span>1-кадам: Жеке визитка жана негизги маалыматтар</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Сиздин аты-жөнүңүз, сабак берген предметиңиз жана эмгектенген билим берүү мекемеңиз жөнүндө сурайбыз:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Толук аты-жөнүңүз (ФИО) *
                  </label>
                  <input
                    type="text"
                    value={personal.fullName}
                    onChange={(e) => setPersonal({ ...personal, fullName: e.target.value })}
                    placeholder="Мисалы: Садыкова Айгүл Темирбековна"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Окуткан предметиңиз *
                  </label>
                  <input
                    type="text"
                    value={personal.subject}
                    onChange={(e) => setPersonal({ ...personal, subject: e.target.value })}
                    placeholder="Мисалы: Кыргыз тили жана адабияты"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {/* Quick subject suggestions */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {COMMON_SUBJECTS.slice(0, 5).map(sub => (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => setPersonal({ ...personal, subject: sub })}
                        className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Иштеген мектебиңиз / лицейиңиз *
                  </label>
                  <input
                    type="text"
                    value={personal.school}
                    onChange={(e) => setPersonal({ ...personal, school: e.target.value })}
                    placeholder="Мисалы: Бишкек ш., №5 инновациялык мектеп-гимназиясы"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Квалификациялык категорияңыз *
                  </label>
                  <select
                    value={personal.category}
                    onChange={(e) => setPersonal({ ...personal, category: e.target.value as QualificationCategory })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Педагогикалык иш тажрыйбаңыз (стаж, жыл менен)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="60"
                    value={personal.experienceYears}
                    onChange={(e) => setPersonal({ ...personal, experienceYears: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Байланыш телефону (WhatsApp)
                  </label>
                  <input
                    type="text"
                    value={personal.phone}
                    onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
                    placeholder="+996 (555) 00-00-00"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Электрондук почтаңыз (Email)
                  </label>
                  <input
                    type="email"
                    value={personal.email}
                    onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                    placeholder="mugalim@mektep.edu.kg"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Педагогикалык кредо жана наамдар */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold text-sm">
                <Compass className="w-4 h-4" />
                <span>2-кадам: Педагогикалык кредо жана жеке багыт</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Мугалимдик кесиптеги негизги девизиңиз же педагогикалык көз карашыңыз кандай? Бул портфолионун башкы бетине чыгат:
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Педагогикалык кредо (девиз) *
                </label>
                <textarea
                  rows={3}
                  value={personal.credo}
                  onChange={(e) => setPersonal({ ...personal, credo: e.target.value })}
                  placeholder="Сиздин педагогикалык философияңыз..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <div className="mt-3">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-2">
                    Даяр варианттардан тандап алууга болот:
                  </span>
                  <div className="space-y-1.5">
                    {CREDO_SUGGESTIONS.map((sug, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setPersonal({ ...personal, credo: sug })}
                        className="text-left w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 transition-colors flex items-start gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{sug}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Негизги наамдарыңыз же сыйлыктарыңыз (үтүр же жаңы сап менен)
                </label>
                <textarea
                  rows={2}
                  value={personal.pedagogicalAwards?.join('\n') || ''}
                  onChange={(e) => setPersonal({ 
                    ...personal, 
                    pedagogicalAwards: e.target.value.split('\n').filter(Boolean) 
                  })}
                  placeholder="Мисалы:
«Билим берүүнүн отличниги» (2023)
«Жылдын мыкты мугалими» жеңүүчүсү (2022)"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Билими жана квалификациясы */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold text-sm">
                <GraduationCap className="w-4 h-4" />
                <span>3-кадам: Билими жана бүтүргөн окуу жайы</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Кайсы жогорку же атайын окуу жайды аяктагансыз жана дипломдук адистигиңиз кандай?
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Окуу жайдын толук аталышы (Университет / Институт) *
                  </label>
                  <input
                    type="text"
                    value={education.university}
                    onChange={(e) => setEducation({ ...education, university: e.target.value })}
                    placeholder="Мисалы: Ж.Баласагын атындагы Кыргыз Улуттук Университети"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Факультет жана адистик *
                  </label>
                  <input
                    type="text"
                    value={education.specialty}
                    onChange={(e) => setEducation({ ...education, specialty: e.target.value })}
                    placeholder="Мисалы: Кыргыз тили жана адабияты мугалими"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Академиялык даража / Квалификация
                  </label>
                  <input
                    type="text"
                    value={education.degree}
                    onChange={(e) => setEducation({ ...education, degree: e.target.value })}
                    placeholder="Мисалы: Филология магистри / Бакалавр"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Аяктаган жылы
                  </label>
                  <input
                    type="text"
                    value={education.gradYear}
                    onChange={(e) => setEducation({ ...education, gradYear: e.target.value })}
                    placeholder="Мисалы: 2010"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Дипломдун сериясы жана номери
                  </label>
                  <input
                    type="text"
                    value={education.diplomaNumber || ''}
                    onChange={(e) => setEducation({ ...education, diplomaNumber: e.target.value })}
                    placeholder="Мисалы: CD №123456"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Методикалык тема жана максат */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>4-кадам: Методикалык тема жана инновациялык усулдар</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Аттестацияда жана күнүмдүк педагогикада иштеп жаткан методикалык темаңыз жана негизги максатыңыз:
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Методикалык темаңыз *
                </label>
                <textarea
                  rows={2}
                  value={methodology.topic}
                  onChange={(e) => setMethodology({ ...methodology, topic: e.target.value })}
                  placeholder="Мисалы: Интерактивдүү методдор аркылуу окуучулардын сынчыл ой жүгүртүүсүн өстүрүү..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Методикалык теманын негизги максаты *
                </label>
                <textarea
                  rows={2}
                  value={methodology.goal}
                  onChange={(e) => setMethodology({ ...methodology, goal: e.target.value })}
                  placeholder="Окуучуларда кандай көндүмдөрдү калыптандырууну көздөйсүз?"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Колдонгон негизги интерактивдүү методдоруңуз (жаңы сапка бирден)
                </label>
                <textarea
                  rows={3}
                  value={methodology.methods.join('\n')}
                  onChange={(e) => setMethodology({ 
                    ...methodology, 
                    methods: e.target.value.split('\n').filter(Boolean) 
                  })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* STEP 5: Жаңы сабак иштелмесин кошуу */}
          {step === 5 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold text-sm">
                <FileText className="w-4 h-4" />
                <span>5-кадам: Сабактын иштелмесин / ачык сабакты киргизүү</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Сиз өткөн мыкты ачык сабагыңыз же жаңы сабак планыңыз жөнүндө маалымат кошуңуз:
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Сабактын темасы
                </label>
                <input
                  type="text"
                  value={newLessonTitle}
                  onChange={(e) => setNewLessonTitle(e.target.value)}
                  placeholder="Мисалы: Чыңгыз Айтматовдун «Биринчи мугалим» чыгармасы"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Классы
                  </label>
                  <input
                    type="text"
                    value={newLessonGrade}
                    onChange={(e) => setNewLessonGrade(e.target.value)}
                    placeholder="Мисалы: 8-класс же 10-класс"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Сабактын максаты же өзгөчөлүгү
                  </label>
                  <input
                    type="text"
                    value={newLessonGoal}
                    onChange={(e) => setNewLessonGoal(e.target.value)}
                    placeholder="Мисалы: Сынчыл талдоо көндүмдөрүн өнүктүрүү"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-300">
                Эскертүү: Кийинчерээк «Башкаруу режиминде» каалаган сандагы сабак иштелмелерин каалаган убакта кошуп же өзгөртө аласыз.
              </div>
            </div>
          )}

          {/* STEP 6: Жетишкендик жана сыйлык кошуу */}
          {step === 6 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold text-sm">
                <Award className="w-4 h-4" />
                <span>6-кадам: Сыйлык жана жетишкендик киргизүү</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Акыркы алган грамотаңыз, дипломуңуз же сыйлыгыңыз барбы? Аны портфолиого дароо кошсоңуз болот:
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Сыйлыктын же грамотанын аталышы
                </label>
                <input
                  type="text"
                  value={newAchievementTitle}
                  onChange={(e) => setNewAchievementTitle(e.target.value)}
                  placeholder="Мисалы: «Жылдын мыкты мугалими» конкурсунун 1-даражадагы Диплому"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Деңгээли
                  </label>
                  <select
                    value={newAchievementLevel}
                    onChange={(e) => setNewAchievementLevel(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Республикалык">Республикалык</option>
                    <option value="Шаардык / Облустук">Шаардык / Облустук</option>
                    <option value="Райондук">Райондук</option>
                    <option value="Мектептик">Мектептик</option>
                    <option value="Эл аралык">Эл аралык</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Ыйгарылган жылы
                  </label>
                  <input
                    type="text"
                    value={newAchievementYear}
                    onChange={(e) => setNewAchievementYear(e.target.value)}
                    placeholder="2024"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-xs text-slate-800 dark:text-slate-200">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Даяр! Эми эркин иш алып барууга даярсыз.</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  «Сактоо жана аяктоо» баскычын баскандан кийин, сайттан каалаган бөлүмдү түз оңдоп, сертификаттардын сүрөтүн жүктөп, басып чыгарып же JSON файл катары сактап алсаңыз болот.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
          <div>
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Артка</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              Кийинчерээк толтуруу
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-lg shadow-sm transition-all"
            >
              {step === totalSteps ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Сактоо жана аяктоо</span>
                </>
              ) : (
                <>
                  <span>Кийинки кадам</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
