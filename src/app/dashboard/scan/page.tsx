"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, X, Sparkles, Loader2, AlertCircle, CheckCircle2, Info } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

interface AnalysisResult {
  productName: string;
  category: string;
  nutritionalInfo: NutritionalInfo;
  healthScore: number;
  recommendations: string[];
  warnings: string[];
}

export default function ScanPage() {
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      setStream(mediaStream);
      setShowCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error: any) {
      console.error("Erro ao acessar câmera:", error);
      
      let errorMessage = "Não foi possível acessar a câmera.";
      
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        errorMessage = "Permissão de câmera negada. Por favor, permita o acesso à câmera nas configurações do seu navegador.";
      } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
        errorMessage = "Nenhuma câmera foi encontrada no seu dispositivo.";
      } else if (error.name === "NotReadableError" || error.name === "TrackStartError") {
        errorMessage = "A câmera está sendo usada por outro aplicativo. Feche outros apps e tente novamente.";
      } else if (error.name === "OverconstrainedError") {
        errorMessage = "Câmera traseira não disponível. Tentando câmera frontal...";
        // Tentar com câmera frontal
        try {
          const frontStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" },
            audio: false,
          });
          setStream(frontStream);
          setShowCamera(true);
          if (videoRef.current) {
            videoRef.current.srcObject = frontStream;
          }
          return;
        } catch (frontError) {
          errorMessage = "Não foi possível acessar nenhuma câmera do dispositivo.";
        }
      } else if (error.name === "SecurityError") {
        errorMessage = "Acesso à câmera bloqueado por questões de segurança. Certifique-se de estar usando HTTPS.";
      }
      
      setCameraError(errorMessage);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setShowCamera(false);
    setCapturedImage(null);
    setAnalysisResult(null);
    setCameraError(null);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL("image/jpeg");
        setCapturedImage(imageData);
        analyzeImage(imageData);
      }
    }
  };

  const analyzeImage = async (imageData: string) => {
    setIsAnalyzing(true);
    
    // Simulação de análise com IA (em produção, seria uma chamada real à API)
    setTimeout(() => {
      const mockResults: AnalysisResult[] = [
        {
          productName: "Iogurte Natural Grego",
          category: "Laticínios",
          nutritionalInfo: {
            calories: 120,
            protein: 10,
            carbs: 8,
            fat: 5,
            fiber: 0,
            sugar: 6,
          },
          healthScore: 85,
          recommendations: [
            "Excelente fonte de proteína",
            "Rico em probióticos",
            "Baixo teor de açúcar",
          ],
          warnings: ["Contém lactose"],
        },
        {
          productName: "Refrigerante Cola",
          category: "Bebidas",
          nutritionalInfo: {
            calories: 140,
            protein: 0,
            carbs: 39,
            fat: 0,
            fiber: 0,
            sugar: 39,
          },
          healthScore: 25,
          recommendations: [],
          warnings: [
            "Alto teor de açúcar",
            "Sem valor nutricional",
            "Evite consumo frequente",
          ],
        },
        {
          productName: "Banana",
          category: "Frutas",
          nutritionalInfo: {
            calories: 105,
            protein: 1.3,
            carbs: 27,
            fat: 0.4,
            fiber: 3.1,
            sugar: 14,
          },
          healthScore: 95,
          recommendations: [
            "Rica em potássio",
            "Boa fonte de energia",
            "Contém fibras",
            "Vitaminas B6 e C",
          ],
          warnings: [],
        },
      ];

      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setAnalysisResult(randomResult);
      setIsAnalyzing(false);
    }, 2500);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getHealthScoreLabel = (score: number) => {
    if (score >= 80) return "Excelente";
    if (score >= 60) return "Moderado";
    return "Atenção";
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white">
        <div className="flex items-center gap-3 mb-2">
          <Camera className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Analisar Produto</h1>
        </div>
        <p className="text-purple-100">
          Use a câmera para escanear produtos e obter informações nutricionais instantâneas
        </p>
      </div>

      {/* Camera Error Alert */}
      {cameraError && (
        <Alert variant="destructive" className="border-red-300 bg-red-50">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro ao Acessar Câmera</AlertTitle>
          <AlertDescription className="mt-2 space-y-2">
            <p>{cameraError}</p>
            <div className="mt-3 text-sm">
              <p className="font-semibold mb-1">Como resolver:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Verifique se você permitiu acesso à câmera quando solicitado</li>
                <li>Nas configurações do navegador, permita acesso à câmera para este site</li>
                <li>Certifique-se de que nenhum outro app está usando a câmera</li>
                <li>Tente recarregar a página e permitir o acesso novamente</li>
              </ul>
            </div>
            <Button
              onClick={startCamera}
              variant="outline"
              size="sm"
              className="mt-3 border-red-300 text-red-700 hover:bg-red-100"
            >
              Tentar Novamente
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Main Action Card */}
      {!showCamera && (
        <Card className="border-2 border-purple-200 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <Camera className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Escaneie um Produto
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Aponte a câmera para qualquer produto alimentar ou comida e receba análise nutricional completa em segundos
            </p>
            <Button
              onClick={startCamera}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8"
            >
              <Camera className="w-5 h-5 mr-2" />
              Abrir Câmera
            </Button>
            
            {/* Permission Info */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-left max-w-md mx-auto">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-700">
                  <p className="font-semibold text-blue-900 mb-1">Permissão de Câmera</p>
                  <p>Ao clicar em "Abrir Câmera", seu navegador solicitará permissão para acessar a câmera. Clique em "Permitir" para continuar.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Camera Dialog */}
      <Dialog open={showCamera} onOpenChange={(open) => !open && stopCamera()}>
        <DialogContent className="max-w-2xl p-0 gap-0">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="flex items-center gap-2">
              <Camera className="w-6 h-6 text-purple-600" />
              Câmera de Análise
            </DialogTitle>
            <DialogDescription>
              {capturedImage
                ? "Analisando produto..."
                : "Posicione o produto no centro da tela e capture"}
            </DialogDescription>
          </DialogHeader>

          <div className="relative bg-black">
            {!capturedImage ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />
                
                {/* Camera Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-64 border-4 border-white/50 rounded-2xl">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-purple-500 rounded-tl-2xl"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-purple-500 rounded-tr-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-purple-500 rounded-bl-2xl"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-purple-500 rounded-br-2xl"></div>
                  </div>
                </div>
              </>
            ) : (
              <div className="relative">
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
                      <p className="text-lg font-semibold">Analisando produto...</p>
                      <p className="text-sm text-gray-300 mt-2">Identificando informações nutricionais</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Analysis Results */}
          {analysisResult && !isAnalyzing && (
            <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
              {/* Product Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {analysisResult.productName}
                  </h3>
                  <Badge variant="outline" className="mt-1">
                    {analysisResult.category}
                  </Badge>
                </div>
                <div className={`px-4 py-2 rounded-lg font-bold ${getHealthScoreColor(analysisResult.healthScore)}`}>
                  {analysisResult.healthScore}/100
                  <div className="text-xs font-normal">
                    {getHealthScoreLabel(analysisResult.healthScore)}
                  </div>
                </div>
              </div>

              {/* Nutritional Info */}
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    Informação Nutricional (por porção)
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {analysisResult.nutritionalInfo.calories}
                      </div>
                      <div className="text-xs text-gray-600">Calorias</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {analysisResult.nutritionalInfo.protein}g
                      </div>
                      <div className="text-xs text-gray-600">Proteína</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {analysisResult.nutritionalInfo.carbs}g
                      </div>
                      <div className="text-xs text-gray-600">Carboidratos</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">
                        {analysisResult.nutritionalInfo.fat}g
                      </div>
                      <div className="text-xs text-gray-600">Gordura</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {analysisResult.nutritionalInfo.fiber}g
                      </div>
                      <div className="text-xs text-gray-600">Fibra</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">
                        {analysisResult.nutritionalInfo.sugar}g
                      </div>
                      <div className="text-xs text-gray-600">Açúcar</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              {analysisResult.recommendations.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Benefícios
                  </h4>
                  {analysisResult.recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{rec}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Warnings */}
              {analysisResult.warnings.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                    Avisos
                  </h4>
                  {analysisResult.warnings.map((warning, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg"
                    >
                      <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{warning}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="p-6 pt-0 flex gap-3">
            {!capturedImage ? (
              <>
                <Button
                  variant="outline"
                  onClick={stopCamera}
                  className="flex-1"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
                <Button
                  onClick={capturePhoto}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Capturar
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={retakePhoto}
                  className="flex-1"
                  disabled={isAnalyzing}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Nova Foto
                </Button>
                <Button
                  onClick={stopCamera}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                  disabled={isAnalyzing}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Concluir
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-purple-200">
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
              <Camera className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Escaneamento Rápido</h3>
            <p className="text-sm text-gray-600">
              Análise instantânea de produtos em segundos
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">IA Avançada</h3>
            <p className="text-sm text-gray-600">
              Reconhecimento inteligente de alimentos e produtos
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Informação Completa</h3>
            <p className="text-sm text-gray-600">
              Dados nutricionais detalhados e recomendações
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
