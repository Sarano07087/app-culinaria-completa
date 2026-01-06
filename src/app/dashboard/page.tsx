"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, MoreHorizontal, Plus, Image as ImageIcon, X } from "lucide-react";
import { useState, useRef } from "react";
import { useUser } from "@/contexts/UserContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function DashboardPage() {
  const { user } = useUser();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [posts, setPosts] = useState([
    {
      id: "1",
      author: {
        name: "Maria Silva",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      },
      content: "Acabei de fazer essa lasanha incrível! Receita da minha avó 🍝",
      image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&h=400&fit=crop",
      funCooks: 124,
      comments: 23,
      isFunCooked: false,
    },
    {
      id: "2",
      author: {
        name: "João Santos",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      },
      content: "Bolo de chocolate vegano perfeito! Sem ovos, sem leite, só sabor 🍰",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop",
      funCooks: 89,
      comments: 15,
      isFunCooked: false,
    },
  ]);

  const handleFunCook = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isFunCooked: !post.isFunCooked,
          funCooks: post.isFunCooked ? post.funCooks - 1 : post.funCooks + 1,
        };
      }
      return post;
    }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPostImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCreatePost = () => {
    if (!postContent.trim() && !postImage) return;

    const newPost = {
      id: Date.now().toString(),
      author: {
        name: user.name,
        avatar: user.profileImage,
      },
      content: postContent,
      image: postImage || undefined,
      funCooks: 0,
      comments: 0,
      isFunCooked: false,
    };

    setPosts([newPost, ...posts]);
    setPostContent("");
    setPostImage(null);
    setIsCreatePostOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20 md:pb-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bem-vindo ao <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">CookFun</span>
        </h1>
        <p className="text-gray-600">Descubra, compartilhe e inspire-se com receitas incríveis</p>
      </div>

      {/* Create Post */}
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.profileImage} />
              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              className="flex-1 justify-start text-gray-500 hover:text-orange-600 hover:border-orange-300"
              onClick={() => setIsCreatePostOpen(true)}
            >
              Compartilhe sua receita...
            </Button>
            <Button
              size="icon"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
              onClick={() => setIsCreatePostOpen(true)}
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Create Post Dialog */}
      <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Criar Nova Receita
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user.profileImage} />
                <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </div>

            {/* Text Content */}
            <Textarea
              placeholder="Compartilhe sua receita, dicas ou experiências culinárias..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="min-h-[120px] resize-none border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            />

            {/* Image Preview */}
            {postImage && (
              <div className="relative rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={postImage}
                  alt="Preview"
                  className="w-full h-64 object-cover"
                />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 rounded-full"
                  onClick={handleRemoveImage}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-orange-300 text-orange-600 hover:bg-orange-50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="w-4 h-4" />
                  {postImage ? "Trocar Foto" : "Adicionar Foto"}
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreatePostOpen(false);
                    setPostContent("");
                    setPostImage(null);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                  onClick={handleCreatePost}
                  disabled={!postContent.trim() && !postImage}
                >
                  Publicar
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Feed Posts */}
      {posts.map((post) => (
        <Card key={post.id} className="border-gray-200 shadow-sm">
          <CardContent className="p-0">
            {/* Post Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900">{post.author.name}</p>
                  <p className="text-sm text-gray-500">Há 2 horas</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-5 h-5 text-gray-500" />
              </Button>
            </div>

            {/* Post Content */}
            {post.content && (
              <div className="px-4 pb-3">
                <p className="text-gray-800">{post.content}</p>
              </div>
            )}

            {/* Post Image */}
            {post.image && (
              <img
                src={post.image}
                alt="Post"
                className="w-full h-80 object-cover"
              />
            )}

            {/* Post Actions */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFunCook(post.id)}
                    className={`gap-2 ${
                      post.isFunCooked
                        ? "text-orange-600 hover:text-orange-700"
                        : "text-gray-600 hover:text-orange-600"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${post.isFunCooked ? "fill-orange-600" : ""}`}
                    />
                    <span className="font-semibold">{post.funCooks} FunCooks</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-gray-600 hover:text-orange-600">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments}</span>
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-orange-600">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Load More */}
      <div className="text-center py-4">
        <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
          Carregar mais posts
        </Button>
      </div>
    </div>
  );
}
