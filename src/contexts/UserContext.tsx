"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface UserProfile {
  name: string;
  username: string;
  bio: string;
  email: string;
  phone: string;
  website: string;
  profileImage: string;
  gender: string;
}

interface UserContextType {
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
  resetUser: () => void;
}

const defaultUser: UserProfile = {
  name: "Utilizador",
  username: "utilizador123",
  bio: "Apaixonado por comida saudável 🥗",
  email: "utilizador@cookfun.com",
  phone: "",
  website: "",
  profileImage: "",
  gender: "Prefiro não dizer",
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar dados do localStorage ao montar
  useEffect(() => {
    const savedUser = localStorage.getItem("cookfun_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Salvar no localStorage sempre que o usuário mudar
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cookfun_user", JSON.stringify(user));
    }
  }, [user, isLoaded]);

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const resetUser = () => {
    setUser(defaultUser);
    localStorage.removeItem("cookfun_user");
  };

  return (
    <UserContext.Provider value={{ user, updateUser, resetUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
}
