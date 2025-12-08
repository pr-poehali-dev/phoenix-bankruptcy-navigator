import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Icon from "@/components/ui/icon";
import ScrollReveal from "@/components/ScrollReveal";
import { Slider } from "@/components/ui/slider";

const CostCalculator = () => {
  const [clientType, setClientType] = useState<"individual" | "legal">("individual");
  const [debtAmount, setDebtAmount] = useState([1000000]);
  const [hasProperty, setHasProperty] = useState<"yes" | "no">("no");
  const [hasComplications, setHasComplications] = useState<"yes" | "no">("no");

  const calculateCost = () => {
    let baseCost = clientType === "individual" ? 35000 : 80000;
    
    if (debtAmount[0] > 3000000) baseCost += 15000;
    if (debtAmount[0] > 10000000) baseCost += 30000;
    
    if (hasProperty === "yes") baseCost += 20000;
    if (hasComplications === "yes") baseCost += 25000;
    
    const govFee = clientType === "individual" ? 300 : 6000;
    const managerFee = 25000;
    
    return {
      total: baseCost + govFee + managerFee,
      breakdown: {
        lawyer: baseCost,
        govFee,
        managerFee
      }
    };
  };

  const cost = calculateCost();

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative">
      <div className="container mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/15 text-primary border-primary/30">
              <Icon name="Calculator" size={16} className="mr-2" />
              Прозрачные цены
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Рассчитайте стоимость банкротства</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Узнайте точную стоимость за 1 минуту. Без скрытых платежей
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          <ScrollReveal delay={100}>
            <Card className="shadow-lg border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Settings" size={20} className="text-primary" />
                  Параметры расчета
                </CardTitle>
                <CardDescription>Настройте параметры под вашу ситуацию</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Тип клиента</Label>
                  <RadioGroup value={clientType} onValueChange={(value: any) => setClientType(value)}>
                    <div className="flex items-center space-x-2 bg-primary/5 p-3 rounded-lg">
                      <RadioGroupItem value="individual" id="individual" />
                      <Label htmlFor="individual" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Icon name="User" size={16} className="text-primary" />
                          <span>Физическое лицо</span>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-primary/5 p-3 rounded-lg">
                      <RadioGroupItem value="legal" id="legal" />
                      <Label htmlFor="legal" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Icon name="Building" size={16} className="text-primary" />
                          <span>ИП или ООО</span>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>Сумма долга</Label>
                    <span className="text-sm font-bold text-primary">
                      {debtAmount[0].toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <Slider
                    value={debtAmount}
                    onValueChange={setDebtAmount}
                    min={100000}
                    max={20000000}
                    step={100000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>100 тыс</span>
                    <span>20 млн</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Есть ценное имущество для защиты?</Label>
                  <RadioGroup value={hasProperty} onValueChange={(value: any) => setHasProperty(value)}>
                    <div className="flex items-center space-x-2 bg-primary/5 p-3 rounded-lg">
                      <RadioGroupItem value="no" id="property-no" />
                      <Label htmlFor="property-no" className="flex-1 cursor-pointer">Нет</Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-primary/5 p-3 rounded-lg">
                      <RadioGroupItem value="yes" id="property-yes" />
                      <Label htmlFor="property-yes" className="flex-1 cursor-pointer">
                        Да (квартира, авто, бизнес)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>Есть осложнения?</Label>
                  <RadioGroup value={hasComplications} onValueChange={(value: any) => setHasComplications(value)}>
                    <div className="flex items-center space-x-2 bg-primary/5 p-3 rounded-lg">
                      <RadioGroupItem value="no" id="complications-no" />
                      <Label htmlFor="complications-no" className="flex-1 cursor-pointer">Нет</Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-primary/5 p-3 rounded-lg">
                      <RadioGroupItem value="yes" id="complications-yes" />
                      <Label htmlFor="complications-yes" className="flex-1 cursor-pointer">
                        Да (субсидиарка, поручители, споры)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <Card className="shadow-xl border-2 border-accent bg-gradient-to-br from-accent/5 to-primary/5 sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Receipt" size={20} className="text-accent" />
                  Расчет стоимости
                </CardTitle>
                <CardDescription>Детализация по всем статьям расходов</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <div className="flex items-center gap-2">
                      <Icon name="Briefcase" size={16} className="text-primary" />
                      <span className="text-sm">Услуги юриста</span>
                    </div>
                    <span className="font-bold">{cost.breakdown.lawyer.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-3 border-b">
                    <div className="flex items-center gap-2">
                      <Icon name="FileText" size={16} className="text-primary" />
                      <span className="text-sm">Госпошлина</span>
                    </div>
                    <span className="font-bold">{cost.breakdown.govFee.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-3 border-b">
                    <div className="flex items-center gap-2">
                      <Icon name="UserCheck" size={16} className="text-primary" />
                      <span className="text-sm">Фин. управляющий</span>
                    </div>
                    <span className="font-bold">{cost.breakdown.managerFee.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>

                <div className="bg-primary/10 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold">Итого:</span>
                    <span className="text-3xl font-bold text-primary">
                      {cost.total.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Оплата поэтапно через Escrow
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <Icon name="Check" size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Включена подготовка всех документов</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Icon name="Check" size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Представительство во всех заседаниях</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Icon name="Check" size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Защита от кредиторов и приставов</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Icon name="Check" size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Полное сопровождение до списания долгов</span>
                  </div>
                </div>

                <Button size="lg" className="w-full gap-2">
                  <Icon name="ShoppingCart" size={18} />
                  Заказать за {cost.total.toLocaleString('ru-RU')} ₽
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  <Icon name="ShieldCheck" size={12} className="inline mr-1" />
                  Деньги защищены Escrow до результата
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default CostCalculator;
