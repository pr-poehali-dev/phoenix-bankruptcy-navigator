import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import ScrollReveal from "@/components/ScrollReveal";
import { useNavigate } from "react-router-dom";

const PopularSolutions = () => {
  const navigate = useNavigate();

  const solutions = [
    {
      id: 1,
      title: "Банкротство под ключ",
      subtitle: "Самое популярное решение",
      description: "Полное сопровождение от подачи заявления до списания долгов. Юрист + финансовый управляющий.",
      price: 170000,
      oldPrice: 200000,
      icon: "Briefcase",
      badge: "Хит продаж",
      badgeColor: "bg-red-500",
      features: [
        "Подготовка всех документов",
        "Представительство в суде",
        "Защита имущества от продажи",
        "Работа с кредиторами",
        "Сопровождение до закрытия дела"
      ],
      savings: "30 000 ₽",
      duration: "5-7 месяцев",
      clients: "340+"
    },
    {
      id: 2,
      title: "Срочная консультация",
      subtitle: "Быстрый старт",
      description: "Разбор вашей ситуации за 1 час. Получите план действий и оценку перспектив банкротства.",
      price: 3000,
      oldPrice: 5000,
      icon: "MessageSquare",
      badge: "Акция до конца дня",
      badgeColor: "bg-orange-500",
      features: [
        "Анализ долговой нагрузки",
        "Оценка рисков и перспектив",
        "План подготовки к банкротству",
        "Ответы на все вопросы",
        "Рекомендации по срокам"
      ],
      savings: "2 000 ₽",
      duration: "1 час",
      clients: "890+"
    },
    {
      id: 3,
      title: "Защита от субсидиарки",
      subtitle: "Для руководителей",
      description: "Комплексная защита учредителей и директоров от привлечения к субсидиарной ответственности.",
      price: 150000,
      oldPrice: 200000,
      icon: "Shield",
      badge: "Для бизнеса",
      badgeColor: "bg-blue-500",
      features: [
        "Юридический аудит компании",
        "Стратегия защиты активов",
        "Представительство в суде",
        "Работа с доказательствами",
        "Минимизация рисков взыскания"
      ],
      savings: "50 000 ₽",
      duration: "6-12 месяцев",
      clients: "120+"
    }
  ];

  const handleOrder = (solutionId: number) => {
    navigate('/client-login');
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background via-primary/5 to-background relative">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/15 text-primary border-primary/30">
              <Icon name="TrendingUp" size={16} className="mr-2" />
              Популярные решения
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Начните с самого выгодного</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Выберите готовое решение под вашу ситуацию. Прозрачные цены, без скрытых платежей
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <ScrollReveal key={solution.id} delay={index * 100}>
              <Card className={`shadow-lg hover:shadow-2xl transition-all border-2 h-full flex flex-col ${index === 0 ? 'border-accent scale-105 md:scale-110' : 'border-primary/20'}`}>
                {index === 0 && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className={`${solution.badgeColor} text-white px-4 py-1 shadow-md`}>
                      {solution.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Icon name={solution.icon as any} size={28} className="text-primary" />
                  </div>
                  
                  {index !== 0 && (
                    <Badge variant="outline" className={`${solution.badgeColor} text-white border-0 w-fit mx-auto mb-2`}>
                      {solution.badge}
                    </Badge>
                  )}
                  
                  <CardTitle className="text-center text-xl">{solution.title}</CardTitle>
                  <CardDescription className="text-center text-xs">
                    {solution.subtitle}
                  </CardDescription>
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    {solution.description}
                  </p>
                </CardHeader>

                <CardContent className="flex flex-col flex-1">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-primary">
                        {solution.price.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <span className="text-muted-foreground line-through">
                        {solution.oldPrice.toLocaleString('ru-RU')} ₽
                      </span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Экономия {solution.savings}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6 flex-1">
                    {solution.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                    <div className="bg-primary/5 rounded-lg p-2 text-center">
                      <Icon name="Clock" size={14} className="mx-auto mb-1 text-primary" />
                      <p className="text-muted-foreground">Срок</p>
                      <p className="font-semibold">{solution.duration}</p>
                    </div>
                    <div className="bg-accent/5 rounded-lg p-2 text-center">
                      <Icon name="Users" size={14} className="mx-auto mb-1 text-accent" />
                      <p className="text-muted-foreground">Клиентов</p>
                      <p className="font-semibold">{solution.clients}</p>
                    </div>
                  </div>

                  <Button 
                    size="lg" 
                    className={`w-full gap-2 ${index === 0 ? 'bg-gradient-to-r from-primary to-accent hover:opacity-90' : ''}`}
                    onClick={() => handleOrder(solution.id)}
                  >
                    <Icon name="ShoppingCart" size={18} />
                    Заказать сейчас
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-3">
                    <Icon name="ShieldCheck" size={12} className="inline mr-1" />
                    Безопасная оплата через Escrow
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Не уверены, какое решение выбрать?
            </p>
            <Button variant="outline" size="lg" onClick={() => document.getElementById('diagnostic')?.scrollIntoView({ behavior: 'smooth' })}>
              <Icon name="Calculator" size={18} className="mr-2" />
              Пройти бесплатную диагностику
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PopularSolutions;