import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import PhoenixLogo from "@/components/PhoenixLogo";
import { useNavigate } from "react-router-dom";

const SpecialistLogin = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/specialist-dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/5 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 cursor-pointer" onClick={() => navigate("/")}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <PhoenixLogo size={64} className="drop-shadow-lg" />
          </div>
          <h1 className="text-3xl font-bold">Феникс</h1>
          <p className="text-muted-foreground">Навигатор банкротства</p>
        </div>

        <Card className="shadow-xl border-accent/30">
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
                    <Label htmlFor="license">Номер лицензии/аттестата</Label>
                    <Input id="license" placeholder="№ 12345-ФУ от 15.03.2020" required />
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
    </div>
  );
};

export default SpecialistLogin;
