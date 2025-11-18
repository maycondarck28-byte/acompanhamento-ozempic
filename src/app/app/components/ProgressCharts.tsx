"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Calendar } from "lucide-react";
import type { DailyNutrition } from "../page";

interface ProgressChartsProps {
  nutritionData: DailyNutrition[];
}

export function ProgressCharts({ nutritionData }: ProgressChartsProps) {
  // Get last 7 days of data
  const last7Days = nutritionData.slice(-7).map((day) => ({
    date: new Date(day.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }),
    protein: day.protein,
    proteinGoal: day.proteinGoal,
    water: day.water,
    waterGoal: day.waterGoal,
    proteinPercent: Math.round((day.protein / day.proteinGoal) * 100),
    waterPercent: Math.round((day.water / day.waterGoal) * 100),
  }));

  // Calculate averages
  const avgProtein = nutritionData.length > 0
    ? Math.round(nutritionData.reduce((sum, day) => sum + day.protein, 0) / nutritionData.length)
    : 0;
  
  const avgWater = nutritionData.length > 0
    ? Math.round(nutritionData.reduce((sum, day) => sum + day.water, 0) / nutritionData.length)
    : 0;

  const avgProteinGoalMet = nutritionData.length > 0
    ? Math.round(nutritionData.filter(day => day.protein >= day.proteinGoal).length / nutritionData.length * 100)
    : 0;

  const avgWaterGoalMet = nutritionData.length > 0
    ? Math.round(nutritionData.filter(day => day.water >= day.waterGoal).length / nutritionData.length * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader className="pb-2">
            <CardDescription className="text-green-700">Média de Proteína</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-800">{avgProtein}g</p>
            <p className="text-sm text-green-600 mt-1">por dia</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
          <CardHeader className="pb-2">
            <CardDescription className="text-cyan-700">Média de Água</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-cyan-800">{avgWater}ml</p>
            <p className="text-sm text-cyan-600 mt-1">por dia</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardHeader className="pb-2">
            <CardDescription className="text-purple-700">Meta Proteína</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-800">{avgProteinGoalMet}%</p>
            <p className="text-sm text-purple-600 mt-1">dias atingidos</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardHeader className="pb-2">
            <CardDescription className="text-orange-700">Meta Água</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-800">{avgWaterGoalMet}%</p>
            <p className="text-sm text-orange-600 mt-1">dias atingidos</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      {last7Days.length > 0 ? (
        <>
          {/* Protein Chart */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Progresso de Proteína (Últimos 7 Dias)
              </CardTitle>
              <CardDescription>Acompanhe sua ingestão diária de proteínas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={last7Days}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="protein" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Proteína (g)"
                    dot={{ fill: '#10b981', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="proteinGoal" 
                    stroke="#9ca3af" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Meta (g)"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Water Chart */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
                <TrendingUp className="w-5 h-5 text-cyan-500" />
                Progresso de Água (Últimos 7 Dias)
              </CardTitle>
              <CardDescription>Acompanhe sua hidratação diária</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={last7Days}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="water" 
                    stroke="#06b6d4" 
                    strokeWidth={3}
                    name="Água (ml)"
                    dot={{ fill: '#06b6d4', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="waterGoal" 
                    stroke="#9ca3af" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Meta (ml)"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Goal Achievement Chart */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
                <Calendar className="w-5 h-5 text-purple-500" />
                Atingimento de Metas (%)
              </CardTitle>
              <CardDescription>Porcentagem das metas diárias alcançadas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={last7Days}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="proteinPercent" 
                    fill="#10b981" 
                    name="Proteína (%)"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar 
                    dataKey="waterPercent" 
                    fill="#06b6d4" 
                    name="Água (%)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardContent className="py-12">
            <div className="text-center">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 mb-2">Nenhum dado disponível ainda</p>
              <p className="text-sm text-gray-400">Comece a registrar sua nutrição para ver os gráficos</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
