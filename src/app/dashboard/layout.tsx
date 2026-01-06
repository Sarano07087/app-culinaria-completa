"use client";

import { Button } from "@/components/ui/button";
import { ChefHat, Home, Search, ShoppingCart, Camera, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { UserProvider, useUser } from "@/contexts/UserContext";
import Image from "next/image";
import { useEffect } from "react";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();

  const handleLogout = () => {
    // Simulação de logout
    router.push("/");
  };

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Início" },
    { href: "/dashboard/receitas", icon: Search, label: "Receitas" },
    { href: "/dashboard/shopping", icon: ShoppingCart, label: "Rutina" },
    { href: "/dashboard/scan", icon: Camera, label: "Analisar" },
    { href: "/dashboard/profile", icon: User, label: "Perfil" },
  ];

  // Suprimir erros de fetch do console
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args) => {
      // Filtrar erros conhecidos de prefetch/HMR
      const errorString = args.join(' ');
      if (
        errorString.includes('Failed to fetch') ||
        errorString.includes('signal is aborted') ||
        errorString.includes('Network Failed')
      ) {
        return; // Ignorar esses erros
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Top Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" prefetch={false} className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              CookFun
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {/* User Info */}
            <Link href="/dashboard/profile" prefetch={false} className="hidden sm:flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-600">@{user.username}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center overflow-hidden">
                {user.profileImage ? (
                  <Image
                    src={user.profileImage}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
            </Link>

            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-gray-700 hover:text-orange-600"
            >
              <LogOut className="w-5 h-5 sm:mr-2" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation - Desktop */}
        <aside className="hidden md:block w-64 border-r bg-white/50 backdrop-blur-sm min-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} prefetch={false}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                        : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>

      {/* Bottom Navigation - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} prefetch={false}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col items-center gap-1 h-auto py-2 ${
                    isActive ? "text-orange-600" : "text-gray-600"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <DashboardContent>{children}</DashboardContent>
    </UserProvider>
  );
}
