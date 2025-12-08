import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type ExpertiseType = 
  | "financial" 
  | "accounting" 
  | "property" 
  | "business" 
  | "technical" 
  | null;

interface Expert {
  id: number;
  name: string;
  specialization: string;
  experience: number;
  cases: number;
  rating: number;
  price: string;
  certifications: string[];
  available: boolean;
  avatar: string;
  avatarBg: string;
}

interface ExpertiseResultsProps {
  expertiseType: ExpertiseType;
  experts: Expert[];
  selectedExperts: number[];
  onToggleExpert: (expertId: number) => void;
  onReset: () => void;
}

const ExpertiseResults = ({ 
  expertiseType, 
  experts, 
  selectedExperts, 
  onToggleExpert, 
  onReset 
}: ExpertiseResultsProps) => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("rating");

  const saveToAccount = () => {
    setIsSaving(true);
    const selectedExpertsData = experts.filter(e => selectedExperts.includes(e.id));
    localStorage.setItem('selectedExperts', JSON.stringify(selectedExpertsData));
    localStorage.setItem('expertiseType', expertiseType || '');
    
    toast({
      title: "Эксперты сохранены!",
      description: `${selectedExpertsData.length} ${selectedExpertsData.length === 1 ? 'эксперт сохранён' : 'экспертов сохранено'} в личный кабинет`,
      duration: 3000,
    });
    
    setTimeout(() => {
      setIsSaving(false);
      navigate('/client-dashboard?tab=specialists');
    }, 500);
  };

  const getExpertiseTypeName = () => {
    switch (expertiseType) {
      case "financial": return "Финансовая экспертиза";
      case "accounting": return "Бухгалтерская экспертиза";
      case "property": return "Оценка имущества";
      case "business": return "Оценка бизнеса";
      case "technical": return "Техническая экспертиза";
      default: return "";
    }
  };

  const filteredAndSortedExperts = useMemo(() => {
    let filtered = [...experts];

    if (availabilityFilter === "available") {
      filtered = filtered.filter(e => e.available);
    } else if (availabilityFilter === "busy") {
      filtered = filtered.filter(e => !e.available);
    }

    if (ratingFilter === "high") {
      filtered = filtered.filter(e => e.rating >= 4.8);
    } else if (ratingFilter === "medium") {
      filtered = filtered.filter(e => e.rating >= 4.5 && e.rating < 4.8);
    }

    filtered.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "experience") return b.experience - a.experience;
      if (sortBy === "cases") return b.cases - a.cases;
      return 0;
    });

    return filtered;
  }, [experts, availabilityFilter, ratingFilter, sortBy]);

  return (
    <section id="expertise" className="py-20 px-4 bg-card relative">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <Button variant="ghost" onClick={onReset} className="mb-4">
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Назад
          </Button>
          <h2 className="text-3xl font-bold mb-2">Подходящие эксперты</h2>
          <p className="text-muted-foreground">
            Специалисты по направлению: {getExpertiseTypeName()}
          </p>
        </div>

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
                <Label>Доступность</Label>
                <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все эксперты</SelectItem>
                    <SelectItem value="available">Только доступные</SelectItem>
                    <SelectItem value="busy">Только занятые</SelectItem>
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
                    <SelectItem value="experience">По опыту</SelectItem>
                    <SelectItem value="cases">По количеству дел</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Найдено экспертов: <span className="font-semibold">{filteredAndSortedExperts.length}</span>
              </p>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setAvailabilityFilter("all");
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

        <div className="grid md:grid-cols-2 gap-6">
          {filteredAndSortedExperts.length === 0 ? (
            <Card className="col-span-2 p-8">
              <div className="text-center">
                <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Эксперты не найдены</h3>
                <p className="text-muted-foreground mb-4">Попробуйте изменить параметры фильтрации</p>
                <Button variant="outline" onClick={() => {
                  setAvailabilityFilter("all");
                  setRatingFilter("all");
                }}>
                  Сбросить фильтры
                </Button>
              </div>
            </Card>
          ) : filteredAndSortedExperts.map((expert) => (
            <Card key={expert.id} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 ${expert.avatarBg} rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xl`}>
                      {expert.avatar}
                    </div>
                    <div>
                      <CardTitle className="mb-1">{expert.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{expert.specialization}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Icon name="Star" className="text-yellow-500" size={14} />
                          <span className="text-sm font-medium">{expert.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Icon name="Briefcase" size={14} />
                          <span>{expert.cases} дел</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Icon name="Award" size={14} />
                          <span>{expert.experience} лет</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {expert.available ? (
                    <Badge className="bg-green-500">Доступен</Badge>
                  ) : (
                    <Badge variant="secondary">Занят</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Квалификация:</p>
                  <div className="flex flex-wrap gap-2">
                    {expert.certifications.map((cert, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        <Icon name="Award" size={12} className="mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Стоимость</p>
                    <p className="text-lg font-bold text-primary">{expert.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onToggleExpert(expert.id)}
                    >
                      <Icon 
                        name={selectedExperts.includes(expert.id) ? "Check" : "Plus"} 
                        size={16} 
                        className="mr-2" 
                      />
                      {selectedExperts.includes(expert.id) ? "Выбран" : "Выбрать"}
                    </Button>
                    <Button size="sm" disabled={!expert.available}>
                      <Icon name="MessageSquare" size={16} className="mr-2" />
                      Написать
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}\n        </div>

        {selectedExperts.length > 0 && (
          <Card className="mt-8 shadow-lg border-primary/30">
            <CardHeader>
              <CardTitle>Выбрано экспертов: {selectedExperts.length}</CardTitle>
              <CardDescription>Отправить запрос на проведение экспертизы</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" size="lg" onClick={saveToAccount} disabled={isSaving}>
                <Icon name={isSaving ? "Loader2" : "Save"} size={16} className={`mr-2 ${isSaving ? 'animate-spin' : ''}`} />
                {isSaving ? 'Сохранение...' : 'Сохранить в личный кабинет'}
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <Icon name="Send" size={16} className="mr-2" />
                Отправить запрос выбранным экспертам
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default ExpertiseResults;