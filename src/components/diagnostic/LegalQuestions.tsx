import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface LegalQuestionsProps {
  currentLevel: number;
  answers: Record<string, any>;
  onAnswer: (questionId: string, value: any) => void;
  onNext: () => void;
  onFinish: () => void;
}

const LegalQuestions = ({ 
  currentLevel, 
  answers, 
  onAnswer, 
  onNext, 
  onFinish 
}: LegalQuestionsProps) => {
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
                      onAnswer("q_legal_1", updated);
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
            onClick={onNext} 
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
            <RadioGroup value={answers.q_legal_2 ? "yes" : "no"} onValueChange={(v) => onAnswer("q_legal_2", v === "yes")}>
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
            onClick={answers.q_legal_2 ? onNext : onFinish}
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
            <RadioGroup value={answers.q_legal_3 ? "yes" : "no"} onValueChange={(v) => onAnswer("q_legal_3", v === "yes")}>
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
            <RadioGroup value={answers.q_legal_4 ? "yes" : "no"} onValueChange={(v) => onAnswer("q_legal_4", v === "yes")}>
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
            <RadioGroup value={answers.q_legal_5 ? "yes" : "no"} onValueChange={(v) => onAnswer("q_legal_5", v === "yes")}>
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
            <RadioGroup value={answers.q_legal_6 ? "yes" : "no"} onValueChange={(v) => onAnswer("q_legal_6", v === "yes")}>
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
            onClick={onNext}
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
            <RadioGroup value={answers.q_legal_7 ? "yes" : "no"} onValueChange={(v) => onAnswer("q_legal_7", v === "yes")}>
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
            <RadioGroup value={answers.q_legal_8 ? "yes" : "no"} onValueChange={(v) => onAnswer("q_legal_8", v === "yes")}>
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
            onClick={onFinish}
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

export default LegalQuestions;
