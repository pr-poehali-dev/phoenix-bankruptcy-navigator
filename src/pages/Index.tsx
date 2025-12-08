import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Icon from "@/components/ui/icon";
import { Progress } from "@/components/ui/progress";

const Index = () => {
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

  const specialists = [
    {
      name: "Анна Петрова",
      type: "Финансовый управляющий",
      rating: 4.9,
      cases: 127,
      success: 94,
      specialization: "Ипотека и крупные займы",
      experience: "8 лет"
    },
    {
      name: "Сергей Иванов",
      type: "Юрист по банкротству",
      rating: 4.8,
      cases: 98,
      success: 91,
      specialization: "МФО и кредитные карты",
      experience: "6 лет"
    },
    {
      name: "Мария Козлова",
      type: "Финансовый управляющий",
      rating: 4.7,
      cases: 143,
      success: 89,
      specialization: "Банкротство ИП",
      experience: "10 лет"
    }
  ];

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Phoenix" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Феникс</h1>
                <p className="text-xs text-muted-foreground">Навигатор банкротства</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#diagnostic" className="text-sm hover:text-primary transition">Диагностика</a>
              <a href="#specialists" className="text-sm hover:text-primary transition">Специалисты</a>
              <a href="#academy" className="text-sm hover:text-primary transition">Академия</a>
              <a href="#mediation" className="text-sm hover:text-primary transition">Медиация</a>
            </nav>
            <Button>Войти</Button>
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4" variant="secondary">
              🚀 Новое начало уже близко
            </Badge>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Путь к финансовому возрождению
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Умная платформа для диагностики банкротства, подбора проверенных специалистов 
              и безопасного ведения процедуры от начала до конца
            </p>
            <div className="flex gap-4 justify-center mt-8">
              <Button size="lg" className="gap-2">
                <Icon name="Calculator" size={20} />
                Начать диагностику
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Icon name="Play" size={20} />
                Смотреть видео
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="hover-scale">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="ShieldCheck" className="text-primary" size={24} />
                </div>
                <CardTitle>Безопасные сделки</CardTitle>
                <CardDescription>
                  Встроенный Escrow-сервис для поэтапной оплаты специалистов
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-scale">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Users" className="text-secondary" size={24} />
                </div>
                <CardTitle>Проверенные эксперты</CardTitle>
                <CardDescription>
                  База верифицированных юристов и финансовых управляющих с реальной статистикой
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-scale">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="BookOpen" className="text-accent" size={24} />
                </div>
                <CardTitle>Обучение</CardTitle>
                <CardDescription>
                  Академия с пошаговыми инструкциями, видео и реальными кейсами
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="diagnostic" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Диагностика и симулятор</h2>
            <p className="text-lg text-muted-foreground">
              Анонимный анализ вашей ситуации с помощью ИИ-ассистента
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="shadow-lg">
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
                <Button onClick={handleCalculate} className="w-full">
                  Рассчитать прогноз
                </Button>
                {calculatorResult && (
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <p className="text-sm font-medium">{calculatorResult}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-lg">
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

      <section id="specialists" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Проверенные специалисты</h2>
            <p className="text-lg text-muted-foreground">
              Подбираем эксперта под ваш конкретный случай
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {specialists.map((specialist, index) => (
              <Card key={index} className="hover-scale">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {specialist.name.charAt(0)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-bold">{specialist.rating}</span>
                    </div>
                  </div>
                  <CardTitle>{specialist.name}</CardTitle>
                  <CardDescription>{specialist.type}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Дел закрыто:</span>
                    <span className="font-semibold">{specialist.cases}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Успешность:</span>
                    <span className="font-semibold text-green-600">{specialist.success}%</span>
                  </div>
                  <div className="pt-3 border-t">
                    <Badge variant="outline" className="mb-2">{specialist.specialization}</Badge>
                    <p className="text-xs text-muted-foreground">Опыт: {specialist.experience}</p>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Выбрать специалиста
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Icon name="Shield" className="text-primary" size={32} />
                <div>
                  <CardTitle>Безопасная сделка через Escrow</CardTitle>
                  <CardDescription>
                    Оплата поэтапно, деньги защищены до выполнения работ
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 mt-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon name="Wallet" className="text-primary" size={20} />
                  </div>
                  <p className="text-sm font-medium">Платёж на платформу</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon name="FileCheck" className="text-primary" size={20} />
                  </div>
                  <p className="text-sm font-medium">Выполнение этапа</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon name="CheckCircle" className="text-primary" size={20} />
                  </div>
                  <p className="text-sm font-medium">Подтверждение</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon name="ArrowRight" className="text-secondary" size={20} />
                  </div>
                  <p className="text-sm font-medium">Перевод специалисту</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

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

      <section id="mediation" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Медиация онлайн</h2>
            <p className="text-lg text-muted-foreground">
              Разрешите спор без суда — быстрее и дешевле
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Scale" size={24} />
                  Коммерческие споры
                </CardTitle>
                <CardDescription>
                  Долги между компаниями, конфликты партнёров, договорные споры
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle" className="text-green-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium">Подбор медиатора</p>
                    <p className="text-sm text-muted-foreground">По отрасли и типу спора</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Video" className="text-blue-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium">Виртуальные переговоры</p>
                    <p className="text-sm text-muted-foreground">С раздельными комнатами для совещаний</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="FileText" className="text-orange-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium">Медиативное соглашение</p>
                    <p className="text-sm text-muted-foreground">Юридически грамотный документ</p>
                  </div>
                </div>
                <Button className="w-full mt-4">Начать медиацию</Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Users" size={24} />
                  Семейные споры
                </CardTitle>
                <CardDescription>
                  Раздел имущества, порядок общения с детьми, алименты
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="Heart" className="text-red-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium">Конфиденциальность</p>
                    <p className="text-sm text-muted-foreground">Полная анонимность и безопасность</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="MessageSquare" className="text-purple-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium">Совместная работа</p>
                    <p className="text-sm text-muted-foreground">Общая доска, чат, документы</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Clock" className="text-green-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium">Быстрое решение</p>
                    <p className="text-sm text-muted-foreground">В среднем 2-4 недели vs 6-12 месяцев суда</p>
                  </div>
                </div>
                <Button className="w-full mt-4">Начать медиацию</Button>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 bg-white">
            <CardHeader>
              <CardTitle className="text-center">Преимущества медиации</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">80%</div>
                  <p className="text-sm text-muted-foreground">Дешевле суда</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">10x</div>
                  <p className="text-sm text-muted-foreground">Быстрее процесса</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                  <p className="text-sm text-muted-foreground">Исполнение соглашений</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                  <p className="text-sm text-muted-foreground">Конфиденциальность</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Phoenix" className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-bold">Феникс</h3>
              </div>
              <p className="text-sm text-gray-400">
                Навигатор банкротства — ваш проводник к финансовому возрождению
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Платформа</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#diagnostic" className="hover:text-white transition">Диагностика</a></li>
                <li><a href="#specialists" className="hover:text-white transition">Специалисты</a></li>
                <li><a href="#academy" className="hover:text-white transition">Академия</a></li>
                <li><a href="#mediation" className="hover:text-white transition">Медиация</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">О нас</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Миссия</a></li>
                <li><a href="#" className="hover:text-white transition">Команда</a></li>
                <li><a href="#" className="hover:text-white transition">Партнёры</a></li>
                <li><a href="#" className="hover:text-white transition">Отзывы</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Документы</a></li>
                <li><a href="#" className="hover:text-white transition">Политика</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Феникс. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
