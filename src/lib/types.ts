// Tipos globais da aplicação CookFun

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  friends: number;
  followers: number;
  experience?: string;
  cuisineTypes?: string[];
  dietaryRestrictions?: string[];
  cookingFrequency?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  cookTime: number;
  servings: number;
  difficulty: string;
  tags: string[];
  author: User;
  funCooks: number;
  comments: Comment[];
  createdAt: Date;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  recipe?: Recipe;
  funCooks: number;
  comments: Comment[];
  createdAt: Date;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: Date;
}

export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
  category?: string;
}

export interface MealPlan {
  id: string;
  day: string;
  lunch?: string;
  dinner?: string;
}

export interface Store {
  id: string;
  name: string;
  distance: number;
  prices: Record<string, number>;
}
