"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw,
  Check,
  Timer,
  ChefHat
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

// Mesma base de receitas
const allRecipes = [
  {
    id: "1",
    title: "Bacalhau à Brás",
    description: "Clássico português com bacalhau desfiado, batata palha e ovos",
    image: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?w=600&h=400&fit=crop",
    cuisine: "Portuguesa",
    difficulty: "Intermediário",
    cookTime: 45,
    servings: 4,
    tags: ["Tradicional", "Peixe", "Sem Glúten"],
    ingredients: [
      "500g de bacalhau demolhado",
      "500g de batata palha",
      "6 ovos",
      "2 cebolas grandes",
      "3 dentes de alho",
      "Azeite extra virgem",
      "Azeitonas pretas",
      "Salsa fresca",
      "Sal e pimenta a gosto"
    ],
    instructions: [
      "Desfie o bacalhau em lascas finas, removendo peles e espinhas",
      "Refogue a cebola e o alho no azeite até ficarem dourados",
      "Adicione o bacalhau e refogue por 5 minutos",
      "Junte a batata palha e misture delicadamente",
      "Bata os ovos e adicione à mistura, mexendo até ficarem cremosos",
      "Tempere com sal e pimenta",
      "Decore com azeitonas e salsa fresca",
      "Sirva imediatamente"
    ],
    stepTimes: [10, 8, 5, 3, 7, 2, 3, 2] // Tempo sugerido para cada passo em minutos
  },
  {
    id: "5",
    title: "Risotto de Cogumelos",
    description: "Cremoso risotto italiano com cogumelos frescos",
    image: "https://images.unsplash.com/photo-1476124369491-c4ca6e0e3ffc?w=600&h=400&fit=crop",
    cuisine: "Italiana",
    difficulty: "Intermediário",
    cookTime: 35,
    servings: 4,
    tags: ["Vegetariano", "Sem Glúten", "Cremoso"],
    ingredients: [
      "300g de arroz arbóreo",
      "400g de cogumelos variados",
      "1 litro de caldo de legumes",
      "1 cebola pequena",
      "100ml de vinho branco",
      "50g de manteiga",
      "80g de queijo parmesão ralado",
      "2 dentes de alho",
      "Azeite, sal e pimenta"
    ],
    instructions: [
      "Aqueça o caldo e mantenha quente",
      "Refogue a cebola e alho no azeite e manteiga",
      "Adicione os cogumelos fatiados e cozinhe até dourarem",
      "Adicione o arroz e torre por 2 minutos",
      "Adicione o vinho e deixe evaporar",
      "Adicione o caldo quente aos poucos, mexendo sempre",
      "Continue adicionando caldo até o arroz ficar al dente (18-20 min)",
      "Retire do fogo, adicione manteiga e parmesão",
      "Mexa vigorosamente para criar cremosidade",
      "Deixe descansar 2 minutos e sirva"
    ],
    stepTimes: [5, 5, 5, 2, 3, 20, 2, 2, 1, 2]
  },
  // Adicione mais receitas conforme necessário
];

export default function FazerReceitaPage() {
  const router = useRouter();
  const params = useParams();
  const recipeId = params.id as string;

  const recipe = allRecipes.find(r => r.id === recipeId);

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [customTime, setCustomTime] = useState(5);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            // Notificação quando o timer termina
            if (typeof window !== 'undefined' && 'Notification' in window) {
              Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                  new Notification('Timer Finalizado!', {
                    body: 'Seu tempo acabou. Verifique sua receita!',
                    icon: '/icon.svg'
                  });
                }
              });
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  if (!recipe) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-8 text-center">
          <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Receita não encontrada</h2>
          <Button onClick={() => router.push('/dashboard/receitas')}>
            Voltar para Receitas
          </Button>
        </Card>
      </div>
    );
  }

  const progress = ((completedSteps.length) / recipe.instructions.length) * 100;

  const handleNextStep = () => {
    if (currentStep < recipe.instructions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleStepComplete = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) {
      setCompletedSteps(completedSteps.filter(s => s !== stepIndex));
    } else {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const startTimer = (minutes: number) => {
    setTimerSeconds(minutes * 60);
    setIsTimerRunning(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <Button
          variant="ghost"
          onClick={() => router.push('/dashboard/receitas')}
          className="mb-4 -ml-2"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Voltar para Receitas
        </Button>
        <div className="flex items-start gap-4">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Badge className="bg-orange-600 text-white">{recipe.cuisine}</Badge>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {recipe.cookTime} min
              </span>
              <span>{recipe.difficulty}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Progresso: {completedSteps.length} de {recipe.instructions.length} passos
            </span>
            <span className="text-sm font-bold text-orange-600">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Timer Card */}
      <Card className="border-orange-200 shadow-sm bg-gradient-to-br from-orange-50 to-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Timer className="w-5 h-5 text-orange-600" />
            <h2 className="text-lg font-bold text-gray-900">Temporizador</h2>
          </div>
          
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-gray-900 mb-2 font-mono">
              {formatTime(timerSeconds)}
            </div>
            <p className="text-sm text-gray-600">
              {isTimerRunning ? "Timer em andamento..." : "Configure o tempo desejado"}
            </p>
          </div>

          <div className="flex gap-3 mb-4 flex-wrap justify-center">
            <Button
              onClick={() => startTimer(1)}
              variant="outline"
              size="sm"
              disabled={isTimerRunning}
              className="border-orange-300 hover:bg-orange-50"
            >
              1 min
            </Button>
            <Button
              onClick={() => startTimer(5)}
              variant="outline"
              size="sm"
              disabled={isTimerRunning}
              className="border-orange-300 hover:bg-orange-50"
            >
              5 min
            </Button>
            <Button
              onClick={() => startTimer(10)}
              variant="outline"
              size="sm"
              disabled={isTimerRunning}
              className="border-orange-300 hover:bg-orange-50"
            >
              10 min
            </Button>
            <Button
              onClick={() => startTimer(15)}
              variant="outline"
              size="sm"
              disabled={isTimerRunning}
              className="border-orange-300 hover:bg-orange-50"
            >
              15 min
            </Button>
            <Button
              onClick={() => startTimer(30)}
              variant="outline"
              size="sm"
              disabled={isTimerRunning}
              className="border-orange-300 hover:bg-orange-50"
            >
              30 min
            </Button>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              disabled={timerSeconds === 0}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
            >
              {isTimerRunning ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pausar
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Iniciar
                </>
              )}
            </Button>
            <Button
              onClick={() => {
                setTimerSeconds(0);
                setIsTimerRunning(false);
              }}
              variant="outline"
              className="border-orange-300 hover:bg-orange-50"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Step Card */}
      <Card className="border-gray-200 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold">
                {currentStep + 1}
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Passo {currentStep + 1} de {recipe.instructions.length}
              </h2>
            </div>
            <Button
              onClick={() => toggleStepComplete(currentStep)}
              variant={completedSteps.includes(currentStep) ? "default" : "outline"}
              size="sm"
              className={completedSteps.includes(currentStep) 
                ? "bg-green-600 hover:bg-green-700 text-white" 
                : "border-gray-300"}
            >
              <Check className="w-4 h-4 mr-2" />
              {completedSteps.includes(currentStep) ? "Concluído" : "Marcar"}
            </Button>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {recipe.instructions[currentStep]}
          </p>

          {recipe.stepTimes && recipe.stepTimes[currentStep] && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-orange-700">
                <Clock className="w-5 h-5" />
                <span className="font-medium">
                  Tempo sugerido: {recipe.stepTimes[currentStep]} minutos
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handlePreviousStep}
              disabled={currentStep === 0}
              variant="outline"
              className="flex-1 border-gray-300"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Anterior
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={currentStep === recipe.instructions.length - 1}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
            >
              Próximo
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* All Steps Overview */}
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Todos os Passos</h3>
          <div className="space-y-3">
            {recipe.instructions.map((instruction, index) => (
              <div
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`flex gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  currentStep === index
                    ? "border-orange-600 bg-orange-50"
                    : completedSteps.includes(index)
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    completedSteps.includes(index)
                      ? "bg-green-600 text-white"
                      : currentStep === index
                      ? "bg-orange-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {completedSteps.includes(index) ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <p className={`text-sm pt-1 ${
                  currentStep === index ? "font-medium text-gray-900" : "text-gray-600"
                }`}>
                  {instruction}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ingredients Reference */}
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Ingredientes</h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700">
                <span className="text-orange-600 font-bold">•</span>
                <span className="text-sm">{ingredient}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
