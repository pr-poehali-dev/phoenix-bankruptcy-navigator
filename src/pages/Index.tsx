import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import DiagnosticSection from "@/components/DiagnosticSection";
import SpecialistsSection from "@/components/SpecialistsSection";
import AcademySection from "@/components/AcademySection";
import MediationSection from "@/components/MediationSection";
import AIAssistant from "@/components/AIAssistant";
import ScrollReveal from "@/components/ScrollReveal";
import PhoenixLogo from "@/components/PhoenixLogo";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="parallax-bg">
        <div className="parallax-pattern" />
      </div>
      <header className="border-b bg-card/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PhoenixLogo size={64} className="drop-shadow-lg" />
              <div>
                <h1 className="text-2xl font-bold header-title">Феникс</h1>
                <p className="text-xs text-muted-foreground">Навигатор банкротства</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#diagnostic" className="text-sm hover:text-primary transition-all relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">Диагностика</a>
              <a href="#specialists" className="text-sm hover:text-primary transition-all relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">Специалисты</a>
              <a href="#academy" className="text-sm hover:text-primary transition-all relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">Академия</a>
              <a href="#mediation" className="text-sm hover:text-primary transition-all relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">Медиация</a>
            </nav>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/specialist-login'} className="hidden md:flex">
                Для специалистов
              </Button>
              <Button className="hover:scale-105 transition-transform" onClick={() => window.location.href = '/client-login'}>Войти</Button>
            </div>
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4 bg-accent/15 text-accent border-accent/30 hover:bg-accent/25 shadow-sm shimmer-slow">
              ⭐ Новое начало уже близко
            </Badge>
            <h2 className="text-6xl font-bold mb-6 hero-title">
              Путь к финансовому возрождению
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Умная платформа для диагностики банкротства, подбора проверенных специалистов 
              и безопасного ведения процедуры от начала до конца
            </p>
            <div className="flex gap-4 justify-center mt-8">
              <Button size="lg" className="gap-2 hover:scale-105 transition-transform" onClick={() => document.getElementById('diagnostic')?.scrollIntoView({ behavior: 'smooth' })}>
                <Icon name="Calculator" size={20} />
                Начать диагностику
              </Button>
              <Button size="lg" variant="outline" className="gap-2 hover:scale-105 transition-transform group border-accent/30 hover:border-accent hover:bg-accent/10">
                <Icon name="Play" size={20} className="text-accent group-hover:scale-110 transition-transform" />
                Смотреть видео
              </Button>
            </div>
          </div>

          <ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <Card className="hover-scale border-primary/20 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon name="ShieldCheck" className="text-primary group-hover:scale-110 transition-transform" size={24} />
                </div>
                <CardTitle>Безопасные сделки</CardTitle>
                <CardDescription>
                  Встроенный Escrow-сервис для поэтапной оплаты специалистов
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-scale border-accent/30 shadow-sm hover:shadow-lg hover:shadow-accent/20 transition-all cursor-pointer group shimmer-slow premium-border">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/15 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors shadow-sm">
                  <Icon name="Users" className="text-accent group-hover:scale-110 transition-transform" size={24} />
                </div>
                <CardTitle>Проверенные эксперты</CardTitle>
                <CardDescription>
                  База верифицированных юристов и финансовых управляющих с реальной статистикой
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-scale border-primary/20 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon name="BookOpen" className="text-primary group-hover:scale-110 transition-transform" size={24} />
                </div>
                <CardTitle>Обучение</CardTitle>
                <CardDescription>
                  Академия с пошаговыми инструкциями, видео и реальными кейсами
                </CardDescription>
              </CardHeader>
            </Card>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <DiagnosticSection />
      <SpecialistsSection />
      <AcademySection />
      <MediationSection />

      <footer className="bg-primary text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name="Phoenix" className="text-primary" size={20} />
                </div>
                <h3 className="text-xl font-bold">Феникс</h3>
              </div>
              <p className="text-sm text-white/70">
                Навигатор банкротства — ваш проводник к финансовому возрождению
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Платформа</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#diagnostic" className="hover:text-accent transition">Диагностика</a></li>
                <li><a href="#specialists" className="hover:text-accent transition">Специалисты</a></li>
                <li><a href="#academy" className="hover:text-accent transition">Академия</a></li>
                <li><a href="#mediation" className="hover:text-accent transition">Медиация</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">О нас</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-accent transition">Миссия</a></li>
                <li><a href="#" className="hover:text-accent transition">Команда</a></li>
                <li><a href="#" className="hover:text-accent transition">Партнёры</a></li>
                <li><a href="#" className="hover:text-accent transition">Отзывы</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-accent transition">Контакты</a></li>
                <li><a href="#" className="hover:text-accent transition">FAQ</a></li>
                <li><a href="#" className="hover:text-accent transition">Документы</a></li>
                <li><a href="#" className="hover:text-accent transition">Политика</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60">
            <p>© 2024 Феникс. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
};

export default Index;