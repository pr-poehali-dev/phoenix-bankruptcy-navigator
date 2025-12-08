import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import ScrollReveal from "@/components/ScrollReveal";

const SuccessCases = () => {
  const cases = [
    {
      id: 1,
      title: "От 4.2 млн долгов до нового бизнеса",
      client: "Елена, владелец салона красоты",
      situation: "Салон закрылся из-за пандемии, остались долги перед поставщиками и арендодателем. Банки требовали возврата кредитов, грозили банкротством с субсидиарной ответственностью.",
      solution: "Провели аудит компании, собрали доказательства отсутствия вины в банкротстве, защитили учредителя от субсидиарки. Через процедуру реализации имущества списали все долги.",
      result: {
        debtCleared: "4.2 млн ₽",
        saved: "Личное имущество",
        duration: "8 месяцев",
        status: "Открыла новый салон"
      },
      icon: "TrendingUp",
      color: "bg-green-500"
    },
    {
      id: 2,
      title: "Защитили квартиру от продажи",
      client: "Дмитрий, IT-специалист",
      situation: "1.5 млн долгов по кредитам, единственная квартира под угрозой. Банк подал в суд на взыскание, приставы арестовали счета. Семья с двумя детьми рисковала остаться на улице.",
      solution: "Быстро подали на банкротство, остановили исполнительное производство. Доказали суду статус единственного жилья, защитили от включения в конкурсную массу. Списали все долги.",
      result: {
        debtCleared: "1.5 млн ₽",
        saved: "Квартира 65 м²",
        duration: "5 месяцев",
        status: "Живет в своей квартире"
      },
      icon: "Home",
      color: "bg-blue-500"
    },
    {
      id: 3,
      title: "Списали долги и сохранили авто для работы",
      client: "Алексей, водитель такси",
      situation: "620 тыс. ₽ долгов по микрозаймам и кредитам. Автомобиль — единственный источник дохода. Коллекторы угрожали забрать машину, звонили родственникам.",
      solution: "Оформили банкротство физлица, доказали, что авто — рабочий инструмент стоимостью до 100 тыс. ₽. Защитили машину от реализации, остановили коллекторов.",
      result: {
        debtCleared: "620 тыс. ₽",
        saved: "Автомобиль",
        duration: "3 месяца",
        status: "Работает на своем авто"
      },
      icon: "Car",
      color: "bg-orange-500"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-accent/5 via-background to-primary/5 relative">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-500/15 text-green-700 border-green-500/30">
              <Icon name="Award" size={16} className="mr-2" />
              Истории успеха
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Реальные кейсы наших клиентов</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Каждый случай уникален, но результат один — списание долгов и новая жизнь
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          {cases.map((caseItem, index) => (
            <ScrollReveal key={caseItem.id} delay={index * 100}>
              <Card className="shadow-lg hover:shadow-2xl transition-all border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className={`w-16 h-16 ${caseItem.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <Icon name={caseItem.icon as any} size={32} className="text-white" />
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{caseItem.title}</h3>
                        <p className="text-sm text-muted-foreground">{caseItem.client}</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Icon name="AlertCircle" size={16} className="text-red-500" />
                            <span className="font-semibold text-sm">Ситуация</span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {caseItem.situation}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Icon name="Lightbulb" size={16} className="text-primary" />
                            <span className="font-semibold text-sm">Решение</span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {caseItem.solution}
                          </p>
                        </div>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <div className="flex items-center gap-2 mb-3">
                          <Icon name="CheckCircle" size={20} className="text-green-600" />
                          <span className="font-semibold text-green-800">Результат</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Списано</p>
                            <p className="font-bold text-green-700">{caseItem.result.debtCleared}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Сохранено</p>
                            <p className="font-bold text-green-700">{caseItem.result.saved}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Срок</p>
                            <p className="font-bold text-green-700">{caseItem.result.duration}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Сейчас</p>
                            <p className="font-bold text-green-700">{caseItem.result.status}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <Card className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
            <CardContent className="py-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Хотите такой же результат?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Каждый день мы помогаем людям начать новую жизнь без долгов. Следующим можете стать вы!
              </p>
              <Button size="lg" className="gap-2">
                <Icon name="Rocket" size={18} />
                Начать мое банкротство
              </Button>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SuccessCases;
