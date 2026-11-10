export type QualificationCategory = 
  | 'Жогорку категория'
  | '1-квалификациялык категория'
  | '2-квалификациялык категория'
  | 'Категориясы жок (Жаш адис)'
  | 'Мугалим-эксперт'
  | 'Мугалим-методист';

export interface Course {
  id: string;
  title: string;
  organizer: string;
  year: string;
  hours: string;
  certificateNumber?: string;
  certificateUrl?: string;
}

export interface EducationData {
  university: string;
  faculty: string;
  specialty: string;
  degree: string;
  gradYear: string;
  diplomaNumber?: string;
  courses: Course[];
}

export interface MethodologyData {
  topic: string;
  goal: string;
  methods: string[];
  technologies: string[];
  principles: string[];
}

export interface LessonPlan {
  id: string;
  title: string;
  grade: string;
  subject: string;
  date: string;
  format: 'Ачык сабак' | 'Интеграцияланган сабак' | 'Мастер-класс' | 'Стандарттык сабак' | 'Видео-сабак';
  goal: string;
  technologiesUsed: string;
  materialsUrl?: string;
  notes?: string;
}

export interface TeacherAchievement {
  id: string;
  title: string;
  issuedBy: string;
  year: string;
  level: 'Мектептик' | 'Райондук' | 'Шаардык / Облустук' | 'Республикалык' | 'Эл аралык';
  type: 'Ардак грамота' | 'Диплом' | 'Алкыш баракча' | 'Төш белги' | 'Сертификат';
  imageUrl?: string;
  description?: string;
}

export interface StudentAchievement {
  id: string;
  studentName: string;
  grade: string;
  competition: string;
  level: 'Райондук' | 'Шаардык / Облустук' | 'Республикалык' | 'Эл аралык';
  result: '1-орун' | '2-орун' | '3-орун' | 'Гран-при' | 'Лауреат' | 'Катышуучу';
  year: string;
  rewardTitle?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  hours?: string;
  category: 'Квалификацияны жогорулатуу' | 'Семинар / Тренинг' | 'Вебинар' | 'Эл аралык стажировка' | 'Башка';
  imageUrl: string;
}

export interface PublicationItem {
  id: string;
  title: string;
  journal: string;
  year: string;
  pages?: string;
  link?: string;
  type: 'Макала' | 'Методикалык колдонмо' | 'Автордук программа' | 'Тезис';
  description?: string;
}

export interface ExtracurricularItem {
  id: string;
  title: string;
  type: 'Тарбиялык саат' | 'Адабий кече' | 'Ийрим (Кружок)' | 'Ата-энелер жыйыны' | 'Экскурсия / Саякат';
  date: string;
  grade: string;
  description: string;
  photos?: string[];
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  content: string;
}

export interface CustomSection {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  items: CustomSectionItem[];
}

export interface PersonalInfo {
  fullName: string;
  subject: string;
  school: string;
  category: QualificationCategory;
  experienceYears: number;
  credo: string;
  avatarUrl: string;
  email: string;
  phone: string;
  address: string;
  birthDate?: string;
  pedagogicalAwards?: string[];
}

export interface TeacherPortfolio {
  personal: PersonalInfo;
  education: EducationData;
  methodology: MethodologyData;
  lessons: LessonPlan[];
  teacherAchievements: TeacherAchievement[];
  studentAchievements: StudentAchievement[];
  certificates: CertificateItem[];
  publications: PublicationItem[];
  extracurricular: ExtracurricularItem[];
  customSections: CustomSection[];
  lastUpdated: string;
}
