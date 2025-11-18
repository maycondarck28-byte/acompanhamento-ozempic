"use client";

import { useState } from "react";
import { Plus, Trash2, Calendar, Camera, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Injection } from "../page";

interface InjectionTrackerProps {
  injections: Injection[];
  addInjection: (injection: Injection) => void;
  deleteInjection: (id: string) => void;
}

export function InjectionTracker({ injections, addInjection, deleteInjection }: InjectionTrackerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState<string>("");
  const [previewPhoto, setPreviewPhoto] = useState<string>("");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhoto(result);
        setPreviewPhoto(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newInjection: Injection = {
      id: Date.now().toString(),
      date,
      photo: photo || undefined,
      notes: notes || undefined,
    };

    addInjection(newInjection);
    
    // Reset form
    setDate(new Date().toISOString().split("T")[0]);
    setNotes("");
    setPhoto("");
    setPreviewPhoto("");
    setIsOpen(false);
  };

  const clearPhoto = () => {
    setPhoto("");
    setPreviewPhoto("");
  };

  return (
    <div className="space-y-4">
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl sm:text-2xl text-gray-800">Registro de Injeções</CardTitle>
              <CardDescription>Acompanhe suas aplicações de Ozempic</CardDescription>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Nova Injeção</span>
                  <span className="sm:hidden">Nova</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Registrar Nova Injeção</DialogTitle>
                  <DialogDescription>
                    Adicione os detalhes da sua aplicação
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Data da Aplicação</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="photo">Foto da Aplicação (Opcional)</Label>
                    {previewPhoto ? (
                      <div className="relative">
                        <img
                          src={previewPhoto}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <Button
                          type="button"
                          onClick={clearPhoto}
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="relative">
                        <Input
                          id="photo"
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                        <Label
                          htmlFor="photo"
                          className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                        >
                          <div className="text-center">
                            <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600">Clique para adicionar foto</p>
                          </div>
                        </Label>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações (Opcional)</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ex: Local da aplicação, reações, etc."
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                  >
                    Registrar Injeção
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {injections.length === 0 ? (
            <div className="text-center py-12">
              <Camera className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 mb-2">Nenhuma injeção registrada ainda</p>
              <p className="text-sm text-gray-400">Clique em "Nova Injeção" para começar</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {injections.map((injection) => (
                <Card key={injection.id} className="border-2 border-gray-100 hover:border-blue-200 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold text-gray-800">
                          {new Date(injection.date).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteInjection(injection.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {injection.photo && (
                      <img
                        src={injection.photo}
                        alt="Injeção"
                        className="w-full h-40 object-cover rounded-lg mb-3"
                      />
                    )}

                    {injection.notes && (
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {injection.notes}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
