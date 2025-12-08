import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import ScrollReveal from "@/components/ScrollReveal";

type ClientType = "individual" | "legal";

interface DiagnosticTypeSelectorProps {
  onSelectType: (type: ClientType) => void;
}

const DiagnosticTypeSelector = ({ onSelectType }: DiagnosticTypeSelectorProps) => {
  return (
    <section id="diagnostic" className="py-20 px-4 bg-card relative">
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Диагностика банкротства</h2>
            <p className="text-lg text-muted-foreground">
              Пройдите диагностику по вопросам для анализа перспектив банкротства
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="grid md:grid-cols-2 gap-6">
            <Card 
              className="shadow-md border-primary/20 hover:border-primary transition-all cursor-pointer group"
              onClick={() => onSelectType("individual")}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                  <Icon name="User" size={32} className="text-primary" />
                </div>
                <CardTitle className="text-center">Физическое лицо</CardTitle>
                <CardDescription className="text-center">
                  Диагностика для граждан по ст. 213.4 Закона о банкротстве
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="shadow-md border-accent/30 hover:border-accent transition-all cursor-pointer group"
              onClick={() => onSelectType("legal")}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-accent/15 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-accent/30 transition-colors">
                  <Icon name="Building" size={32} className="text-accent" />
                </div>
                <CardTitle className="text-center">Юридическое лицо / ИП</CardTitle>
                <CardDescription className="text-center">
                  Диагностика для компаний по ст. 3 Закона о банкротстве
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default DiagnosticTypeSelector;
