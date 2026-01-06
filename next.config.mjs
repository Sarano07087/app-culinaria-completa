/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações essenciais para produção
  reactStrictMode: true,
  
  // Configurações de imagens
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  
  // Otimizações para build
  swcMinify: true,
  
  // Configurações de output para Vercel
  output: 'standalone',
};

export default nextConfig;
