import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Здравствуйте! Я AI-ассистент Феникса. Помогу разобраться в вопросах банкротства. Задайте ваш вопрос!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "Когда подавать на банкротство?",
    "Сколько стоит процедура?",
    "Что будет с имуществом?",
    "Как выбрать специалиста?"
  ];

  const getAIResponse = (userQuestion: string): string => {
    const lowerQuestion = userQuestion.toLowerCase();
    
    if (lowerQuestion.includes("когда") || lowerQuestion.includes("подать") || lowerQuestion.includes("подавать")) {
      return "Вы можете подать на банкротство при задолженности от 500 тысяч рублей и просрочке более 3 месяцев. Также есть обязанность подать заявление, если долги превышают стоимость вашего имущества и вы не можете их погасить. Рекомендую воспользоваться нашим калькулятором для оценки вашей ситуации.";
    }
    
    if (lowerQuestion.includes("стоимость") || lowerQuestion.includes("стоит") || lowerQuestion.includes("цена")) {
      return "Минимальная стоимость процедуры банкротства составляет около 55-80 тысяч рублей: госпошлина (300₽), вознаграждение финансового управляющего (от 25 000₽), услуги юриста (от 30 000₽), публикации (около 5 000₽). Точная сумма зависит от сложности вашего дела.";
    }
    
    if (lowerQuestion.includes("имущество") || lowerQuestion.includes("квартира") || lowerQuestion.includes("жилье")) {
      return "При банкротстве сохраняется: единственное жильё (если не в ипотеке), личные вещи, предметы профессиональной деятельности, продукты питания, призы и награды. Может быть реализовано: дополнительная недвижимость, автомобили (кроме необходимых для инвалидов), ценные бумаги, предметы роскоши. Наличные средства до 100 МРОТ сохраняются.";
    }
    
    if (lowerQuestion.includes("специалист") || lowerQuestion.includes("юрист") || lowerQuestion.includes("управляющ")) {
      return "При выборе специалиста обратите внимание на: опыт работы (желательно от 3 лет), количество успешно завершённых дел, специализацию (ипотека, МФО, ИП), членство в СРО, отзывы клиентов. В нашей базе все специалисты проверены и имеют подтверждённую статистику. Могу помочь подобрать эксперта под ваш случай!";
    }
    
    if (lowerQuestion.includes("срок") || lowerQuestion.includes("длит") || lowerQuestion.includes("сколько времени")) {
      return "Процедура банкротства обычно занимает от 6 до 12 месяцев. Основные этапы: подготовка документов (1-2 недели), рассмотрение заявления судом (2-3 месяца), реализация имущества (3-6 месяцев), завершение процедуры (1 месяц). Внесудебное банкротство может пройти быстрее — за 6 месяцев.";
    }

    if (lowerQuestion.includes("кредит") || lowerQuestion.includes("долг") || lowerQuestion.includes("займ")) {
      return "Через банкротство можно списать: кредиты банков, займы МФО, долги по кредитным картам, долги перед физлицами, задолженности по ЖКХ. НЕ списываются: алименты, возмещение вреда жизни и здоровью, зарплаты сотрудников, текущие платежи.";
    }

    return "Отличный вопрос! Для более точного ответа рекомендую воспользоваться нашим умным калькулятором или записаться на консультацию к специалисту. В разделе 'Академия' вы найдёте подробные материалы по всем аспектам банкротства.";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-2xl hover:scale-110 transition-transform z-50"
        >
          <Icon name="MessageCircle" size={28} />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[400px] h-[600px] shadow-2xl z-50 flex flex-col">
          <CardHeader className="border-b bg-gradient-to-r from-primary to-secondary text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="Bot" size={24} />
                </div>
                <div>
                  <CardTitle className="text-white">AI-ассистент</CardTitle>
                  <p className="text-xs text-white/80">Онлайн</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-primary text-white"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString("ru-RU", {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {messages.length === 1 && (
              <div className="p-4 border-t bg-muted/30">
                <p className="text-xs text-muted-foreground mb-3">Популярные вопросы:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {question}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Введите ваш вопрос..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AIAssistant;
