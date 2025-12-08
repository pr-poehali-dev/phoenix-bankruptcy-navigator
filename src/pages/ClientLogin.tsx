import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import PhoenixLogo from "@/components/PhoenixLogo";
import { useNavigate } from "react-router-dom";

const ClientLogin = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/client-dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 cursor-pointer" onClick={() => navigate("/")}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <PhoenixLogo size={64} className="drop-shadow-lg" />
          </div>
          <h1 className="text-3xl font-bold">Феникс</h1>
          <p className="text-muted-foreground">Навигатор банкротства</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">{isLogin ? "Вход для клиентов" : "Регистрация клиента"}</CardTitle>
            <CardDescription>
              {isLogin ? "Войдите в свой личный кабинет" : "Создайте аккаунт для доступа к платформе"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">ФИО</Label>
                  <Input id="name" placeholder="Иван Петров" required />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="ivan@example.com" required />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" required />
                </div>
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
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm font-normal leading-relaxed cursor-pointer">
                    Я принимаю условия{" "}
                    <a href="#" className="text-primary hover:underline">
                      Пользовательского соглашения
                    </a>{" "}
                    и{" "}
                    <a href="#" className="text-primary hover:underline">
                      Политики конфиденциальности
                    </a>
                  </Label>
                </div>
              )}

              <Button type="submit" className="w-full">
                {isLogin ? "Войти" : "Зарегистрироваться"}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Или</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" type="button" className="w-full">
                  <Icon name="Mail" size={16} className="mr-2" />
                  Google
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Еще нет аккаунта?" : "Уже есть аккаунт?"}{" "}
                <Button
                  variant="link"
                  className="px-0 text-sm font-medium"
                  onClick={() => setIsLogin(!isLogin)}
                  type="button"
                >
                  {isLogin ? "Зарегистрироваться" : "Войти"}
                </Button>
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Вы специалист?{" "}
                <Button
                  variant="link"
                  className="px-0 text-sm font-medium text-accent"
                  onClick={() => navigate("/specialist-login")}
                  type="button"
                >
                  Войти как специалист
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientLogin;
