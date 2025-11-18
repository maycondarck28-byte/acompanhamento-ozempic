"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Circle, ArrowRight, ArrowLeft, DollarSign, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface Question {
  id: number;
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "Você já utiliza Ozempic ou outro medicamento similar?",
    options: ["Sim, uso Ozempic", "Sim, uso outro medicamento", "Não, mas pretendo usar", "Não uso e não pretendo"],
  },
  {
    id: 2,
    question: "Qual é o seu principal objetivo com o tratamento?",
    options: ["Perda de peso", "Controle de diabetes", "Melhoria da saúde geral", "Outro objetivo"],
  },
  {
    id: 3,
    question: "Você tem dificuldade em acompanhar suas injeções?",
    options: ["Sim, sempre esqueço", "Às vezes esqueço", "Raramente esqueço", "Nunca esqueço"],
  },
  {
    id: 4,
    question: "Como você monitora sua alimentação atualmente?",
    options: ["Não monitoro", "Anoto em papel", "Uso aplicativos genéricos", "Tenho método próprio"],
  },
  {
    id: 5,
    question: "Qual a importância de acompanhar sua ingestão de proteínas?",
    options: ["Muito importante", "Importante", "Pouco importante", "Não sei"],
  },
  {
    id: 6,
    question: "Você bebe água suficiente durante o dia?",
    options: ["Sim, sempre", "Na maioria das vezes", "Raramente", "Não sei dizer"],
  },
  {
    id: 7,
    question: "Gostaria de visualizar seu progresso através de gráficos?",
    options: ["Sim, seria muito útil", "Sim, mas não é essencial", "Não acho necessário", "Não sei"],
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full bg-white/90 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <CardTitle className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              Perfeito! 🎉
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              O Ozempic Tracker é ideal para você!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-purple-200">
              <h3 className="font-semibold text-xl text-gray-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                Com base nas suas respostas, você vai adorar:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Registro fácil de injeções com fotos e datas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Monitoramento inteligente de proteínas e água</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Gráficos detalhados do seu progresso</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Lembretes automáticos para não esquecer suas injeções</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 p-6 rounded-xl text-center shadow-lg">
              <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full mb-3">
                <Sparkles className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-700">Oferta Especial</span>
              </div>
              <p className="text-lg font-semibold text-gray-700 mb-2">
                Comece sua jornada hoje
              </p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <DollarSign className="w-10 h-10 text-green-600" />
                <div>
                  <p className="text-5xl font-bold text-green-600">19.90</p>
                  <p className="text-lg text-gray-600">/mês</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Acesso completo a todas as funcionalidades
              </p>
              <div className="flex flex-col gap-2 text-sm text-gray-700 mb-6">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Cancele a qualquer momento</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Sem taxas ocultas</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Suporte prioritário</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white text-lg py-7 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Continuar para Pagamento
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <p className="text-center text-sm text-gray-500">
              Dados salvos localmente • 100% privado • Cancele quando quiser
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-white/90 backdrop-blur-sm shadow-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800">
              Quiz Rápido
            </CardTitle>
            <span className="text-sm font-medium text-gray-600 bg-purple-100 px-3 py-1 rounded-full">
              {currentQuestion + 1} de {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
              {questions[currentQuestion].question}
            </h3>
            <RadioGroup
              value={answers[questions[currentQuestion].id]}
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-purple-300 hover:bg-purple-50 hover:scale-[1.02] ${
                    answers[questions[currentQuestion].id] === option
                      ? "border-purple-500 bg-purple-50 shadow-md"
                      : "border-gray-200"
                  }`}
                  onClick={() => handleAnswer(option)}
                >
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer text-gray-700 font-medium"
                  >
                    {option}
                  </Label>
                  {answers[questions[currentQuestion].id] === option && (
                    <CheckCircle2 className="w-5 h-5 text-purple-500" />
                  )}
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex gap-3 pt-4">
            {currentQuestion > 0 && (
              <Button
                onClick={handlePrevious}
                variant="outline"
                className="flex-1 h-12 border-2 hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Anterior
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!answers[questions[currentQuestion].id]}
              className="flex-1 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === questions.length - 1 ? "Ver Resultado" : "Próxima"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
