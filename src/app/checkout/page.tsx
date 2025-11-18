"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Lock, CheckCircle2, ArrowLeft, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      setFormData({ ...formData, [name]: formatted });
      return;
    }
    
    // Format expiry date
    if (name === "expiryDate") {
      const formatted = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2").slice(0, 5);
      setFormData({ ...formData, [name]: formatted });
      return;
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      // Save subscription status
      localStorage.setItem("ozempic-subscription", JSON.stringify({
        active: true,
        startDate: new Date().toISOString(),
        email: formData.email,
        plan: "monthly",
        amount: 19.90
      }));

      toast.success("Pagamento processado com sucesso! 🎉");
      setLoading(false);
      
      // Redirect to app
      setTimeout(() => {
        router.push("/app");
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 hover:bg-white/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div>
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
                  <CreditCard className="w-7 h-7 text-purple-500" />
                  Pagamento Seguro
                </CardTitle>
                <CardDescription className="text-base">
                  Complete seus dados para finalizar a assinatura
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="h-12 text-base"
                    />
                  </div>

                  {/* Card Number */}
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="text-gray-700 font-medium">
                      Número do Cartão
                    </Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        maxLength={19}
                        required
                        className="h-12 text-base pl-12"
                      />
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Card Name */}
                  <div className="space-y-2">
                    <Label htmlFor="cardName" className="text-gray-700 font-medium">
                      Nome no Cartão
                    </Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      type="text"
                      placeholder="NOME COMPLETO"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                      className="h-12 text-base uppercase"
                    />
                  </div>

                  {/* Expiry and CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate" className="text-gray-700 font-medium">
                        Validade
                      </Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        type="text"
                        placeholder="MM/AA"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        maxLength={5}
                        required
                        className="h-12 text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className="text-gray-700 font-medium">
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        type="text"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        maxLength={4}
                        required
                        className="h-12 text-base"
                      />
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                    <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        Pagamento 100% Seguro
                      </p>
                      <p className="text-xs text-blue-700 mt-1">
                        Seus dados são criptografados e protegidos com tecnologia SSL
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Lock className="w-5 h-5" />
                        Pagar $19.90/mês
                      </span>
                    )}
                  </Button>

                  <p className="text-center text-xs text-gray-500">
                    Ao continuar, você concorda com nossos Termos de Serviço
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Summary Card */}
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Resumo do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <div>
                      <p className="font-semibold text-gray-800">Ozempic Tracker</p>
                      <p className="text-sm text-gray-600">Assinatura Mensal</p>
                    </div>
                    <p className="text-xl font-bold text-gray-800">$19.90</p>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="font-medium text-gray-800">$19.90</p>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <p className="text-gray-600">Impostos</p>
                    <p className="font-medium text-gray-800">$0.00</p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <p className="text-lg font-semibold text-gray-800">Total</p>
                    <p className="text-2xl font-bold text-purple-600">$19.90</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-green-900 mb-2">
                    ✨ Incluído na sua assinatura:
                  </p>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Acesso ilimitado ao app
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Todas as funcionalidades
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Suporte prioritário
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Cancele quando quiser
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6 text-center">
                  <Shield className="w-10 h-10 mx-auto mb-2 text-blue-500" />
                  <p className="text-sm font-medium text-gray-800">Pagamento Seguro</p>
                  <p className="text-xs text-gray-600 mt-1">SSL Criptografado</p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6 text-center">
                  <Zap className="w-10 h-10 mx-auto mb-2 text-purple-500" />
                  <p className="text-sm font-medium text-gray-800">Acesso Imediato</p>
                  <p className="text-xs text-gray-600 mt-1">Comece agora mesmo</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
