"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Droplet, Beef, Syringe, Calendar, TrendingUp, Bell, Lock, CreditCard } from "lucide-react";
import { InjectionTracker } from "./components/InjectionTracker";
import { NutritionTracker } from "./components/NutritionTracker";
import { ProgressCharts } from "./components/ProgressCharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export interface Injection {
  id: string;
  date: string;
  photo?: string;
  notes?: string;
}

export interface DailyNutrition {
  date: string;
  protein: number;
  water: number;
  proteinGoal: number;
  waterGoal: number;
}

export default function OzempicTracker() {
  const router = useRouter();
  const [injections, setInjections] = useState<Injection[]>([]);
  const [nutritionData, setNutritionData] = useState<DailyNutrition[]>([]);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [todayNutrition, setTodayNutrition] = useState<DailyNutrition>({
    date: new Date().toISOString().split("T")[0],
    protein: 0,
    water: 0,
    proteinGoal: 100,
    waterGoal: 2000,
  });

  // Check subscription status
  useEffect(() => {
    const subscription = localStorage.getItem("ozempic-subscription");
    if (subscription) {
      const subData = JSON.parse(subscription);
      setHasSubscription(subData.active);
    }
  }, []);

  // Load data from localStorage
  useEffect(() => {
    const savedInjections = localStorage.getItem("ozempic-injections");
    const savedNutrition = localStorage.getItem("ozempic-nutrition");

    if (savedInjections) {
      setInjections(JSON.parse(savedInjections));
    }

    if (savedNutrition) {
      const data = JSON.parse(savedNutrition);
      setNutritionData(data);
      
      const today = new Date().toISOString().split("T")[0];
      const todayData = data.find((d: DailyNutrition) => d.date === today);
      
      if (todayData) {
        setTodayNutrition(todayData);
      }
    }
  }, []);

  // Save injections to localStorage
  useEffect(() => {
    if (injections.length > 0) {
      localStorage.setItem("ozempic-injections", JSON.stringify(injections));
    }
  }, [injections]);

  // Save nutrition data to localStorage
  useEffect(() => {
    if (nutritionData.length > 0) {
      localStorage.setItem("ozempic-nutrition", JSON.stringify(nutritionData));
    }
  }, [nutritionData]);

  // Update today's nutrition in the array
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const updatedData = nutritionData.filter((d) => d.date !== today);
    updatedData.push(todayNutrition);
    setNutritionData(updatedData.sort((a, b) => a.date.localeCompare(b.date)));
  }, [todayNutrition]);

  const addInjection = (injection: Injection) => {
    setInjections([injection, ...injections]);
    toast.success("Injeção registrada com sucesso!");
  };

  const deleteInjection = (id: string) => {
    setInjections(injections.filter((inj) => inj.id !== id));
    toast.success("Injeção removida");
  };

  const updateProtein = (amount: number) => {
    setTodayNutrition((prev) => ({
      ...prev,
      protein: Math.max(0, prev.protein + amount),
    }));
  };

  const updateWater = (amount: number) => {
    setTodayNutrition((prev) => ({
      ...prev,
      water: Math.max(0, prev.water + amount),
    }));
  };

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        toast.success("Notificações ativadas! Você receberá lembretes.");
        scheduleNotification();
      } else {
        toast.error("Permissão de notificação negada");
      }
    } else {
      toast.error("Notificações não suportadas neste navegador");
    }
  };

  const scheduleNotification = () => {
    // Schedule a notification for next injection (example: 7 days from last injection)
    if (injections.length > 0) {
      const lastInjection = new Date(injections[0].date);
      const nextInjection = new Date(lastInjection);
      nextInjection.setDate(nextInjection.getDate() + 7);
      
      toast.info(`Próxima injeção agendada para ${nextInjection.toLocaleDateString("pt-BR")}`);
    }
  };

  const proteinPercentage = (todayNutrition.protein / todayNutrition.proteinGoal) * 100;
  const waterPercentage = (todayNutrition.water / todayNutrition.waterGoal) * 100;

  // Subscription gate
  if (!hasSubscription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full bg-white/90 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
              Assinatura Necessária
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Para acessar o Ozempic Tracker, você precisa de uma assinatura ativa
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 p-6 rounded-xl text-center">
              <p className="text-lg font-semibold text-gray-700 mb-2">
                Apenas
              </p>
              <div className="flex items-center justify-center gap-2 mb-3">
                <CreditCard className="w-8 h-8 text-green-600" />
                <p className="text-5xl font-bold text-green-600">$19.90</p>
                <p className="text-lg text-gray-600">/mês</p>
              </div>
              <p className="text-sm text-gray-600">
                Acesso completo a todas as funcionalidades
              </p>
            </div>

            <Button
              onClick={() => router.push("/checkout")}
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white text-lg py-6 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Assinar Agora
            </Button>

            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="w-full"
            >
              Voltar para Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Ozempic Tracker
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Acompanhe suas injeções, proteínas e hidratação
              </p>
            </div>
            <Button
              onClick={requestNotificationPermission}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Bell className="w-4 h-4 mr-2" />
              Ativar Lembretes
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Syringe className="w-4 h-4 text-blue-500" />
                Última Injeção
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-800">
                {injections.length > 0
                  ? new Date(injections[0].date).toLocaleDateString("pt-BR")
                  : "Nenhuma"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Beef className="w-4 h-4 text-green-500" />
                Proteína Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-800">
                {todayNutrition.protein}g
                <span className="text-sm text-gray-500 ml-2">
                  / {todayNutrition.proteinGoal}g
                </span>
              </p>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
                  style={{ width: `${Math.min(proteinPercentage, 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-cyan-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] sm:col-span-2 lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Droplet className="w-4 h-4 text-cyan-500" />
                Água Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-800">
                {todayNutrition.water}ml
                <span className="text-sm text-gray-500 ml-2">
                  / {todayNutrition.waterGoal}ml
                </span>
              </p>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
                  style={{ width: `${Math.min(waterPercentage, 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="nutrition" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm shadow-md h-14">
            <TabsTrigger 
              value="nutrition" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white transition-all duration-300"
            >
              <Beef className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Nutrição</span>
            </TabsTrigger>
            <TabsTrigger 
              value="injections" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300"
            >
              <Syringe className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Injeções</span>
            </TabsTrigger>
            <TabsTrigger 
              value="progress" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Progresso</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="nutrition" className="space-y-4">
            <NutritionTracker
              todayNutrition={todayNutrition}
              updateProtein={updateProtein}
              updateWater={updateWater}
            />
          </TabsContent>

          <TabsContent value="injections" className="space-y-4">
            <InjectionTracker
              injections={injections}
              addInjection={addInjection}
              deleteInjection={deleteInjection}
            />
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <ProgressCharts nutritionData={nutritionData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
