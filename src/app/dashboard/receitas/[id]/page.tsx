"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Clock, Users, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Base de dados de receitas
const recipes = [
  {
    id: "32",
    title: "Kimchi",
    description: "Repolho fermentado coreano picante",
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=600&h=400&fit=crop",
    cuisine: "Coreana",
    difficulty: "Intermediário",
    cookTime: 1440,
    servings: 8,
    tags: ["Fermentado", "Picante", "Vegetariano"],
    ingredients: [
      "1 repolho napa",
      "Rabanete",
      "Cebolinha",
      "Pasta de gochujang",
      "Alho",
      "Gengibre",
      "Sal"
    ],
    instructions: [
      "Corte o repolho",
      "Prepare a pasta picante",
      "Misture tudo",
      "Deixe fermentar por dias",
      "Sirva com arroz"
    ]
  }
];

export default function ReceitaDetalhesPage() {
  const params = useParams();
  const router = useRouter();
  const recipeId = params.id as string;

  const recipe = recipes.find((r) => r.id === recipeId);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Receita não encontrada</h1>
          <Button onClick={() => router.push("/dashboard/receitas")}>
            Voltar para Receitas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header com botão voltar */}
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard/receitas")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        {/* Imagem principal */}
        <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-6">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Título e informações básicas */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{recipe.title}</h1>
          <p className="text-gray-600 text-lg mb-4">{recipe.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-500">Cozinha</p>
                <p className="font-semibold">{recipe.cuisine}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-500">Tempo</p>
                <p className="font-semibold">{recipe.cookTime} min</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-500">Porções</p>
                <p className="font-semibold">{recipe.servings}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 flex items-center justify-center">
                <span className="text-orange-500">⭐</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dificuldade</p>
                <p className="font-semibold">{recipe.difficulty}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredientes */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Ingredientes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Modo de preparo */}
        <Card>
          <CardHeader>
            <CardTitle>Modo de Preparo</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </span>
                  <span className="pt-1">{instruction}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
