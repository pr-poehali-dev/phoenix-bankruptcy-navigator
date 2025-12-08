import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const SpecialistsSection = () => {
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

  return (
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
  );
};

export default SpecialistsSection;
