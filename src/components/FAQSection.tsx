import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Это слишком дорого. Может, сам справлюсь?",
      answer: "Самостоятельное банкротство кажется дешевле, но на практике выходит дороже. Ошибки в документах приводят к отказу суда (теряете госпошлину 300₽ и время). Без юриста кредиторы часто оспаривают сделки и включают в конкурсную массу ценное имущество. В среднем наши клиенты экономят 150-300 тыс. ₽ на защите активов и избегают субсидиарной ответственности. Стоимость услуг окупается в первый месяц."
    },
    {
      question: "А вдруг вы меня обманете и возьмете деньги?",
      answer: "Мы используем Escrow-сервис: ваши деньги блокируются на защищенном счету и передаются специалисту только после выполнения этапа работы. Вы платите за результат, а не за обещания. Все специалисты проходят верификацию, имеют реальную статистику дел и отзывы. У нас более 500 довольных клиентов и рейтинг 4.9/5. Если результата нет — деньги возвращаются."
    },
    {
      question: "Банкротство все равно не поможет, долги останутся",
      answer: "Это миф. По закону о банкротстве (127-ФЗ) суд списывает ВСЕ долги после завершения процедуры, включая: кредиты, займы, коммунальные платежи, штрафы ГИБДД, налоги (кроме алиментов и возмещения вреда здоровью). 98% наших клиентов полностью освобождаются от долгов за 5-7 месяцев. Это единственный легальный способ списать долги без последствий."
    },
    {
      question: "Заберут квартиру/машину, останусь на улице",
      answer: "Закон защищает: единственное жилье НЕ могут забрать даже через банкротство (кроме ипотечного). Автомобиль стоимостью до 100 тыс. ₽ также защищен, если это рабочий инструмент. Мы специализируемся на защите имущества: помогаем законно вывести активы из-под удара, правильно оформить документы на родственников, использовать все законные способы сохранения имущества. 340+ клиентов сохранили квартиры и машины."
    },
    {
      question: "Долго ждать, нужно решение прямо сейчас",
      answer: "Консультация — сегодня за 1 час. Диагностика на сайте — за 5 минут бесплатно. Подача заявления в суд — от 7 дней. Первые результаты (остановка звонков коллекторов, заморозка процентов) — сразу после подачи заявления. Полное списание долгов — 5-7 месяцев. Чем раньше начнете, тем быстрее избавитесь от долгов. Каждый месяц промедления = +10-20% к сумме долга из-за процентов и штрафов."
    },
    {
      question: "У меня особая ситуация, мне это не подойдет",
      answer: "Мы работаем с любыми ситуациями: ИП и ООО, директора и учредители, с имуществом и без, с поручителями, после развода, с черной зарплатой, при субсидиарной ответственности. За 3+ года решили 500+ уникальных кейсов. Пройдите бесплатную диагностику — она учитывает 15+ параметров вашей ситуации и даст точный ответ, подходит ли вам банкротство. В 90% случаев решение есть."
    },
    {
      question: "Испортится кредитная история навсегда",
      answer: "Да, в БКИ будет отметка о банкротстве на 5 лет, и 3 года после нельзя брать кредиты без уведомления банка. Но если у вас уже есть просрочки и долги — история уже испорчена. Банкротство очищает долги, и через 3-5 лет вы можете начать с чистого листа. Альтернатива — 10+ лет жить с долгами, коллекторами и судебными приставами. Что лучше: 3 года ограничений или 10+ лет с долгами?"
    },
    {
      question: "Работодатель узнает, меня уволят",
      answer: "Банкротство — не основание для увольнения по ТК РФ. Работодатель узнает, только если вы работаете в банке, МВД, ФСБ или занимаете должность, требующую допуска к гостайне. В остальных случаях информация конфиденциальна. Даже если узнают — уволить не имеют права. Более того, после банкротства приставы не могут удерживать 50-70% зарплаты, и вы наконец начнете получать полную зарплату."
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background to-primary/5 relative">
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/15 text-primary border-primary/30">
              <Icon name="HelpCircle" size={16} className="mr-2" />
              Ответы на возражения
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Развеиваем сомнения</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Честные ответы на самые частые страхи и возражения клиентов
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <Card className="shadow-lg border-primary/20">
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left hover:text-primary">
                      <div className="flex items-start gap-3">
                        <Icon name="AlertCircle" size={20} className="text-red-500 flex-shrink-0 mt-1" />
                        <span className="font-semibold">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-start gap-3 pl-8">
                        <Icon name="CheckCircle" size={20} className="text-green-500 flex-shrink-0 mt-1" />
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <Card className="mt-8 bg-gradient-to-r from-accent/10 to-primary/10 border-accent/30">
            <CardContent className="py-8 text-center">
              <Icon name="MessageCircle" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">Остались вопросы?</h3>
              <p className="text-muted-foreground mb-6">
                Получите персональную консультацию за 3 000 ₽ вместо 5 000 ₽
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://t.me/yourusername" target="_blank" rel="noopener noreferrer">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-lg font-medium transition-colors">
                    <Icon name="Send" size={18} />
                    Написать в Telegram
                  </button>
                </a>
                <a href="https://wa.me/79991234567" target="_blank" rel="noopener noreferrer">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-lg font-medium transition-colors">
                    <Icon name="MessageCircle" size={18} />
                    Написать в WhatsApp
                  </button>
                </a>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FAQSection;
