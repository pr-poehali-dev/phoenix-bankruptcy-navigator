import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import PhoenixLogo from "@/components/PhoenixLogo";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface SavedExpert {
  id: number;
  name: string;
  specialization: string;
  experience: number;
  cases: number;
  rating: number;
  price: string;
  certifications: string[];
  available: boolean;
  avatar: string;
  avatarBg: string;
}

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [user] = useState({
    name: "Иван Петров",
    email: "ivan@example.com",
    phone: "+7 (999) 123-45-67",
    registeredAt: "15 ноября 2024"
  });
  const [savedExperts, setSavedExperts] = useState<SavedExpert[]>([]);
  const [expertiseType, setExpertiseType] = useState<string>("");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const experts = localStorage.getItem('selectedExperts');
    const type = localStorage.getItem('expertiseType');
    if (experts) {
      setSavedExperts(JSON.parse(experts));
    }
    if (type) {
      setExpertiseType(type);
    }
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const getExpertiseTypeName = () => {
    switch (expertiseType) {
      case "financial": return "Финансовая экспертиза";
      case "accounting": return "Бухгалтерская экспертиза";
      case "property": return "Оценка имущества";
      case "business": return "Оценка бизнеса";
      case "technical": return "Техническая экспертиза";
      default: return "";
    }
  };

  const removeExpert = (expertId: number) => {
    const expertToRemove = savedExperts.find(e => e.id === expertId);
    const updated = savedExperts.filter(e => e.id !== expertId);
    setSavedExperts(updated);
    localStorage.setItem('selectedExperts', JSON.stringify(updated));
    
    toast({
      title: "Эксперт удалён",
      description: `${expertToRemove?.name} удалён из списка`,
      duration: 2000,
    });
  };

  const sendRequestToExperts = () => {
    toast({
      title: "Запрос отправлен!",
      description: `Запрос отправлен ${savedExperts.length} ${savedExperts.length === 1 ? 'эксперту' : 'экспертам'}. Ожидайте ответа.`,
      duration: 4000,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
              <PhoenixLogo size={48} className="drop-shadow-lg" />
              <div>
                <h1 className="text-xl font-bold">Феникс</h1>
                <p className="text-xs text-muted-foreground">Личный кабинет клиента</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate("/")}>
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Вернуться на сайт
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-2">Добро пожаловать, {user.name.split(" ")[0]}!</h2>
          <p className="text-muted-foreground">Управляйте своими делами и отслеживайте прогресс</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="gap-2">
              <Icon name="LayoutDashboard" size={16} />
              <span className="hidden sm:inline">Обзор</span>
            </TabsTrigger>
            <TabsTrigger value="diagnostics" className="gap-2">
              <Icon name="FileText" size={16} />
              <span className="hidden sm:inline">Диагностики</span>
            </TabsTrigger>
            <TabsTrigger value="specialists" className="gap-2">
              <Icon name="Users" size={16} />
              <span className="hidden sm:inline">Специалисты</span>
              {savedExperts.length > 0 && (
                <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {savedExperts.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <Icon name="User" size={16} />
              <span className="hidden sm:inline">Профиль</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Активные дела</CardTitle>
                  <Icon name="Briefcase" className="text-primary" size={20} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground mt-1">В работе с специалистами</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Диагностики</CardTitle>
                  <Icon name="ClipboardCheck" className="text-accent" size={20} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground mt-1">Пройдено за все время</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Статус</CardTitle>
                  <Icon name="ShieldCheck" className="text-green-500" size={20} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    <Badge variant="secondary" className="text-base">Активен</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Верифицирован</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Последние действия</CardTitle>
                <CardDescription>Ваша недавняя активность на платформе</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4 p-3 border rounded-lg hover:bg-accent/5 transition-colors">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="FileText" className="text-primary" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Пройдена диагностика банкротства</p>
                    <p className="text-sm text-muted-foreground">Результат: Высокие перспективы</p>
                    <p className="text-xs text-muted-foreground mt-1">2 часа назад</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 border rounded-lg hover:bg-accent/5 transition-colors">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="User" className="text-accent" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Запрос на консультацию специалисту</p>
                    <p className="text-sm text-muted-foreground">Финансовый управляющий Сидоров А.В.</p>
                    <p className="text-xs text-muted-foreground mt-1">Вчера в 18:30</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 border rounded-lg hover:bg-accent/5 transition-colors">
                  <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="CheckCircle" className="text-green-500" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Профиль верифицирован</p>
                    <p className="text-sm text-muted-foreground">Документы проверены и одобрены</p>
                    <p className="text-xs text-muted-foreground mt-1">3 дня назад</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-primary/30 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Calculator" size={20} />
                    Новая диагностика
                  </CardTitle>
                  <CardDescription>
                    Пройдите диагностику для оценки перспектив банкротства
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={() => navigate("/#diagnostic")}>
                    Начать диагностику
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-accent/30 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Users" size={20} />
                    Найти специалиста
                  </CardTitle>
                  <CardDescription>
                    Подберите проверенного юриста или финансового управляющего
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" onClick={() => navigate("/#specialists")}>
                    Перейти к поиску
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="diagnostics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>История диагностик</CardTitle>
                <CardDescription>Все пройденные вами диагностики банкротства</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { date: "08.12.2024", type: "Физическое лицо", result: "Высокие перспективы", color: "green" },
                  { date: "05.12.2024", type: "Физическое лицо", result: "Средние перспективы", color: "yellow" },
                  { date: "01.12.2024", type: "Физическое лицо", result: "Высокие перспективы", color: "green" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="FileText" className="text-primary" size={24} />
                      </div>
                      <div>
                        <p className="font-medium">{item.type}</p>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={item.color === "green" ? "default" : "secondary"}>
                        {item.result}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="Download" size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specialists" className="space-y-6">
            {savedExperts.length > 0 && (
              <Card className="border-primary/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Выбранные эксперты</CardTitle>
                      <CardDescription>
                        Эксперты по направлению: {getExpertiseTypeName()}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-base">
                      {savedExperts.length} {savedExperts.length === 1 ? 'эксперт' : 'экспертов'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {savedExperts.map((expert) => (
                    <div key={expert.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 ${expert.avatarBg} rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                          {expert.avatar}
                        </div>
                        <div>
                          <p className="font-medium">{expert.name}</p>
                          <p className="text-sm text-muted-foreground">{expert.specialization}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <div className="flex items-center gap-1">
                              <Icon name="Star" className="text-yellow-500" size={14} />
                              <span className="text-sm font-medium">{expert.rating}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Icon name="Briefcase" size={14} />
                              <span>{expert.cases} дел</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Icon name="Award" size={14} />
                              <span>{expert.experience} лет</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right mr-2">
                          <p className="text-sm text-muted-foreground">Стоимость</p>
                          <p className="font-bold text-primary">{expert.price}</p>
                        </div>
                        <Button variant="outline" size="sm" disabled={!expert.available}>
                          <Icon name="MessageSquare" size={16} className="mr-2" />
                          Написать
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => removeExpert(expert.id)}>
                          <Icon name="X" size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full mt-4" size="lg" onClick={sendRequestToExperts}>
                    <Icon name="Send" size={16} className="mr-2" />
                    Отправить запрос всем экспертам
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Мои специалисты</CardTitle>
                <CardDescription>Список специалистов, с которыми вы работаете</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Сидоров Алексей Васильевич", role: "Финансовый управляющий", status: "Активно", rating: 4.9 },
                  { name: "Иванова Мария Петровна", role: "Юрист по банкротству", status: "Консультация", rating: 4.8 },
                ].map((spec, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                        <Icon name="User" className="text-accent" size={24} />
                      </div>
                      <div>
                        <p className="font-medium">{spec.name}</p>
                        <p className="text-sm text-muted-foreground">{spec.role}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Icon name="Star" className="text-yellow-500" size={14} />
                          <span className="text-sm font-medium">{spec.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge>{spec.status}</Badge>
                      <Button variant="outline" size="sm">
                        <Icon name="MessageSquare" size={16} className="mr-2" />
                        Написать
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Личные данные</CardTitle>
                <CardDescription>Ваша информация на платформе</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Имя</label>
                    <p className="text-base mt-1">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-base mt-1">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Телефон</label>
                    <p className="text-base mt-1">{user.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Дата регистрации</label>
                    <p className="text-base mt-1">{user.registeredAt}</p>
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
                <CardTitle>Безопасность</CardTitle>
                <CardDescription>Управление паролем и настройками безопасности</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Lock" size={16} className="mr-2" />
                  Изменить пароль
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="ShieldCheck" size={16} className="mr-2" />
                  Двухфакторная аутентификация
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ClientDashboard;