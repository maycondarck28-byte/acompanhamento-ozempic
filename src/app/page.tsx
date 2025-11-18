"use client";

import { useRouter } from "next/navigation";
import { Syringe, Droplet, Beef, TrendingUp, CheckCircle2, Star, Users, Shield, Sparkles, DollarSign, Zap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
  const router = useRouter();

  const handleQuizClick = () => {
    router.push("/quiz");
  };

  const features = [
    {
      icon: Syringe,
      title: "Registro de Injeções",
      description: "Registre suas aplicações com fotos, datas e observações. Nunca mais esqueça quando foi sua última dose.",
      color: "from-blue-500 to-purple-500",
    },
    {
      icon: Beef,
      title: "Monitoramento de Proteínas",
      description: "Acompanhe sua ingestão diária de proteínas com metas personalizadas e visualização em tempo real.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Droplet,
      title: "Controle de Hidratação",
      description: "Mantenha-se hidratado com nosso sistema inteligente de monitoramento de água.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: TrendingUp,
      title: "Gráficos de Progresso",
      description: "Visualize seu progresso com gráficos detalhados e estatísticas dos últimos 7 dias.",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const benefits = [
    "Interface intuitiva e fácil de usar",
    "Dados salvos localmente no seu dispositivo",
    "100% privado e seguro",
    "Acesso completo a todas as funcionalidades",
    "Funciona offline",
    "Totalmente responsivo (mobile e desktop)",
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      text: "O Ozempic Tracker mudou completamente minha rotina! Agora consigo acompanhar tudo facilmente.",
      rating: 5,
    },
    {
      name: "João Santos",
      text: "Aplicativo perfeito! Os gráficos me ajudam a visualizar meu progresso de forma clara.",
      rating: 5,
    },
    {
      name: "Ana Costa",
      text: "Nunca mais esqueci minhas injeções. Os lembretes são muito úteis!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-6 animate-pulse">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700">
              Aplicativo #1 para usuários de Ozempic
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Acompanhe seu tratamento com{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Ozempic Tracker
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            O aplicativo completo para monitorar suas injeções, proteínas, hidratação e visualizar seu progresso de forma simples e eficiente.
          </p>

          {/* Pricing Badge */}
          <div className="mb-8 inline-block">
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-2xl px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center gap-3">
                <DollarSign className="w-8 h-8 text-green-600" />
                <div className="text-left">
                  <p className="text-sm text-gray-600 font-medium">Acesso Mensal</p>
                  <p className="text-3xl font-bold text-green-600">$19.90<span className="text-lg text-gray-500">/mês</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              onClick={handleQuizClick}
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white text-lg px-8 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            >
              Fazer Quiz e Começar
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/app")}
              className="text-lg px-8 py-6 border-2 border-purple-300 hover:bg-purple-50 transition-all duration-300"
            >
              Ver Demonstração
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Cancele a qualquer momento</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Sem taxas ocultas</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Totalmente Privado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Funcionalidades Principais
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tudo que você precisa para acompanhar seu tratamento em um só lugar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-gray-100"
                >
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-gray-800">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 border-2 border-purple-200 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Por que escolher o Ozempic Tracker?
              </CardTitle>
              <CardDescription className="text-lg text-gray-700">
                Desenvolvido especialmente para quem usa Ozempic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white/60 backdrop-blur-sm p-4 rounded-lg hover:bg-white/80 transition-all duration-300">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Testimonials */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              O que nossos usuários dizem
            </h2>
            <p className="text-lg text-gray-600">
              Milhares de pessoas já transformaram seu acompanhamento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6">
                <Users className="w-12 h-12 mx-auto mb-3 text-blue-500" />
                <p className="text-3xl font-bold text-gray-900 mb-1">1000+</p>
                <p className="text-gray-600">Usuários Ativos</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6">
                <Star className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
                <p className="text-3xl font-bold text-gray-900 mb-1">4.9/5</p>
                <p className="text-gray-600">Avaliação Média</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6">
                <Shield className="w-12 h-12 mx-auto mb-3 text-green-500" />
                <p className="text-3xl font-bold text-gray-900 mb-1">100%</p>
                <p className="text-gray-600">Seguro e Privado</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 border-0 shadow-2xl">
            <CardContent className="text-center py-12 px-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Pronto para começar?
              </h2>
              <p className="text-lg text-white/90 mb-2 max-w-2xl mx-auto">
                Faça nosso quiz rápido e descubra como o Ozempic Tracker pode transformar seu acompanhamento de saúde.
              </p>
              <p className="text-2xl font-bold text-white mb-8">
                Apenas $19.90/mês
              </p>
              <Button
                onClick={handleQuizClick}
                className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Fazer Quiz Agora
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-white/80 text-sm mt-6">
                Leva apenas 2 minutos • Cancele a qualquer momento
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 py-8 border-t border-gray-200">
        <div className="text-center text-gray-600 text-sm">
          <p>© 2024 Ozempic Tracker. Todos os direitos reservados.</p>
          <p className="mt-2">Seus dados são salvos localmente e nunca compartilhados.</p>
        </div>
      </div>
    </div>
  );
}
