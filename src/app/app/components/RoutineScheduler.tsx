"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, Bell, Plus, Trash2, Check, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export interface RoutineSchedule {
  id: string;
  frequency: number; // dias entre injeções
  time: string; // horário preferido (HH:MM)
  reminderBefore: number; // horas antes para lembrete
  active: boolean;
  nextInjectionDate: string;
}

interface RoutineSchedulerProps {
  lastInjectionDate?: string;
}

export function RoutineScheduler({ lastInjectionDate }: RoutineSchedulerProps) {
  const [routine, setRoutine] = useState<RoutineSchedule | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    frequency: 7,
    time: "09:00",
    reminderBefore: 24,
  });

  // Load routine from localStorage
  useEffect(() => {
    const savedRoutine = localStorage.getItem("ozempic-routine");
    if (savedRoutine) {
      setRoutine(JSON.parse(savedRoutine));
    }
  }, []);

  // Calculate next injection date
  const calculateNextInjection = (frequency: number, lastDate?: string): string => {
    const baseDate = lastDate ? new Date(lastDate) : new Date();
    const nextDate = new Date(baseDate);
    nextDate.setDate(nextDate.getDate() + frequency);
    return nextDate.toISOString().split("T")[0];
  };

  // Save routine
  const saveRoutine = () => {
    const newRoutine: RoutineSchedule = {
      id: routine?.id || Date.now().toString(),
      frequency: formData.frequency,
      time: formData.time,
      reminderBefore: formData.reminderBefore,
      active: true,
      nextInjectionDate: calculateNextInjection(formData.frequency, lastInjectionDate),
    };

    setRoutine(newRoutine);
    localStorage.setItem("ozempic-routine", JSON.stringify(newRoutine));
    setIsEditing(false);
    toast.success("Rotina configurada com sucesso!");

    // Request notification permission if not already granted
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          toast.success("Notificações ativadas!");
        }
      });
    }
  };

  // Delete routine
  const deleteRoutine = () => {
    setRoutine(null);
    localStorage.removeItem("ozempic-routine");
    toast.success("Rotina removida");
  };

  // Toggle routine active status
  const toggleRoutine = () => {
    if (routine) {
      const updatedRoutine = { ...routine, active: !routine.active };
      setRoutine(updatedRoutine);
      localStorage.setItem("ozempic-routine", JSON.stringify(updatedRoutine));
      toast.success(updatedRoutine.active ? "Rotina ativada" : "Rotina pausada");
    }
  };

  // Calculate days until next injection
  const daysUntilNext = routine
    ? Math.ceil(
        (new Date(routine.nextInjectionDate).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  // Start editing
  const startEditing = () => {
    if (routine) {
      setFormData({
        frequency: routine.frequency,
        time: routine.time,
        reminderBefore: routine.reminderBefore,
      });
    }
    setIsEditing(true);
  };

  if (!routine && !isEditing) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <Calendar className="w-5 h-5 text-purple-500" />
            Método de Rotina
          </CardTitle>
          <CardDescription>
            Configure um cronograma automático para suas injeções
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-gray-600 mb-4">
              Nenhuma rotina configurada ainda
            </p>
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Criar Rotina
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isEditing) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <Calendar className="w-5 h-5 text-purple-500" />
            {routine ? "Editar Rotina" : "Criar Rotina"}
          </CardTitle>
          <CardDescription>
            Configure quando e como você quer ser lembrado
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="frequency">Frequência (dias entre injeções)</Label>
            <Input
              id="frequency"
              type="number"
              min="1"
              max="30"
              value={formData.frequency}
              onChange={(e) =>
                setFormData({ ...formData, frequency: parseInt(e.target.value) || 7 })
              }
              className="border-purple-200 focus:border-purple-400"
            />
            <p className="text-xs text-gray-500">
              Geralmente 7 dias (semanal) para Ozempic
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Horário preferido</Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="border-purple-200 focus:border-purple-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reminder">Lembrete antecipado (horas antes)</Label>
            <Input
              id="reminder"
              type="number"
              min="1"
              max="72"
              value={formData.reminderBefore}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  reminderBefore: parseInt(e.target.value) || 24,
                })
              }
              className="border-purple-200 focus:border-purple-400"
            />
            <p className="text-xs text-gray-500">
              Você receberá uma notificação antes da hora marcada
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={saveRoutine}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Check className="w-4 h-4 mr-2" />
              Salvar
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
              variant="outline"
              className="flex-1 border-gray-300"
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-gray-800">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-500" />
            Método de Rotina
          </div>
          <div className="flex gap-2">
            <Button
              onClick={toggleRoutine}
              size="sm"
              variant="outline"
              className={routine.active ? "border-green-500 text-green-600" : "border-gray-300"}
            >
              {routine.active ? "Ativa" : "Pausada"}
            </Button>
            <Button onClick={startEditing} size="sm" variant="outline">
              Editar
            </Button>
            <Button onClick={deleteRoutine} size="sm" variant="outline" className="text-red-500">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Next Injection Card */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Próxima Injeção</span>
            <Bell className={`w-4 h-4 ${routine.active ? "text-purple-500" : "text-gray-400"}`} />
          </div>
          <p className="text-2xl font-bold text-gray-800 mb-1">
            {new Date(routine.nextInjectionDate).toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {routine.time}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {daysUntilNext > 0 ? `Em ${daysUntilNext} dia${daysUntilNext > 1 ? "s" : ""}` : "Hoje"}
            </div>
          </div>
        </div>

        {/* Routine Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Frequência</p>
            <p className="text-lg font-semibold text-gray-800">
              A cada {routine.frequency} dia{routine.frequency > 1 ? "s" : ""}
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Horário</p>
            <p className="text-lg font-semibold text-gray-800">{routine.time}</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Lembrete</p>
            <p className="text-lg font-semibold text-gray-800">
              {routine.reminderBefore}h antes
            </p>
          </div>
        </div>

        {/* Status Message */}
        {routine.active && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-700 flex items-center gap-2">
              <Check className="w-4 h-4" />
              Rotina ativa - você receberá lembretes automáticos
            </p>
          </div>
        )}

        {!routine.active && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Rotina pausada - ative para receber lembretes
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
