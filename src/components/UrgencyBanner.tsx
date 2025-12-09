import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const UrgencyBanner = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const updateTimer = () => {
      const now = new Date();
      const diff = endOfDay.getTime() - now.getTime();

      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setTimeLeft({ hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 animate-gradient-x">
      <div className="container mx-auto px-4 py-4">
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                  <Icon name="Zap" size={24} className="text-white" />
                </div>
                <div>
                  <Badge className="mb-2 bg-red-500 text-white">
                    🔥 Акция заканчивается сегодня
                  </Badge>
                  <h3 className="text-xl font-bold mb-1">
                    Консультация со скидкой 100% — бесплатно
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    <span className="line-through">5 000 ₽</span>
                    <span className="ml-2 text-xl font-bold text-green-600">0 ₽</span>
                    <span className="ml-2">— экономия 5 000 ₽</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">До конца акции:</p>
                  <div className="flex gap-2">
                    <div className="bg-primary/10 rounded-lg px-3 py-2 min-w-[50px]">
                      <div className="text-2xl font-bold text-primary">{String(timeLeft.hours).padStart(2, '0')}</div>
                      <div className="text-xs text-muted-foreground">часов</div>
                    </div>
                    <div className="flex items-center text-2xl font-bold text-primary">:</div>
                    <div className="bg-primary/10 rounded-lg px-3 py-2 min-w-[50px]">
                      <div className="text-2xl font-bold text-primary">{String(timeLeft.minutes).padStart(2, '0')}</div>
                      <div className="text-xs text-muted-foreground">минут</div>
                    </div>
                    <div className="flex items-center text-2xl font-bold text-primary">:</div>
                    <div className="bg-primary/10 rounded-lg px-3 py-2 min-w-[50px]">
                      <div className="text-2xl font-bold text-primary">{String(timeLeft.seconds).padStart(2, '0')}</div>
                      <div className="text-xs text-muted-foreground">секунд</div>
                    </div>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:opacity-90 text-white gap-2 shadow-lg"
                  onClick={() => navigate('/client-login')}
                >
                  <Icon name="Clock" size={18} />
                  Успеть записаться
                </Button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
              <div className="flex items-center gap-1 text-xs">
                <Icon name="Check" size={14} className="text-green-600" />
                <span>Анализ вашей ситуации</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Icon name="Check" size={14} className="text-green-600" />
                <span>План действий</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Icon name="Check" size={14} className="text-green-600" />
                <span>Оценка перспектив</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Icon name="Check" size={14} className="text-green-600" />
                <span>Ответы на вопросы</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UrgencyBanner;