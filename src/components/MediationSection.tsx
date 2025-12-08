import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import StatsCounter from "@/components/StatsCounter";

const MediationSection = () => {
  return (
    <section id="mediation" className="py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Медиация онлайн</h2>
          <p className="text-lg text-muted-foreground">
            Разрешите спор без суда — быстрее и дешевле
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="shadow-md border-primary/20">
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
                <Icon name="CheckCircle" className="text-primary mt-1" size={20} />
                <div>
                  <p className="font-medium">Подбор медиатора</p>
                  <p className="text-sm text-muted-foreground">По отрасли и типу спора</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Video" className="text-primary mt-1" size={20} />
                <div>
                  <p className="font-medium">Виртуальные переговоры</p>
                  <p className="text-sm text-muted-foreground">С раздельными комнатами для совещаний</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="FileText" className="text-accent mt-1" size={20} />
                <div>
                  <p className="font-medium">Медиативное соглашение</p>
                  <p className="text-sm text-muted-foreground">Юридически грамотный документ</p>
                </div>
              </div>
              <Button className="w-full mt-4 hover:scale-105 transition-transform">Начать медиацию</Button>
            </CardContent>
          </Card>

          <Card className="shadow-md border-primary/20">
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
                <Icon name="Heart" className="text-accent mt-1" size={20} />
                <div>
                  <p className="font-medium">Конфиденциальность</p>
                  <p className="text-sm text-muted-foreground">Полная анонимность и безопасность</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="MessageSquare" className="text-primary mt-1" size={20} />
                <div>
                  <p className="font-medium">Совместная работа</p>
                  <p className="text-sm text-muted-foreground">Общая доска, чат, документы</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Clock" className="text-accent mt-1" size={20} />
                <div>
                  <p className="font-medium">Быстрое решение</p>
                  <p className="text-sm text-muted-foreground">В среднем 2-4 недели vs 6-12 месяцев суда</p>
                </div>
              </div>
              <Button className="w-full mt-4 hover:scale-105 transition-transform">Начать медиацию</Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-card shadow-md border-primary/20">
          <CardHeader>
            <CardTitle className="text-center">Преимущества медиации</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center group cursor-default">
                <div className="text-primary group-hover:scale-110 transition-transform">
                  <StatsCounter end={80} suffix="%" />
                </div>
                <p className="text-sm text-muted-foreground">Дешевле суда</p>
              </div>
              <div className="text-center group cursor-default">
                <div className="text-accent group-hover:scale-110 transition-transform flex items-center justify-center">
                  <StatsCounter end={10} suffix="x" />
                </div>
                <p className="text-sm text-muted-foreground">Быстрее процесса</p>
              </div>
              <div className="text-center group cursor-default">
                <div className="text-primary group-hover:scale-110 transition-transform">
                  <StatsCounter end={95} suffix="%" />
                </div>
                <p className="text-sm text-muted-foreground">Исполнение соглашений</p>
              </div>
              <div className="text-center group cursor-default">
                <div className="text-accent group-hover:scale-110 transition-transform">
                  <StatsCounter end={100} suffix="%" />
                </div>
                <p className="text-sm text-muted-foreground">Конфиденциальность</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MediationSection;