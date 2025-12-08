import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import ScrollReveal from "@/components/ScrollReveal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  icon: string;
  category: string;
}

const ShopSection = () => {
  const navigate = useNavigate();
  const [selectedSpecialists, setSelectedSpecialists] = useState<Record<number, string>>({});

  const services: Service[] = [
    {
      id: 1,
      title: "Консультация",
      description: "Первичная консультация по вашему случаю с разбором ситуации и рекомендациями",
      price: 5000,
      icon: "MessageSquare",
      category: "Консультации"
    },
    {
      id: 2,
      title: "Представитель на судебное заседание",
      description: "Профессиональное представительство ваших интересов в суде",
      price: 15000,
      icon: "Scale",
      category: "Судебные услуги"
    },
    {
      id: 3,
      title: "Подготовка заявления о банкротстве",
      description: "Полная подготовка пакета документов для подачи заявления",
      price: 15000,
      icon: "FileText",
      category: "Документы"
    },
    {
      id: 4,
      title: "Защита от субсидиарной ответственности",
      description: "Комплексная защита руководителей и учредителей от привлечения к ответственности",
      price: 150000,
      icon: "Shield",
      category: "Защита"
    },
    {
      id: 5,
      title: "Защита сделки от оспаривания",
      description: "Юридическое сопровождение для защиты законности сделок",
      price: 200000,
      icon: "Lock",
      category: "Защита"
    },
    {
      id: 6,
      title: "Диагностика признаков банкротства",
      description: "Глубокий анализ финансового состояния с экспертным заключением",
      price: 50000,
      icon: "Search",
      category: "Аналитика"
    },
    {
      id: 7,
      title: "Аудит компании перед подачей на банкротство",
      description: "Комплексная проверка документации и выявление рисков",
      price: 70000,
      icon: "FileCheck",
      category: "Аналитика"
    },
    {
      id: 8,
      title: "Проведение судебной оценки имущества",
      description: "Независимая экспертная оценка для судебных процедур",
      price: 25000,
      icon: "Home",
      category: "Экспертиза"
    }
  ];

  const specialists = [
    { id: 1, name: "Анна Петрова", type: "Финансовый управляющий" },
    { id: 2, name: "Сергей Иванов", type: "Юрист по банкротству" },
    { id: 3, name: "Мария Козлова", type: "Финансовый управляющий" },
    { id: 4, name: "Петров Игорь Михайлович", type: "Эксперт по финансам" },
    { id: 5, name: "Смирнова Елена Викторовна", type: "Эксперт-бухгалтер" },
    { id: 6, name: "Козлов Дмитрий Александрович", type: "Оценщик имущества" },
    { id: 7, name: "Васильева Ольга Сергеевна", type: "Оценщик бизнеса" },
    { id: 8, name: "Морозов Андрей Петрович", type: "Технический эксперт" }
  ];

  const handleSelectSpecialist = (serviceId: number, specialistId: string) => {
    setSelectedSpecialists(prev => ({
      ...prev,
      [serviceId]: specialistId
    }));
  };

  const handleOrderService = (service: Service) => {
    const specialistId = selectedSpecialists[service.id];
    const specialist = specialists.find(s => s.id.toString() === specialistId);

    if (!specialistId) {
      toast({
        title: "Выберите специалиста",
        description: "Для заказа услуги необходимо выбрать специалиста",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const cartItem = {
      serviceId: service.id,
      title: service.title,
      description: service.description,
      price: service.price,
      icon: service.icon,
      category: service.category,
      specialistId: specialistId,
      specialistName: specialist?.name || '',
      specialistType: specialist?.type || ''
    };

    const existingCart = localStorage.getItem('cartItems');
    const cart = existingCart ? JSON.parse(existingCart) : [];
    
    const itemExists = cart.some((item: any) => item.serviceId === service.id);
    if (!itemExists) {
      cart.push(cartItem);
      localStorage.setItem('cartItems', JSON.stringify(cart));
    }

    toast({
      title: "Услуга добавлена в корзину",
      description: `${service.title} со специалистом ${specialist?.name}`,
      duration: 3000,
    });

    setTimeout(() => {
      navigate('/cart');
    }, 1500);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  };

  return (
    <section id="shop" className="py-20 px-4 bg-gradient-to-br from-accent/5 to-primary/5 relative">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/15 text-primary border-primary/30">
              <Icon name="ShoppingCart" size={16} className="mr-2" />
              Магазин услуг
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Наш магазин</h2>
            <p className="text-lg text-muted-foreground">
              Профессиональные услуги по банкротству и защите интересов
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 100}>
              <Card className="shadow-md hover:shadow-lg transition-all border-primary/20 h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name={service.icon as any} size={24} className="text-primary" />
                    </div>
                    <Badge variant="outline">{service.category}</Badge>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex-1 flex flex-col justify-end">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Выберите специалиста:</Label>
                    <Select 
                      value={selectedSpecialists[service.id] || ""} 
                      onValueChange={(value) => handleSelectSpecialist(service.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите специалиста" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialists.map(specialist => (
                          <SelectItem key={specialist.id} value={specialist.id.toString()}>
                            {specialist.name} — {specialist.type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Стоимость</p>
                      <p className="text-2xl font-bold text-primary">{formatPrice(service.price)}</p>
                    </div>
                    <Button 
                      onClick={() => handleOrderService(service)}
                      className="gap-2"
                    >
                      <Icon name="ShoppingCart" size={16} />
                      Заказать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <Card className="mt-12 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/30 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="ShieldCheck" size={24} className="text-primary" />
                Гарантии безопасности
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="Lock" className="text-primary" size={24} />
                  </div>
                  <h4 className="font-semibold mb-2">Безопасные платежи</h4>
                  <p className="text-sm text-muted-foreground">
                    Оплата через защищённый Escrow-сервис с гарантией возврата
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/15 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="Award" className="text-accent" size={24} />
                  </div>
                  <h4 className="font-semibold mb-2">Проверенные специалисты</h4>
                  <p className="text-sm text-muted-foreground">
                    Все эксперты прошли верификацию и имеют подтверждённую статистику
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="FileCheck" className="text-primary" size={24} />
                  </div>
                  <h4 className="font-semibold mb-2">Юридические гарантии</h4>
                  <p className="text-sm text-muted-foreground">
                    Договор на каждую услугу с чёткими условиями и сроками
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

export default ShopSection;