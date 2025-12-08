import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";

interface ExpertiseQuestionsProps {
  answers: Record<string, any>;
  onAnswer: (questionId: string, value: any) => void;
  onFinish: () => void;
  onReset: () => void;
}

const ExpertiseQuestions = ({ answers, onAnswer, onFinish, onReset }: ExpertiseQuestionsProps) => {
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
              <Button variant="ghost" size="sm" onClick={onReset}>
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
                        onAnswer(
                          "purposes",
                          checked 
                            ? [...current, option.id]
                            : current.filter((p: string) => p !== option.id)
                        );
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
                onValueChange={(v) => onAnswer("urgency", v)}
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
                onValueChange={(v) => onAnswer("budget", v)}
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
              onClick={onFinish} 
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
};

export default ExpertiseQuestions;
