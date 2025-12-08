import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface IndividualQuestionsProps {
  currentLevel: number;
  answers: Record<string, any>;
  onAnswer: (questionId: string, value: any) => void;
  onNext: () => void;
  onFinish: () => void;
}

const IndividualQuestions = ({ 
  currentLevel, 
  answers, 
  onAnswer, 
  onNext, 
  onFinish 
}: IndividualQuestionsProps) => {
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
              <RadioGroup value={answers.q1 ? "yes" : "no"} onValueChange={(v) => onAnswer("q1", v === "yes")}>
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
                <RadioGroup value={answers.q1_1 ? "yes" : "no"} onValueChange={(v) => onAnswer("q1_1", v === "yes")}>
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
            onClick={answers.q1 || answers.q1_1 !== undefined ? onNext : onFinish}
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
            <RadioGroup value={answers.q2} onValueChange={(v) => onAnswer("q2", v)}>
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

          <Button onClick={onNext} className="w-full" disabled={!answers.q2}>
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
            <RadioGroup value={answers.q3 ? "yes" : "no"} onValueChange={(v) => onAnswer("q3", v === "yes")}>
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
                  onChange={(e) => onAnswer("q3_details", e.target.value)}
                />
              </div>
            )}
          </div>

          <Button onClick={onNext} className="w-full" disabled={answers.q3 === undefined}>
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
            <RadioGroup value={answers.q4 ? "yes" : "no"} onValueChange={(v) => onAnswer("q4", v === "yes")}>
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
            <RadioGroup value={answers.q5 ? "yes" : "no"} onValueChange={(v) => onAnswer("q5", v === "yes")}>
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
            onClick={onFinish} 
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

export default IndividualQuestions;
