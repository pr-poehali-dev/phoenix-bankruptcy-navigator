import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import ScrollReveal from "@/components/ScrollReveal";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Иван Петров",
      role: "Предприниматель",
      avatar: "ИП",
      avatarBg: "bg-blue-500",
      rating: 5,
      debtAmount: "2.3 млн ₽",
      duration: "6 месяцев",
      text: "Думал, что банкротство — это конец. Феникс помог списать все долги за полгода. Специалист вёл дело от начала до конца, всегда на связи. Теперь начинаю с чистого листа!",
      result: "Списано 100% долгов"
    },
    {
      id: 2,
      name: "Мария Соколова",
      role: "Менеджер",
      avatar: "МС",
      avatarBg: "bg-purple-500",
      rating: 5,
      debtAmount: "850 тыс. ₽",
      duration: "4 месяца",
      text: "Кредиты по 5 банкам давили морально. Диагностика показала, что банкротство выгоднее реструктуризации. Escrow-сервис дал уверенность — платишь только за результат. Рекомендую!",
      result: "Экономия 320 тыс. ₽"
    },
    {
      id: 3,
      name: "Алексей Ковалёв",
      role: "IT-специалист",
      avatar: "АК",
      avatarBg: "bg-green-500",
      rating: 5,
      debtAmount: "1.5 млн ₽",
      duration: "5 месяцев",
      text: "Платформа сэкономила кучу времени. Не нужно искать юристов, все специалисты проверены. Калькулятор сразу показал реальную стоимость. Прошли банкротство без проблем.",
      result: "Защитил квартиру от продажи"
    },
    {
      id: 4,
      name: "Елена Воронцова",
      role: "Владелец салона",
      avatar: "ЕВ",
      avatarBg: "bg-orange-500",
      rating: 5,
      debtAmount: "4.2 млн ₽",
      duration: "8 месяцев",
      text: "Бизнес закрылся, остались долги перед поставщиками. Юрист через Феникс защитил от субсидиарной ответственности. Сейчас открываю новое дело, долги списаны!",
      result: "Защита от субсидиарки"
    },
    {
      id: 5,
      name: "Дмитрий Морозов",
      role: "Водитель",
      avatar: "ДМ",
      avatarBg: "bg-red-500",
      rating: 5,
      debtAmount: "620 тыс. ₽",
      duration: "3 месяца",
      text: "Боялся, что заберут машину для работы. Финансовый управляющий объяснил, что рабочий инструмент защищён. Всё прошло быстро, работу не потерял, долги списали.",
      result: "Сохранил авто для работы"
    },
    {
      id: 6,
      name: "Анна Белова",
      role: "Бухгалтер",
      avatar: "АБ",
      avatarBg: "bg-pink-500",
      rating: 5,
      debtAmount: "1.1 млн ₽",
      duration: "5 месяцев",
      text: "Развод оставил долги по ипотеке. Академия Феникса помогла разобраться в процедуре, а юрист вёл всё грамотно. Сейчас живу спокойно, коллекторы больше не звонят!",
      result: "Избавилась от коллекторов"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/15 text-accent border-accent/30">
              <Icon name="MessageSquare" size={16} className="mr-2" />
              Реальные истории
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Они уже начали новую жизнь</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Более 500 клиентов успешно прошли процедуру банкротства с Фениксом
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={index * 100}>
              <Card className="shadow-md hover:shadow-xl transition-all border-primary/20 h-full flex flex-col">
                <CardContent className="pt-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${testimonial.avatarBg} rounded-full flex items-center justify-center text-white font-bold shadow-md`}>
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={14} className="text-accent fill-accent" />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="bg-primary/5 rounded-lg p-2">
                      <p className="text-xs text-muted-foreground">Списано</p>
                      <p className="font-bold text-primary">{testimonial.debtAmount}</p>
                    </div>
                    <div className="bg-accent/5 rounded-lg p-2">
                      <p className="text-xs text-muted-foreground">Срок</p>
                      <p className="font-bold text-accent">{testimonial.duration}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    "{testimonial.text}"
                  </p>

                  <div className="pt-3 border-t">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Icon name="Check" size={12} className="mr-1" />
                      {testimonial.result}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/30 shadow-lg">
            <CardContent className="py-8 text-center">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <p className="text-sm text-muted-foreground">Довольных клиентов</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">₽3.2 млрд</div>
                  <p className="text-sm text-muted-foreground">Списано долгов</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">5.2 мес</div>
                  <p className="text-sm text-muted-foreground">Средний срок процедуры</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">98%</div>
                  <p className="text-sm text-muted-foreground">Успешных дел</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TestimonialsSection;
