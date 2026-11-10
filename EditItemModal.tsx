import React, { useState } from 'react';
import { X, Check, Upload, Image as ImageIcon } from 'lucide-react';
import { 
  LessonPlan, 
  TeacherAchievement, 
  StudentAchievement, 
  CertificateItem, 
  Course, 
  PublicationItem, 
  ExtracurricularItem, 
  QualificationCategory 
} from '../types/portfolio';

export type EditModalType = 
  | 'personal'
  | 'lesson'
  | 'teacherAchievement'
  | 'studentAchievement'
  | 'certificate'
  | 'course'
  | 'publication'
  | 'extracurricular'
  | 'customSection';

interface EditItemModalProps {
  isOpen: boolean;
  type: EditModalType | null;
  initialData?: any;
  onClose: () => void;
  onSave: (savedData: any) => void;
}

export const EditItemModal: React.FC<EditItemModalProps> = ({
  isOpen,
  type,
  initialData,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<any>(initialData || {});

  // Reset or update formData when modal opens or initialData changes
  React.useEffect(() => {
    setFormData(initialData || {});
  }, [initialData, isOpen, type]);

  if (!isOpen || !type) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev: any) => ({
          ...prev,
          [fieldName]: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl my-8 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/40">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            {type === 'personal' && 'Жеке маалыматтарды оңдоо'}
            {type === 'lesson' && (initialData?.id ? 'Сабак иштелмесин оңдоо' : 'Жаңы сабак иштелмесин кошуу')}
            {type === 'teacherAchievement' && (initialData?.id ? 'Сыйлыкты оңдоо' : 'Жаңы сыйлык кошуу')}
            {type === 'studentAchievement' && (initialData?.id ? 'Окуучунун жетишкендигин оңдоо' : 'Окуучунун жетишкендигин кошуу')}
            {type === 'certificate' && (initialData?.id ? 'Сертификатты оңдоо' : 'Жаңы сертификат кошуу')}
            {type === 'course' && (initialData?.id ? 'Квалификация курсун оңдоо' : 'Жаңы курс кошуу')}
            {type === 'publication' && (initialData?.id ? 'Макала/эмгекти оңдоо' : 'Жаңы эмгек кошуу')}
            {type === 'extracurricular' && (initialData?.id ? 'Иш-чараны оңдоо' : 'Жаңы тарбиялык иш-чара кошуу')}
            {type === 'customSection' && (initialData?.id ? 'Бөлүмдүн жазуусун оңдоо' : 'Жаңы жазуу кошуу')}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          
          {/* PERSONAL INFO */}
          {type === 'personal' && (
            <>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Толук аты-жөнүңүз (ФИО) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName || ''}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Предметиңиз *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject || ''}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Категорияңыз *
                  </label>
                  <select
                    value={formData.category || 'Жогорку категория'}
                    onChange={e => setFormData({ ...formData, category: e.target.value as QualificationCategory })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Жогорку категория">Жогорку категория</option>
                    <option value="1-квалификациялык категория">1-квалификациялык категория</option>
                    <option value="2-квалификациялык категория">2-квалификациялык категория</option>
                    <option value="Категориясы жок (Жаш адис)">Категориясы жок (Жаш адис)</option>
                    <option value="Мугалим-эксперт">Мугалим-эксперт</option>
                    <option value="Мугалим-методист">Мугалим-методист</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Иштеген мектебиңиз / лицейиңиз *
                </label>
                <input
                  type="text"
                  required
                  value={formData.school || ''}
                  onChange={e => setFormData({ ...formData, school: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Педагогикалык стажы (жыл)
                  </label>
                  <input
                    type="number"
                    value={formData.experienceYears ?? 10}
                    onChange={e => setFormData({ ...formData, experienceYears: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Туулган жылы / күнү
                  </label>
                  <input
                    type="text"
                    value={formData.birthDate || ''}
                    onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
                    placeholder="15.04.1988"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Телефон (WhatsApp)
                  </label>
                  <input
                    type="text"
                    value={formData.phone || ''}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Электрондук почта (Email)
                  </label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Педагогикалык кредо (девизиңиз)
                </label>
                <textarea
                  rows={2}
                  value={formData.credo || ''}
                  onChange={e => setFormData({ ...formData, credo: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Сүрөт (Аватар) жүктөө
                </label>
                <div className="flex items-center gap-3">
                  {formData.avatarUrl && (
                    <img 
                      src={formData.avatarUrl} 
                      alt="Аватар" 
                      className="w-12 h-12 rounded-full object-cover border border-slate-300"
                    />
                  )}
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-200 font-medium">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Сүрөт тандоо...</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => handleImageUpload(e, 'avatarUrl')}
                    />
                  </label>
                </div>
              </div>
            </>
          )}

          {/* LESSON PLAN */}
          {type === 'lesson' && (
            <>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Сабактын темасы *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Классы *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.grade || '8-класс'}
                    onChange={e => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Сабактын форматы *
                  </label>
                  <select
                    value={formData.format || 'Ачык сабак'}
                    onChange={e => setFormData({ ...formData, format: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Ачык сабак">Ачык сабак</option>
                    <option value="Интеграцияланган сабак">Интеграцияланган сабак</option>
                    <option value="Мастер-класс">Мастер-класс</option>
                    <option value="Стандарттык сабак">Стандарттык сабак</option>
                    <option value="Видео-сабак">Видео-сабак</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Сабактын максаты *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.goal || ''}
                  onChange={e => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Колдонулган методдор жана технологиялар
                </label>
                <input
                  type="text"
                  value={formData.technologiesUsed || ''}
                  onChange={e => setFormData({ ...formData, technologiesUsed: e.target.value })}
                  placeholder="Мисалы: Блум таксономиясы, Kahoot, топтук иш"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Өтүлгөн датасы же эскертүү
                </label>
                <input
                  type="text"
                  value={formData.date || ''}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  placeholder="Мисалы: 14.02.2025"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
            </>
          )}

          {/* TEACHER ACHIEVEMENT */}
          {type === 'teacherAchievement' && (
            <>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Сыйлыктын / грамотанын толук аталышы *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Сыйлыктын түрү
                  </label>
                  <select
                    value={formData.type || 'Ардак грамота'}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Ардак грамота">Ардак грамота</option>
                    <option value="Диплом">Диплом</option>
                    <option value="Алкыш баракча">Алкыш баракча</option>
                    <option value="Төш белги">Төш белги</option>
                    <option value="Сертификат">Сертификат</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Деңгээли
                  </label>
                  <select
                    value={formData.level || 'Республикалык'}
                    onChange={e => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Мектептик">Мектептик</option>
                    <option value="Райондук">Райондук</option>
                    <option value="Шаардык / Облустук">Шаардык / Облустук</option>
                    <option value="Республикалык">Республикалык</option>
                    <option value="Эл аралык">Эл аралык</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Ким тарабынан ыйгарылган?
                  </label>
                  <input
                    type="text"
                    value={formData.issuedBy || ''}
                    onChange={e => setFormData({ ...formData, issuedBy: e.target.value })}
                    placeholder="Мисалы: Билим берүү жана илим министрлиги"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Ыйгарылган жылы
                  </label>
                  <input
                    type="text"
                    value={formData.year || '2024'}
                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Сыйлыктын түшүндүрмөсү
                </label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Эмне үчүн ыйгарылгандыгы жөнүндө кыскача..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Грамотанын сүрөтү (скан)
                </label>
                <div className="flex items-center gap-3">
                  {formData.imageUrl && (
                    <img 
                      src={formData.imageUrl} 
                      alt="Грамота скан" 
                      className="w-14 h-10 rounded object-cover border border-slate-300"
                    />
                  )}
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-200 font-medium">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Сүрөт жүктөө...</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => handleImageUpload(e, 'imageUrl')}
                    />
                  </label>
                </div>
              </div>
            </>
          )}

          {/* STUDENT ACHIEVEMENT */}
          {type === 'studentAchievement' && (
            <>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Окуучунун аты-жөнү *
                </label>
                <input
                  type="text"
                  required
                  value={formData.studentName || ''}
                  onChange={e => setFormData({ ...formData, studentName: e.target.value })}
                  placeholder="Мисалы: Аскарова Каныкей"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Классы *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.grade || '9-класс'}
                    onChange={e => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Ээлеген орду / Натыйжа *
                  </label>
                  <select
                    value={formData.result || '1-орун'}
                    onChange={e => setFormData({ ...formData, result: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="1-орун">1-орун</option>
                    <option value="2-орун">2-орун</option>
                    <option value="3-орун">3-орун</option>
                    <option value="Гран-при">Гран-при</option>
                    <option value="Лауреат">Лауреат</option>
                    <option value="Катышуучу">Катышуучу</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Олимпиада же сынактын аталышы *
                </label>
                <input
                  type="text"
                  required
                  value={formData.competition || ''}
                  onChange={e => setFormData({ ...formData, competition: e.target.value })}
                  placeholder="Мисалы: Республикалык предметтик олимпиада"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Деңгээли
                  </label>
                  <select
                    value={formData.level || 'Республикалык'}
                    onChange={e => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Райондук">Райондук</option>
                    <option value="Шаардык / Облустук">Шаардык / Облустук</option>
                    <option value="Республикалык">Республикалык</option>
                    <option value="Эл аралык">Эл аралык</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Жылы
                  </label>
                  <input
                    type="text"
                    value={formData.year || '2024'}
                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>
            </>
          )}

          {/* CERTIFICATE */}
          {type === 'certificate' && (
            <>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Сертификаттын аталышы *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Мисалы: Санариптик педагогика жана жасалма интеллект"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Берген уюм (Орган) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.issuer || ''}
                    onChange={e => setFormData({ ...formData, issuer: e.target.value })}
                    placeholder="КББА, РИПК, ж.б."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Датасы же мезгили
                  </label>
                  <input
                    type="text"
                    value={formData.date || ''}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    placeholder="Октябрь, 2024"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Саат көлөмү
                  </label>
                  <input
                    type="text"
                    value={formData.hours || '72 саат'}
                    onChange={e => setFormData({ ...formData, hours: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Категориясы
                  </label>
                  <select
                    value={formData.category || 'Квалификацияны жогорулатуу'}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Квалификацияны жогорулатуу">Квалификацияны жогорулатуу</option>
                    <option value="Семинар / Тренинг">Семинар / Тренинг</option>
                    <option value="Вебинар">Вебинар</option>
                    <option value="Эл аралык стажировка">Эл аралык стажировка</option>
                    <option value="Башка">Башка</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Сертификаттын сүрөтүн жүктөө (скан)
                </label>
                <div className="flex items-center gap-3">
                  {formData.imageUrl && (
                    <img 
                      src={formData.imageUrl} 
                      alt="Сертификат скан" 
                      className="w-16 h-12 rounded object-cover border border-slate-300"
                    />
                  )}
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-200 font-medium">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Файл тандоо (Сүрөт / Скан)...</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => handleImageUpload(e, 'imageUrl')}
                    />
                  </label>
                </div>
              </div>
            </>
          )}

          {/* COURSE */}
          {type === 'course' && (
            <>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Курстун темасы *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Мисалы: Заманбап билим берүү технологиялары"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Уюштурган мекеме (КББА, РИПК, ж.б.) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.organizer || ''}
                  onChange={e => setFormData({ ...formData, organizer: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Өткөрүлгөн жылы
                  </label>
                  <input
                    type="text"
                    value={formData.year || '2024'}
                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Саат көлөмү
                  </label>
                  <input
                    type="text"
                    value={formData.hours || '72 саат'}
                    onChange={e => setFormData({ ...formData, hours: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Сертификаттын номери (эгер бар болсо)
                </label>
                <input
                  type="text"
                  value={formData.certificateNumber || ''}
                  onChange={e => setFormData({ ...formData, certificateNumber: e.target.value })}
                  placeholder="Мисалы: КББА-№2024/582"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
            </>
          )}

          {/* PUBLICATION */}
          {type === 'publication' && (
            <>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Эмгектин же макаланын темасы *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Түрү
                  </label>
                  <select
                    value={formData.type || 'Макала'}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Макала">Макала</option>
                    <option value="Методикалык колдонмо">Методикалык колдонмо</option>
                    <option value="Автордук программа">Автордук программа</option>
                    <option value="Тезис">Тезис</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Жарыяланган жылы
                  </label>
                  <input
                    type="text"
                    value={formData.year || '2024'}
                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Журналдын / жыйнактын аталышы жана беттери
                </label>
                <input
                  type="text"
                  value={formData.journal || ''}
                  onChange={e => setFormData({ ...formData, journal: e.target.value })}
                  placeholder="Мисалы: «Эл агартуу» журналы, №4, 45-51-беттер"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Кыскача мазмуну же шилтеме
                </label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
            </>
          )}

          {/* EXTRACURRICULAR */}
          {type === 'extracurricular' && (
            <>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Иш-чаранын аталышы *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Иштин түрү
                  </label>
                  <select
                    value={formData.type || 'Тарбиялык саат'}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Тарбиялык саат">Тарбиялык саат</option>
                    <option value="Адабий кече">Адабий кече</option>
                    <option value="Ийрим (Кружок)">Ийрим (Кружок)</option>
                    <option value="Ата-энелер жыйыны">Ата-энелер жыйыны</option>
                    <option value="Экскурсия / Саякат">Экскурсия / Саякат</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Классы
                  </label>
                  <input
                    type="text"
                    value={formData.grade || '9-класс'}
                    onChange={e => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Датасы же мезгили
                </label>
                <input
                  type="text"
                  value={formData.date || ''}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  placeholder="23-сентябрь, 2024"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Түшүндүрмөсү жана максаты
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
            </>
          )}

          {/* CUSTOM SECTION ITEM */}
          {type === 'customSection' && (
            <>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Аталышы *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Кошумча маалымат (подзаголовок)
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle || ''}
                    onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Датасы / Жылы
                  </label>
                  <input
                    type="text"
                    value={formData.date || ''}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Мазмуну
                </label>
                <textarea
                  rows={3}
                  value={formData.content || ''}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
            </>
          )}

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              Жокко чыгаруу
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-lg shadow-sm transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Сактоо</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
