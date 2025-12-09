import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import ScrollReveal from "@/components/ScrollReveal";

const ComparisonSection = () => {
  const comparisons = [
    {
      aspect: "Поиск специалиста",
      without: "Поиск по объявлениям, риск нарваться на мошенников",
      with: "База проверенных специалистов с реальной статистикой",
      withoutIcon: "X" as const,
      withIcon: "Check" as const
    },
    {
      aspect: "Безопасность оплаты",
      without: "Предоплата без гарантий, риск потери денег",
      with: "Escrow-сервис: платите только за результат",
      withoutIcon: "X" as const,
      withIcon: "Check" as const
    },
    {
      aspect: "Стоимость услуг",
      without: "60-100 тыс. ₽ за юриста + скрытые платежи",
      with: "От 35 тыс. ₽ все включено, прозрачное ценообразование",
      withoutIcon: "X" as const,
      withIcon: "Check" as const
    },
    {
      aspect: "Контроль процесса",
      without: "Звонки юристу, непонятно на каком этапе дело",
      with: "Личный кабинет с отслеживанием всех этапов",
      withoutIcon: "X" as const,
      withIcon: "Check" as const
    },
    {
      aspect: "Защита имущества",
      without: "Стандартный подход, риск потери активов",
      with: "Индивидуальная стратегия защиты имущества",
      withoutIcon: "X" as const,
      withIcon: "Check" as const
    },
    {
      aspect: "Сроки процедуры",
      without: "8-12 месяцев из-за ошибок и задержек",
      with: "5-7 месяцев благодаря опыту специалистов",
      withoutIcon: "X" as const,
      withIcon: "Check" as const
    },
    {
      aspect: "Поддержка",
      without: "Сам разбирайся с кредиторами и приставами",
      with: "Полное сопровождение, работа с кредиторами за вас",
      withoutIcon: "X" as const,
      withIcon: "Check" as const
    },
    {
      aspect: "Экономия",
      without: "Дополнительные расходы на каждом этапе",
      with: "Экономия 150-300 тыс. ₽ на защите активов",
      withoutIcon: "X" as const,
      withIcon: "Check" as const
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background via-accent/5 to-background relative">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/15 text-primary border-primary/30">
              <Icon name="GitCompare" size={16} className="mr-2" />
              Сравнение
            </Badge>
            <h2 className="text-4xl font-bold mb-4">С Фениксом или без?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Посмотрите разницу: самостоятельное банкротство vs процедура через платформу
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="hidden md:block"></div>
            <Card className="shadow-md border-red-200 bg-red-50/50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-red-700 justify-center text-center">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <Icon name="X" size={20} className="text-white" />
                  </div>
                  Без Феникса
                </CardTitle>
              </CardHeader>
            </Card>

            <Card className="shadow-md border-green-200 bg-green-50/50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-green-700 justify-center text-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Icon name="Check" size={20} className="text-white" />
                  </div>
                  С Фениксом
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {comparisons.map((item, index) => (
            <ScrollReveal key={index} delay={index * 50}>
              <div className="grid md:grid-cols-3 gap-4 items-stretch">
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-lg p-3 text-center w-full">
                    <p className="font-semibold text-sm">{item.aspect}</p>
                  </div>
                </div>

                <Card className="shadow-sm border-red-200 bg-red-50/30 flex flex-col">
                  <CardContent className="p-4 flex-1 flex items-center">
                    <div className="flex items-start gap-2">
                      <Icon name={item.withoutIcon} size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">{item.without}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-green-200 bg-green-50/30 flex flex-col">
                  <CardContent className="p-4 flex-1 flex items-center">
                    <div className="flex items-start gap-2">
                      <Icon name={item.withIcon} size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm font-medium">{item.with}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <Card className="mt-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl">
            <CardContent className="py-10 text-center">
              <h3 className="text-3xl font-bold mb-4">Итог:</h3>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div>
                  <div className="text-5xl font-bold mb-2">2-3x</div>
                  <p className="text-green-100">Быстрее завершение</p>
                </div>
                <div>
                  <div className="text-5xl font-bold mb-2">150-300k</div>
                  <p className="text-green-100">Экономия на защите</p>
                </div>
                <div>
                  <div className="text-5xl font-bold mb-2">98%</div>
                  <p className="text-green-100">Успешных дел</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ComparisonSection;