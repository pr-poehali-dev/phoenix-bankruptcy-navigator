import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Icon from "@/components/ui/icon";

const AcademySection = () => {
  const courses = [
    {
      title: "Основы банкротства физических лиц",
      duration: "45 мин",
      type: "Видео",
      topics: ["Что такое банкротство", "Процедура и этапы", "Права и обязанности"]
    },
    {
      title: "Реструктуризация долгов: альтернативы",
      duration: "30 мин",
      type: "Вебинар",
      topics: ["Переговоры с кредиторами", "Рефинансирование", "Внесудебное банкротство"]
    },
    {
      title: "Защита имущества при банкротстве",
      duration: "1 час",
      type: "Статья + видео",
      topics: ["Что можно сохранить", "Сделки под угрозой", "Семейное имущество"]
    }
  ];

  return (
    <section id="academy" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Академия Феникса</h2>
          <p className="text-lg text-muted-foreground">
            Обучающие материалы для понимания процесса банкротства
          </p>
        </div>

        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="courses">Курсы</TabsTrigger>
            <TabsTrigger value="cases">Кейсы</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="mt-8">
            <div className="grid md:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <Card key={index} className="hover-scale">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{course.type}</Badge>
                      <span className="text-sm text-muted-foreground">{course.duration}</span>
                    </div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {course.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Icon name="Check" size={16} className="text-green-600 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant="outline">
                      Начать обучение
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cases" className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Кейс: Ипотека + МФО</CardTitle>
                  <CardDescription>Успешное банкротство с сохранением жилья</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Клиент имел задолженность по ипотеке 2.5 млн ₽ и долги перед МФО на 800 тыс ₽. 
                    Через процедуру банкротства удалось списать долги МФО и реструктурировать ипотеку.
                  </p>
                  <Badge>Срок: 8 месяцев</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Кейс: Банкротство ИП</CardTitle>
                  <CardDescription>Освобождение от долгов по бизнесу</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Индивидуальный предприниматель с долгами перед поставщиками на 3.2 млн ₽. 
                    Процедура банкротства позволила списать долги и начать новый бизнес.
                  </p>
                  <Badge>Срок: 10 месяцев</Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="mt-8 max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Когда можно подать на банкротство?</AccordionTrigger>
                <AccordionContent>
                  Физическое лицо может инициировать процедуру банкротства при наличии задолженности 
                  от 500 тысяч рублей и просрочке более 3 месяцев. Также существует обязанность подать 
                  на банкротство, если долги превышают стоимость имущества.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Сколько стоит процедура банкротства?</AccordionTrigger>
                <AccordionContent>
                  Минимальная стоимость включает: госпошлину 300 ₽, вознаграждение финансового 
                  управляющего от 25 000 ₽, услуги юриста от 30 000 ₽. Итого от 55 000 ₽. 
                  Точная стоимость зависит от сложности дела.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Что будет с моим имуществом?</AccordionTrigger>
                <AccordionContent>
                  Сохраняется единственное жилье (если не в ипотеке), личные вещи, 
                  предметы профессиональной деятельности. Остальное имущество может быть реализовано 
                  для погашения долгов. Наличные до 100 МРОТ сохраняются.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default AcademySection;
