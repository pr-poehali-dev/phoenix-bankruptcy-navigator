import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

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

        <div className="grid md:grid-cols-2 gap-6">
          {experts.map((expert) => (
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
          ))}
        </div>

        {selectedExperts.length > 0 && (
          <Card className="mt-8 shadow-lg border-primary/30">
            <CardHeader>
              <CardTitle>Выбрано экспертов: {selectedExperts.length}</CardTitle>
              <CardDescription>Отправить запрос на проведение экспертизы</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg">
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