import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import PhoenixLogo from "@/components/PhoenixLogo";
import { useNavigate } from "react-router-dom";

const SpecialistDashboard = () => {
  const navigate = useNavigate();
  const [specialist] = useState({
    name: "Сидоров Алексей Васильевич",
    email: "sidorov@example.com",
    phone: "+7 (999) 987-65-43",
    role: "Финансовый управляющий",
    license: "№ 12345-ФУ от 15.03.2020",
    rating: 4.9,
    cases: 47,
    registeredAt: "15 марта 2020"
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
              <PhoenixLogo size={48} className="drop-shadow-lg" />
              <div>
                <h1 className="text-xl font-bold">Феникс</h1>
                <p className="text-xs text-muted-foreground">Личный кабинет специалиста</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium">{specialist.name}</p>
                <p className="text-xs text-muted-foreground">{specialist.role}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate("/")}>
                <Icon name="LogOut" size={16} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between text-center md:text-left">
            <div>
              <h2 className="text-3xl font-bold mb-2">Панель управления</h2>
              <p className="text-muted-foreground">Управляйте делами и взаимодействуйте с клиентами</p>
            </div>
            <Badge className="bg-accent text-accent-foreground flex items-center gap-2 px-4 py-2">
              <Icon name="Star" size={16} />
              Рейтинг: {specialist.rating}
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="gap-2">
              <Icon name="LayoutDashboard" size={16} />
              <span className="hidden sm:inline">Обзор</span>
            </TabsTrigger>
            <TabsTrigger value="clients" className="gap-2">
              <Icon name="Users" size={16} />
              <span className="hidden sm:inline">Клиенты</span>
            </TabsTrigger>
            <TabsTrigger value="cases" className="gap-2">
              <Icon name="Briefcase" size={16} />
              <span className="hidden sm:inline">Дела</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2">
              <Icon name="TrendingUp" size={16} />
              <span className="hidden sm:inline">Статистика</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <Icon name="User" size={16} />
              <span className="hidden sm:inline">Профиль</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Активные дела</CardTitle>
                  <Icon name="Briefcase" className="text-primary" size={20} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground mt-1">Требуют внимания: 3</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Новые запросы</CardTitle>
                  <Icon name="Bell" className="text-accent" size={20} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground mt-1">За последние 7 дней</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Рейтинг</CardTitle>
                  <Icon name="Star" className="text-yellow-500" size={20} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{specialist.rating}</div>
                  <p className="text-xs text-muted-foreground mt-1">На основе 28 отзывов</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Всего дел</CardTitle>
                  <Icon name="CheckCircle" className="text-green-500" size={20} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{specialist.cases}</div>
                  <p className="text-xs text-muted-foreground mt-1">Завершено успешно</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Недавние события</CardTitle>
                <CardDescription>Последние обновления по вашим делам</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4 p-3 border rounded-lg hover:bg-accent/5 transition-colors">
                  <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="CheckCircle" className="text-green-500" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Новый запрос на консультацию</p>
                    <p className="text-sm text-muted-foreground">Иван Петров - Физическое лицо, долг 850 000 руб.</p>
                    <p className="text-xs text-muted-foreground mt-1">2 часа назад</p>
                  </div>
                  <Button size="sm">Принять</Button>
                </div>

                <div className="flex items-start gap-4 p-3 border rounded-lg hover:bg-accent/5 transition-colors">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="FileText" className="text-blue-500" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Документы загружены клиентом</p>
                    <p className="text-sm text-muted-foreground">Дело №3247 - Новые справки о доходах</p>
                    <p className="text-xs text-muted-foreground mt-1">5 часов назад</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Icon name="Eye" size={16} />
                  </Button>
                </div>

                <div className="flex items-start gap-4 p-3 border rounded-lg hover:bg-accent/5 transition-colors">
                  <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" className="text-yellow-500" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Напоминание о судебном заседании</p>
                    <p className="text-sm text-muted-foreground">Дело №3198 - Завтра в 10:00</p>
                    <p className="text-xs text-muted-foreground mt-1">Вчера в 16:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-primary/30 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Plus" size={20} />
                    Новое дело
                  </CardTitle>
                  <CardDescription>
                    Создайте новое дело для работы с клиентом
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Создать дело</Button>
                </CardContent>
              </Card>

              <Card className="border-accent/30 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Calendar" size={20} />
                    Расписание
                  </CardTitle>
                  <CardDescription>
                    Управляйте своим календарем и встречами
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Открыть календарь</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Мои клиенты</CardTitle>
                    <CardDescription>Список клиентов, с которыми вы работаете</CardDescription>
                  </div>
                  <Button>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Иван Петров", status: "Активно", case: "№3247", stage: "Реструктуризация", priority: "high" },
                  { name: "Мария Сидорова", status: "Консультация", case: "№3198", stage: "Диагностика", priority: "medium" },
                  { name: "Петр Васильев", status: "Активно", case: "№3156", stage: "Реализация имущества", priority: "high" },
                ].map((client, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" className="text-primary" size={24} />
                      </div>
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-muted-foreground">Дело {client.case} - {client.stage}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={client.priority === "high" ? "destructive" : "secondary"}>
                        {client.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Icon name="MessageSquare" size={16} className="mr-2" />
                        Написать
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="MoreVertical" size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cases" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Активные дела</CardTitle>
                <CardDescription>Дела в работе и их текущий статус</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { number: "№3247", client: "Иван Петров", stage: "Реструктуризация", progress: 65, deadline: "15.01.2025" },
                  { number: "№3198", client: "Мария Сидорова", stage: "Диагностика", progress: 30, deadline: "20.12.2024" },
                  { number: "№3156", client: "Петр Васильев", stage: "Реализация", progress: 85, deadline: "10.01.2025" },
                ].map((caseItem, idx) => (
                  <div key={idx} className="p-4 border rounded-lg space-y-3 hover:bg-accent/5 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Дело {caseItem.number}</p>
                        <p className="text-sm text-muted-foreground">{caseItem.client} - {caseItem.stage}</p>
                      </div>
                      <Badge>До {caseItem.deadline}</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Прогресс</span>
                        <span className="font-medium">{caseItem.progress}%</span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${caseItem.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="Eye" size={16} className="mr-2" />
                        Открыть
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="FileText" size={16} className="mr-2" />
                        Документы
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Статистика дел</CardTitle>
                  <CardDescription>Распределение по типам процедур</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Реструктуризация", value: 18, color: "bg-blue-500" },
                    { label: "Реализация имущества", value: 23, color: "bg-accent" },
                    { label: "Мировое соглашение", value: 6, color: "bg-green-500" },
                  ].map((stat, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{stat.label}</span>
                        <span className="text-muted-foreground">{stat.value} дел</span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${stat.color} transition-all duration-500`}
                          style={{ width: `${(stat.value / 47) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Отзывы клиентов</CardTitle>
                  <CardDescription>Последние оценки ваших услуг</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { client: "Иван П.", rating: 5, comment: "Отличная работа, всё прошло гладко!", date: "05.12.2024" },
                    { client: "Мария С.", rating: 5, comment: "Профессионально и быстро", date: "01.12.2024" },
                    { client: "Петр В.", rating: 4, comment: "Хорошо, спасибо", date: "28.11.2024" },
                  ].map((review, idx) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm">{review.client}</p>
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Icon key={i} name="Star" className="text-yellow-500" size={14} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                      <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Профессиональные данные</CardTitle>
                <CardDescription>Информация о вашей квалификации</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">ФИО</label>
                    <p className="text-base mt-1">{specialist.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Специализация</label>
                    <p className="text-base mt-1">{specialist.role}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-base mt-1">{specialist.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Телефон</label>
                    <p className="text-base mt-1">{specialist.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Лицензия</label>
                    <p className="text-base mt-1">{specialist.license}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Дата регистрации</label>
                    <p className="text-base mt-1">{specialist.registeredAt}</p>
                  </div>
                </div>
                <Button className="mt-4">
                  <Icon name="Edit" size={16} className="mr-2" />
                  Редактировать профиль
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Публичный профиль</CardTitle>
                <CardDescription>Как вас видят клиенты на платформе</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon name="Star" className="text-accent" size={20} />
                    <div>
                      <p className="font-medium">Рейтинг</p>
                      <p className="text-sm text-muted-foreground">{specialist.rating} из 5.0</p>
                    </div>
                  </div>
                  <Badge variant="secondary">28 отзывов</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon name="Briefcase" className="text-primary" size={20} />
                    <div>
                      <p className="font-medium">Опыт</p>
                      <p className="text-sm text-muted-foreground">{specialist.cases} завершенных дел</p>
                    </div>
                  </div>
                  <Badge variant="secondary">4 года</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  <Icon name="Eye" size={16} className="mr-2" />
                  Посмотреть публичный профиль
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SpecialistDashboard;