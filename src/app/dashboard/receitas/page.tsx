"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, Users, ChefHat, Copy, Check, Filter, Play } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
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

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cuisine: string;
  difficulty: string;
  cookTime: number;
  servings: number;
  tags: string[];
  ingredients: string[];
  instructions: string[];
}

export default function ReceitasPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [copiedRecipe, setCopiedRecipe] = useState<string | null>(null);
  const [filterCuisine, setFilterCuisine] = useState("all");
  const [filterDietary, setFilterDietary] = useState("all");

  // Simulação de preferências do usuário do quiz (em produção viria do banco de dados)
  const userPreferences = {
    cuisineTypes: ["Portuguesa", "Italiana"],
    dietaryRestrictions: ["Sem Glúten"],
  };

  // Base de receitas do mundo - EXPANDIDA!
  const allRecipes: Recipe[] = [
    // Receitas Portuguesas (Recomendadas baseado no quiz)
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
      ]
    },
    {
      id: "2",
      title: "Francesinha",
      description: "Sanduíche português coberto com molho especial e queijo derretido",
      image: "https://images.unsplash.com/photo-1619740455993-9e4e0f8b9c56?w=600&h=400&fit=crop",
      cuisine: "Portuguesa",
      difficulty: "Avançado",
      cookTime: 60,
      servings: 2,
      tags: ["Tradicional", "Carne"],
      ingredients: [
        "4 fatias de pão de forma",
        "4 fatias de presunto",
        "4 fatias de mortadela",
        "2 salsichas frescas",
        "2 bifes finos",
        "200g de queijo fatiado",
        "2 ovos",
        "Molho: 500ml cerveja, 2 cubos de caldo de carne, 1 colher de farinha, pimenta, molho inglês"
      ],
      instructions: [
        "Grelhe os bifes e as salsichas",
        "Monte o sanduíche: pão, presunto, bife, salsicha, mortadela, pão",
        "Cubra com queijo generosamente",
        "Prepare o molho: ferva a cerveja com caldo, adicione farinha para engrossar",
        "Tempere o molho com pimenta e molho inglês",
        "Coloque o sanduíche no forno até o queijo derreter",
        "Frite o ovo",
        "Despeje o molho quente sobre o sanduíche",
        "Coloque o ovo por cima e sirva com batatas fritas"
      ]
    },
    {
      id: "3",
      title: "Caldo Verde",
      description: "Sopa tradicional portuguesa com couve, batata e chouriço",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop",
      cuisine: "Portuguesa",
      difficulty: "Fácil",
      cookTime: 40,
      servings: 6,
      tags: ["Tradicional", "Sopa", "Conforto"],
      ingredients: [
        "1kg de batatas",
        "500g de couve galega",
        "200g de chouriço",
        "1 cebola",
        "3 dentes de alho",
        "Azeite extra virgem",
        "Sal a gosto",
        "1,5 litros de água"
      ],
      instructions: [
        "Descasque e corte as batatas em pedaços",
        "Refogue a cebola e o alho no azeite",
        "Adicione as batatas e a água",
        "Cozinhe até as batatas ficarem macias",
        "Triture as batatas com um processador",
        "Corte a couve em tiras finas",
        "Adicione a couve e o chouriço fatiado",
        "Cozinhe por mais 5 minutos",
        "Finalize com um fio de azeite"
      ]
    },
    {
      id: "4",
      title: "Pastéis de Nata",
      description: "Doce português icônico com massa folhada e creme",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop",
      cuisine: "Portuguesa",
      difficulty: "Avançado",
      cookTime: 90,
      servings: 12,
      tags: ["Doce", "Tradicional", "Sobremesa"],
      ingredients: [
        "1 rolo de massa folhada",
        "500ml de leite",
        "200g de açúcar",
        "6 gemas",
        "40g de farinha",
        "1 pau de canela",
        "Casca de limão",
        "Canela em pó para polvilhar"
      ],
      instructions: [
        "Ferva o leite com canela e casca de limão",
        "Misture açúcar e farinha, adicione as gemas",
        "Adicione o leite quente aos poucos, mexendo",
        "Cozinhe em fogo baixo até engrossar",
        "Deixe esfriar completamente",
        "Corte a massa folhada em círculos",
        "Forre forminhas de empada com a massa",
        "Adicione o creme",
        "Asse a 250°C por 15-20 minutos até dourar",
        "Polvilhe com canela"
      ]
    },

    // Receitas Italianas (Recomendadas baseado no quiz)
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
      ]
    },
    {
      id: "6",
      title: "Pasta Carbonara Autêntica",
      description: "A verdadeira carbonara romana com guanciale e pecorino",
      image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&h=400&fit=crop",
      cuisine: "Italiana",
      difficulty: "Intermediário",
      cookTime: 25,
      servings: 4,
      tags: ["Tradicional", "Rápido"],
      ingredients: [
        "400g de spaghetti",
        "200g de guanciale (ou bacon)",
        "4 gemas de ovo",
        "100g de queijo pecorino romano ralado",
        "Pimenta preta moída na hora",
        "Sal para a água"
      ],
      instructions: [
        "Corte o guanciale em cubos pequenos",
        "Frite o guanciale em fogo médio até ficar crocante (sem óleo)",
        "Cozinhe o spaghetti em água salgada até al dente",
        "Misture as gemas com o pecorino e pimenta preta",
        "Reserve 1 xícara da água do cozimento",
        "Escorra a massa e adicione ao guanciale (fora do fogo)",
        "Adicione a mistura de ovos e mexa rapidamente",
        "Adicione água do cozimento aos poucos até ficar cremoso",
        "Sirva imediatamente com mais pecorino e pimenta"
      ]
    },
    {
      id: "7",
      title: "Pizza Margherita Napolitana",
      description: "Pizza clássica italiana com molho de tomate, mozzarella e manjericão",
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop",
      cuisine: "Italiana",
      difficulty: "Intermediário",
      cookTime: 120,
      servings: 4,
      tags: ["Tradicional", "Vegetariano"],
      ingredients: [
        "500g de farinha tipo 00",
        "325ml de água morna",
        "10g de sal",
        "3g de fermento fresco",
        "400g de tomate pelado",
        "300g de mozzarella di bufala",
        "Manjericão fresco",
        "Azeite extra virgem"
      ],
      instructions: [
        "Dissolva o fermento na água morna",
        "Misture a farinha e o sal",
        "Adicione a água com fermento e sove por 10 minutos",
        "Deixe descansar por 2 horas até dobrar de volume",
        "Prepare o molho: esmague os tomates com sal",
        "Divida a massa em 4 bolas",
        "Abra cada bola em disco fino",
        "Espalhe o molho, adicione mozzarella rasgada",
        "Asse a 250°C por 10-12 minutos",
        "Finalize com manjericão fresco e azeite"
      ]
    },
    {
      id: "8",
      title: "Lasanha Bolonhesa",
      description: "Lasanha tradicional com molho à bolonhesa e bechamel",
      image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&h=400&fit=crop",
      cuisine: "Italiana",
      difficulty: "Avançado",
      cookTime: 120,
      servings: 8,
      tags: ["Tradicional", "Conforto"],
      ingredients: [
        "500g de massa para lasanha",
        "600g de carne moída",
        "800g de tomate pelado",
        "1 litro de leite",
        "100g de manteiga",
        "100g de farinha",
        "200g de queijo parmesão",
        "1 cebola, 2 cenouras, 2 talos de aipo",
        "Vinho tinto, noz-moscada"
      ],
      instructions: [
        "Prepare o molho bolonhesa: refogue os legumes picados",
        "Adicione a carne e doure bem",
        "Adicione vinho e deixe evaporar",
        "Adicione os tomates e cozinhe por 2 horas",
        "Prepare o bechamel: derreta a manteiga, adicione farinha",
        "Adicione o leite aos poucos, mexendo sempre",
        "Tempere com sal e noz-moscada",
        "Monte: camadas de massa, bolonhesa, bechamel, parmesão",
        "Repita as camadas",
        "Asse a 180°C por 40 minutos"
      ]
    },
    {
      id: "9",
      title: "Tiramisu Clássico",
      description: "Sobremesa italiana com café, mascarpone e cacau",
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=400&fit=crop",
      cuisine: "Italiana",
      difficulty: "Fácil",
      cookTime: 30,
      servings: 8,
      tags: ["Doce", "Sobremesa", "Sem Cozimento"],
      ingredients: [
        "500g de mascarpone",
        "6 ovos",
        "150g de açúcar",
        "300ml de café expresso forte",
        "50ml de licor amaretto",
        "300g de biscoitos savoiardi",
        "Cacau em pó para polvilhar",
        "Chocolate amargo para decorar"
      ],
      instructions: [
        "Separe as claras das gemas",
        "Bata as gemas com açúcar até ficarem claras",
        "Adicione o mascarpone e misture delicadamente",
        "Bata as claras em neve e incorpore à mistura",
        "Misture o café com o amaretto",
        "Molhe rapidamente os biscoitos no café",
        "Monte camadas: biscoitos, creme, biscoitos, creme",
        "Leve à geladeira por 4 horas",
        "Polvilhe cacau antes de servir"
      ]
    },

    // Receitas Japonesas
    {
      id: "10",
      title: "Ramen Caseiro",
      description: "Sopa japonesa com macarrão, caldo rico e coberturas variadas",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop",
      cuisine: "Japonesa",
      difficulty: "Avançado",
      cookTime: 120,
      servings: 4,
      tags: ["Sopa", "Conforto"],
      ingredients: [
        "400g de macarrão ramen",
        "1kg de ossos de porco",
        "500g de barriga de porco",
        "4 ovos",
        "2 litros de água",
        "4 dentes de alho",
        "Gengibre fresco",
        "Molho de soja",
        "Mirin",
        "Cebolinha, alga nori, milho"
      ],
      instructions: [
        "Ferva os ossos por 10 minutos, descarte a água",
        "Adicione água limpa, alho e gengibre, cozinhe por 4-6 horas",
        "Cozinhe a barriga de porco em molho de soja e mirin por 2 horas",
        "Prepare ovos marinados: cozinhe 6 min, marine em molho de soja",
        "Coe o caldo e tempere com molho de soja",
        "Cozinhe o macarrão conforme instruções",
        "Monte: macarrão, caldo quente, fatias de porco, ovo, cebolinha",
        "Adicione alga nori e milho",
        "Sirva imediatamente bem quente"
      ]
    },
    {
      id: "11",
      title: "Sushi Variado",
      description: "Seleção de sushi nigiri e maki rolls frescos",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&h=400&fit=crop",
      cuisine: "Japonesa",
      difficulty: "Avançado",
      cookTime: 90,
      servings: 4,
      tags: ["Peixe", "Tradicional", "Sem Glúten"],
      ingredients: [
        "500g de arroz para sushi",
        "100ml de vinagre de arroz",
        "300g de salmão fresco",
        "200g de atum fresco",
        "Folhas de alga nori",
        "Wasabi",
        "Gengibre em conserva",
        "Molho de soja",
        "Pepino, abacate"
      ],
      instructions: [
        "Cozinhe o arroz e deixe esfriar",
        "Misture o vinagre de arroz ao arroz",
        "Corte o peixe em fatias finas",
        "Para nigiri: molde o arroz e coloque o peixe por cima",
        "Para maki: espalhe arroz na alga, adicione recheio",
        "Enrole firmemente com a esteira de bambu",
        "Corte em pedaços uniformes",
        "Sirva com wasabi, gengibre e molho de soja"
      ]
    },
    {
      id: "12",
      title: "Tempura de Legumes",
      description: "Legumes fritos em massa leve e crocante",
      image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=600&h=400&fit=crop",
      cuisine: "Japonesa",
      difficulty: "Intermediário",
      cookTime: 30,
      servings: 4,
      tags: ["Vegetariano", "Frito"],
      ingredients: [
        "200g de farinha de trigo",
        "1 ovo",
        "300ml de água gelada",
        "Legumes variados: brócolis, cenoura, batata doce, berinjela",
        "Óleo para fritar",
        "Molho: molho de soja, mirin, dashi",
        "Gengibre ralado"
      ],
      instructions: [
        "Corte os legumes em pedaços uniformes",
        "Prepare a massa: misture levemente farinha, ovo e água gelada",
        "Aqueça o óleo a 180°C",
        "Passe os legumes na massa",
        "Frite até ficarem dourados e crocantes",
        "Escorra em papel absorvente",
        "Prepare o molho: misture soja, mirin e dashi",
        "Sirva imediatamente com o molho e gengibre"
      ]
    },

    // Receitas Mexicanas
    {
      id: "13",
      title: "Tacos al Pastor",
      description: "Tacos mexicanos com carne de porco marinada e abacaxi",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop",
      cuisine: "Mexicana",
      difficulty: "Intermediário",
      cookTime: 50,
      servings: 6,
      tags: ["Tradicional", "Picante", "Sem Glúten"],
      ingredients: [
        "1kg de carne de porco (paleta)",
        "3 chiles guajillo",
        "2 chiles ancho",
        "1 abacaxi",
        "1 cebola",
        "Coentro fresco",
        "Limão",
        "Tortillas de milho",
        "Cominho, orégano, alho, vinagre"
      ],
      instructions: [
        "Hidrate os chiles em água quente por 20 minutos",
        "Bata os chiles com alho, cominho, orégano e vinagre",
        "Marine a carne fatiada fina neste molho por 2 horas",
        "Corte o abacaxi em fatias",
        "Grelhe a carne e o abacaxi até caramelizar",
        "Aqueça as tortillas",
        "Pique a carne e o abacaxi",
        "Monte os tacos com carne, abacaxi, cebola e coentro",
        "Finalize com limão e sirva"
      ]
    },
    {
      id: "14",
      title: "Guacamole Autêntico",
      description: "Pasta cremosa de abacate com tomate, cebola e limão",
      image: "https://images.unsplash.com/photo-1604467794349-0b74285de7e7?w=600&h=400&fit=crop",
      cuisine: "Mexicana",
      difficulty: "Fácil",
      cookTime: 10,
      servings: 4,
      tags: ["Vegano", "Vegetariano", "Sem Glúten", "Rápido"],
      ingredients: [
        "3 abacates maduros",
        "1 tomate",
        "1/2 cebola roxa",
        "1 pimenta jalapeño",
        "Suco de 2 limões",
        "Coentro fresco",
        "Sal a gosto",
        "Tortilla chips para servir"
      ],
      instructions: [
        "Corte os abacates ao meio e retire o caroço",
        "Amasse a polpa com um garfo",
        "Pique finamente tomate, cebola e jalapeño",
        "Misture tudo ao abacate",
        "Adicione suco de limão e coentro picado",
        "Tempere com sal",
        "Sirva imediatamente com tortilla chips"
      ]
    },
    {
      id: "15",
      title: "Enchiladas de Frango",
      description: "Tortillas recheadas com frango e cobertas com molho de pimenta",
      image: "https://images.unsplash.com/photo-1599974982948-83f8e8f0a9d3?w=600&h=400&fit=crop",
      cuisine: "Mexicana",
      difficulty: "Intermediário",
      cookTime: 60,
      servings: 6,
      tags: ["Tradicional", "Picante"],
      ingredients: [
        "12 tortillas de milho",
        "600g de peito de frango",
        "400g de molho de tomate",
        "3 chiles poblano",
        "300g de queijo",
        "1 cebola",
        "Creme de leite",
        "Coentro",
        "Cominho, alho"
      ],
      instructions: [
        "Cozinhe e desfie o frango temperado",
        "Asse os chiles e retire a pele",
        "Bata os chiles com molho de tomate e temperos",
        "Refogue a cebola e misture com o frango",
        "Aqueça as tortillas",
        "Recheie com frango e enrole",
        "Arrume em assadeira",
        "Cubra com molho e queijo",
        "Asse a 180°C por 20 minutos",
        "Finalize com creme e coentro"
      ]
    },

    // Receitas Indianas
    {
      id: "16",
      title: "Butter Chicken",
      description: "Frango ao curry cremoso com manteiga e especiarias indianas",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&h=400&fit=crop",
      cuisine: "Indiana",
      difficulty: "Intermediário",
      cookTime: 60,
      servings: 4,
      tags: ["Curry", "Cremoso", "Sem Glúten"],
      ingredients: [
        "800g de peito de frango",
        "200ml de iogurte natural",
        "400ml de molho de tomate",
        "200ml de creme de leite",
        "100g de manteiga",
        "2 colheres de garam masala",
        "1 colher de cúrcuma",
        "1 colher de páprica",
        "Gengibre e alho",
        "Coentro fresco"
      ],
      instructions: [
        "Marine o frango em iogurte, garam masala, cúrcuma por 2 horas",
        "Grelhe o frango até dourar",
        "Derreta a manteiga e refogue gengibre e alho",
        "Adicione o molho de tomate e especiarias",
        "Cozinhe por 15 minutos",
        "Adicione o creme de leite",
        "Adicione o frango grelhado cortado",
        "Cozinhe por mais 10 minutos",
        "Finalize com coentro fresco",
        "Sirva com arroz basmati ou naan"
      ]
    },
    {
      id: "17",
      title: "Biryani de Cordeiro",
      description: "Arroz aromático indiano com cordeiro e especiarias",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop",
      cuisine: "Indiana",
      difficulty: "Avançado",
      cookTime: 120,
      servings: 6,
      tags: ["Tradicional", "Sem Glúten"],
      ingredients: [
        "500g de arroz basmati",
        "800g de cordeiro em cubos",
        "200ml de iogurte",
        "2 cebolas",
        "4 tomates",
        "Açafrão",
        "Cardamomo, canela, cravo",
        "Gengibre, alho",
        "Coentro e hortelã"
      ],
      instructions: [
        "Marine o cordeiro em iogurte e especiarias por 2 horas",
        "Frite as cebolas até dourar",
        "Refogue o cordeiro até selar",
        "Adicione tomates e cozinhe",
        "Cozinhe o arroz até meio cozido",
        "Em uma panela, faça camadas: cordeiro, arroz, cebola frita",
        "Adicione açafrão dissolvido em leite",
        "Cubra e cozinhe em fogo baixo por 30 minutos",
        "Finalize com ervas frescas"
      ]
    },
    {
      id: "18",
      title: "Samosas de Legumes",
      description: "Pastéis indianos fritos recheados com batata e ervilha",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=400&fit=crop",
      cuisine: "Indiana",
      difficulty: "Intermediário",
      cookTime: 60,
      servings: 12,
      tags: ["Vegetariano", "Frito", "Tradicional"],
      ingredients: [
        "300g de farinha",
        "4 batatas",
        "1 xícara de ervilhas",
        "1 cebola",
        "Gengibre e alho",
        "Cominho, coentro em pó",
        "Garam masala",
        "Pimenta verde",
        "Óleo para fritar"
      ],
      instructions: [
        "Prepare a massa: misture farinha, óleo e água",
        "Deixe descansar por 30 minutos",
        "Cozinhe e amasse as batatas",
        "Refogue cebola, gengibre, alho e especiarias",
        "Adicione batatas e ervilhas",
        "Abra a massa em círculos finos",
        "Corte ao meio e forme cones",
        "Recheie e feche bem",
        "Frite até dourar",
        "Sirva com chutney de hortelã"
      ]
    },

    // Receitas Francesas
    {
      id: "19",
      title: "Ratatouille",
      description: "Legumes provençais assados com ervas aromáticas",
      image: "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=600&h=400&fit=crop",
      cuisine: "Francesa",
      difficulty: "Fácil",
      cookTime: 90,
      servings: 6,
      tags: ["Vegetariano", "Vegano", "Sem Glúten", "Saudável"],
      ingredients: [
        "2 berinjelas",
        "2 abobrinhas",
        "4 tomates",
        "1 pimentão vermelho",
        "1 pimentão amarelo",
        "1 cebola",
        "4 dentes de alho",
        "Tomilho, alecrim, manjericão",
        "Azeite extra virgem",
        "Sal e pimenta"
      ],
      instructions: [
        "Corte todos os legumes em rodelas finas",
        "Prepare o molho: refogue cebola e alho, adicione tomate picado",
        "Tempere o molho com ervas, sal e pimenta",
        "Espalhe o molho no fundo de uma assadeira",
        "Arrume os legumes em camadas alternadas em pé",
        "Regue com azeite generosamente",
        "Polvilhe ervas frescas",
        "Cubra com papel alumínio",
        "Asse a 180°C por 45 minutos",
        "Retire o papel e asse mais 30 minutos até dourar"
      ]
    },
    {
      id: "20",
      title: "Coq au Vin",
      description: "Frango cozido em vinho tinto com cogumelos e bacon",
      image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&h=400&fit=crop",
      cuisine: "Francesa",
      difficulty: "Avançado",
      cookTime: 120,
      servings: 6,
      tags: ["Tradicional", "Conforto"],
      ingredients: [
        "1 frango inteiro cortado",
        "750ml de vinho tinto",
        "200g de bacon",
        "300g de cogumelos",
        "12 cebolinhas pérola",
        "3 cenouras",
        "4 dentes de alho",
        "Tomilho e louro",
        "Farinha, manteiga"
      ],
      instructions: [
        "Marine o frango no vinho por 4 horas",
        "Frite o bacon até crocante",
        "Doure o frango na gordura do bacon",
        "Refogue as cebolinhas e cenouras",
        "Adicione cogumelos e alho",
        "Adicione o vinho da marinada",
        "Adicione ervas e cozinhe por 1 hora",
        "Retire o frango e reduza o molho",
        "Engrosse com manteiga e farinha",
        "Sirva com batatas ou purê"
      ]
    },
    {
      id: "21",
      title: "Crème Brûlée",
      description: "Sobremesa francesa com creme de baunilha e açúcar caramelizado",
      image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&h=400&fit=crop",
      cuisine: "Francesa",
      difficulty: "Intermediário",
      cookTime: 60,
      servings: 6,
      tags: ["Doce", "Sobremesa", "Sem Glúten"],
      ingredients: [
        "500ml de creme de leite",
        "6 gemas",
        "100g de açúcar",
        "1 vagem de baunilha",
        "Açúcar para caramelizar",
        "Pitada de sal"
      ],
      instructions: [
        "Aqueça o creme com a baunilha",
        "Bata as gemas com açúcar",
        "Adicione o creme quente às gemas aos poucos",
        "Coe a mistura",
        "Distribua em ramequins",
        "Asse em banho-maria a 150°C por 40 minutos",
        "Deixe esfriar e leve à geladeira por 4 horas",
        "Polvilhe açúcar por cima",
        "Caramelize com maçarico",
        "Sirva imediatamente"
      ]
    },

    // Receitas Brasileiras
    {
      id: "22",
      title: "Feijoada Completa",
      description: "Prato brasileiro tradicional com feijão preto e carnes",
      image: "https://images.unsplash.com/photo-1628191081298-d5e5e5f35c6d?w=600&h=400&fit=crop",
      cuisine: "Brasileira",
      difficulty: "Avançado",
      cookTime: 180,
      servings: 8,
      tags: ["Tradicional", "Conforto"],
      ingredients: [
        "1kg de feijão preto",
        "500g de costela de porco",
        "300g de linguiça calabresa",
        "200g de bacon",
        "200g de paio",
        "Carne seca",
        "4 dentes de alho",
        "2 cebolas",
        "Folhas de louro",
        "Laranja para acompanhar"
      ],
      instructions: [
        "Deixe o feijão de molho por 12 horas",
        "Dessalgue a carne seca por 24 horas",
        "Cozinhe o feijão com água e louro até amolecer",
        "Em outra panela, refogue alho e cebola",
        "Adicione todas as carnes e doure",
        "Adicione o feijão cozido às carnes",
        "Cozinhe em fogo baixo por 2 horas",
        "Ajuste o sal e temperos",
        "Sirva com arroz, couve, farofa e laranja"
      ]
    },
    {
      id: "23",
      title: "Moqueca de Peixe",
      description: "Ensopado brasileiro de peixe com leite de coco e dendê",
      image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&h=400&fit=crop",
      cuisine: "Brasileira",
      difficulty: "Intermediário",
      cookTime: 45,
      servings: 6,
      tags: ["Peixe", "Tradicional", "Sem Glúten"],
      ingredients: [
        "1kg de peixe (badejo ou robalo)",
        "400ml de leite de coco",
        "3 tomates",
        "2 pimentões",
        "1 cebola grande",
        "Coentro fresco",
        "Azeite de dendê",
        "Limão",
        "Sal e pimenta"
      ],
      instructions: [
        "Tempere o peixe com limão, sal e pimenta",
        "Corte os legumes em rodelas",
        "Em uma panela de barro, faça camadas: legumes, peixe",
        "Adicione o leite de coco",
        "Cozinhe em fogo baixo por 20 minutos",
        "Adicione o azeite de dendê",
        "Finalize com coentro fresco",
        "Sirva com arroz branco e pirão"
      ]
    },
    {
      id: "24",
      title: "Brigadeiro Gourmet",
      description: "Doce brasileiro cremoso de chocolate",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=400&fit=crop",
      cuisine: "Brasileira",
      difficulty: "Fácil",
      cookTime: 20,
      servings: 30,
      tags: ["Doce", "Sobremesa", "Sem Glúten"],
      ingredients: [
        "1 lata de leite condensado",
        "3 colheres de chocolate em pó",
        "1 colher de manteiga",
        "Chocolate granulado para decorar",
        "Forminhas de papel"
      ],
      instructions: [
        "Em uma panela, misture leite condensado, chocolate e manteiga",
        "Cozinhe em fogo baixo, mexendo sempre",
        "Cozinhe até desgrudar do fundo da panela (15-20 min)",
        "Deixe esfriar completamente",
        "Unte as mãos com manteiga",
        "Faça bolinhas com a massa",
        "Passe no chocolate granulado",
        "Coloque nas forminhas",
        "Leve à geladeira por 1 hora"
      ]
    },

    // Receitas Veganas
    {
      id: "25",
      title: "Buddha Bowl Vegano",
      description: "Bowl nutritivo com grãos, legumes e molho tahine",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
      cuisine: "Internacional",
      difficulty: "Fácil",
      cookTime: 30,
      servings: 2,
      tags: ["Vegano", "Vegetariano", "Sem Glúten", "Saudável"],
      ingredients: [
        "1 xícara de quinoa",
        "1 batata doce",
        "1 xícara de grão de bico",
        "2 xícaras de couve",
        "1 abacate",
        "Cenoura ralada",
        "Sementes de gergelim",
        "Molho tahine: tahine, limão, alho, água"
      ],
      instructions: [
        "Cozinhe a quinoa conforme instruções",
        "Asse a batata doce em cubos com azeite e páprica",
        "Tempere o grão de bico e asse até crocante",
        "Refogue a couve com alho",
        "Prepare o molho: misture tahine, suco de limão, alho e água",
        "Monte o bowl: quinoa, batata doce, grão de bico, couve",
        "Adicione abacate fatiado e cenoura ralada",
        "Regue com molho tahine",
        "Polvilhe sementes de gergelim"
      ]
    },
    {
      id: "26",
      title: "Curry Tailandês de Legumes",
      description: "Curry cremoso vegano com leite de coco e legumes",
      image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&h=400&fit=crop",
      cuisine: "Tailandesa",
      difficulty: "Fácil",
      cookTime: 35,
      servings: 4,
      tags: ["Vegano", "Vegetariano", "Sem Glúten", "Picante"],
      ingredients: [
        "400ml de leite de coco",
        "3 colheres de pasta de curry vermelho",
        "Legumes variados: brócolis, pimentão, cenoura",
        "200g de tofu",
        "1 cebola",
        "Gengibre e alho",
        "Molho de soja",
        "Manjericão tailandês",
        "Arroz para acompanhar"
      ],
      instructions: [
        "Corte todos os legumes em pedaços uniformes",
        "Refogue cebola, alho e gengibre",
        "Adicione a pasta de curry e refogue",
        "Adicione o leite de coco",
        "Adicione os legumes mais duros primeiro",
        "Cozinhe por 10 minutos",
        "Adicione tofu em cubos",
        "Tempere com molho de soja",
        "Finalize com manjericão fresco",
        "Sirva com arroz jasmine"
      ]
    },

    // Receitas Espanholas
    {
      id: "27",
      title: "Paella Valenciana",
      description: "Arroz espanhol tradicional com frutos do mar e açafrão",
      image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=600&h=400&fit=crop",
      cuisine: "Espanhola",
      difficulty: "Avançado",
      cookTime: 60,
      servings: 6,
      tags: ["Tradicional", "Peixe", "Sem Glúten"],
      ingredients: [
        "500g de arroz bomba",
        "500g de frutos do mar variados",
        "300g de frango",
        "200g de vagens",
        "1 litro de caldo de peixe",
        "Açafrão",
        "Pimentão vermelho",
        "Alho e cebola",
        "Azeite, limão"
      ],
      instructions: [
        "Doure o frango em azeite na paellera",
        "Adicione alho, cebola e pimentão",
        "Adicione as vagens",
        "Adicione o arroz e torre por 2 minutos",
        "Adicione o caldo quente com açafrão",
        "Cozinhe sem mexer por 15 minutos",
        "Adicione os frutos do mar",
        "Cozinhe mais 5 minutos",
        "Deixe descansar 5 minutos",
        "Sirva com limão"
      ]
    },
    {
      id: "28",
      title: "Gazpacho Andaluz",
      description: "Sopa fria espanhola de tomate e legumes",
      image: "https://images.unsplash.com/photo-1541529086526-db283c563270?w=600&h=400&fit=crop",
      cuisine: "Espanhola",
      difficulty: "Fácil",
      cookTime: 15,
      servings: 6,
      tags: ["Vegano", "Vegetariano", "Sem Glúten", "Frio", "Saudável"],
      ingredients: [
        "1kg de tomates maduros",
        "1 pepino",
        "1 pimentão verde",
        "1 cebola",
        "2 dentes de alho",
        "100ml de azeite extra virgem",
        "50ml de vinagre de vinho",
        "Sal e pimenta",
        "Pão para acompanhar"
      ],
      instructions: [
        "Corte todos os legumes em pedaços",
        "Bata tudo no liquidificador até ficar homogêneo",
        "Adicione azeite aos poucos",
        "Adicione vinagre",
        "Tempere com sal e pimenta",
        "Passe por uma peneira se desejar textura mais fina",
        "Leve à geladeira por 2 horas",
        "Sirva bem gelado",
        "Decore com cubos de pepino e pimentão"
      ]
    },
    {
      id: "29",
      title: "Churros com Chocolate",
      description: "Doce espanhol frito com açúcar e canela",
      image: "https://images.unsplash.com/photo-1600626333060-1b8d8b5c8b8e?w=600&h=400&fit=crop",
      cuisine: "Espanhola",
      difficulty: "Intermediário",
      cookTime: 40,
      servings: 6,
      tags: ["Doce", "Frito", "Sobremesa"],
      ingredients: [
        "250ml de água",
        "50g de manteiga",
        "150g de farinha",
        "3 ovos",
        "Açúcar e canela para polvilhar",
        "Óleo para fritar",
        "Chocolate: 200g chocolate meio amargo, 200ml creme de leite"
      ],
      instructions: [
        "Ferva água com manteiga e sal",
        "Adicione a farinha de uma vez e mexa vigorosamente",
        "Deixe esfriar um pouco",
        "Adicione os ovos um a um, mexendo bem",
        "Coloque a massa em saco de confeitar com bico estrela",
        "Aqueça o óleo a 180°C",
        "Frite os churros até dourar",
        "Escorra e passe no açúcar com canela",
        "Prepare o chocolate: derreta com creme de leite",
        "Sirva os churros com chocolate quente"
      ]
    },

    // Receitas Gregas
    {
      id: "30",
      title: "Moussaka Grega",
      description: "Gratinado grego com berinjela, carne moída e bechamel",
      image: "https://images.unsplash.com/photo-1601000938259-9e92002320b2?w=600&h=400&fit=crop",
      cuisine: "Grega",
      difficulty: "Avançado",
      cookTime: 120,
      servings: 8,
      tags: ["Tradicional", "Conforto"],
      ingredients: [
        "3 berinjelas grandes",
        "600g de carne moída",
        "800g de tomate pelado",
        "1 litro de leite",
        "100g de manteiga",
        "100g de farinha",
        "200g de queijo parmesão",
        "Canela, noz-moscada",
        "Cebola, alho"
      ],
      instructions: [
        "Corte as berinjelas em fatias e grelhe",
        "Prepare o molho de carne: refogue cebola e alho",
        "Adicione a carne e doure",
        "Adicione tomate e canela, cozinhe por 30 minutos",
        "Prepare o bechamel: derreta manteiga, adicione farinha",
        "Adicione leite aos poucos, tempere com noz-moscada",
        "Monte: camadas de berinjela, carne, berinjela",
        "Cubra com bechamel e parmesão",
        "Asse a 180°C por 45 minutos",
        "Deixe descansar 15 minutos antes de servir"
      ]
    },
    {
      id: "31",
      title: "Souvlaki de Frango",
      description: "Espetinhos gregos marinados com tzatziki",
      image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&h=400&fit=crop",
      cuisine: "Grega",
      difficulty: "Fácil",
      cookTime: 30,
      servings: 4,
      tags: ["Tradicional", "Sem Glúten"],
      ingredients: [
        "800g de peito de frango",
        "Suco de 2 limões",
        "Azeite",
        "Orégano, alho",
        "Pão pita",
        "Tzatziki: iogurte grego, pepino, alho, hortelã",
        "Tomate, cebola roxa",
        "Espetos de madeira"
      ],
      instructions: [
        "Corte o frango em cubos",
        "Marine com limão, azeite, orégano e alho por 2 horas",
        "Prepare o tzatziki: misture iogurte, pepino ralado, alho e hortelã",
        "Espete o frango nos palitos",
        "Grelhe por 10-12 minutos, virando",
        "Aqueça o pão pita",
        "Monte: pita, frango, tomate, cebola, tzatziki",
        "Sirva imediatamente"
      ]
    },

    // Receitas Chinesas
    {
      id: "32",
      title: "Frango Xadrez",
      description: "Frango salteado com amendoim e legumes",
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&h=400&fit=crop",
      cuisine: "Chinesa",
      difficulty: "Intermediário",
      cookTime: 30,
      servings: 4,
      tags: ["Rápido", "Sem Glúten"],
      ingredients: [
        "600g de peito de frango",
        "100g de amendoim torrado",
        "2 pimentões",
        "1 cebola",
        "Gengibre e alho",
        "Molho de soja",
        "Molho de ostra",
        "Amido de milho",
        "Óleo de gergelim"
      ],
      instructions: [
        "Corte o frango em cubos e marine com molho de soja",
        "Corte os legumes em cubos",
        "Aqueça o wok em fogo alto",
        "Salteie o frango até dourar",
        "Retire o frango",
        "Salteie gengibre, alho e legumes",
        "Retorne o frango ao wok",
        "Adicione molhos e amido dissolvido",
        "Adicione amendoim",
        "Finalize com óleo de gergelim"
      ]
    },
    {
      id: "33",
      title: "Dim Sum Variado",
      description: "Seleção de bolinhos chineses no vapor",
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&h=400&fit=crop",
      cuisine: "Chinesa",
      difficulty: "Avançado",
      cookTime: 90,
      servings: 6,
      tags: ["Tradicional", "Vapor"],
      ingredients: [
        "Massa: 300g farinha, água",
        "Recheio de porco: 400g carne moída, gengibre, cebolinha",
        "Recheio de camarão: 300g camarão, bambu",
        "Molho de soja",
        "Óleo de gergelim",
        "Vinagre",
        "Gengibre ralado"
      ],
      instructions: [
        "Prepare a massa: misture farinha e água, sove bem",
        "Deixe descansar por 30 minutos",
        "Prepare os recheios: misture ingredientes",
        "Abra a massa em círculos finos",
        "Coloque recheio no centro",
        "Faça pregas e feche",
        "Cozinhe no vapor por 8-10 minutos",
        "Prepare molho: soja, vinagre, gengibre",
        "Sirva quente com molho"
      ]
    },

    // Receitas Coreanas
    {
      id: "34",
      title: "Bibimbap",
      description: "Bowl coreano com arroz, legumes, carne e ovo",
      image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=600&h=400&fit=crop",
      cuisine: "Coreana",
      difficulty: "Intermediário",
      cookTime: 45,
      servings: 4,
      tags: ["Tradicional", "Sem Glúten"],
      ingredients: [
        "4 xícaras de arroz cozido",
        "300g de carne moída",
        "Legumes: cenoura, abobrinha, espinafre, broto de feijão",
        "4 ovos",
        "Gochujang (pasta de pimenta coreana)",
        "Molho de soja",
        "Óleo de gergelim",
        "Alho, gengibre",
        "Sementes de gergelim"
      ],
      instructions: [
        "Refogue cada legume separadamente com alho",
        "Tempere a carne com soja e gochujang",
        "Refogue a carne até dourar",
        "Frite os ovos",
        "Monte o bowl: arroz no fundo",
        "Arrume os legumes e carne em setores",
        "Coloque o ovo no centro",
        "Adicione gochujang",
        "Polvilhe gergelim",
        "Misture tudo antes de comer"
      ]
    },
    {
      id: "35",
      title: "Kimchi Caseiro",
      description: "Conserva coreana fermentada de repolho apimentado",
      image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&h=400&fit=crop",
      cuisine: "Coreana",
      difficulty: "Intermediário",
      cookTime: 60,
      servings: 10,
      tags: ["Vegano", "Vegetariano", "Fermentado", "Picante", "Sem Glúten"],
      ingredients: [
        "1 repolho chinês",
        "100g de sal grosso",
        "5 colheres de gochugaru (pimenta coreana)",
        "1 cebolinha",
        "1 rabanete",
        "Gengibre e alho",
        "Molho de peixe (ou molho de soja para versão vegana)",
        "Açúcar"
      ],
      instructions: [
        "Corte o repolho em quartos",
        "Salgue generosamente e deixe por 2 horas",
        "Enxágue bem o repolho",
        "Prepare a pasta: gochugaru, alho, gengibre, molho",
        "Corte cebolinha e rabanete",
        "Misture tudo com a pasta",
        "Passe a pasta em cada folha do repolho",
        "Coloque em pote de vidro",
        "Deixe fermentar em temperatura ambiente por 1-3 dias",
        "Guarde na geladeira"
      ]
    },

    // Receitas Tailandesas
    {
      id: "36",
      title: "Pad Thai",
      description: "Macarrão tailandês salteado com camarão e amendoim",
      image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&h=400&fit=crop",
      cuisine: "Tailandesa",
      difficulty: "Intermediário",
      cookTime: 30,
      servings: 4,
      tags: ["Tradicional", "Sem Glúten"],
      ingredients: [
        "400g de macarrão de arroz",
        "300g de camarão",
        "2 ovos",
        "Broto de feijão",
        "Cebolinha",
        "Amendoim torrado",
        "Molho: tamarindo, molho de peixe, açúcar",
        "Limão",
        "Pimenta"
      ],
      instructions: [
        "Hidrate o macarrão em água morna",
        "Prepare o molho: misture tamarindo, molho de peixe e açúcar",
        "Aqueça o wok em fogo alto",
        "Salteie o camarão e reserve",
        "Frite os ovos mexidos",
        "Adicione o macarrão",
        "Adicione o molho",
        "Adicione camarão, broto e cebolinha",
        "Finalize com amendoim e limão"
      ]
    },
    {
      id: "37",
      title: "Tom Yum Goong",
      description: "Sopa tailandesa picante e azeda com camarão",
      image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=600&h=400&fit=crop",
      cuisine: "Tailandesa",
      difficulty: "Intermediário",
      cookTime: 30,
      servings: 4,
      tags: ["Sopa", "Picante", "Sem Glúten"],
      ingredients: [
        "500g de camarão",
        "1 litro de caldo de peixe",
        "200g de cogumelos",
        "3 talos de capim-limão",
        "5 folhas de lima kaffir",
        "Galanga (ou gengibre)",
        "Pimenta tailandesa",
        "Molho de peixe",
        "Suco de limão",
        "Coentro"
      ],
      instructions: [
        "Ferva o caldo com capim-limão, galanga e folhas de lima",
        "Adicione os cogumelos",
        "Adicione o camarão",
        "Tempere com molho de peixe",
        "Adicione pimenta",
        "Cozinhe por 5 minutos",
        "Finalize com suco de limão",
        "Decore com coentro",
        "Sirva bem quente"
      ]
    },

    // Receitas Marroquinas
    {
      id: "38",
      title: "Tagine de Cordeiro",
      description: "Ensopado marroquino aromático com frutas secas",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop",
      cuisine: "Marroquina",
      difficulty: "Intermediário",
      cookTime: 120,
      servings: 6,
      tags: ["Tradicional", "Sem Glúten"],
      ingredients: [
        "1kg de cordeiro em cubos",
        "2 cebolas",
        "4 dentes de alho",
        "Damascos secos",
        "Amêndoas",
        "Cominho, canela, gengibre",
        "Açafrão",
        "Mel",
        "Coentro e hortelã",
        "Caldo de legumes"
      ],
      instructions: [
        "Doure o cordeiro em azeite",
        "Adicione cebola e alho",
        "Adicione especiarias e refogue",
        "Adicione caldo suficiente para cobrir",
        "Cozinhe em fogo baixo por 1h30",
        "Adicione damascos e amêndoas",
        "Adicione mel",
        "Cozinhe mais 30 minutos",
        "Finalize com ervas frescas",
        "Sirva com cuscuz"
      ]
    },

    // Receitas Peruanas
    {
      id: "39",
      title: "Ceviche Peruano",
      description: "Peixe cru marinado em limão com cebola roxa",
      image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=600&h=400&fit=crop",
      cuisine: "Peruana",
      difficulty: "Fácil",
      cookTime: 20,
      servings: 4,
      tags: ["Peixe", "Sem Glúten", "Frio", "Saudável"],
      ingredients: [
        "600g de peixe branco fresco",
        "Suco de 10 limões",
        "1 cebola roxa",
        "1 pimenta dedo-de-moça",
        "Coentro fresco",
        "Batata doce",
        "Milho",
        "Sal e pimenta"
      ],
      instructions: [
        "Corte o peixe em cubos pequenos",
        "Corte a cebola em fatias finas",
        "Pique a pimenta e o coentro",
        "Misture tudo em uma tigela",
        "Adicione o suco de limão",
        "Tempere com sal e pimenta",
        "Deixe marinar por 10 minutos",
        "Cozinhe batata doce e milho",
        "Sirva o ceviche com os acompanhamentos"
      ]
    },

    // Receitas Turcas
    {
      id: "40",
      title: "Kebab de Cordeiro",
      description: "Espetinho turco de cordeiro marinado com especiarias",
      image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&h=400&fit=crop",
      cuisine: "Turca",
      difficulty: "Intermediário",
      cookTime: 40,
      servings: 4,
      tags: ["Tradicional", "Sem Glúten"],
      ingredients: [
        "800g de cordeiro",
        "Iogurte natural",
        "Suco de limão",
        "Cominho, páprica, canela",
        "Alho e cebola",
        "Pão pita",
        "Tomate, pepino",
        "Molho de iogurte com hortelã"
      ],
      instructions: [
        "Corte o cordeiro em cubos",
        "Marine com iogurte, limão e especiarias por 4 horas",
        "Espete a carne em palitos",
        "Grelhe por 10-12 minutos",
        "Aqueça o pão pita",
        "Prepare o molho: iogurte com hortelã e alho",
        "Corte tomate e pepino",
        "Monte: pita, carne, legumes, molho",
        "Sirva quente"
      ]
    }
  ];

  // Filtrar receitas baseado na busca e filtros
  const filteredRecipes = allRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCuisine = filterCuisine === "all" || recipe.cuisine === filterCuisine;
    const matchesDietary = filterDietary === "all" || recipe.tags.includes(filterDietary);

    return matchesSearch && matchesCuisine && matchesDietary;
  });

  // Receitas recomendadas baseadas no quiz
  const recommendedRecipes = allRecipes.filter(recipe =>
    userPreferences.cuisineTypes.includes(recipe.cuisine) ||
    recipe.tags.some(tag => userPreferences.dietaryRestrictions.includes(tag))
  );

  const handleCopyRecipe = (recipe: Recipe) => {
    const recipeText = `
${recipe.title}
${recipe.description}

⏱️ Tempo: ${recipe.cookTime} minutos
👥 Porções: ${recipe.servings}
📊 Dificuldade: ${recipe.difficulty}

INGREDIENTES:
${recipe.ingredients.map((ing, i) => `${i + 1}. ${ing}`).join('\n')}

MODO DE PREPARO:
${recipe.instructions.map((inst, i) => `${i + 1}. ${inst}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(recipeText);
    setCopiedRecipe(recipe.id);
    setTimeout(() => setCopiedRecipe(null), 2000);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Descubra <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Receitas</span>
        </h1>
        <p className="text-gray-600">Explore receitas do mundo todo e encontre sua próxima criação culinária</p>
      </div>

      {/* Search and Filters */}
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar receitas, ingredientes, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-300 focus:border-orange-500"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filtros:</span>
            </div>
            <Select value={filterCuisine} onValueChange={setFilterCuisine}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Culinária" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas Culinárias</SelectItem>
                <SelectItem value="Portuguesa">Portuguesa</SelectItem>
                <SelectItem value="Italiana">Italiana</SelectItem>
                <SelectItem value="Japonesa">Japonesa</SelectItem>
                <SelectItem value="Mexicana">Mexicana</SelectItem>
                <SelectItem value="Indiana">Indiana</SelectItem>
                <SelectItem value="Francesa">Francesa</SelectItem>
                <SelectItem value="Brasileira">Brasileira</SelectItem>
                <SelectItem value="Espanhola">Espanhola</SelectItem>
                <SelectItem value="Grega">Grega</SelectItem>
                <SelectItem value="Chinesa">Chinesa</SelectItem>
                <SelectItem value="Coreana">Coreana</SelectItem>
                <SelectItem value="Tailandesa">Tailandesa</SelectItem>
                <SelectItem value="Marroquina">Marroquina</SelectItem>
                <SelectItem value="Peruana">Peruana</SelectItem>
                <SelectItem value="Turca">Turca</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterDietary} onValueChange={setFilterDietary}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Restrições" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="Sem Glúten">Sem Glúten</SelectItem>
                <SelectItem value="Vegano">Vegano</SelectItem>
                <SelectItem value="Vegetariano">Vegetariano</SelectItem>
                <SelectItem value="Sem Lactose">Sem Lactose</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Section */}
      {recommendedRecipes.length > 0 && searchQuery === "" && filterCuisine === "all" && filterDietary === "all" && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ChefHat className="w-5 h-5 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-900">Recomendadas para Você</h2>
            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">
              Baseado no seu perfil
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedRecipes.slice(0, 6).map((recipe) => (
              <Card
                key={recipe.id}
                className="border-gray-200 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-orange-600 text-white">
                        {recipe.cuisine}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">
                      {recipe.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{recipe.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{recipe.cookTime} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{recipe.servings} porções</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recipe.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Recipes Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {searchQuery || filterCuisine !== "all" || filterDietary !== "all" 
            ? "Resultados da Busca" 
            : "Todas as Receitas"}
        </h2>
        {filteredRecipes.length === 0 ? (
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-12 text-center">
              <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhuma receita encontrada
              </h3>
              <p className="text-gray-600">
                Tente ajustar seus filtros ou buscar por outros termos
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="border-gray-200 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-orange-600 text-white">
                        {recipe.cuisine}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">
                      {recipe.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{recipe.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{recipe.cookTime} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{recipe.servings} porções</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recipe.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Recipe Detail Dialog */}
      <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedRecipe && (
            <>
              <DialogHeader>
                <div className="relative -mx-6 -mt-6 mb-4">
                  <img
                    src={selectedRecipe.image}
                    alt={selectedRecipe.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge className="bg-orange-600 text-white">
                      {selectedRecipe.cuisine}
                    </Badge>
                    <Badge className="bg-gray-900 text-white">
                      {selectedRecipe.difficulty}
                    </Badge>
                  </div>
                </div>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  {selectedRecipe.title}
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  {selectedRecipe.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Recipe Info */}
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <span><strong>{selectedRecipe.cookTime}</strong> minutos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-orange-600" />
                    <span><strong>{selectedRecipe.servings}</strong> porções</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChefHat className="w-5 h-5 text-orange-600" />
                    <span>{selectedRecipe.difficulty}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedRecipe.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Ingredients */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Ingredientes</h3>
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span className="text-orange-600 font-bold">•</span>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Modo de Preparo</h3>
                  <ol className="space-y-3">
                    {selectedRecipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 pt-0.5">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => router.push(`/dashboard/receitas/${selectedRecipe.id}/fazer`)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Começar a Fazer Esta Receita
                  </Button>
                  <Button
                    onClick={() => handleCopyRecipe(selectedRecipe)}
                    variant="outline"
                    className="border-orange-300 hover:bg-orange-50"
                  >
                    {copiedRecipe === selectedRecipe.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
