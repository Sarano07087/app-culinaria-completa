"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ChefHat, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [experience, setExperience] = useState("");
  const [cuisineTypes, setCuisineTypes] = useState<string[]>([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [cookingFrequency, setCookingFrequency] = useState("");

  const handleCuisineToggle = (cuisine: string) => {
    setCuisineTypes(prev =>
      prev.includes(cuisine) ? prev.filter(c => c !== cuisine) : [...prev, cuisine]
    );
  };

  const handleDietaryToggle = (restriction: string) => {
    setDietaryRestrictions(prev =>
      prev.includes(restriction) ? prev.filter(r => r !== restriction) : [...prev, restriction]
    );
  };

  const handleComplete = () => {
    // Salvar preferências do usuário
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
            <ChefHat className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            CookFun
          </span>
        </Link>

        <Card className="border-gray-200 shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-orange-600 font-semibold">Passo {step} de 4</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`h-2 w-12 rounded-full ${
                      s <= step ? "bg-orange-500" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              {step === 1 && "Qual sua experiência na cozinha?"}
              {step === 2 && "Que tipos de culinária você gosta?"}
              {step === 3 && "Tem alguma restrição alimentar?"}
              {step === 4 && "Com que frequência você cozinha?"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Isso nos ajuda a personalizar suas recomendações"}
              {step === 2 && "Selecione todas que se aplicam"}
              {step === 3 && "Vamos filtrar receitas adequadas para você"}
              {step === 4 && "Quase lá! Última pergunta"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <RadioGroup value={experience} onValueChange={setExperience}>
                <div className="space-y-3">
                  {["Iniciante", "Intermediário", "Avançado", "Chef Profissional"].map((level) => (
                    <div key={level} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-orange-50 cursor-pointer">
                      <RadioGroupItem value={level} id={level} />
                      <Label htmlFor={level} className="cursor-pointer flex-1">{level}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}

            {step === 2 && (
              <div className="space-y-3">
                {["Portuguesa", "Italiana", "Espanhola", "Francesa", "Japonesa", "Chinesa", "Indiana", "Mexicana", "Brasileira", "Árabe"].map((cuisine) => (
                  <div key={cuisine} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-orange-50 cursor-pointer">
                    <Checkbox
                      id={cuisine}
                      checked={cuisineTypes.includes(cuisine)}
                      onCheckedChange={() => handleCuisineToggle(cuisine)}
                    />
                    <Label htmlFor={cuisine} className="cursor-pointer flex-1">{cuisine}</Label>
                  </div>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3">
                {["Sem Glúten", "Vegano", "Vegetariano", "Sem Lactose", "Sem Açúcar", "Low Carb", "Kosher", "Halal", "Nenhuma"].map((restriction) => (
                  <div key={restriction} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-orange-50 cursor-pointer">
                    <Checkbox
                      id={restriction}
                      checked={dietaryRestrictions.includes(restriction)}
                      onCheckedChange={() => handleDietaryToggle(restriction)}
                    />
                    <Label htmlFor={restriction} className="cursor-pointer flex-1">{restriction}</Label>
                  </div>
                ))}
              </div>
            )}

            {step === 4 && (
              <RadioGroup value={cookingFrequency} onValueChange={setCookingFrequency}>
                <div className="space-y-3">
                  {["Todos os dias", "4-6 vezes por semana", "2-3 vezes por semana", "1 vez por semana", "Raramente"].map((freq) => (
                    <div key={freq} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-orange-50 cursor-pointer">
                      <RadioGroupItem value={freq} id={freq} />
                      <Label htmlFor={freq} className="cursor-pointer flex-1">{freq}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}

            <div className="flex gap-3 mt-6">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="flex-1"
                >
                  Voltar
                </Button>
              )}
              <Button
                onClick={() => step === 4 ? handleComplete() : setStep(step + 1)}
                disabled={
                  (step === 1 && !experience) ||
                  (step === 4 && !cookingFrequency)
                }
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
              >
                {step === 4 ? "Finalizar" : "Continuar"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
