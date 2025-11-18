"use client";

import { Plus, Minus, Droplet, Beef } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { DailyNutrition } from "../page";

interface NutritionTrackerProps {
  todayNutrition: DailyNutrition;
  updateProtein: (amount: number) => void;
  updateWater: (amount: number) => void;
}

export function NutritionTracker({ todayNutrition, updateProtein, updateWater }: NutritionTrackerProps) {
  const proteinPercentage = (todayNutrition.protein / todayNutrition.proteinGoal) * 100;
  const waterPercentage = (todayNutrition.water / todayNutrition.waterGoal) * 100;

  const proteinPresets = [10, 20, 30];
  const waterPresets = [250, 500, 1000];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Protein Tracker */}
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
            <Beef className="w-5 h-5 text-green-500" />
            Proteína
          </CardTitle>
          <CardDescription>Meta diária: {todayNutrition.proteinGoal}g</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress Circle */}
          <div className="flex items-center justify-center">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="url(#proteinGradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - Math.min(proteinPercentage, 100) / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
                <defs>
                  <linearGradient id="proteinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-800">{todayNutrition.protein}g</span>
                <span className="text-sm text-gray-500">{Math.round(proteinPercentage)}%</span>
              </div>
            </div>
          </div>

          {/* Quick Add Buttons */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">Adicionar rapidamente:</p>
            <div className="grid grid-cols-3 gap-2">
              {proteinPresets.map((amount) => (
                <Button
                  key={amount}
                  onClick={() => updateProtein(amount)}
                  variant="outline"
                  className="border-green-300 hover:bg-green-50 hover:border-green-400"
                >
                  +{amount}g
                </Button>
              ))}
            </div>
          </div>

          {/* Manual Controls */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <Button
              onClick={() => updateProtein(-5)}
              size="lg"
              variant="outline"
              className="rounded-full w-12 h-12 p-0 border-2 border-green-300 hover:bg-green-50"
            >
              <Minus className="w-5 h-5 text-green-600" />
            </Button>
            <span className="text-lg font-semibold text-gray-700">5g</span>
            <Button
              onClick={() => updateProtein(5)}
              size="lg"
              className="rounded-full w-12 h-12 p-0 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Water Tracker */}
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-cyan-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
            <Droplet className="w-5 h-5 text-cyan-500" />
            Água
          </CardTitle>
          <CardDescription>Meta diária: {todayNutrition.waterGoal}ml</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress Circle */}
          <div className="flex items-center justify-center">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="url(#waterGradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - Math.min(waterPercentage, 100) / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
                <defs>
                  <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-800">{todayNutrition.water}ml</span>
                <span className="text-sm text-gray-500">{Math.round(waterPercentage)}%</span>
              </div>
            </div>
          </div>

          {/* Quick Add Buttons */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">Adicionar rapidamente:</p>
            <div className="grid grid-cols-3 gap-2">
              {waterPresets.map((amount) => (
                <Button
                  key={amount}
                  onClick={() => updateWater(amount)}
                  variant="outline"
                  className="border-cyan-300 hover:bg-cyan-50 hover:border-cyan-400"
                >
                  +{amount}ml
                </Button>
              ))}
            </div>
          </div>

          {/* Manual Controls */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <Button
              onClick={() => updateWater(-100)}
              size="lg"
              variant="outline"
              className="rounded-full w-12 h-12 p-0 border-2 border-cyan-300 hover:bg-cyan-50"
            >
              <Minus className="w-5 h-5 text-cyan-600" />
            </Button>
            <span className="text-lg font-semibold text-gray-700">100ml</span>
            <Button
              onClick={() => updateWater(100)}
              size="lg"
              className="rounded-full w-12 h-12 p-0 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
