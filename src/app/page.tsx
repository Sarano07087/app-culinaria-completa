"use client";

import { Button } from "@/components/ui/button";
import { ChefHat, Users, ShoppingCart, Camera, BookOpen, Calendar } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              CookFun
            </span>
          </div>
          <div className="flex gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-700 hover:text-orange-600">
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                Criar Conta
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Sua Comunidade
            <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Culinária Completa
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubra receitas do mundo todo, planeje suas refeições, compartilhe experiências e conecte-se com amantes da culinária
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg px-8">
                Começar Agora
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50 text-lg px-8">
                Já Tenho Conta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<BookOpen className="w-8 h-8 text-orange-600" />}
            title="Receitas do Mundo"
            description="Pesquise milhares de receitas com filtros personalizados: veganas, sem glúten, por país e muito mais"
          />
          <FeatureCard
            icon={<ShoppingCart className="w-8 h-8 text-orange-600" />}
            title="Lista de Compras Inteligente"
            description="Crie listas de compras e planeje suas refeições semanais de forma organizada"
          />
          <FeatureCard
            icon={<Calendar className="w-8 h-8 text-orange-600" />}
            title="Planejamento Semanal"
            description="Organize almoços e jantares para toda a semana com facilidade"
          />
          <FeatureCard
            icon={<Camera className="w-8 h-8 text-orange-600" />}
            title="Análise de Produtos"
            description="Use sua câmera para analisar produtos e comparar preços em lojas próximas"
          />
          <FeatureCard
            icon={<Users className="w-8 h-8 text-orange-600" />}
            title="Comunidade Ativa"
            description="Compartilhe receitas, fotos e experiências com outros apaixonados por culinária"
          />
          <FeatureCard
            icon={<ChefHat className="w-8 h-8 text-orange-600" />}
            title="Perfil Personalizado"
            description="Crie seu perfil, conecte-se com amigos e mostre suas habilidades culinárias"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Pronto para Começar sua Jornada Culinária?
          </h2>
          <p className="text-xl mb-8 text-orange-50">
            Junte-se a milhares de pessoas que já transformaram sua experiência na cozinha
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-8">
              Criar Conta Grátis
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 CookFun. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
