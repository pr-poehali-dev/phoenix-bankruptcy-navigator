import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import PhoenixLogo from "@/components/PhoenixLogo";
import { useNavigate } from "react-router-dom";

const SpecialistLogin = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [diplomaFile, setDiplomaFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/specialist-dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/5 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="grid md:grid-cols-2 gap-6">
        <div>
        <div className="text-center mb-8 cursor-pointer" onClick={() => navigate("/")}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <PhoenixLogo size={64} className="drop-shadow-lg" />
          </div>
          <h1 className="text-3xl font-bold">Феникс</h1>
          <p className="text-muted-foreground">Навигатор банкротства</p>
        </div>

        <Card className="shadow-xl border-accent/30 h-fit">
          <CardHeader>
            <CardTitle className="text-2xl">{isLogin ? "Вход для специалистов" : "Регистрация специалиста"}</CardTitle>
            <CardDescription>
              {isLogin ? "Войдите в профессиональный кабинет" : "Присоединяйтесь к платформе как специалист"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">ФИО</Label>
                    <Input id="name" placeholder="Сидоров Алексей Васильевич" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Специализация</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите специализацию" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lawyer">Юрист по банкротству</SelectItem>
                        <SelectItem value="financial-manager">Финансовый управляющий</SelectItem>
                        <SelectItem value="mediator">Медиатор</SelectItem>
                        <SelectItem value="accountant">Бухгалтер-эксперт</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="sidorov@example.com" required />
              </div>

              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" type="tel" placeholder="+7 (999) 987-65-43" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="license">Номер лицензии/аттестата/аккредитации</Label>
                    <Input id="license" placeholder="№ 12345-ФУ от 15.03.2020" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="diploma">Диплом об образовании</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id="diploma" 
                        type="file" 
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setDiplomaFile(e.target.files?.[0] || null)}
                        required 
                        className="cursor-pointer"
                      />
                      {diplomaFile && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <Icon name="Check" size={12} className="mr-1" />
                          {diplomaFile.name}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Форматы: PDF, JPG, JPEG, PNG (до 10 МБ)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sro">Членство в СРО</Label>
                    <Input id="sro" placeholder="Название СРО и номер свидетельства" />
                    <p className="text-xs text-muted-foreground">
                      Необязательно. Укажите, если состоите в саморегулируемой организации
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Опыт работы (лет)</Label>
                    <Input id="experience" type="number" min="0" placeholder="5" required />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input id="password" type="password" placeholder="••••••••" required />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="password-confirm">Подтвердите пароль</Label>
                  <Input id="password-confirm" type="password" placeholder="••••••••" required />
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                      Запомнить меня
                    </Label>
                  </div>
                  <Button variant="link" className="px-0 text-sm" type="button">
                    Забыли пароль?
                  </Button>
                </div>
              )}

              {!isLogin && (
                <>
                  <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg space-y-2">
                    <div className="flex items-start gap-2">
                      <Icon name="Info" className="text-accent mt-0.5 flex-shrink-0" size={16} />
                      <div className="text-sm">
                        <p className="font-medium text-accent">Требования для регистрации:</p>
                        <ul className="text-muted-foreground mt-1 space-y-1 ml-4 list-disc">
                          <li>Действующая лицензия/аттестат</li>
                          <li>Опыт работы от 1 года</li>
                          <li>Проверка документов (1-2 дня)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm font-normal leading-relaxed cursor-pointer">
                      Я принимаю условия{" "}
                      <a href="#" className="text-primary hover:underline">
                        Соглашения для специалистов
                      </a>{" "}
                      и{" "}
                      <a href="#" className="text-primary hover:underline">
                        Кодекса этики
                      </a>
                    </Label>
                  </div>
                </>
              )}

              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                {isLogin ? "Войти" : "Подать заявку"}
              </Button>

              {!isLogin && (
                <p className="text-xs text-center text-muted-foreground">
                  После подачи заявки ваши документы будут проверены модерацией в течение 1-2 рабочих дней
                </p>
              )}
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Еще не зарегистрированы?" : "Уже есть аккаунт?"}{" "}
                <Button
                  variant="link"
                  className="px-0 text-sm font-medium"
                  onClick={() => setIsLogin(!isLogin)}
                  type="button"
                >
                  {isLogin ? "Подать заявку" : "Войти"}
                </Button>
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Вы клиент?{" "}
                <Button
                  variant="link"
                  className="px-0 text-sm font-medium text-primary"
                  onClick={() => navigate("/client-login")}
                  type="button"
                >
                  Войти как клиент
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
        </div>

        <div>
          <Card className="shadow-xl border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 sticky top-4">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-green-500 text-white">Платная подписка</Badge>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">999 ₽</div>
                  <div className="text-sm text-muted-foreground">в месяц</div>
                </div>
              </div>
              <CardTitle className="text-2xl">Преимущества регистрации</CardTitle>
              <CardDescription>
                Получите доступ к потоку клиентов и инструментам для роста
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="User" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Профессиональная карточка</h4>
                    <p className="text-sm text-muted-foreground">
                      Создайте уникальный профиль со всеми вашими услугами, опытом и достижениями
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Users" size={20} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Поток готовых клиентов</h4>
                    <p className="text-sm text-muted-foreground">
                      Не тратьте деньги на рекламу — мы привлекаем клиентов и направляем их к вам
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Video" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Контент-маркетинг</h4>
                    <p className="text-sm text-muted-foreground">
                      До 3 видео + 1 профессиональная статья в месяц для демонстрации экспертности
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="ShieldCheck" size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Безопасные сделки</h4>
                    <p className="text-sm text-muted-foreground">
                      Escrow-гарантия расчетов через платформу — деньги защищены до выполнения работы
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="TrendingUp" size={20} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Выделяйтесь среди конкурентов</h4>
                    <p className="text-sm text-muted-foreground">
                      Рейтинги, отзывы клиентов и статистика дел повышают доверие и конверсию
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Briefcase" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Управление делами</h4>
                    <p className="text-sm text-muted-foreground">
                      Личный кабинет с CRM: ведение клиентов, документы, сроки, оплаты в одном месте
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="BarChart" size={20} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Аналитика и рост</h4>
                    <p className="text-sm text-muted-foreground">
                      Статистика просмотров профиля, конверсии заявок и рекомендации по улучшению
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Award" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Верификация и доверие</h4>
                    <p className="text-sm text-muted-foreground">
                      Значок "Проверенный специалист" после модерации документов и лицензий
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-3">
                  <Icon name="TrendingUp" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-800">Средний доход специалистов</p>
                    <p className="text-2xl font-bold text-green-700">+120 000 ₽/мес</p>
                    <p className="text-xs text-green-600 mt-1">
                      За вычетом стоимости подписки вы экономите на рекламе 15-30 тыс. ₽/мес
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center text-xs text-muted-foreground">
                <Icon name="Info" size={12} className="inline mr-1" />
                Подписка активируется после одобрения заявки модерацией
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialistLogin;