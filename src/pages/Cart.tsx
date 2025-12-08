import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import PhoenixLogo from "@/components/PhoenixLogo";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

interface CartItem {
  serviceId: number;
  title: string;
  description: string;
  price: number;
  icon: string;
  category: string;
  specialistId: string;
  specialistName: string;
  specialistType: string;
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('cartItems');
    if (saved) {
      setCartItems(JSON.parse(saved));
    }
  }, []);

  const removeItem = (serviceId: number) => {
    const item = cartItems.find(i => i.serviceId === serviceId);
    const updated = cartItems.filter(i => i.serviceId !== serviceId);
    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
    
    toast({
      title: "Услуга удалена",
      description: `${item?.title} удалена из корзины`,
      duration: 2000,
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
    toast({
      title: "Корзина очищена",
      description: "Все услуги удалены из корзины",
      duration: 2000,
    });
  };

  const checkout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Корзина пуста",
        description: "Добавьте услуги для оформления заказа",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    toast({
      title: "Переход к оплате",
      description: `Оформление заказа на сумму ${formatPrice(totalPrice)}`,
      duration: 3000,
    });

    setTimeout(() => {
      navigate('/client-login');
    }, 1500);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
              <PhoenixLogo size={48} className="drop-shadow-lg" />
              <div>
                <h1 className="text-xl font-bold">Феникс</h1>
                <p className="text-xs text-muted-foreground">Корзина услуг</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Вернуться на сайт
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Icon name="ShoppingCart" size={32} className="text-primary" />
            Корзина услуг
          </h2>
          <p className="text-muted-foreground">
            {cartItems.length === 0 
              ? "Ваша корзина пуста" 
              : `${cartItems.length} ${cartItems.length === 1 ? 'услуга' : cartItems.length < 5 ? 'услуги' : 'услуг'} в корзине`}
          </p>
        </div>

        {cartItems.length === 0 ? (
          <Card className="shadow-sm">
            <CardContent className="text-center py-16">
              <Icon name="ShoppingCart" size={64} className="text-muted-foreground mx-auto mb-4 opacity-30" />
              <h3 className="text-xl font-semibold mb-2">Корзина пуста</h3>
              <p className="text-muted-foreground mb-6">
                Добавьте услуги из каталога, чтобы продолжить
              </p>
              <Button onClick={() => navigate("/#shop")}>
                <Icon name="ShoppingBag" size={16} className="mr-2" />
                Перейти к услугам
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.serviceId} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name={item.icon as any} size={28} className="text-primary" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                            <Badge variant="outline" className="mb-2">{item.category}</Badge>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeItem(item.serviceId)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">
                          {item.description}
                        </p>
                        
                        <div className="flex items-center gap-2 mb-3 text-sm">
                          <Icon name="User" size={14} className="text-primary" />
                          <span className="font-medium">{item.specialistName}</span>
                          <span className="text-muted-foreground">— {item.specialistType}</span>
                        </div>
                        
                        <div className="flex items-center justify-between pt-3 border-t">
                          <p className="text-sm text-muted-foreground">Стоимость:</p>
                          <p className="text-xl font-bold text-primary">{formatPrice(item.price)}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="shadow-md sticky top-24">
                <CardHeader>
                  <CardTitle>Итого</CardTitle>
                  <CardDescription>Детали заказа</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Услуг в заказе:</span>
                      <span className="font-medium">{cartItems.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Сумма:</span>
                      <span className="font-medium">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Итого:</span>
                    <span className="text-2xl font-bold text-primary">{formatPrice(totalPrice)}</span>
                  </div>

                  <Button 
                    className="w-full gap-2" 
                    size="lg"
                    onClick={checkout}
                  >
                    <Icon name="CreditCard" size={18} />
                    Оформить заказ
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full gap-2"
                    onClick={clearCart}
                  >
                    <Icon name="Trash2" size={16} />
                    Очистить корзину
                  </Button>

                  <div className="pt-4 border-t">
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Icon name="ShieldCheck" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                      <span>Безопасная оплата через Escrow. Деньги защищены до выполнения работ</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
