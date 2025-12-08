import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import ScrollReveal from "@/components/ScrollReveal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState, useMemo } from "react";

const SpecialistsSection = () => {
  const [specializationFilter, setSpecializationFilter] = useState<string>("all");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("rating");

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

  const filteredAndSortedSpecialists = useMemo(() => {
    let filtered = [...specialists];

    if (specializationFilter !== "all") {
      filtered = filtered.filter(s => s.type === specializationFilter);
    }

    if (ratingFilter === "high") {
      filtered = filtered.filter(s => s.rating >= 4.8);
    } else if (ratingFilter === "medium") {
      filtered = filtered.filter(s => s.rating >= 4.5 && s.rating < 4.8);
    }

    filtered.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "cases") return b.cases - a.cases;
      if (sortBy === "success") return b.success - a.success;
      return 0;
    });

    return filtered;
  }, [specialists, specializationFilter, ratingFilter, sortBy]);

  return (
    <section id="specialists" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Проверенные специалисты</h2>
            <p className="text-lg text-muted-foreground">
              Подбираем эксперта под ваш конкретный случай
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Icon name="Filter" size={20} />
                Фильтры и сортировка
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Специализация</Label>
                  <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все специалисты</SelectItem>
                      <SelectItem value="Финансовый управляющий">Финансовый управляющий</SelectItem>
                      <SelectItem value="Юрист по банкротству">Юрист по банкротству</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Рейтинг</Label>
                  <Select value={ratingFilter} onValueChange={setRatingFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Любой рейтинг</SelectItem>
                      <SelectItem value="high">Высокий (4.8+)</SelectItem>
                      <SelectItem value="medium">Средний (4.5-4.8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Сортировка</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">По рейтингу</SelectItem>
                      <SelectItem value="cases">По количеству дел</SelectItem>
                      <SelectItem value="success">По успешности</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Найдено специалистов: <span className="font-semibold">{filteredAndSortedSpecialists.length}</span>
                </p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setSpecializationFilter("all");
                    setRatingFilter("all");
                    setSortBy("rating");
                  }}
                >
                  <Icon name="RotateCcw" size={14} className="mr-2" />
                  Сбросить фильтры
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
          {filteredAndSortedSpecialists.length === 0 ? (
            <Card className="col-span-3 p-8">
              <div className="text-center">
                <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Специалисты не найдены</h3>
                <p className="text-muted-foreground mb-4">Попробуйте изменить параметры фильтрации</p>
                <Button variant="outline" onClick={() => {
                  setSpecializationFilter("all");
                  setRatingFilter("all");
                }}>
                  Сбросить фильтры
                </Button>
              </div>
            </Card>
          ) : filteredAndSortedSpecialists.map((specialist, index) => (
            <Card key={index} className="hover-scale shadow-sm hover:shadow-md transition-shadow border-primary/20">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md shimmer-slow gold-glow">
                    {specialist.name.charAt(0)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={16} className="text-accent fill-accent" />
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
                <Button className="w-full mt-4 hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-white transition-all border-primary/30" variant="outline">
                  <Icon name="UserCheck" size={16} className="mr-2" />
                  Выбрать специалиста
                </Button>
              </CardContent>
            </Card>
          ))}\n          </div>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <Card className="mt-12 bg-gradient-to-r from-primary/5 to-accent/5 border-accent/30 shadow-md premium-border">
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
              <div className="text-center group cursor-pointer">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                  <Icon name="Wallet" className="text-primary" size={20} />
                </div>
                <p className="text-sm font-medium group-hover:text-primary transition-colors">Платёж на платформу</p>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                  <Icon name="FileCheck" className="text-primary" size={20} />
                </div>
                <p className="text-sm font-medium group-hover:text-primary transition-colors">Выполнение этапа</p>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                  <Icon name="CheckCircle" className="text-primary" size={20} />
                </div>
                <p className="text-sm font-medium group-hover:text-primary transition-colors">Подтверждение</p>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="w-12 h-12 bg-accent/15 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-accent/30 group-hover:scale-110 transition-all shadow-sm shimmer gold-glow">
                  <Icon name="ArrowRight" className="text-accent" size={20} />
                </div>
                <p className="text-sm font-medium text-accent group-hover:font-semibold transition-all">Перевод специалисту</p>
              </div>
            </div>
          </CardContent>
        </Card>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SpecialistsSection;