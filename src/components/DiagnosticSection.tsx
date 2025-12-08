import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import ScrollReveal from "@/components/ScrollReveal";

type ClientType = "individual" | "legal" | null;
type QuestionLevel = number;

interface DiagnosticResult {
  prospects: string;
  risks: string[];
  alternatives: string[];
  strategy: string;
  nextSteps: string;
}

const DiagnosticSection = () => {
  const [clientType, setClientType] = useState<ClientType>(null);
  const [currentLevel, setCurrentLevel] = useState<QuestionLevel>(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const resetDiagnostic = () => {
    setClientType(null);
    setCurrentLevel(0);
    setAnswers({});
    setResult(null);
  };

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const nextLevel = () => {
    setCurrentLevel(currentLevel + 1);
  };

  const calculateIndividualResult = (): DiagnosticResult => {
    const risks: string[] = [];
    const alternatives: string[] = [];
    let prospects = "";
    let strategy = "";
    let nextSteps = "";

    // Уровень 1: Формальные критерии
    if (!answers.q1 && !answers.q1_1) {
      prospects = "НИЗКИЕ";
      strategy = "Формальные основания для банкротства отсутствуют.";
      alternatives.push("Переговоры с кредиторами");
      alternatives.push("Реструктуризация долгов без суда");
      nextSteps = "Рекомендуем обратиться к специалистам для разработки плана переговоров с кредиторами.";
      return { prospects, risks, alternatives, strategy, nextSteps };
    }

    // Уровень 2: Платежеспособность
    let paymentFlag = "";
    if (answers.q2 === "high") {
      paymentFlag = "Высокая неплатежеспособность";
      risks.push("Высокая неплатежеспособность - платежи превышают доход в 1.5+ раза");
    } else if (answers.q2 === "medium") {
      paymentFlag = "Ограниченная платежеспособность";
      risks.push("Ограниченная платежеспособность - возможна реструктуризация");
    } else {
      paymentFlag = "Техническая неплатежеспособность";
      risks.push("Техническая неплатежеспособность - суд может отказать");
    }

    // Уровень 3: Имущественные риски
    let assetFlag = "";
    if (answers.q3) {
      assetFlag = "Высокий имущественный риск";
      risks.push(`Высокий имущественный риск. В конкурсную массу может быть включено: ${answers.q3_details || "ценное имущество"}`);
      alternatives.push("Рассмотрите варианты законной защиты имущества");
    } else {
      assetFlag = "Низкий имущественный риск";
      risks.push("Низкий имущественный риск - основное имущество защищено от взыскания");
    }

    // Уровень 4: Альтернативы
    if (answers.q4) {
      alternatives.push("Внесудебное банкротство через МФЦ (сумма долга < 500 000 руб.)");
    }
    if (answers.q5) {
      alternatives.push("Реструктуризация долгов в суде - приоритетная процедура для сохранения имущества");
      strategy = "Рассмотреть реструктуризацию долгов как приоритетную процедуру. Это позволит сохранить имущество.";
    } else {
      alternatives.push("Реализация имущества как наиболее вероятная процедура");
    }

    // Уровень 5: Итоговая оценка
    if (paymentFlag === "Высокая неплатежеспособность" && assetFlag === "Низкий имущественный риск") {
      prospects = "ВЫСОКИЕ";
      strategy = "Процедура банкротства рекомендуется как эффективный способ списания долгов.";
      nextSteps = "Рекомендуем подготовить пакет документов и обратиться за консультацией для подачи заявления в суд.";
    } else if (paymentFlag === "Высокая неплатежеспособность" && assetFlag === "Высокий имущественный риск") {
      prospects = "СРЕДНИЕ/ВЫСОКИЕ";
      strategy = "Процедура возможна, но сопряжена с риском потери имущества. Требуется детальная оценка сделок за 3 года.";
      nextSteps = "Для точного анализа и защиты ваших интересов рекомендуем обратиться за платной консультацией, особенно важно: аудит сделок за 3 года.";
    } else if (paymentFlag === "Ограниченная платежеспособность") {
      prospects = "СРЕДНИЕ";
      strategy = "Суд, скорее всего, введет процедуру реструктуризации. Важно подготовить ее проект.";
      nextSteps = "Рекомендуем разработать план реструктуризации с финансовым консультантом.";
    } else {
      prospects = "НИЗКИЕ";
      strategy = "Высок риск отказа суда или оставления заявления без рассмотрения. Рекомендуем договариваться с кредиторами.";
      nextSteps = "Начните переговоры с кредиторами о мировом соглашении или рассрочке.";
    }

    return { prospects, risks, alternatives, strategy, nextSteps };
  };

  const calculateLegalResult = (): DiagnosticResult => {
    const risks: string[] = [];
    const alternatives: string[] = [];
    let prospects = "";
    let strategy = "";
    let nextSteps = "";

    // Уровень 1: Цели
    const goals = answers.q_legal_1 || [];
    if (goals.includes("А")) risks.push("Цель: Законная ликвидация компании с долгами");
    if (goals.includes("Б")) risks.push("Цель: Попытка сохранения бизнеса/активов");
    if (goals.includes("В")) risks.push("Цель: Избежание субсидиарной ответственности");

    // Уровень 2: Признаки несостоятельности
    if (!answers.q_legal_2) {
      prospects = "НИЗКИЕ";
      strategy = "Нет безусловных признаков несостоятельности.";
      alternatives.push("Добровольная ликвидация");
      alternatives.push("Досудебная санация");
      nextSteps = "Рассмотрите возможность добровольной ликвидации или реструктуризации долгов без суда.";
      return { prospects, risks, alternatives, strategy, nextSteps };
    }

    // Уровень 3: Критические риски
    if (answers.q_legal_3) {
      risks.push("⚠️ КРИТИЧЕСКИЙ РИСК: Задолженность по зарплате. Приоритетные требования. Высокий риск субсидиарной ответственности.");
    }
    if (answers.q_legal_4) {
      risks.push("Высокий интерес ФНС - налоговая будет активным кредитором");
    }
    if (answers.q_legal_5) {
      risks.push("Деятельность парализована арестами - банкротство может быть единственным путем снять аресты");
    }
    if (!answers.q_legal_6) {
      risks.push("⚠️ Признак фактического банкротства. Риск привлечения к субсидиарной ответственности повышен.");
    }

    // Уровень 4: Активы и сделки
    let assetFlag = "";
    if (answers.q_legal_7) {
      assetFlag = "Есть конкурсная масса";
      risks.push("Имеются ликвидные активы - они пойдут на расчет с кредиторами");
    } else {
      assetFlag = "Компания-пустышка";
      risks.push("⚠️ КРИТИЧЕСКИЙ РИСК: Компания без активов. Внимание суда к действиям руководства максимальное. Риск субсидиарной ответственности крайне высок.");
    }
    if (answers.q_legal_8) {
      risks.push("⚠️ Высокий риск оспаривания сделок за последние 3 года. Необходим срочный предварительный аудит.");
      nextSteps = "СРОЧНО: провести аудит сделок за 3 года для минимизации риска оспаривания и взыскания.";
    }

    // Уровень 5: Итоговая оценка
    if (answers.q_legal_3 || !answers.q_legal_6) {
      prospects = "100% (КРИТИЧЕСКАЯ СИТУАЦИЯ)";
      strategy = "Рекомендуется СРОЧНО начать подготовку к подаче заявления от должника, чтобы контролировать процесс.";
      nextSteps = nextSteps || "Немедленно обратитесь к специалистам для подготовки заявления о банкротстве от должника.";
    } else if (answers.q_legal_5 && answers.q_legal_7) {
      prospects = "ВЫСОКИЕ";
      strategy = "Процедура наблюдения позволит снять аресты и оценить возможности восстановления платежеспособности.";
      nextSteps = nextSteps || "Подготовьте заявление о введении процедуры наблюдения.";
    } else if (assetFlag === "Компания-пустышка" && answers.q_legal_8) {
      prospects = "ВЫСОКИЕ для банкротства, КРИТИЧЕСКИЕ для учредителей";
      strategy = "Первоочередная задача — анализ и минимизация риска субсидиарной ответственности.";
      nextSteps = nextSteps || "Для защиты интересов учредителей необходим детальный аудит сделок и консультация по субсидиарной ответственности.";
    } else if (answers.q_legal_2 && answers.q_legal_6 && answers.q_legal_7) {
      prospects = "СРЕДНИЕ";
      strategy = "Возможны варианты финансового оздоровления или внешнего управления.";
      alternatives.push("Финансовое оздоровление");
      alternatives.push("Внешнее управление");
      nextSteps = nextSteps || "Требуется анализ возможности восстановления платежеспособности.";
    }

    return { prospects, risks, alternatives, strategy, nextSteps };
  };

  const finishDiagnostic = () => {
    const diagnosticResult = clientType === "individual" 
      ? calculateIndividualResult() 
      : calculateLegalResult();
    setResult(diagnosticResult);
  };

  const renderIndividualQuestions = () => {
    switch (currentLevel) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Уровень 1: Формальные критерии банкротства</h3>
            <p className="text-sm text-muted-foreground">Статья 213.4 Закона о банкротстве</p>
            
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <Label className="text-base font-medium mb-2 block">
                  Сумма общих долгов больше 500 000 руб.?
                </Label>
                <RadioGroup value={answers.q1 ? "yes" : "no"} onValueChange={(v) => handleAnswer("q1", v === "yes")}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="q1-yes" />
                    <Label htmlFor="q1-yes">Да</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="q1-no" />
                    <Label htmlFor="q1-no">Нет</Label>
                  </div>
                </RadioGroup>
              </div>

              {answers.q1 === false && (
                <div className="p-4 border rounded-lg animate-fade-in">
                  <Label className="text-base font-medium mb-2 block">
                    Просрочка по долгам больше 3 месяцев и сумма долгов больше 25 000 руб.?
                  </Label>
                  <RadioGroup value={answers.q1_1 ? "yes" : "no"} onValueChange={(v) => handleAnswer("q1_1", v === "yes")}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="q1_1-yes" />
                      <Label htmlFor="q1_1-yes">Да</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="q1_1-no" />
                      <Label htmlFor="q1_1-no">Нет</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
            </div>

            <Button 
              onClick={answers.q1 || answers.q1_1 !== undefined ? nextLevel : finishDiagnostic}
              className="w-full"
              disabled={answers.q1 === undefined && answers.q1_1 === undefined}
            >
              {answers.q1 || answers.q1_1 ? "Далее" : "Показать результат"}
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Уровень 2: Анализ платежеспособности</h3>
            
            <div className="p-4 border rounded-lg">
              <Label className="text-base font-medium mb-3 block">
                Ежемесячные платежи по долгам превышают (Доход - Прожиточный минимум)?
              </Label>
              <RadioGroup value={answers.q2} onValueChange={(v) => handleAnswer("q2", v)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="q2-high" />
                  <Label htmlFor="q2-high">Да, значительно (в 1.5 раза и более)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="q2-medium" />
                  <Label htmlFor="q2-medium">Да, незначительно</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="q2-low" />
                  <Label htmlFor="q2-low">Нет</Label>
                </div>
              </RadioGroup>
            </div>

            <Button onClick={nextLevel} className="w-full" disabled={!answers.q2}>
              Далее
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Уровень 3: Имущественные риски</h3>
            
            <div className="p-4 border rounded-lg space-y-3">
              <Label className="text-base font-medium mb-2 block">
                Имеется ли имущество, не защищенное от взыскания (ст. 446 ГПК)?
              </Label>
              <p className="text-sm text-muted-foreground">
                Например: вторая квартира, дорогой автомобиль не для работы, дорогие активы
              </p>
              <RadioGroup value={answers.q3 ? "yes" : "no"} onValueChange={(v) => handleAnswer("q3", v === "yes")}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="q3-yes" />
                  <Label htmlFor="q3-yes">Да</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="q3-no" />
                  <Label htmlFor="q3-no">Нет (только единственное жилье, скромная бытовая техника)</Label>
                </div>
              </RadioGroup>

              {answers.q3 && (
                <div className="mt-3">
                  <Label htmlFor="q3_details" className="text-sm">Укажите имущество (необязательно)</Label>
                  <Input 
                    id="q3_details"
                    placeholder="Например: вторая квартира, автомобиль..."
                    value={answers.q3_details || ""}
                    onChange={(e) => handleAnswer("q3_details", e.target.value)}
                  />
                </div>
              )}
            </div>

            <Button onClick={nextLevel} className="w-full" disabled={answers.q3 === undefined}>
              Далее
            </Button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Уровень 4: Альтернативы</h3>
            
            <div className="p-4 border rounded-lg">
              <Label className="text-base font-medium mb-2 block">
                Сумма долга меньше 500 000 руб. и нет имущества, кроме защищенного?
              </Label>
              <RadioGroup value={answers.q4 ? "yes" : "no"} onValueChange={(v) => handleAnswer("q4", v === "yes")}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="q4-yes" />
                  <Label htmlFor="q4-yes">Да</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="q4-no" />
                  <Label htmlFor="q4-no">Нет</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="p-4 border rounded-lg">
              <Label className="text-base font-medium mb-2 block">
                Есть ли официальный доход, позволяющий выплачивать 50-80% долга за 3 года?
              </Label>
              <RadioGroup value={answers.q5 ? "yes" : "no"} onValueChange={(v) => handleAnswer("q5", v === "yes")}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="q5-yes" />
                  <Label htmlFor="q5-yes">Да</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="q5-no" />
                  <Label htmlFor="q5-no">Нет</Label>
                </div>
              </RadioGroup>
            </div>

            <Button 
              onClick={finishDiagnostic} 
              className="w-full"
              disabled={answers.q4 === undefined || answers.q5 === undefined}
            >
              Получить результат
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  const renderLegalQuestions = () => {
    switch (currentLevel) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Уровень 1: Цели и первичная диагностика</h3>
            
            <div className="p-4 border rounded-lg">
              <Label className="text-base font-medium mb-3 block">
                Какая основная цель? (можно выбрать несколько)
              </Label>
              <div className="space-y-2">
                {[
                  { id: "А", text: "Законно ликвидировать компанию с долгами" },
                  { id: "Б", text: "Попытаться сохранить бизнес/активы" },
                  { id: "В", text: "Избежать субсидиарной ответственности учредителей/руководителя" }
                ].map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`goal-${option.id}`}
                      checked={(answers.q_legal_1 || []).includes(option.id)}
                      onChange={(e) => {
                        const current = answers.q_legal_1 || [];
                        const updated = e.target.checked 
                          ? [...current, option.id]
                          : current.filter((g: string) => g !== option.id);
                        handleAnswer("q_legal_1", updated);
                      }}
                      className="w-4 h-4"
                    />
                    <Label htmlFor={`goal-${option.id}`} className="font-normal">
                      {option.id}. {option.text}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={nextLevel} 
              className="w-full"
              disabled={!answers.q_legal_1 || answers.q_legal_1.length === 0}
            >
              Далее
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Уровень 2: Признаки несостоятельности</h3>
            <p className="text-sm text-muted-foreground">Статья 3 Закона о банкротстве</p>
            
            <div className="p-4 border rounded-lg">
              <Label className="text-base font-medium mb-2 block">
                Задолженность больше 2 000 000 руб. и просрочка больше 3 месяцев?
              </Label>
              <RadioGroup value={answers.q_legal_2 ? "yes" : "no"} onValueChange={(v) => handleAnswer("q_legal_2", v === "yes")}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="q_legal_2-yes" />
                  <Label htmlFor="q_legal_2-yes">Да</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="q_legal_2-no" />
                  <Label htmlFor="q_legal_2-no">Нет</Label>
                </div>
              </RadioGroup>
            </div>

            <Button 
              onClick={answers.q_legal_2 ? nextLevel : finishDiagnostic}
              className="w-full"
              disabled={answers.q_legal_2 === undefined}
            >
              {answers.q_legal_2 ? "Далее" : "Показать результат"}
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Уровень 3: Критические риски</h3>
            
            <div className="p-4 border rounded-lg">
              <Label className="text-base font-medium mb-2 block">
                Есть ли задолженность по зарплате/авторским вознаграждениям?
              </Label>
              <RadioGroup value={answers.q_legal_3 ? "yes" : "no"} onValueChange={(v) => handleAnswer("q_legal_3", v === "yes")}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="q_legal_3-yes" />
                  <Label htmlFor="q_legal_3-yes">Да</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="q_legal_3-no" />
                  <Label htmlFor="q_legal_3-no">Нет</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="p-4 border rounded-lg">
              <Label className="text-base font-medium mb-2 block">
                Есть ли задолженность по налогам и страховым взносам?
              </Label>
              <RadioGroup value={answers.q_legal_4 ? "yes" : "no"} onValueChange={(v) => handleAnswer("q_legal_4", v === "yes")}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="q_legal_4-yes" />
                  <Label htmlFor="q_legal_4-yes">Да</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="q_legal_4-no" />
                  <Label htmlFor="q_legal_4-no">Нет</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="p-4 border rounded-lg">
              <Label className="text-base font-medium mb-2 block">
                Есть ли аресты на счетах и имуществе по исполнительным производствам?
              </Label>
              <RadioGroup value={answers.q_legal_5 ? "yes" : "no"} onValueChange={(v) => handleAnswer("q_legal_5", v === "yes")}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="q_legal_5-yes" />
                  <Label htmlFor="q_legal_5-yes">Да</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="q_legal_5-no" />
                  <Label htmlFor="q_legal_5-no">Нет</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="p-4 border rounded-lg">
              <Label className="text-base font-medium mb-2 block">
                Осуществляется ли хозяйственная деятельность в последние 12 месяцев?
              </Label>
              <RadioGroup value={answers.q_legal_6 ? "yes" : "no"} onValueChange={(v) => handleAnswer("q_legal_6", v === "yes")}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="q_legal_6-yes" />
                  <Label htmlFor="q_legal_6-yes">Да</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="q_legal_6-no" />
                  <Label htmlFor="q_legal_6-no">Нет</Label>
                </div>
              </RadioGroup>
            </div>

            <Button 
              onClick={nextLevel}
              className="w-full"
              disabled={answers.q_legal_3 === undefined || answers.q_legal_4 === undefined || 
                       answers.q_legal_5 === undefined || answers.q_legal_6 === undefined}
            >
              Далее
            </Button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Уровень 4: Анализ активов и сделок</h3>
            
            <div className="p-4 border rounded-lg">
              <Label className="text-base font-medium mb-2 block">
                Имеются ли у компании ликвидные активы (недвижимость, оборудование, товары)?
              </Label>
              <RadioGroup value={answers.q_legal_7 ? "yes" : "no"} onValueChange={(v) => handleAnswer("q_legal_7", v === "yes")}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="q_legal_7-yes" />
                  <Label htmlFor="q_legal_7-yes">Да</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="q_legal_7-no" />
                  <Label htmlFor="q_legal_7-no">Нет</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="p-4 border rounded-lg">
              <Label className="text-base font-medium mb-3 block">
                Были ли в последние 3 года сделки по отчуждению активов, займы учредителям, выплата дивидендов при наличии долгов?
              </Label>
              <p className="text-sm text-muted-foreground mb-2">
                Например: продажа имущества, дарение, займы учредителям
              </p>
              <RadioGroup value={answers.q_legal_8 ? "yes" : "no"} onValueChange={(v) => handleAnswer("q_legal_8", v === "yes")}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="q_legal_8-yes" />
                  <Label htmlFor="q_legal_8-yes">Да</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="q_legal_8-no" />
                  <Label htmlFor="q_legal_8-no">Нет</Label>
                </div>
              </RadioGroup>
            </div>

            <Button 
              onClick={finishDiagnostic}
              className="w-full"
              disabled={answers.q_legal_7 === undefined || answers.q_legal_8 === undefined}
            >
              Получить результат
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  if (!clientType) {
    return (
      <section id="diagnostic" className="py-20 px-4 bg-card relative">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Диагностика банкротства</h2>
              <p className="text-lg text-muted-foreground">
                Пройдите диагностику по вопросам для анализа перспектив банкротства
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="grid md:grid-cols-2 gap-6">
              <Card 
                className="shadow-md border-primary/20 hover:border-primary transition-all cursor-pointer group"
                onClick={() => { setClientType("individual"); setCurrentLevel(1); }}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                    <Icon name="User" size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-center">Физическое лицо</CardTitle>
                  <CardDescription className="text-center">
                    Диагностика для граждан по ст. 213.4 Закона о банкротстве
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card 
                className="shadow-md border-accent/30 hover:border-accent transition-all cursor-pointer group"
                onClick={() => { setClientType("legal"); setCurrentLevel(1); }}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-accent/15 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-accent/30 transition-colors">
                    <Icon name="Building" size={32} className="text-accent" />
                  </div>
                  <CardTitle className="text-center">Юридическое лицо / ИП</CardTitle>
                  <CardDescription className="text-center">
                    Диагностика для компаний по ст. 3 Закона о банкротстве
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  if (result) {
    return (
      <section id="diagnostic" className="py-20 px-4 bg-card relative">
        <div className="container mx-auto max-w-4xl">
          <Card className="shadow-lg border-primary/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Результаты диагностики</CardTitle>
                <Badge 
                  variant={result.prospects.includes("ВЫСОКИЕ") ? "default" : result.prospects.includes("СРЕДНИЕ") ? "secondary" : "outline"}
                  className="text-lg px-4 py-1"
                >
                  {result.prospects}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Icon name="Target" size={20} />
                  Перспективы банкротства
                </h4>
                <p className="text-sm">{result.prospects}</p>
              </div>

              <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="AlertTriangle" size={20} className="text-destructive" />
                  Ключевые риски
                </h4>
                <ul className="space-y-2">
                  {result.risks.map((risk, idx) => (
                    <li key={idx} className="text-sm flex gap-2">
                      <span className="text-destructive">•</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {result.alternatives.length > 0 && (
                <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Lightbulb" size={20} className="text-accent" />
                    Альтернативные варианты
                  </h4>
                  <ul className="space-y-2">
                    {result.alternatives.map((alt, idx) => (
                      <li key={idx} className="text-sm flex gap-2">
                        <span className="text-accent">•</span>
                        <span>{alt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Icon name="MapPin" size={20} />
                  Рекомендуемая стратегия
                </h4>
                <p className="text-sm">{result.strategy}</p>
              </div>

              <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Icon name="ArrowRight" size={20} className="text-accent" />
                  Следующие шаги
                </h4>
                <p className="text-sm">{result.nextSteps}</p>
              </div>

              <div className="flex gap-3">
                <Button onClick={resetDiagnostic} variant="outline" className="flex-1">
                  <Icon name="RotateCcw" size={16} className="mr-2" />
                  Пройти заново
                </Button>
                <Button className="flex-1" onClick={() => document.getElementById('specialists')?.scrollIntoView({ behavior: 'smooth' })}>
                  <Icon name="Users" size={16} className="mr-2" />
                  Найти специалиста
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="diagnostic" className="py-20 px-4 bg-card relative">
      <div className="container mx-auto max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">
                  {clientType === "individual" ? "Диагностика для физических лиц" : "Диагностика для юридических лиц / ИП"}
                </CardTitle>
                <CardDescription>
                  Ответьте на вопросы для определения перспектив банкротства
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={resetDiagnostic}>
                <Icon name="X" size={20} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {clientType === "individual" ? renderIndividualQuestions() : renderLegalQuestions()}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DiagnosticSection;
