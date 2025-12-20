"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Sparkles, ChefHat, Plus, Trash2, Edit2, Save } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Meal {
  id: string;
  name: string;
  type: "almoço" | "jantar";
  day: string;
  isCustom: boolean;
}

const diasSemana = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

const tiposAlimentacao = [
  { value: "vegetariano", label: "Vegetariano" },
  { value: "vegano", label: "Vegano" },
  { value: "sem-gluten", label: "Sem Glúten" },
  { value: "sem-lactose", label: "Sem Lactose" },
  { value: "low-carb", label: "Low Carb" },
  { value: "tradicional", label: "Tradicional" },
];

// Banco de receitas por tipo de alimentação
const receitasPorTipo: Record<string, { almoco: string[]; jantar: string[] }> = {
  vegetariano: {
    almoco: [
      "Risotto de Cogumelos",
      "Lasanha de Berinjela",
      "Quiche de Espinafre",
      "Curry de Grão-de-Bico",
      "Ratatouille",
      "Buddha Bowl",
      "Falafel com Salada",
    ],
    jantar: [
      "Pizza Margherita",
      "Sopa de Lentilha",
      "Wrap de Hummus",
      "Macarrão ao Pesto",
      "Tempura de Legumes",
      "Samosas de Legumes",
      "Tacos de Feijão Preto",
    ],
  },
  vegano: {
    almoco: [
      "Buddha Bowl Vegano",
      "Curry Tailandês de Legumes",
      "Feijoada Vegana",
      "Risotto de Cogumelos (versão vegana)",
      "Pad Thai Vegano",
      "Quinoa com Legumes Assados",
      "Chili Vegano",
    ],
    jantar: [
      "Ramen Vegano",
      "Sopa de Abóbora",
      "Wrap de Tofu",
      "Macarrão com Molho de Tomate",
      "Salada Completa",
      "Guacamole com Chips",
      "Gazpacho",
    ],
  },
  "sem-gluten": {
    almoco: [
      "Risotto de Cogumelos",
      "Bacalhau à Brás",
      "Frango Xadrez",
      "Moqueca de Peixe",
      "Paella Valenciana",
      "Butter Chicken",
      "Ceviche Peruano",
    ],
    jantar: [
      "Sushi Variado",
      "Tacos al Pastor",
      "Souvlaki de Frango",
      "Bibimbap",
      "Sopa Tom Yum",
      "Kebab de Cordeiro",
      "Feijoada",
    ],
  },
  "sem-lactose": {
    almoco: [
      "Pad Thai",
      "Frango Xadrez",
      "Ceviche Peruano",
      "Ramen Caseiro",
      "Paella Valenciana",
      "Moqueca de Peixe",
      "Tacos al Pastor",
    ],
    jantar: [
      "Sushi Variado",
      "Tom Yum Goong",
      "Bibimbap",
      "Pho Vietnamita",
      "Yakisoba",
      "Tempura de Legumes",
      "Gazpacho",
    ],
  },
  "low-carb": {
    almoco: [
      "Frango Grelhado com Salada",
      "Salmão com Aspargos",
      "Omelete de Legumes",
      "Carne com Brócolis",
      "Peixe Assado com Legumes",
      "Frango ao Curry",
      "Salada Caesar com Frango",
    ],
    jantar: [
      "Sopa de Legumes",
      "Atum Selado",
      "Frango com Couve-flor",
      "Camarão Grelhado",
      "Carne Moída com Abobrinha",
      "Omelete Caprese",
      "Salada de Atum",
    ],
  },
  tradicional: {
    almoco: [
      "Bacalhau à Brás",
      "Francesinha",
      "Lasanha Bolonhesa",
      "Feijoada Completa",
      "Pasta Carbonara",
      "Coq au Vin",
      "Moussaka Grega",
    ],
    jantar: [
      "Caldo Verde",
      "Pizza Margherita",
      "Ramen Caseiro",
      "Enchiladas de Frango",
      "Risotto de Cogumelos",
      "Sopa de Cebola",
      "Tacos al Pastor",
    ],
  },
};

export default function RutinaPage() {
  const [showAIDialog, setShowAIDialog] = useState(false);
  const [showManualDialog, setShowManualDialog] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [editingMeal, setEditingMeal] = useState<{ day: string; type: "almoço" | "jantar" } | null>(null);
  const [customMealName, setCustomMealName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateAIPlan = () => {
    if (!selectedType) return;

    setIsGenerating(true);
    
    // Simula geração da IA
    setTimeout(() => {
      const newMeals: Meal[] = [];
      const receitas = receitasPorTipo[selectedType];

      diasSemana.forEach((dia, index) => {
        // Almoço
        const almocoIndex = index % receitas.almoco.length;
        newMeals.push({
          id: `${dia}-almoco`,
          name: receitas.almoco[almocoIndex],
          type: "almoço",
          day: dia,
          isCustom: false,
        });

        // Jantar
        const jantarIndex = index % receitas.jantar.length;
        newMeals.push({
          id: `${dia}-jantar`,
          name: receitas.jantar[jantarIndex],
          type: "jantar",
          day: dia,
          isCustom: false,
        });
      });

      setMeals(newMeals);
      setIsGenerating(false);
      setShowAIDialog(false);
    }, 2000);
  };

  const handleAddCustomMeal = (day: string, type: "almoço" | "jantar") => {
    setEditingMeal({ day, type });
    setCustomMealName("");
    setShowManualDialog(true);
  };

  const handleSaveCustomMeal = () => {
    if (!editingMeal || !customMealName.trim()) return;

    const existingMealIndex = meals.findIndex(
      (m) => m.day === editingMeal.day && m.type === editingMeal.type
    );

    if (existingMealIndex >= 0) {
      // Atualizar refeição existente
      const updatedMeals = [...meals];
      updatedMeals[existingMealIndex] = {
        ...updatedMeals[existingMealIndex],
        name: customMealName,
        isCustom: true,
      };
      setMeals(updatedMeals);
    } else {
      // Adicionar nova refeição
      setMeals([
        ...meals,
        {
          id: `${editingMeal.day}-${editingMeal.type}`,
          name: customMealName,
          type: editingMeal.type,
          day: editingMeal.day,
          isCustom: true,
        },
      ]);
    }

    setShowManualDialog(false);
    setEditingMeal(null);
    setCustomMealName("");
  };

  const handleDeleteMeal = (mealId: string) => {
    setMeals(meals.filter((m) => m.id !== mealId));
  };

  const getMealForDayAndType = (day: string, type: "almoço" | "jantar") => {
    return meals.find((m) => m.day === day && m.type === type);
  };

  const handleClearPlan = () => {
    setMeals([]);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-lg text-white">
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Rutina Semanal</h1>
        </div>
        <p className="text-orange-100">
          Planeje suas refeições da semana com ajuda da IA ou crie seu próprio plano personalizado
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-2 border-orange-200 hover:border-orange-400 transition-all cursor-pointer group">
          <CardContent className="p-6" onClick={() => setShowAIDialog(true)}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">Gerar com IA</h3>
                <p className="text-sm text-gray-600">
                  Deixe a inteligência artificial criar um plano semanal personalizado baseado nas suas preferências alimentares
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-200 hover:border-orange-400 transition-all cursor-pointer group">
          <CardContent className="p-6" onClick={() => meals.length === 0 && handleAddCustomMeal(diasSemana[0], "almoço")}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">Criar Manualmente</h3>
                <p className="text-sm text-gray-600">
                  Monte seu próprio plano semanal escolhendo cada refeição de acordo com suas preferências
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Plan */}
      {meals.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">Seu Plano Semanal</h2>
              {selectedType && (
                <Badge className="bg-orange-100 text-orange-700">
                  {tiposAlimentacao.find((t) => t.value === selectedType)?.label}
                </Badge>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearPlan}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Limpar Plano
            </Button>
          </div>

          <div className="space-y-4">
            {diasSemana.map((dia) => (
              <Card key={dia} className="border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    {dia}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Almoço */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-semibold text-gray-700">Almoço</Label>
                      </div>
                      {getMealForDayAndType(dia, "almoço") ? (
                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <span className="text-gray-900 font-medium">
                            {getMealForDayAndType(dia, "almoço")?.name}
                          </span>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleAddCustomMeal(dia, "almoço")}
                              className="h-8 w-8 p-0"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteMeal(`${dia}-almoço`)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          className="w-full border-dashed border-2 border-gray-300 hover:border-orange-400"
                          onClick={() => handleAddCustomMeal(dia, "almoço")}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Adicionar Almoço
                        </Button>
                      )}
                    </div>

                    {/* Jantar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-semibold text-gray-700">Jantar</Label>
                      </div>
                      {getMealForDayAndType(dia, "jantar") ? (
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <span className="text-gray-900 font-medium">
                            {getMealForDayAndType(dia, "jantar")?.name}
                          </span>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleAddCustomMeal(dia, "jantar")}
                              className="h-8 w-8 p-0"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteMeal(`${dia}-jantar`)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          className="w-full border-dashed border-2 border-gray-300 hover:border-blue-400"
                          onClick={() => handleAddCustomMeal(dia, "jantar")}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Adicionar Jantar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Empty State */}
      {meals.length === 0 && (
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum plano criado ainda
            </h3>
            <p className="text-gray-600 mb-6">
              Comece gerando um plano com IA ou criando manualmente suas refeições
            </p>
          </CardContent>
        </Card>
      )}

      {/* AI Generation Dialog */}
      <Dialog open={showAIDialog} onOpenChange={setShowAIDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              Gerar Plano com IA
            </DialogTitle>
            <DialogDescription>
              Escolha o tipo de alimentação e a IA criará um plano semanal completo para você
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de Alimentação</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de alimentação" />
                </SelectTrigger>
                <SelectContent>
                  {tiposAlimentacao.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-sm text-purple-900">
                <strong>Dica:</strong> A IA irá gerar um plano completo com 7 almoços e 7 jantares baseado no tipo de alimentação escolhido.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowAIDialog(false)}
                className="flex-1"
                disabled={isGenerating}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleGenerateAIPlan}
                disabled={!selectedType || isGenerating}
                className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Gerar Plano
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Manual Entry Dialog */}
      <Dialog open={showManualDialog} onOpenChange={setShowManualDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-orange-600" />
              {editingMeal && getMealForDayAndType(editingMeal.day, editingMeal.type) ? "Editar" : "Adicionar"} Refeição
            </DialogTitle>
            <DialogDescription>
              {editingMeal && `${editingMeal.day} - ${editingMeal.type.charAt(0).toUpperCase() + editingMeal.type.slice(1)}`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nome da Refeição</Label>
              <Input
                placeholder="Ex: Arroz com Feijão e Bife"
                value={customMealName}
                onChange={(e) => setCustomMealName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSaveCustomMeal()}
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowManualDialog(false);
                  setEditingMeal(null);
                  setCustomMealName("");
                }}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveCustomMeal}
                disabled={!customMealName.trim()}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
