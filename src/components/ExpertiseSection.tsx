import { useState } from "react";
import ExpertiseTypeSelector from "@/components/expertise/ExpertiseTypeSelector";
import ExpertiseQuestions from "@/components/expertise/ExpertiseQuestions";
import ExpertiseResults from "@/components/expertise/ExpertiseResults";

type ExpertiseType = 
  | "financial" 
  | "accounting" 
  | "property" 
  | "business" 
  | "technical" 
  | null;

interface Expert {
  id: number;
  name: string;
  specialization: string;
  experience: number;
  cases: number;
  rating: number;
  price: string;
  certifications: string[];
  available: boolean;
  avatar: string;
  avatarBg: string;
}

const experts: Expert[] = [
  {
    id: 1,
    name: "Петров Игорь Михайлович",
    specialization: "Финансовая экспертиза",
    experience: 12,
    cases: 89,
    rating: 4.9,
    price: "от 50 000 ₽",
    certifications: ["Аттестат эксперта-бухгалтера", "Член СРО"],
    available: true,
    avatar: "ПИ",
    avatarBg: "bg-blue-500"
  },
  {
    id: 2,
    name: "Смирнова Елена Викторовна",
    specialization: "Бухгалтерская экспертиза",
    experience: 15,
    cases: 124,
    rating: 5.0,
    price: "от 45 000 ₽",
    certifications: ["Эксперт ТПП РФ", "Аудитор"],
    available: true,
    avatar: "СЕ",
    avatarBg: "bg-purple-500"
  },
  {
    id: 3,
    name: "Козлов Дмитрий Александрович",
    specialization: "Оценка имущества",
    experience: 10,
    cases: 67,
    rating: 4.8,
    price: "от 35 000 ₽",
    certifications: ["Оценщик 1 категории", "Член СРО"],
    available: false,
    avatar: "КД",
    avatarBg: "bg-green-500"
  },
  {
    id: 4,
    name: "Васильева Ольга Сергеевна",
    specialization: "Оценка бизнеса",
    experience: 14,
    cases: 92,
    rating: 4.9,
    price: "от 60 000 ₽",
    certifications: ["Оценщик высшей категории", "MBA"],
    available: true,
    avatar: "ВО",
    avatarBg: "bg-pink-500"
  },
  {
    id: 5,
    name: "Морозов Андрей Петрович",
    specialization: "Техническая экспертиза",
    experience: 11,
    cases: 78,
    rating: 4.7,
    price: "от 40 000 ₽",
    certifications: ["Инженер-эксперт", "Член СРО"],
    available: true,
    avatar: "МА",
    avatarBg: "bg-orange-500"
  }
];

const ExpertiseSection = () => {
  const [step, setStep] = useState<"type" | "questions" | "results">("type");
  const [expertiseType, setExpertiseType] = useState<ExpertiseType>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [selectedExperts, setSelectedExperts] = useState<number[]>([]);

  const resetDiagnostic = () => {
    setStep("type");
    setExpertiseType(null);
    setAnswers({});
    setSelectedExperts([]);
  };

  const startQuestions = (type: ExpertiseType) => {
    setExpertiseType(type);
    setStep("questions");
  };

  const finishQuestions = () => {
    setStep("results");
  };

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const toggleExpert = (expertId: number) => {
    setSelectedExperts(prev => 
      prev.includes(expertId) 
        ? prev.filter(id => id !== expertId)
        : [...prev, expertId]
    );
  };

  const getFilteredExperts = () => {
    if (!expertiseType) return experts;
    
    const typeMap: Record<string, string[]> = {
      financial: ["Финансовая экспертиза"],
      accounting: ["Бухгалтерская экспертиза"],
      property: ["Оценка имущества"],
      business: ["Оценка бизнеса"],
      technical: ["Техническая экспертиза"]
    };

    return experts.filter(expert => 
      typeMap[expertiseType]?.includes(expert.specialization)
    );
  };

  if (step === "type") {
    return <ExpertiseTypeSelector onSelectType={startQuestions} />;
  }

  if (step === "questions") {
    return (
      <ExpertiseQuestions
        answers={answers}
        onAnswer={handleAnswer}
        onFinish={finishQuestions}
        onReset={resetDiagnostic}
      />
    );
  }

  const filteredExperts = getFilteredExperts();

  return (
    <ExpertiseResults
      expertiseType={expertiseType}
      experts={filteredExperts}
      selectedExperts={selectedExperts}
      onToggleExpert={toggleExpert}
      onReset={resetDiagnostic}
    />
  );
};

export default ExpertiseSection;