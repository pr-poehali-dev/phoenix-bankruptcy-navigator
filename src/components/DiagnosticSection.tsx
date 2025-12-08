import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import DiagnosticTypeSelector from "@/components/diagnostic/DiagnosticTypeSelector";
import IndividualQuestions from "@/components/diagnostic/IndividualQuestions";
import LegalQuestions from "@/components/diagnostic/LegalQuestions";
import DiagnosticResultComponent from "@/components/diagnostic/DiagnosticResult";

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

    if (!answers.q1 && !answers.q1_1) {
      prospects = "НИЗКИЕ";
      strategy = "Формальные основания для банкротства отсутствуют.";
      alternatives.push("Переговоры с кредиторами");
      alternatives.push("Реструктуризация долгов без суда");
      nextSteps = "Рекомендуем обратиться к специалистам для разработки плана переговоров с кредиторами.";
      return { prospects, risks, alternatives, strategy, nextSteps };
    }

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

    let assetFlag = "";
    if (answers.q3) {
      assetFlag = "Высокий имущественный риск";
      risks.push(`Высокий имущественный риск. В конкурсную массу может быть включено: ${answers.q3_details || "ценное имущество"}`);
      alternatives.push("Рассмотрите варианты законной защиты имущества");
    } else {
      assetFlag = "Низкий имущественный риск";
      risks.push("Низкий имущественный риск - основное имущество защищено от взыскания");
    }

    if (answers.q4) {
      alternatives.push("Внесудебное банкротство через МФЦ (сумма долга < 500 000 руб.)");
    }
    if (answers.q5) {
      alternatives.push("Реструктуризация долгов в суде - приоритетная процедура для сохранения имущества");
      strategy = "Рассмотреть реструктуризацию долгов как приоритетную процедуру. Это позволит сохранить имущество.";
    } else {
      alternatives.push("Реализация имущества как наиболее вероятная процедура");
    }

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

    const goals = answers.q_legal_1 || [];
    if (goals.includes("А")) risks.push("Цель: Законная ликвидация компании с долгами");
    if (goals.includes("Б")) risks.push("Цель: Попытка сохранения бизнеса/активов");
    if (goals.includes("В")) risks.push("Цель: Избежание субсидиарной ответственности");

    if (!answers.q_legal_2) {
      prospects = "НИЗКИЕ";
      strategy = "Нет безусловных признаков несостоятельности.";
      alternatives.push("Добровольная ликвидация");
      alternatives.push("Досудебная санация");
      nextSteps = "Рассмотрите возможность добровольной ликвидации или реструктуризации долгов без суда.";
      return { prospects, risks, alternatives, strategy, nextSteps };
    }

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

  const handleSelectType = (type: "individual" | "legal") => {
    setClientType(type);
    setCurrentLevel(1);
  };

  if (!clientType) {
    return <DiagnosticTypeSelector onSelectType={handleSelectType} />;
  }

  if (result) {
    return <DiagnosticResultComponent result={result} onReset={resetDiagnostic} />;
  }

  const totalLevels = 4;
  const progressPercentage = (currentLevel / totalLevels) * 100;

  return (
    <section id="diagnostic" className="py-20 px-4 bg-card relative">
      <div className="container mx-auto max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
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
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Прогресс диагностики</span>
                <span className="font-medium">{currentLevel} из {totalLevels}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </CardHeader>
          <CardContent>
            {clientType === "individual" ? (
              <IndividualQuestions
                currentLevel={currentLevel}
                answers={answers}
                onAnswer={handleAnswer}
                onNext={nextLevel}
                onFinish={finishDiagnostic}
              />
            ) : (
              <LegalQuestions
                currentLevel={currentLevel}
                answers={answers}
                onAnswer={handleAnswer}
                onNext={nextLevel}
                onFinish={finishDiagnostic}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DiagnosticSection;