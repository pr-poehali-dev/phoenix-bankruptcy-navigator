import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface DiagnosticResult {
  prospects: string;
  risks: string[];
  alternatives: string[];
  strategy: string;
  nextSteps: string;
}

interface DiagnosticResultProps {
  result: DiagnosticResult;
  onReset: () => void;
}

const DiagnosticResultComponent = ({ result, onReset }: DiagnosticResultProps) => {
  return (
    <section id="diagnostic" className="py-20 px-4 bg-card relative">
      <div className="container mx-auto max-w-4xl">
        <Card className="shadow-lg border-primary/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Результаты диагностики</CardTitle>
              <Badge 
                variant={result.prospects.includes("ВЫСОКИЕ") ? "default" : result.prospects.includes("СРЕДНИЕ") ? "secondary" : "outline"}
                className="text-lg px-4 py-1"
              >
                {result.prospects}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Icon name="Target" size={20} />
                Перспективы банкротства
              </h4>
              <p className="text-sm">{result.prospects}</p>
            </div>

            <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Icon name="AlertTriangle" size={20} className="text-destructive" />
                Ключевые риски
              </h4>
              <ul className="space-y-2">
                {result.risks.map((risk, idx) => (
                  <li key={idx} className="text-sm flex gap-2">
                    <span className="text-destructive">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {result.alternatives.length > 0 && (
              <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="Lightbulb" size={20} className="text-accent" />
                  Альтернативные варианты
                </h4>
                <ul className="space-y-2">
                  {result.alternatives.map((alt, idx) => (
                    <li key={idx} className="text-sm flex gap-2">
                      <span className="text-accent">•</span>
                      <span>{alt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Icon name="MapPin" size={20} />
                Рекомендуемая стратегия
              </h4>
              <p className="text-sm">{result.strategy}</p>
            </div>

            <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Icon name="ArrowRight" size={20} className="text-accent" />
                Следующие шаги
              </h4>
              <p className="text-sm">{result.nextSteps}</p>
            </div>

            <div className="flex gap-3">
              <Button onClick={onReset} variant="outline" className="flex-1">
                <Icon name="RotateCcw" size={16} className="mr-2" />
                Пройти заново
              </Button>
              <Button className="flex-1" onClick={() => document.getElementById('specialists')?.scrollIntoView({ behavior: 'smooth' })}>
                <Icon name="Users" size={16} className="mr-2" />
                Найти специалиста
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DiagnosticResultComponent;
