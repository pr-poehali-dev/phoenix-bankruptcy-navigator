import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import ScrollReveal from "@/components/ScrollReveal";

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
    available: true
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
    available: true
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
    available: false
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
    available: true
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
    available: true
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
    return (
      <section id="expertise" className="py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5 relative">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Судебная экспертиза</h2>
              <p className="text-lg text-muted-foreground">
                Профессиональная экспертиза для судебных разбирательств и банкротства
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card 
                className="shadow-md border-primary/20 hover:border-primary hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => startQuestions("financial")}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                    <Icon name="TrendingUp" size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-center">Финансовая экспертиза</CardTitle>
                  <CardDescription className="text-center">
                    Анализ финансовых операций, выявление признаков банкротства
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card 
                className="shadow-md border-accent/30 hover:border-accent hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => startQuestions("accounting")}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-accent/15 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-accent/30 transition-colors">
                    <Icon name="Calculator" size={32} className="text-accent" />
                  </div>
                  <CardTitle className="text-center">Бухгалтерская экспертиза</CardTitle>
                  <CardDescription className="text-center">
                    Проверка бухгалтерской отчетности, выявление ошибок и нарушений
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card 
                className="shadow-md border-primary/20 hover:border-primary hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => startQuestions("property")}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                    <Icon name="Home" size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-center">Оценка имущества</CardTitle>
                  <CardDescription className="text-center">
                    Независимая оценка недвижимости, транспорта, ценностей
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card 
                className="shadow-md border-accent/30 hover:border-accent hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => startQuestions("business")}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-accent/15 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-accent/30 transition-colors">
                    <Icon name="Building" size={32} className="text-accent" />
                  </div>
                  <CardTitle className="text-center">Оценка бизнеса</CardTitle>
                  <CardDescription className="text-center">
                    Оценка стоимости компании, активов, долей участия
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card 
                className="shadow-md border-primary/20 hover:border-primary hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => startQuestions("technical")}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                    <Icon name="Cpu" size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-center">Техническая экспертиза</CardTitle>
                  <CardDescription className="text-center">
                    Экспертиза оборудования, технологий, производственных активов
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="shadow-md border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Icon name="HelpCircle" size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-center">Не знаете, что выбрать?</CardTitle>
                  <CardDescription className="text-center">
                    Свяжитесь с нами для бесплатной консультации
                  </CardDescription>
                  <Button variant="outline" className="mt-4">
                    <Icon name="MessageSquare" size={16} className="mr-2" />
                    Получить консультацию
                  </Button>
                </CardHeader>
              </Card>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <Card className="mt-12 bg-card shadow-md">
              <CardHeader>
                <CardTitle className="text-center">Зачем нужна судебная экспертиза?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="Scale" className="text-primary" size={24} />
                    </div>
                    <h4 className="font-semibold mb-2">Доказательная база</h4>
                    <p className="text-sm text-muted-foreground">
                      Заключение эксперта принимается судом как весомое доказательство
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-accent/15 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="ShieldCheck" className="text-accent" size={24} />
                    </div>
                    <h4 className="font-semibold mb-2">Независимость</h4>
                    <p className="text-sm text-muted-foreground">
                      Объективная оценка от сертифицированных экспертов
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="FileCheck" className="text-primary" size={24} />
                    </div>
                    <h4 className="font-semibold mb-2">Юридическая сила</h4>
                    <p className="text-sm text-muted-foreground">
                      Заключение оформляется по всем требованиям законодательства
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  if (step === "questions") {
    return (
      <section id="expertise" className="py-20 px-4 bg-card relative">
        <div className="container mx-auto max-w-4xl">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <CardTitle className="text-2xl">Диагностика потребности</CardTitle>
                  <CardDescription>
                    Ответьте на вопросы для подбора подходящего эксперта
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={resetDiagnostic}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 border rounded-lg space-y-4">
                <Label className="text-base font-medium">
                  Для каких целей требуется экспертиза?
                </Label>
                <div className="space-y-3">
                  {[
                    { id: "bankruptcy", label: "Процедура банкротства" },
                    { id: "dispute", label: "Судебный спор" },
                    { id: "verification", label: "Проверка документов" },
                    { id: "valuation", label: "Определение стоимости" }
                  ].map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={option.id}
                        checked={answers.purposes?.includes(option.id)}
                        onCheckedChange={(checked) => {
                          const current = answers.purposes || [];
                          setAnswers({
                            ...answers,
                            purposes: checked 
                              ? [...current, option.id]
                              : current.filter((p: string) => p !== option.id)
                          });
                        }}
                      />
                      <Label htmlFor={option.id} className="cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border rounded-lg space-y-4">
                <Label className="text-base font-medium">
                  Срочность проведения экспертизы?
                </Label>
                <RadioGroup 
                  value={answers.urgency} 
                  onValueChange={(v) => setAnswers({ ...answers, urgency: v })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="urgent" id="urgent" />
                    <Label htmlFor="urgent">Срочно (до 7 дней)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="normal" />
                    <Label htmlFor="normal">Обычная (2-3 недели)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="planned" id="planned" />
                    <Label htmlFor="planned">Плановая (1-2 месяца)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="p-4 border rounded-lg space-y-4">
                <Label className="text-base font-medium">
                  Бюджет на экспертизу?
                </Label>
                <RadioGroup 
                  value={answers.budget} 
                  onValueChange={(v) => setAnswers({ ...answers, budget: v })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low">До 50 000 ₽</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">50 000 - 100 000 ₽</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high">Более 100 000 ₽</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button 
                onClick={finishQuestions} 
                className="w-full"
                disabled={!answers.purposes || !answers.urgency || !answers.budget}
              >
                Подобрать экспертов
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  const filteredExperts = getFilteredExperts();

  return (
    <section id="expertise" className="py-20 px-4 bg-card relative">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <Button variant="ghost" onClick={resetDiagnostic} className="mb-4">
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Назад
          </Button>
          <h2 className="text-3xl font-bold mb-2">Подходящие эксперты</h2>
          <p className="text-muted-foreground">
            Специалисты по направлению: {expertiseType === "financial" ? "Финансовая экспертиза" : 
            expertiseType === "accounting" ? "Бухгалтерская экспертиза" :
            expertiseType === "property" ? "Оценка имущества" :
            expertiseType === "business" ? "Оценка бизнеса" : "Техническая экспертиза"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredExperts.map((expert) => (
            <Card key={expert.id} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="User" className="text-primary" size={32} />
                    </div>
                    <div>
                      <CardTitle className="mb-1">{expert.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{expert.specialization}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Icon name="Star" className="text-yellow-500" size={14} />
                          <span className="text-sm font-medium">{expert.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Icon name="Briefcase" size={14} />
                          <span>{expert.cases} дел</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Icon name="Award" size={14} />
                          <span>{expert.experience} лет</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {expert.available ? (
                    <Badge className="bg-green-500">Доступен</Badge>
                  ) : (
                    <Badge variant="secondary">Занят</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Квалификация:</p>
                  <div className="flex flex-wrap gap-2">
                    {expert.certifications.map((cert, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        <Icon name="Award" size={12} className="mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Стоимость</p>
                    <p className="text-lg font-bold text-primary">{expert.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedExperts(prev => 
                          prev.includes(expert.id) 
                            ? prev.filter(id => id !== expert.id)
                            : [...prev, expert.id]
                        );
                      }}
                    >
                      <Icon 
                        name={selectedExperts.includes(expert.id) ? "Check" : "Plus"} 
                        size={16} 
                        className="mr-2" 
                      />
                      {selectedExperts.includes(expert.id) ? "Выбран" : "Выбрать"}
                    </Button>
                    <Button size="sm" disabled={!expert.available}>
                      <Icon name="MessageSquare" size={16} className="mr-2" />
                      Написать
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedExperts.length > 0 && (
          <Card className="mt-8 shadow-lg border-primary/30">
            <CardHeader>
              <CardTitle>Выбрано экспертов: {selectedExperts.length}</CardTitle>
              <CardDescription>Отправить запрос на проведение экспертизы</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg">
                <Icon name="Send" size={16} className="mr-2" />
                Отправить запрос выбранным экспертам
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default ExpertiseSection;
