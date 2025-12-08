import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import ScrollReveal from "@/components/ScrollReveal";

type ExpertiseType = 
  | "financial" 
  | "accounting" 
  | "property" 
  | "business" 
  | "technical";

interface ExpertiseTypeSelectorProps {
  onSelectType: (type: ExpertiseType) => void;
}

const ExpertiseTypeSelector = ({ onSelectType }: ExpertiseTypeSelectorProps) => {
  return (
    <section id="expertise" className="py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5 relative">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Судебная экспертиза</h2>
            <p className="text-lg text-muted-foreground">
              Профессиональная экспертиза для судебных разбирательств и банкротства
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card 
              className="shadow-md border-primary/20 hover:border-primary hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => onSelectType("financial")}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                  <Icon name="TrendingUp" size={32} className="text-primary" />
                </div>
                <CardTitle className="text-center">Финансовая экспертиза</CardTitle>
                <CardDescription className="text-center">
                  Анализ финансовых операций, выявление признаков банкротства
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="shadow-md border-accent/30 hover:border-accent hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => onSelectType("accounting")}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-accent/15 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-accent/30 transition-colors">
                  <Icon name="Calculator" size={32} className="text-accent" />
                </div>
                <CardTitle className="text-center">Бухгалтерская экспертиза</CardTitle>
                <CardDescription className="text-center">
                  Проверка бухгалтерской отчетности, выявление ошибок и нарушений
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="shadow-md border-primary/20 hover:border-primary hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => onSelectType("property")}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                  <Icon name="Home" size={32} className="text-primary" />
                </div>
                <CardTitle className="text-center">Оценка имущества</CardTitle>
                <CardDescription className="text-center">
                  Независимая оценка недвижимости, транспорта, ценностей
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="shadow-md border-accent/30 hover:border-accent hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => onSelectType("business")}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-accent/15 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-accent/30 transition-colors">
                  <Icon name="Building" size={32} className="text-accent" />
                </div>
                <CardTitle className="text-center">Оценка бизнеса</CardTitle>
                <CardDescription className="text-center">
                  Оценка стоимости компании, активов, долей участия
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="shadow-md border-primary/20 hover:border-primary hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => onSelectType("technical")}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                  <Icon name="Cpu" size={32} className="text-primary" />
                </div>
                <CardTitle className="text-center">Техническая экспертиза</CardTitle>
                <CardDescription className="text-center">
                  Экспертиза оборудования, технологий, производственных активов
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-md border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Icon name="HelpCircle" size={32} className="text-primary" />
                </div>
                <CardTitle className="text-center">Не знаете, что выбрать?</CardTitle>
                <CardDescription className="text-center">
                  Свяжитесь с нами для бесплатной консультации
                </CardDescription>
                <Button variant="outline" className="mt-4">
                  <Icon name="MessageSquare" size={16} className="mr-2" />
                  Получить консультацию
                </Button>
              </CardHeader>
            </Card>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <Card className="mt-12 bg-card shadow-md">
            <CardHeader>
              <CardTitle className="text-center">Зачем нужна судебная экспертиза?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="Scale" className="text-primary" size={24} />
                  </div>
                  <h4 className="font-semibold mb-2">Доказательная база</h4>
                  <p className="text-sm text-muted-foreground">
                    Заключение эксперта принимается судом как весомое доказательство
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/15 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="ShieldCheck" className="text-accent" size={24} />
                  </div>
                  <h4 className="font-semibold mb-2">Независимость</h4>
                  <p className="text-sm text-muted-foreground">
                    Объективная оценка от сертифицированных экспертов
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="FileCheck" className="text-primary" size={24} />
                  </div>
                  <h4 className="font-semibold mb-2">Юридическая сила</h4>
                  <p className="text-sm text-muted-foreground">
                    Заключение оформляется по всем требованиям законодательства
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ExpertiseTypeSelector;
