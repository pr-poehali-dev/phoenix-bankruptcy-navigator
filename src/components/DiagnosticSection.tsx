import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

const DiagnosticSection = () => {
  const [debts, setDebts] = useState("");
  const [income, setIncome] = useState("");
  const [assets, setAssets] = useState("");
  const [calculatorResult, setCalculatorResult] = useState<string | null>(null);

  const handleCalculate = () => {
    const debtAmount = parseFloat(debts);
    const incomeAmount = parseFloat(income);
    const assetAmount = parseFloat(assets);

    if (debtAmount && incomeAmount) {
      const debtToIncomeRatio = debtAmount / incomeAmount;
      
      if (debtToIncomeRatio > 12) {
        setCalculatorResult("Высокая вероятность банкротства — рекомендуем консультацию специалиста");
      } else if (debtToIncomeRatio > 6) {
        setCalculatorResult("Средняя вероятность — возможна реструктуризация долгов");
      } else {
        setCalculatorResult("Низкая вероятность — рассмотрите альтернативные варианты");
      }
    }
  };

  return (
    <section id="diagnostic" className="py-20 px-4 bg-card">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Диагностика и симулятор</h2>
          <p className="text-lg text-muted-foreground">
            Анонимный анализ вашей ситуации с помощью ИИ-ассистента
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="shadow-md border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Calculator" size={24} />
                Умный калькулятор
              </CardTitle>
              <CardDescription>
                Введите данные для предварительной оценки вашей ситуации
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="debts">Общая сумма долгов (₽)</Label>
                <Input
                  id="debts"
                  type="number"
                  placeholder="500000"
                  value={debts}
                  onChange={(e) => setDebts(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="income">Среднемесячный доход (₽)</Label>
                <Input
                  id="income"
                  type="number"
                  placeholder="50000"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="assets">Оценочная стоимость имущества (₽)</Label>
                <Input
                  id="assets"
                  type="number"
                  placeholder="1000000"
                  value={assets}
                  onChange={(e) => setAssets(e.target.value)}
                />
              </div>
              <Button onClick={handleCalculate} className="w-full hover:scale-105 transition-transform">
                Рассчитать прогноз
              </Button>
              {calculatorResult && (
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg animate-fade-in">
                  <p className="text-sm font-medium">{calculatorResult}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-md border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Route" size={24} />
                Симулятор процедуры
              </CardTitle>
              <CardDescription>
                Пошаговая карта процесса банкротства
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { step: 1, title: "Подготовка документов", duration: "1-2 недели", status: 60 },
                  { step: 2, title: "Подача заявления в суд", duration: "1 день", status: 40 },
                  { step: 3, title: "Судебное заседание", duration: "2-3 месяца", status: 20 },
                  { step: 4, title: "Реализация имущества", duration: "6-12 месяцев", status: 10 },
                  { step: 5, title: "Завершение процедуры", duration: "1 месяц", status: 0 }
                ].map((item) => (
                  <div key={item.step} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-sm">Этап {item.step}: {item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.duration}</p>
                      </div>
                      <Badge variant={item.status > 30 ? "default" : "secondary"}>
                        {item.status}%
                      </Badge>
                    </div>
                    <Progress value={item.status} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DiagnosticSection;