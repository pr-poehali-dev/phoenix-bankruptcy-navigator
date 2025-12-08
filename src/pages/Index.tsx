import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import DiagnosticSection from "@/components/DiagnosticSection";
import SpecialistsSection from "@/components/SpecialistsSection";
import AcademySection from "@/components/AcademySection";
import MediationSection from "@/components/MediationSection";
import AIAssistant from "@/components/AIAssistant";

const Index = () => {
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

      <DiagnosticSection />
      <SpecialistsSection />
      <AcademySection />
      <MediationSection />

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

      <AIAssistant />
    </div>
  );
};

export default Index;